---
target: landing de professores de tênis e beach tennis
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\lucas_cortez\\Desktop\\projects\\mensaliza_landing\\src\\app\\professores-de-tenis\\page.tsx"
target_fingerprint: "sha256:856c059b37c9e29863bcfc4402843e44b6d39c8cf43fa2d122733c33e91e954e"
target_path: "C:\\Users\\lucas_cortez\\Desktop\\projects\\mensaliza_landing\\src\\app\\professores-de-tenis\\page.tsx"
timestamp: 2026-11-06T14-30-20Z
slug: src-app-professores-de-tenis-page-tsx
---
Method: dual-agent (A: f62ebed1-757f-4462-9a93-a820adbf330e · B: 1f3c3ea0-cdd9-4baf-af31-0f02925103dd)

## Design Health Score

Modo Persuade. Heurísticas 7 e 10 ficam de fora. Máximo aplicável: 32. **18/32 (56%) — Aceitável.**

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | O CTA abre o cadastro em outra aba; o que acontece depois só aparece num parágrafo de 14px. |
| 2 | Match System / Real World | 2 | O texto fala de quadra e aluno; a imagem é um dashboard genérico de “assinantes”. |
| 3 | User Control and Freedom | 3 | Logo, Entrar e a aba original são saídas reais. Falta ver o passo do cartão antes de entrar nele. |
| 4 | Consistency and Standards | 2 | O mesmo fluxo aparece como 01–03, Passo 1–4 e de novo 01–04. |
| 5 | Error Prevention | 2 | A barra móvel esconde o cartão obrigatório. “Dia de vencimento” parece qualquer dia. |
| 6 | Recognition Rather Than Recall | 2 | Cobrança, comprovante e aprovação são descritos e nunca mostrados. |
| 7 | Flexibility and Efficiency | n/a | Página de aquisição com um único caminho. |
| 8 | Aesthetic and Minimalist Design | 2 | O meio da página repete um loop. O laranja de 14px no botão e nos números fica abaixo do contraste AA. |
| 9 | Error Recovery | 3 | O FAQ responde as objeções certas, mas só depois do pedido de teste. |
| 10 | Help and Documentation | n/a | Superfície de persuasão. O FAQ entra na recuperação, não como central de ajuda. |
| **Total** | | **18/32** | **Aceitável** |

## Design Specificity Verdict

**Avaliação de design.** A página é um documento cuidadoso dentro de um molde de SaaS. Troque “quadra” por “estúdio” e o layout continua de pé: cards numerados, quatro colunas, checks laranja, uma faixa cinza e um print de admin. Beach tennis aparece na linha “Professores de tênis e beach tennis” e some. No celular, que é o aparelho do anúncio, a primeira tela é só texto. O título e a lista de dores são específicos. A composição não é.

**Varredura determinística.** O detector de código saiu limpo no bloqueio e marcou 1 aviso: `design-system-font-size` em `src/components/landing/tennis/tennis-product.tsx:38` (`text-[11px]` no rótulo `app.mensaliza.com`). Falso positivo: o DESIGN.md permite 11px em rótulo denso. No navegador, a sobreposição marcou contraste real e um aviso de fonte. O aviso “Geist em 48% do texto” também é falso positivo: Geist é a fonte de corpo documentada. O que o desenho não tinha nomeado, e o detector pegou, é contraste: branco `#ffffff` sobre `#fe5b0d` a 3,1:1 no botão “Começar meu teste grátis” (14px, peso 500, três vezes), e laranja sobre branco, `#f0f0f0` e `#fcfcfc` a 3,1:1, 2,7:1 e 3,0:1 nos números “01–04” e “Passo 1–4”. Texto normal precisa de 4,5:1. Não é texto grande.

**Sobreposição visual.** A injeção funcionou na aba de revisão. As marcas de contraste foram aplicadas nessa aba. O servidor da sobreposição (porta 8400) já foi encerrado.

## Overall Impression

O título acerta a acusação. O resto da página explica o Mensaliza em vez de fazê-lo acontecer. Um professor entre duas aulas não vê a cobrança saindo do número do Mensaliza, o comprovante voltando na mesma conversa, nem o clique de aprovar. O que fica na memória é o cartão, escrito no mesmo fôlego que “grátis”.

## What's Working

- O h1, “Você dá aula o dia inteiro. Por que ainda precisa cobrar seus alunos um por um?”, fala com quem dá aula o dia inteiro e segura no celular.
- A copy do mecanismo é mais rigorosa que a da home: o bot envia pelo WhatsApp do Mensaliza, não pelo do professor; o Pix vai para o professor; o Mensaliza não confirma o banco. Bordas chapadas, laranja `#FE5B0D` como único acento.
- A lista de dores é o único bloco autoral: “Interrupção na quadra” e “Comprovante perdido”. A barra móvel não duplica o botão enquanto o texto do teste está na tela.

## Priority Issues

**[P1] O produto é narrado e nunca encenado.**
Por que importa: o clique do Instagram tem poucos segundos para reconhecer “é o meu aluno, e não é o meu WhatsApp”. Um parágrafo não faz isso. A home já tem o fio do celular e o card de aprovar comprovante. Esta página, a que o anúncio compra, não tem nenhum dos dois.
Correção: tirar o diagrama da quadra do hero. No lugar, uma cena: o número do Mensaliza cobra, o aluno responde com foto ou PDF na mesma conversa, o professor aprova ou rejeita, e a linha do Pix continua “direto para você”. Reaproveitar o tempo das bolhas da home, não o roteiro. Não trazer “Pagar mensalidade”, “vence em 28/07”, “em breve confirmamos o pagamento” nem “pelo link”.
Comando sugerido: `/impeccable animate`

