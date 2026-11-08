import { formatCurrencyFromCents } from "@/lib/format-currency";
import { pricingTiers } from "@/lib/landing-content";
import { SUPPORT_EMAIL, SUPPORT_WHATSAPP_DISPLAY } from "@/lib/site-urls";

function requirePricedTier(id: "essential" | "business" | "scale") {
  const tier = pricingTiers.find((item) => item.id === id);
  if (
    !tier ||
    tier.priceMonthly == null ||
    tier.priceYearly == null ||
    tier.maxSubscribers == null
  ) {
    throw new Error(`Plano ${id} sem preço ou limite de alunos.`);
  }

  return {
    name: tier.name,
    priceMonthly: tier.priceMonthly,
    priceYearly: tier.priceYearly,
    maxSubscribers: tier.maxSubscribers,
  };
}

const essentialTier = requirePricedTier("essential");
const businessTier = requirePricedTier("business");
const scaleTier = requirePricedTier("scale");

export const tennisPlan = {
  slug: "essential" as const,
  interval: "monthly" as const,
  name: essentialTier.name,
  monthlyLabel: formatCurrencyFromCents(essentialTier.priceMonthly),
  yearlyLabel: formatCurrencyFromCents(essentialTier.priceYearly),
  maxSubscribers: essentialTier.maxSubscribers,
};

export const tennisCtaLabel = "Começar meu teste grátis" as const;

export const tennisTrialFacts = [
  "14 dias grátis. Nada é cobrado hoje.",
  `Precisa de cartão. Depois do teste, ${tennisPlan.monthlyLabel}/mês no plano ${tennisPlan.name}, cobrado na data mostrada no cadastro.`,
  "Cancele antes pelo suporte e você não paga nada.",
] as const;

export const tennisHero = {
  eyebrow: "Professores de tênis e beach tennis",
  headline:
    "Você dá aula o dia inteiro. Por que ainda precisa cobrar seus alunos um por um?",
  subheadline:
    "Depois que o aluno autoriza, o bot do Mensaliza cobra pelo WhatsApp, recebe o comprovante na mesma conversa e você só aprova. O Pix vai direto para você.",
  support: "Menos tempo cobrando. Mais tempo na quadra.",
  ctaLabel: tennisCtaLabel,
} as const;

export const tennisPain = {
  title: "Sua rotina já é corrida demais para ficar cobrando mensalidade.",
  lead: "A aula ocupa o dia. A cobrança, quando fica na mão, aparece no intervalo e no meio da quadra.",
  situations: [
    {
      id: "one-by-one",
      title: "Mensagem um a um",
      body: "Lembrar cada aluno de pagar, entre uma aula e outra.",
    },
    {
      id: "lost-receipt",
      title: "Comprovante perdido",
      body: "Procurar um print antigo no WhatsApp para saber se aquele Pix chegou.",
    },
    {
      id: "who-paid",
      title: "Quem já pagou",
      body: "Conferir, de cabeça ou na conversa, quem está em dia e quem ainda está pendente.",
    },
    {
      id: "court",
      title: "Interrupção na quadra",
      body: "Parar a aula para resolver uma dúvida de pagamento.",
    },
    {
      id: "late",
      title: "Atraso",
      body: "Lembrar de cobrar de novo quando o vencimento passa e o comprovante não chega.",
    },
  ],
  closing:
    "Você não precisa transformar sua rotina de aulas em uma rotina de cobranças manuais.",
} as const;

export const tennisHowItWorks = {
  title: "Como o Mensaliza cobra por você.",
  lead: "Do cadastro à aprovação do comprovante, em quatro passos.",
  steps: [
    {
      title: "Cadastre o aluno uma vez",
      description:
        "Nome, WhatsApp, valor e o dia da cobrança: 1, 5, 10, 15, 20 ou 25.",
    },
    {
      title: "O aluno autoriza o bot",
      description:
        "Você envia o convite pelo painel. Sem o sim do aluno, nenhuma cobrança automática é enviada.",
    },
    {
      title: "O bot cobra no dia",
      description:
        "A mensagem sai pelo WhatsApp do Mensaliza, não pelo seu, e se repete todo mês na data configurada.",
    },
    {
      title: "O comprovante chega e você aprova",
      description:
        "O aluno manda a foto ou o PDF nessa mesma conversa. Se você rejeitar, ele recebe um aviso para reenviar.",
    },
  ],
  closing:
    "O Pix vai direto para você. O Mensaliza não recebe nem confirma o pagamento no banco.",
} as const;

export const tennisProduct = {
  title: "Veja quem pagou sem abrir nenhuma conversa.",
  lead: "A lista mostra o status de cada aluno. O comprovante fica ligado a ele, e a cobrança se repete no dia combinado.",
  points: [
    {
      id: "status",
      title: "Status de cada aluno",
      body: "Dá para ver quem está em dia, quem está em aberto, quem atrasou e quem já mandou comprovante.",
    },
    {
      id: "receipt",
      title: "Comprovante ligado ao aluno",
      body: "A foto ou o PDF fica no painel, em vez de se perder no seu WhatsApp.",
    },
    {
      id: "repeat",
      title: "Cobrança que se repete",
      body: "No dia combinado, o bot envia de novo. Você não monta a lista de mensagens.",
    },
  ],
} as const;

