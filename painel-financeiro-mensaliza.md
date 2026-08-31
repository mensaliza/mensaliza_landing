# Implementar Painel Financeiro do Mensaliza (simulador de preços e margem)

## Contexto do produto

Mensaliza é um SaaS de cobrança mensal automática via WhatsApp para profissionais (nutricionistas, psicólogos, personal trainers etc.). Cada **profissional** assina um **plano** definido pela capacidade máxima de **assinantes** (clientes do profissional). O profissional paga uma **mensalidade** mensal ao Mensaliza.

Este painel é uma ferramenta **interna/backoffice** para simular precificação, margens e projeção de carteira. NÃO é tela pública da landing.

Idioma da UI: **pt-BR**. Moeda: **BRL**.

---

## Objetivo

Criar uma tela interativa completa (dashboard financeiro) com:

1. Editor de planos (assinantes + preço + % da carteira)
2. Premissas editáveis (custo/aluno, margem-alvo, imposto, outros custos)
3. Simulação de carteira (# profissionais + mix por plano)
4. Relatório completo: tabelas + gráficos + DRE simplificada
5. Persistência local das premissas (localStorage ou estado do app)

Assuma **capacidade utilizada = 100%**: cada profissional no plano usa exatamente `subscribers` assinantes do plano.

---

## Modelo de dados

```ts
type Plan = {
  id: string;
  subscribers: number; // capacidade do plano (ex: 25, 50, 100, 150)
  price: number;       // mensalidade do profissional (R$)
  share: number;       // % da carteira nesse plano (ex: 40 = 40%)
};
```

### Valores iniciais (iguais à landing atual)

| Assinantes | Mensalidade | Participação inicial |
|-----------:|------------:|---------------------:|
| 25 | R$ 69 | 40% |
| 50 | R$ 109 | 30% |
| 100 | R$ 139 | 20% |
| 150 | R$ 199 | 10% |

### Premissas iniciais

- `costPerSubscriber` = **0.35** (R$ por assinante/mês)
  - Representa custo combinado: API oficial Meta (mensagens WhatsApp) + infraestrutura (site/app/APIs) alocada por assinante
- `targetMargin` = **70%** (meta de margem bruta do produto)
- `taxRate` = **15.5%** (alíquota efetiva configurável sobre receita bruta)
- `otherMonthlyCosts` = **0** (custos fixos extras: contabilidade, equipe, marketing etc.)
- `professionals` = **100** (tamanho da carteira simulada)

---

## Regras de negócio e fórmulas (FONTE DA VERDADE)

### Normalização da distribuição de planos

```
totalShare = sum(plan.share)
hasValidShare = totalShare > 0

se hasValidShare:
  normalizedShare_i = plan.share / totalShare
senão:
  normalizedShare_i = 1 / N_planos   // divisão igual

professionalCount_i = professionals * normalizedShare_i
```

- Se `totalShare != 100`, **normalizar automaticamente** e mostrar aviso (callout warning).
- Se todos `share = 0`, dividir igualmente e avisar.

### Métricas por plano (unitárias — 1 profissional naquele plano)

```
serviceCost        = subscribers * costPerSubscriber
grossProfit        = price - serviceCost
grossMargin        = price > 0 ? grossProfit / price : 0
tax                = price * taxRate
afterTaxProfit     = grossProfit - tax
afterTaxMargin     = price > 0 ? afterTaxProfit / price : 0
pricePerSubscriber = subscribers > 0 ? price / subscribers : 0
minimumPrice       = targetMargin < 1 ? serviceCost / (1 - targetMargin) : 0
```

**Importante sobre preço mínimo:**

- Usa só `serviceCost` e `targetMargin`.
- **Imposto NÃO entra** no cálculo do preço mínimo (meta é de margem bruta do produto).

### Totais do cenário (carteira)

```
totalRevenue_i      = professionalCount_i * price_i
totalServiceCost_i  = professionalCount_i * serviceCost_i
totalTax_i          = professionalCount_i * tax_i
totalAfterTax_i     = professionalCount_i * afterTaxProfit_i

grossRevenue        = sum(totalRevenue_i)
serviceCosts        = sum(totalServiceCost_i)
taxes               = sum(totalTax_i)
netRevenue          = grossRevenue - taxes
productGrossProfit  = grossRevenue - serviceCosts
afterTaxAndService  = grossRevenue - taxes - serviceCosts
simplifiedNetProfit = afterTaxAndService - otherMonthlyCosts
```

### Margens consolidadas

```
productGrossMargin   = grossRevenue > 0 ? productGrossProfit / grossRevenue : 0
afterTaxMargin       = grossRevenue > 0 ? afterTaxAndService / grossRevenue : 0
simplifiedNetMargin  = grossRevenue > 0 ? simplifiedNetProfit / grossRevenue : 0
```

### Médias por profissional

```
averageRevenue   = professionals > 0 ? grossRevenue / professionals : 0
averageCost      = professionals > 0 ? serviceCosts / professionals : 0
averageNetProfit = professionals > 0 ? simplifiedNetProfit / professionals : 0
```

### Ponto de equilíbrio (outros custos)

```
contributionPerProfessional = professionals > 0
  ? afterTaxAndService / professionals
  : 0

breakEvenProfessionals =
  otherMonthlyCosts > 0 && contributionPerProfessional > 0
    ? ceil(otherMonthlyCosts / contributionPerProfessional)
    : null
```

Só mostrar o ponto de equilíbrio quando `otherMonthlyCosts > 0`.

### Projeção de crescimento (mix constante)

Manter o mix atual de planos. Projetar para fatores `[0.25, 0.5, 1, 1.5, 2]` do cenário-base:

```
projectionBase = max(20, professionals)
projectionProfessionals = [0.25, 0.5, 1, 1.5, 2].map(f => round(projectionBase * f))

weightedRevenuePerPro = sum(price_i * normalizedShare_i)
weightedCostPerPro    = sum(serviceCost_i * normalizedShare_i)
weightedTaxPerPro     = weightedRevenuePerPro * taxRate

projectionRevenue(count) = count * weightedRevenuePerPro
projectionProfit(count)  =
  count * (weightedRevenuePerPro - weightedCostPerPro - weightedTaxPerPro)
  - otherMonthlyCosts
```

---

## Semântica contábil (obrigatório respeitar)

Ordem correta do demonstrativo:

1. **Receita bruta** = mensalidades dos profissionais
2. **(-) Impostos** = `taxRate × receita bruta` (dedução da receita, NÃO custo do assinante)
3. **(=) Receita líquida** = receita − impostos
4. **(-) Custo de atendimento** = assinantes × R$ 0,35 (ou valor configurado)
5. **(=) Resultado após imposto e atendimento**
6. **(-) Outros custos mensais**
7. **(=) Lucro líquido simplificado**

### Definições de margem

- **Margem bruta do produto** = (receita − custo de atendimento) / receita
  - NÃO inclui imposto
- **Margem após impostos** = (receita − impostos − custo de atendimento) / receita
- **Margem líquida simplificada** = lucro líquido simplificado / receita
  - “simplificada” porque não inclui despesas não informadas (pró-labore, salários, CAC, depreciação etc.)

**Nunca** tratar imposto como parte do custo por aluno.

Disclaimer obrigatório no rodapé:

> Modelo gerencial para comparação de cenários; não substitui apuração contábil ou tributária.

---

## Exemplos de validação (use como testes)

### Plano 25 / R$ 69 / custo 0.35 / imposto 15.5% / meta 70%

- serviceCost = 25 × 0.35 = **8.75**
- grossProfit = 69 − 8.75 = **60.25**
- grossMargin = 60.25 / 69 ≈ **87.32%**
- tax = 69 × 0.155 ≈ **10.695**
- afterTaxProfit = 60.25 − 10.695 ≈ **49.555**
- pricePerSubscriber = 69 / 25 = **2.76**
- minimumPrice = 8.75 / (1 − 0.70) ≈ **29.17**

### Plano 50 / R$ 109

- serviceCost = **17.50**
- grossMargin ≈ **83.94%**
- pricePerSubscriber = **2.18**

### Consolidado (100 profissionais, mix 40/30/20/10)

Deve somar receita ponderada:

`40%×69 + 30%×109 + 20%×139 + 10%×199 = 27.6 + 32.7 + 27.8 + 19.9 = R$ 108/profissional`

→ receita bruta ≈ **R$ 10.800**

---

## UI — estrutura da tela (ordem de cima para baixo)

### 1. Header

- Título: **Painel financeiro do Mensaliza**
- Subtítulo: editar planos/premissas para avaliar preços, margens e carteira
- Badges: `Projeção mensal` · `Capacidade utilizada: 100%` · `Valores em BRL`

### 2. Summary band (KPIs)

- Receita bruta mensal
- Lucro líquido simplificado (danger se < 0)
- Margem bruta do produto
- Margem líquida simplificada (danger se < 0)
- Profissionais simulados

### 3. Premissas financeiras (card editável)

Inputs numéricos:

- Custo por assinante (R$) — hint: “Meta + infraestrutura alocada”
- Margem bruta-alvo (%) — hint: “Referência para o preço mínimo”
- Imposto efetivo (%) — hint: “Aplicado à receita bruta”
- Outros custos mensais (R$) — hint: “Contabilidade, equipe e marketing”

### 4. Carteira simulada (card)

- Input: número de profissionais
- Stats: receita média / profissional, custo médio / profissional, lucro médio / profissional
- Se otherMonthlyCosts > 0: ponto de equilíbrio em # profissionais

### 5. Planos e distribuição

Tabela editável:

| Plano | Assinantes (input) | Mensalidade (input) | Participação % (input) | Profissionais (calc) | Remover |

Ações:

- **Distribuir igualmente** → share = 100 / N
- **+ Adicionar plano** → novo plano com subscribers = last+50, price = last+50, share = 0
- Remover plano (desabilitado se só resta 1)
- Callout se soma ≠ 100%

### 6. Economia de cada plano

Tabela:

| Plano | Preço/aluno | Custo/profissional | Lucro bruto | Margem bruta | Imposto | Pós-impostos | Preço mínimo |

- Destacar linhas onde `grossMargin < targetMargin` (warning)
- Nota: preço mínimo ignora impostos

### 7. Gráficos

**A) Bar chart agrupado** — por plano:

- Mensalidade
- Custo de atendimento
- Resultado pós-impostos
- Eixos: X = capacidade do plano · Y = R$/profissional/mês

**B) Bar chart de margens** — por plano:

- Margem bruta do produto (%)
- Margem após impostos (%)
- Linha de referência = meta de margem
- Y de 0 a 100%

**C) Pie/donut** — destino de cada real faturado (só se lucro ≥ 0 e receita > 0):

- Custo de atendimento
- Impostos
- Outros custos
- Lucro líquido simplificado
- Filtrar fatias com value = 0
- Se deficitário: callout danger pedindo ajuste

**D) Line chart** — projeção por crescimento:

- Séries: Receita bruta · Lucro líquido simplificado
- Categorias: # profissionais em 25%/50%/100%/150%/200% do base
- Linha de referência em 0 (“Equilíbrio”)

### 8. Demonstrativo mensal (DRE simplificada)

Tabela em cascata com etapas listadas na seção contábil, mostrando Valor e % da receita.

### 9. Seção colapsável “Como as métricas são calculadas”

Explicar as 4 fórmulas principais + aviso da margem simplificada.

### 10. Rodapé

- Disclaimer gerencial
- Botão **Restaurar valores iniciais**

---

## Interações e UX

- Todos os inputs numéricos: mínimo 0; percentuais clamp 0–100
- Recalcular tudo em tempo real a cada mudança
- Formatação pt-BR: `Intl.NumberFormat` currency BRL e percentuais
- Persistir estado (localStorage keys sugeridas):
  - `mensaliza-plans-v1`
  - `mensaliza-cost-per-subscriber-v1`
  - `mensaliza-target-margin-v1`
  - `mensaliza-tax-rate-v1`
  - `mensaliza-other-costs-v1`
  - `mensaliza-professionals-v1`