**[P1] O sim é pedido antes das duas restrições que mudam o sim.**
Por que importa: quem desconfia não começa um teste que soa como cobrança em branco no cartão. Quem cobra na quarta ou no dia 7 vai achar que a página mentiu. O produto só abre cobrança nos dias 1, 5, 10, 15, 20 e 25. A barra móvel, que é o botão que a pessoa aperta no meio da página, não repete o cartão.
Correção: três linhas curtas ao lado de todo botão de teste, inclusive a barra: “30 dias”, “cartão cadastrado, nada cobrado agora”, “cobrança automática na data que o cadastro mostra”. Não inventar preço. Dizer que o valor do plano aparece nessa mesma tela, antes de confirmar o cartão. No passo 1 e numa resposta do FAQ, nomear os seis dias. Em nenhum outro lugar inventar um dia de calendário.
Comando sugerido: `/impeccable clarify`

**[P1] O mesmo loop é contado quatro vezes, e o meio vira scroll.**
Por que importa: “Cobrança automática / Comprovantes / Aprovar”, depois Passo 1–4, depois Autorização / Cobrança / Comprovante / Aprovação, depois quatro checks de rotina. Quem entendeu o hero não aprende nada até o FAQ, e as objeções descem a página.
Correção: ficar com a cena do hero, a lista de dores, o FAQ e o CTA final. Cortar ou “Simples para você…” ou a sequência 01–04 debaixo do print. Uma sequência, mostrada uma vez.
Comando sugerido: `/impeccable distill`

**[P2] O celular do anúncio recebe um print de desktop e uma barra sobre a linha seguinte.**
Por que importa: a 390px a quadra some, o print do painel vira uma faixa de cerca de 200px, e “01 Autorização” começa debaixo da barra fixa. O rodapé tem respiro; o miolo não.
Correção: no celular, mostrar o fio do WhatsApp e uma linha de aprovação, não o chrome `app.mensaliza.com`. Dar à seção o mesmo respiro da barra.
Comando sugerido: `/impeccable adapt`

**[P2] O laranja do botão e dos números não passa contraste, e beach tennis é só uma palavra.**
Por que importa: o único botão da página está a 3,1:1. Os números do passo, a 14px, também. Beach tennis não tem uma cena que um professor dessa modalidade reconheça; o fio da quadra é um diagrama de duplas, só no desktop.
Correção: subir o texto do botão para um tamanho que o par branco/laranja sustente, ou escurecer o laranja só no texto pequeno. Uma frase laranja no hero, “Mais tempo na quadra.” A cena tem que ser legível nos dois esportes: o intervalo entre aulas, não um desenho de uma quadra só.
Comandos sugeridos: `/impeccable colorize` e `/impeccable bolder`

## Persona Red Flags

**Jordan, professor de primeira viagem.** A primeira tela diz “bot”, “autoriza” e “painel” sem mostrar nenhum. Depois a mesma história vem em 3 passos, em 4, e em 4 de novo. “Dia de vencimento” não tem exemplo. O teste é quatro regras num fôlego só. O rótulo do botão não diz que a próxima tela é um cadastro em outro site.

**Casey, no celular, entre uma aula e outra.** A primeira dobra é título e parágrafo. Sem movimento, sem conversa, sem comprovante. O print do painel não se lê com o braço esticado. A barra “Começar meu teste grátis” fica na zona do polegar, cobre a linha de baixo e não repete o cartão. O link abre `target="_blank"` para `app.mensaliza.com`, um segundo contexto dentro do navegador do Instagram.

**Riley, desconfiado de dinheiro e de WhatsApp.** “Pelo WhatsApp” no hero ainda pode ser o número do professor. “Não pelo seu” está um scroll abaixo, ou dentro do FAQ fechado. “O comprovante chega no painel” pode ser lido como página de upload. “Cobrada automaticamente” não mostra valor.

**Professor autônomo, entre uma aula e outra.** Tem menos de um minuto, a mão molhada e o próximo aluno esperando. Beach tennis é só o eyebrow. A página nunca mostra uma cobrança saindo enquanto ele continua na quadra. Se o dia que ele cobra não for 1, 5, 10, 15, 20 ou 25, a página já prometeu demais. Os “assinantes” do print não são a lista dele.

## Minor Observations

- O passo 02 é circular: “No dia de vencimento, a mensagem sai nas datas configuradas.”
- “Preciso cadastrar um cartão de crédito?” e “Como funciona o período de teste?” repetem o mesmo parágrafo.
- O rodapé quebra a voz: “O Pix vai direto para o professor”, depois de uma página que diz “você”.
- O print diz “Assinantes” e “Novo assinante”; a página diz “alunos”.
- No desktop, as seções curtas deixam uma faixa branca longa. O vazio parece inacabado, não calmo.
- Lexend nos títulos e Geist no corpo estão corretos. O problema é a hierarquia, não a fonte.

## Questions to Consider

- Se esse professor tem quarenta segundos entre alunos, qual imagem em movimento torna “Começar meu teste grátis” óbvio, e por que essa imagem hoje é um desenho de quadra?
- O que sobra da página se os seis dias de vencimento e os três fatos do teste ficam ao lado do botão, e toda seção que repete “o bot envia, o aluno manda, você aprova” sai?
- Tênis e beach tennis compartilham a dor, não a foto. O que faria um professor de beach tennis parar e dizer “essa é a minha quadra”, sem uma segunda história de produto?