export type TennisTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  location?: string;
  photo?: { src: string; alt: string };
  /** Exemplo de interface. Não aparece quando VERCEL_ENV é production. */
  placeholder?: true;
};

/**
 * Itens com `placeholder: true` são exemplos de interface.
 * Eles só aparecem fora de produção. Para publicar um depoimento real,
 * troque o texto e apague `placeholder`.
 */
export const tennisTestimonials = {
  title: "Professores que já cobram com o Mensaliza.",
  lead: "Menos cobrança no intervalo. O comprovante fica no painel.",
  items: [
    {
      id: "marina",
      quote:
        "Eu parava a aula para lembrar quem estava devendo. Agora o bot cobra, e o comprovante aparece no painel.",
      name: "Marina Alves",
      role: "Professora de tênis",
      location: "Campinas, SP",
      placeholder: true,
    },
    {
      id: "rafael",
      quote:
        "Antes eu procurava o print no meio da conversa. Hoje eu abro a lista e vejo quem já pagou.",
      name: "Rafael Nunes",
      role: "Professor de beach tennis",
      location: "Santos, SP",
      placeholder: true,
    },
    {
      id: "camila",
      quote:
        "Cadastrei a turma uma vez. No dia 10 a cobrança sai sozinha, e o Pix continua caindo na minha conta.",
      name: "Camila Rocha",
      role: "Professora de tênis e beach tennis",
      location: "Ribeirão Preto, SP",
      placeholder: true,
    },
  ] satisfies TennisTestimonial[],
} as const;

export const tennisPricing = {
  title: "14 dias para testar com a sua turma.",
  lead: `O plano ${tennisPlan.name} é o que inclui cobrança e comprovante pelo WhatsApp.`,
  feature: `Cobrança automática e comprovantes pelo WhatsApp para até ${tennisPlan.maxSubscribers} alunos.`,
  yearlyNote: `ou ${tennisPlan.yearlyLabel}/mês no anual`,
  moreStudents: `Mais de ${tennisPlan.maxSubscribers} alunos? Os planos ${businessTier.name} (${businessTier.maxSubscribers}) e ${scaleTier.name} (${scaleTier.maxSubscribers}) aparecem no cadastro.`,
} as const;

export const tennisFaq = {
  title: "Perguntas frequentes",
  items: [
    {
      question: "As cobranças saem do meu WhatsApp pessoal?",
      answer:
        "Não. As mensagens saem pelo WhatsApp do Mensaliza, depois que o aluno autoriza. Nada sai do seu WhatsApp pessoal.",
    },
    {
      question: "Meu aluno precisa baixar algum app?",
      answer:
        "Não. Ele recebe a cobrança no WhatsApp que já usa e responde nessa mesma conversa com a foto ou o PDF do comprovante. Não precisa criar conta nem instalar nada.",
    },
    {
      question: "Meus alunos já me pagam por Pix na hora. Ainda faz sentido?",
      answer:
        "Sim, se a cobrança ainda depende de você lembrar e de procurar o comprovante depois. O aluno continua pagando o Pix direto para você. O Mensaliza envia o lembrete e guarda o comprovante no painel.",
    },
    {
      question: "Preciso cadastrar cada aluno?",
      answer:
        "Sim, uma vez. Você informa o nome, o WhatsApp, o valor e o dia da cobrança: 1, 5, 10, 15, 20 ou 25.",
    },
    {
      question: "O aluno precisa autorizar as mensagens?",
      answer:
        "Sim. O bot pede autorização no WhatsApp. Sem o sim do aluno, nenhuma cobrança automática é enviada.",
    },
    {
      question: "E se o comprovante vier errado?",
      answer:
        "Você rejeita no painel e o aluno recebe um aviso para enviar de novo. O Mensaliza não confirma o pagamento no banco. A decisão continua sua.",
    },
    {
      question: "O Mensaliza confirma o pagamento no banco?",
      answer:
        "Não. O Pix é pago a você. O Mensaliza não recebe esse valor e não consulta o banco. Você aprova ou rejeita o comprovante no painel.",
    },
    {
      question: "Quanto custa depois do teste?",
      answer: `O plano ${tennisPlan.name} custa ${tennisPlan.monthlyLabel}/mês, ou ${tennisPlan.yearlyLabel}/mês no anual. Ele inclui cobrança automática e comprovantes pelo WhatsApp para até ${tennisPlan.maxSubscribers} alunos.`,
    },
    {
      question: "Como funciona o teste e como cancelo?",
      answer: `São 14 dias grátis. É preciso cadastrar um cartão, e nada é cobrado hoje. A cobrança começa na data mostrada no cadastro. Se cancelar antes pelo e-mail ${SUPPORT_EMAIL} ou pelo WhatsApp ${SUPPORT_WHATSAPP_DISPLAY}, você não paga nada.`,
    },
  ],
} as const;

export const tennisFinalCta = {
  title: "Passe menos tempo cobrando. Aproveite mais tempo na quadra.",
  body: "Organize as cobranças dos seus alunos e acompanhe os comprovantes pelo Mensaliza.",
  ctaLabel: tennisCtaLabel,
  supportLabel: "Tirar dúvida no WhatsApp",
} as const;