- Layout responsivo: max-width ~1380px, grid auto-fit
- Visual: dashboard limpo, flat, sem gradients/emojis; tipografia clara; hierarquia forte nos KPIs
- Usar design system do backoffice (shadcn/Tailwind se existir). Não importar `cursor/canvas`.

---

## Arquitetura sugerida

Extrair lógica pura em módulo testável, separado da UI:

```ts
// lib/pricing-simulator.ts
export function computePlanMetrics(plan, assumptions) { ... }
export function computePortfolio(plans, assumptions, professionals) { ... }
export function computeProjection(plans, assumptions, professionals) { ... }
export function normalizeShares(plans) { ... }
```

A página/rota só orquestra estado + render.

---

## Referência do protótipo Cursor Canvas

Existe um protótipo interativo no workspace da landing:

`~/.cursor/projects/Users-rafapignataro-Documents-work-mensaliza-mensaliza-landing/canvases/painel-financeiro-mensaliza.canvas.tsx`

Esse arquivo usa a API `cursor/canvas` e **não pode ser importado** como tela do app. Reimplementar a lógica e a UI com a stack do backoffice, mantendo as fórmulas deste documento como fonte da verdade.

---

## O que NÃO fazer

- Não usar a planilha Google antiga como fonte das fórmulas de “Faturamento/Lucro Real/% Relativo” — elas estavam incorretas (misturavam preço mínimo teórico com faturamento).
- Não misturar imposto no custo por assinante.
- Não chamar a margem de “líquida” sem o qualificativo “simplificada”.
- Não assumir ocupação parcial: neste MVP a capacidade é 100%.
- Não criar markdown de documentação a menos que eu peça.

---

## Entrega

Implemente a tela completa no backoffice, com:

1. Módulo de cálculo puro + UI da página
2. Estados persistidos
3. Gráficos (Recharts, Chart.js, ou lib já usada no projeto)
4. Validação com os exemplos numéricos acima
5. UX polida e responsiva
