# Posts do blog

Cada arquivo `.mdx` desta pasta vira uma página em `/blog/<nome-do-arquivo>`. O nome do arquivo é o slug: use minúsculas, sem acento, separado por hífen e com a palavra-chave principal (ex.: `como-cobrar-mensalidade-de-alunos.mdx`).

Não é preciso registrar o post em lugar nenhum: listagem, sitemap, RSS e JSON-LD são gerados automaticamente no build.

## Estrutura mínima

```mdx
export const meta = {
  title: "Título com a palavra-chave (até ~60 caracteres)",
  // ogTitle: "Título curto para a imagem de compartilhamento",  // opcional
  description: "Resumo de 140–160 caracteres que aparece no Google e na listagem.",
  publishedAt: "2026-11-08",
  // updatedAt: "2026-12-01",  // ao revisar o conteúdo
  category: "cobranca", // cobranca | whatsapp | pix | gestao | profissoes
  tags: ["palavra-chave", "outra"],
  faq: [
    { question: "Pergunta real que o cliente faz?", answer: "Resposta direta em 1–3 frases." },
  ],
  // draft: true,  // aparece só em `pnpm dev`
};

Resposta direta à pergunta do título em 2–3 frases, antes de qualquer outra coisa.

## Primeira seção (vira item do índice)

Texto...
```

## Regras

- Não use `#` (h1) no corpo: o título já é o h1 da página. Use `##` para seções e `###` para subseções.
- Não crie uma seção "Perguntas frequentes" no corpo: use o campo `faq` do `meta`.
- Em texto corrido, `{` e `<` têm significado em MDX. Para placeholders use colchetes: `[Nome]`.
- Links internos começam com `/` (ex.: `/blog/outro-post`, `/#precos`).
- O CTA de demonstração já aparece no fim de todo post. Se quiser um no meio do texto, use `<BlogCta />`.

## Componentes disponíveis (sem import)

- `<MessageTemplate label="...">texto</MessageTemplate>`: balão de mensagem com botão "Copiar".
- `<Callout title="..." tone="tip | note">texto</Callout>`: destaque.
- `<DownloadButton href="/downloads/arquivo.xlsx" label="Baixar" meta="Excel · 70 KB" />`: botão de download (arquivos em `public/downloads/`).
- `<BlogCta title="..." description="..." />`: bloco de conversão.
- Tabelas em Markdown (GFM) funcionam normalmente.
