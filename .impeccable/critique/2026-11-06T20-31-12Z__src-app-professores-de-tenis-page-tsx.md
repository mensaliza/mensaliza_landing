---
target: landing de professores de tênis e beach tennis
total_score: 24
max_score: 32
na_heuristics: 7,9
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\lucas_cortez\\Desktop\\projects\\mensaliza_landing\\src\\app\\professores-de-tenis\\page.tsx"
target_fingerprint: "sha256:29660bc68afc6aba19113d59b430727b485488477510ec39b25cc961a8749672"
target_path: "C:\\Users\\lucas_cortez\\Desktop\\projects\\mensaliza_landing\\src\\app\\professores-de-tenis\\page.tsx"
timestamp: 2026-11-06T20-31-12Z
slug: src-app-professores-de-tenis-page-tsx
---
Method: dual-agent (A: 4c288e35-cb61-42c1-98d3-7d78169710d5 · B: 897f86c4-9a28-4eab-86ee-900354763888)

## Design Health Score

| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Visibilidade do status | 3 | A cena anuncia a fase e volta ao início. “Aprovado por você” segura cerca de 10 s. |
| 2 | Correspondência com o mundo real | 4 | Quadra, aula, mensalidade, Pix e comprovante estão na ordem do dia do professor. |
| 3 | Controle e liberdade | 3 | Logo, Entrar e o cadastro em nova aba deixam a página no lugar. No celular o teste fica abaixo da dobra. |
| 4 | Consistência e padrões | 3 | O mesmo CTA e a mesma frase do teste. “01” e “Passo 1” convivem. |
| 5 | Prevenção de erro | 3 | A nota do cartão está junto dos CTAs do hero e do final. Os dias 1, 5, 10, 15, 20 e 25 não aparecem. |
| 6 | Reconhecimento em vez de memória | 3 | O fluxo está na cena, nos passos e no FAQ. A data da cobrança fica para o cadastro. |
| 7 | Flexibilidade e eficiência | n/a | Landing de anúncio: um caminho basta. |
| 8 | Estética e minimalismo | 2 | Cada seção é calma. O mesmo ciclo ocupa cards, passos, fluxo 01–04 e benefícios. |
| 9 | Recuperação de erro | n/a | Esta superfície não tem formulário nem estado de erro. |
| 10 | Ajuda e documentação | 3 | Sete perguntas cobrem WhatsApp, autorização, comprovante, banco, cartão e teste. |
| **Total** | | **24/32** | **Bom (75%)** |

## Design Specificity Verdict

**Avaliação de design.** A página é escrita para quem dá aula: eyebrow, headline da quadra, cinco dores de intervalo e a cena da Ana com R$ 280,00 e vencimento 05/11. A estrutura ainda é a de um SaaS genérico. Trocar “tênis” por outra mensalidade preservaria cards, passos, print, benefícios, FAQ e CTA. O que não se troca é a lista de dores e a cena do comprovante.

**Varredura determinística.** O CLI saiu 0, com 1 advisory: `design-system-font-size` em `src/components/landing/tennis/tennis-product.tsx:38` (`text-[11px]` no rótulo `app.mensaliza.com`). O overlay no browser encontrou 9 anti-padrões: `low-contrast` 6, `overused-font` 1, `nested-cards` 2.

O detector mediu o que a leitura visual não promoveu a prioridade. Branco em `#FE5B0D` nos três botões “Começar meu teste grátis” está em 3,1:1 (texto de 14 px, peso 500). Os números laranja medem 2,8:1 no selo “01” (`bg-primary/10`), 2,7:1 em “Passo 1” e 3,0:1 no “01” debaixo do print. Texto normal precisa de 4,5:1. O par branco/laranja é o botão da marca e o DESIGN.md não abre exceção. O conserto fica dentro do laranja: fundo mais escuro até o branco passar, ou rótulo em tinta `#121212`.

Falsos positivos: Geist a 52% é a regra de corpo. Os 11 px do endereço no mock são o piso de rótulo denso. Os dois `nested-cards` são a bolha da cobrança e a bolha do comprovante, o par que a cena precisa para mostrar a resposta na mesma conversa.

**Overlays.** A injeção de `detect.js` funcionou numa aba nova, na porta 8400. O console registrou `[impeccable] 9 anti-patterns found`. O live-server foi encerrado com `--keep-inject`. A aba não foi renomeada para [Human]. Se ela ainda estiver aberta, os realces continuam nela.

## Overall Impression

A página agora representa o produto e fala de quadra. No desktop a headline, a cena aprovada e o botão cabem juntos. No celular de 390×844 o primeiro ecrã é título e cena cortada: o botão do teste está em y=1088 e a barra some enquanto a cena está visível. A maior oportunidade é dar uma ação nesse primeiro ecrã e parar de contar o mesmo fluxo quatro vezes.

## What's Working

