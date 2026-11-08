---
target: landing de professores de tênis e beach tennis
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\lucas_cortez\\Desktop\\projects\\mensaliza_landing\\src\\app\\professores-de-tenis\\page.tsx"
target_fingerprint: "sha256:856c059b37c9e29863bcfc4402843e44b6d39c8cf43fa2d122733c33e91e954e"
target_path: "C:\\Users\\lucas_cortez\\Desktop\\projects\\mensaliza_landing\\src\\app\\professores-de-tenis\\page.tsx"
timestamp: 2026-11-06T15-49-29Z
slug: src-app-professores-de-tenis-page-tsx
---
Method: dual-agent (A: 07440752-9a74-455b-bc03-3a36bb7d7335 · B: 2952e16e-dffc-4bb3-8f72-80265672e258)

## Design Health Score

| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Visibilidade do status | 3 | A cena anuncia a fase e segura “Aprovado por você”, sem replay enquanto está na tela. |
| 2 | Correspondência com o mundo real | 3 | O texto é de quadra e comprovante. Os dias 1, 5, 10, 15, 20 e 25 não aparecem. |
| 3 | Controle e liberdade | 3 | Logo, Entrar e FAQ funcionam. Não há âncoras numa página de cerca de 8900 px. |
| 4 | Consistência e padrões | 3 | O mesmo fluxo muda de 01–03 para Passo 1–4 e volta a 01–04. O print traz outras cores. |
| 5 | Prevenção de erro | 2 | A frase do cartão está no hero, no CTA final e no FAQ. Header e barra dizem só “teste grátis”. |
| 6 | Reconhecimento em vez de memória | 3 | O mecanismo está na cena e nas seções. No celular o print do painel não se lê. |
| 7 | Flexibilidade e eficiência | n/a | Landing de anúncio: um caminho basta. |
| 8 | Estética e minimalismo | 3 | Cada seção é calma. A história se repete até o FAQ ficar longe. |
| 9 | Recuperação de erro | 2 | O FAQ responde em português claro. No celular a resposta do cartão nasce sob a barra. |
| 10 | Ajuda e documentação | 3 | Sete perguntas cobrem as objeções reais, no fim de um scroll longo. |
| **Total** | | **25/36** | **Aceitável (69%)** |

## Design Specificity Verdict

**Avaliação de design.** A página fala com quem perde o intervalo entre aulas. O que é de tênis está na cópia: “Professores de tênis e beach tennis”, “Mais tempo na quadra”, “Interrupção na quadra”. A composição é o sistema compartilhado: canvas claro, Lexend, um laranja, cartões de borda reta, cena de chat e um print genérico do painel. Troque “quadra” por “consultório” e o hero, os cartões, os passos e o dashboard continuam de pé. Beach tennis fica na sobrancelha. A cena é a Ana, R$ 280,00 e o vencimento 05/11, sem aula nem quadra.

**Varredura determinística.** O CLI saiu 0, com 1 advisory: `design-system-font-size` em `src/components/landing/tennis/tennis-product.tsx:38` (`text-[11px]` no rótulo `app.mensaliza.com`). O overlay no browser encontrou 9 anti-padrões: `low-contrast` 6, `overused-font` 1, `nested-cards` 2.

O que o detector pegou e a leitura visual não promoveu a prioridade: branco em `#FE5B0D` a 3,1:1 nos botões “Começar meu teste grátis”, e números laranja em mono a 2,7–3,1:1 (precisam de 4,5:1 em texto normal). O par branco/laranja é o botão da marca. Não é falso positivo de contraste, e também não autoriza uma segunda cor. O conserto fica dentro do laranja: fundo mais escuro até o branco passar, ou rótulo em tinta sobre o laranja.

Falsos positivos: Geist a 52% é a regra de corpo. Os 11 px do endereço no mock são o piso de rótulo denso do DESIGN.md, com `sm:text-xs` acima disso. `nested-cards` não é falso positivo: o comprovante dentro do balão e o cartão interno da cena são cartão dentro de cartão. Aqui o aninhamento é a metáfora do produto (foto do comprovante na mesma conversa), não decoração. Fica como observação, não como P1.

**Overlays.** A injeção de `detect.js` funcionou numa aba nova, na porta 8400. O console registrou `[impeccable] 9 anti-patterns found`, com as seis falhas de contraste, Geist e os dois cartões aninhados. O live-server foi encerrado com `--keep-inject`. A aba não foi renomeada para [Human]. Se ela ainda estiver aberta, os realces continuam nela.

## Overall Impression

A cena do hero finalmente representa o produto: cobrança do bot, comprovante na mesma conversa, aprovação, Pix que fica com o professor. O resto da página ainda é um documento SaaS longo, e no celular a barra de conversão apaga a linha que a pessoa está lendo. A maior oportunidade é fazer o botão fácil carregar a verdade do cartão e parar de recontar o fluxo que a cena já mostrou.

## What's Working

- A cena conta o fluxo verdadeiro num artefato só: mensagem do Mensaliza para a Ana, comprovante às 10:04, “Aprovado por você”, e a legenda de que o Mensaliza não confirma o pagamento no banco. Sem verde de WhatsApp e sem “Pagar agora”.
- A condição do teste está correta no hero, no CTA final e nas perguntas do cartão e do período: 30 dias, cartão obrigatório, nada agora, cobrança na data que o cadastro mostrar. Não há preço inventado.
- A lista de dor é específica e sem tom de cobrador: “Mensagem um a um”, “Comprovante perdido”, “Interrupção na quadra”.

## Priority Issues

**[P1] A barra fixa cobre o texto no celular**
- **Why it matters:** O toque de conversão apaga a linha que a pessoa lia. A resposta de “Preciso cadastrar um cartão de crédito?” nasce escondida. “Parar a aula para resolver uma dúvida de pagamento.” ficou debaixo da barra de 69 px. “Passo 3”, “Comprovantes no painel” e “Autorização” encostam nela.
- **Fix:** Reserve no conteúdo um padding inferior igual à barra. Ao abrir um item do FAQ, role a resposta para acima da barra.
- **Suggested command:** $impeccable layout

**[P1] O botão que a pessoa aperta não carrega a frase do cartão**
- **Why it matters:** “Começar meu teste grátis” no header (desktop) e na barra (celular) não diz que o cartão é obrigatório e que nada é cobrado agora. A frase completa está no parágrafo mais quieto da página, depois do clique possível.
- **Fix:** Uma linha na barra e sob o botão do header: “Nada é cobrado agora. O cartão entra só no cadastro.” Mantenha o parágrafo completo no hero e no CTA final. Num lugar só, junto do primeiro “dia de vencimento”, diga que os vencimentos caem em 1, 5, 10, 15, 20 ou 25. Não invente preço.
- **Suggested command:** $impeccable clarify

**[P1] A mesma história é contada quatro vezes depois do hero**
- **Why it matters:** Solução, “Simples para você”, o fluxo 01–04 debaixo do print e os quatro benefícios repetem autorização, cobrança, comprovante e aprovação. A página passa de 8900 px. Quem chegou de um anúncio no intervalo não chega ao FAQ, onde estão as objeções.
- **Fix:** Fique com a cena do hero, a lista de dor, um bloco de passos, o FAQ e o CTA final. O print ilustra o último passo. Não reexplique o fluxo embaixo dele.
- **Suggested command:** $impeccable distill

**[P2] O print do painel é outro produto, e no celular não se lê**
- **Why it matters:** No desktop aparece “Assinantes críticos”, pontos vermelhos, “Pagamento rejeitado” e um donut verde, âmbar e rosa. No celular a mesma imagem vira uma faixa. Os nomes não são de quadra. A maior prova visual desfaz o tom de alívio e fura o acento único.
- **Fix:** Troque por um recorte da fila de comprovante, na escala da cena da Ana, vencimento dia 05, sem o gráfico colorido e sem “críticos”.
- **Suggested command:** $impeccable quieter

**[P2] O contraste do botão laranja falha AA em texto normal**
- **Why it matters:** O detector mediu 3,1:1 de branco em `#FE5B0D` nos três botões de teste, e 2,7–3,1:1 nos números laranja. Quem lê no sol da quadra perde o rótulo do único botão que importa.
- **Fix:** Escureça o preenchimento do botão até o branco passar de 4,5:1, ou use tinta `#121212` no rótulo. Não introduza uma segunda cor.
- **Suggested command:** $impeccable colorize

## Persona Red Flags

**Jordan (primeira vez).** A manchete é uma pergunta, não o próximo passo. No celular de 390×844 o botão do hero fica abaixo da dobra. “Bot” entra sem uma definição de uma linha. Se a resposta do cartão abre sob a barra, o clique parece não ter feito nada.

**Riley (stress tester).** O header oferece o teste sem a frase que o hero e o FAQ exigem. A cena não recomeça enquanto está visível. “Cobrança automática” convive, nos títulos, com “só depois que o aluno autoriza” e com “não confirma no banco”. O calendário do print mostra um mês inteiro, enquanto o texto não restringe o dia.

**Casey (celular, entre uma coisa e outra).** A primeira tela é título e o topo do chat. A barra, quando aparece, está na zona do polegar e cobre a última linha. O print não se lê. A condição do teste são quatro linhas cinza fáceis de pular.

**Marina (professora de beach tennis entre aulas).** Ela precisa saber, em segundos, que a mensagem não sai do WhatsApp dela. Isso está no FAQ, não na primeira tela. “Beach tennis” fica na sobrancelha. O item que é dela, “Interrupção na quadra”, teve o corpo coberto pela barra.

## Minor Observations

- O header desta página é barra sólida o tempo todo. O sistema da home descreve header transparente no topo.
- A numeração muda de “01” para “Passo 1” e volta para “01”.
- O corpo do CTA final, “Organize as cobranças dos seus alunos…”, é mais genérico do que a manchete da quadra.
- O componente de linhas de quadra existe na pasta e não aparece na página.
- O rodapé tem e-mail, WhatsApp de suporte, termos e privacidade, com alvos de toque altos.
- O selo “Issues” do Next é overlay do servidor local, não da página.

## Questions to Consider

- Se a cena já mostra cobrança, comprovante e aprovação, o que as três listas seguintes ensinam que a cena não mostrou?
- O botão do intervalo pode dizer “teste grátis” sem a frase do cartão ao lado?
- O que mudaria se a aluna fosse de beach tennis às 7h, e não a Ana de uma mensalidade genérica?