- As cinco dores nomeiam o intervalo: “Mensagem um a um”, “Comprovante perdido”, “Quem já pagou”, “Interrupção na quadra”, “Atraso”, cada uma com um ícone no selo laranja.
- A verdade do produto está na legenda da cena, no card “Aprovar ou rejeitar” e no FAQ: o Pix vai para o professor e o Mensaliza não confirma o banco. Sem link de pagamento, “Pagar agora”, checkout ou boleto.
- “Começar meu teste grátis” e a frase dos 30 dias são as mesmas no hero e no CTA final. No desktop os dois cabem no primeiro ecrã. A cena volta para “O Mensaliza cobra” depois de cerca de 10 s em “Aprovado por você”.

## Priority Issues

**[P1] O teste não existe no primeiro ecrã do celular**
- **Why it matters:** O botão do hero começa em y=1088 numa viewport de 844. O header esconde o CTA abaixo de `sm`. A barra só aparece quando a cena e as notas de teste saem da tela, então a cena visível suprime a barra exatamente quando o botão está fora. Quem chega do Instagram não tem ação, nem a frase do cartão.
- **Fix:** Mostrar a barra quando o botão do hero sair da viewport. Encurtar a cena no celular até caberem o botão e a nota do cartão.
- **Suggested command:** $impeccable layout

**[P1] O mesmo fluxo ocupa quatro seções**
- **Why it matters:** Cards “Cobrança automática / Comprovantes / Aprovar ou rejeitar”, “Passo 1–4”, o fluxo “01 Autorização” a “04 Aprovação” e os quatro benefícios dizem a mesma coisa. A professora no intervalo não chega ao FAQ, onde estão as objeções.
- **Fix:** Ficar com dores, cena, uma sequência de passos, o painel, o FAQ e o CTA.
- **Suggested command:** $impeccable distill

**[P2] A última linha encosta na barra**
- **Why it matters:** Em 390 px o scroller termina em y=775 e a barra ocupa 775–844. O corpo de “Interrupção na quadra”, o card 02, o Passo 3 e o item 03 somem na borda do botão.
- **Fix:** Um respiro no fim do conteúdo rolável, para a última linha parar acima da barra.
- **Suggested command:** $impeccable layout

**[P2] O vencimento parece um dia qualquer**
- **Why it matters:** “Dia de vencimento” e “nas datas configuradas” aparecem no card 01, no Passo 1 e em “Vencimentos programados”. Quem cobra no dia 7 só descobre a restrição no cadastro.
- **Fix:** Uma linha junto do primeiro “dia de vencimento”: os dias são 1, 5, 10, 15, 20 e 25. Não inventar preço.
- **Suggested command:** $impeccable clarify

**[P2] O contraste do laranja falha em texto normal**
- **Why it matters:** Branco em `#FE5B0D` mede 3,1:1 nos botões. Os números laranja medem 2,7:1 a 3,0:1. No sol da quadra o rótulo do único botão perde leitura.
- **Fix:** Escurecer o preenchimento do botão até o branco passar de 4,5:1, ou usar tinta `#121212` no rótulo. Não introduzir uma segunda cor.
- **Suggested command:** $impeccable colorize

## Persona Red Flags

**Jordan (primeira vez).** No card “Cobrança automática” ela lê que o bot envia a cobrança antes de chegar em “o Mensaliza não confirma o pagamento no banco”. No celular o primeiro ecrã não tem botão nem a frase do cartão.

**Riley (stress tester).** “Dia de vencimento” não combina com a restrição real dos dias. Aprovar e Rejeitar na cena têm cara de botão e não são botões. O estado aprovado segura cerca de 10 s e só então volta.

**Casey (celular, entre uma coisa e outra).** Entrar fica no topo. O CTA do header não existe neste breakpoint. A barra, quando aparece, corta a última linha. O print do painel vira uma miniatura ilegível.

**Marina (professora entre aulas).** Ela reconhece “Interrupção na quadra” e para. A página pede que ela atravesse cards, passos, fluxo e benefícios antes do FAQ. O vencimento 05/11 não avisa que o dia 7 não existe no produto. No celular a frase “O Pix vai direto para você” fica abaixo da dobra, junto com o botão.

## Minor Observations

- No comprovante da cena, “R$ 280,00” quebra e aparece como “R$ 280, 00”.
- A rotina diz “lembrete” uma vez. O resto da página diz “cobrança”.
- No CTA final, o header sticky pode cortar o topo de “Passe menos tempo cobrando”.
- A pílula “Issues” do Next é overlay do servidor local e esconde o começo do botão da barra.
- O print do painel, no desktop, mostra “Assinantes críticos” e nomes que não são de quadra. No celular não se lê.

## Questions to Consider

- Se ela só tem o intervalo, qual das quatro versões do fluxo ela precisa ver?
- No celular, a cena da Ana vale o primeiro ecrã inteiro, no lugar do botão e da frase do cartão?
- O que acontece com quem cobra no dia 7, se a página fala em “dia de vencimento” e nunca lista 1, 5, 10, 15, 20 e 25?
