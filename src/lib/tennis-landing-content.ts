/**
 * Copy for /professores-de-tenis. The page reuses the home sections as they are; only the words
 * (and the example in the demos) change, so a teacher reads "aluno" and sees tennis prices.
 *
 * Product facts must match the app: billing days are 1, 5, 10, 15, 20 or 25
 * (`PAYMENT_DAYS` in mensaliza-app), and the trial terms come from `landing-content`.
 */
import type { CtaContent } from "@/components/landing/cta-section";
import type { FaqContent } from "@/components/landing/faq-section";
import type { FeaturesContent } from "@/components/landing/features-section";
import type { HowItWorksContent } from "@/components/landing/how-it-works-section";
import type { ReliefContent } from "@/components/landing/relief-section";
import type { PanelMonth } from "@/components/landing/whatsapp-demo/panel-card";
import type { Conversation } from "@/components/landing/whatsapp-demo/whatsapp-messages";
import {
  SUPPORT_EMAIL,
  SUPPORT_WHATSAPP_DISPLAY,
  TRIAL_DAYS,
  features,
  pricingTiers,
  studentSteps,
} from "@/lib/landing-content";

export const TENNIS_LANDING_PATH = "/professores-de-tenis" as const;

/** Plan the sign-up buttons preselect: the first one that charges on WhatsApp. */
export const TENNIS_DEFAULT_PLAN = "essential" as const;

const essential = pricingTiers.find((tier) => tier.id === "essential");
const basic = pricingTiers.find((tier) => tier.id === "basic");
if (!essential?.priceMonthly || !basic?.priceMonthly) {
  throw new Error("Planos Essential e Basic precisam de preço.");
}
const reais = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

export const tennisNavLinks = [
  { label: "Como funciona", href: `${TENNIS_LANDING_PATH}#como-funciona` },
  { label: "Painel", href: `${TENNIS_LANDING_PATH}#funcionalidades` },
  { label: "Preços", href: `${TENNIS_LANDING_PATH}#precos` },
  { label: "Dúvidas", href: `${TENNIS_LANDING_PATH}#faq` },
] as const;

export const tennisFooterTagline =
  "Cobrança de mensalidade no WhatsApp para professores de tênis e beach tennis. O Pix cai direto na sua conta.";

export const tennisHero = {
  eyebrow: "Para professores de tênis e beach tennis",
  headline: "Você dá aula. O Mensaliza cobra seus alunos.",
  subheadline:
    "No dia combinado, o Mensaliza manda a cobrança no WhatsApp de cada aluno. Ele paga no Pix, direto na sua conta, e manda o comprovante na mesma conversa.",
} as const;

/** The same chat as the home, with a tennis teacher and a tennis monthly fee. */
export const tennisConversation: Conversation = {
  providerName: "Lucas Tênis",
  subscriberName: "Ana",
  value: "R$ 280,00",
  dueDate: "dia 5",
};

/** 20 students at R$ 280: Ana's payment takes the month from 70% to 75%. */
export const tennisMonth: PanelMonth = {
  subscriberName: "Ana",
  amount: 280,
  receivedBefore: 3920,
  expected: 5600,
};

export const tennisRelief: ReliefContent = {
  title: "Para quem dá aula e ainda cobra a mensalidade na mão",
  professions: [
    "Aula particular de tênis",
    "Beach tennis",
    "Turma de adultos",
    "Escolinha infantil",
    "Clínica de tênis",
    "Aula em arena",
    "Aula em clube",
    "Aula em condomínio",
    "Treino de competição",
    "Aula em dupla",
  ],
  audienceLine:
    "Para professores de tênis e beach tennis que dão aula particular, em dupla ou em turma, em clube, arena ou condomínio.",
  painPoints: [
    {
      before: "Parar a aula para responder se o Pix daquele aluno chegou.",
      after: "A cobrança e o comprovante ficam na conversa do aluno com o Mensaliza, longe da quadra.",
    },
    {
      before: "Procurar o print do Pix no meio das conversas para saber quem pagou.",
      after: "O comprovante chega organizado no painel. Você confere e confirma.",
    },
    {
      before: 'Mandar "e aí, tudo certo com a mensalidade?" para cada aluno, todo mês.',
      after: "No dia combinado, o Mensaliza manda a cobrança no WhatsApp por você.",
    },
  ],
};

export const tennisHowItWorks: HowItWorksContent = {
  title: "Pronto em três passos",
  description: "Depois disso, a cobrança da turma sai sozinha todo mês.",
  steps: [
    {
      title: "Cadastre seus alunos",
      description:
        "Nome, WhatsApp, valor e o dia da cobrança: 1, 5, 10, 15, 20 ou 25. Pode começar com um só.",
    },
    {
      title: "Cadastre sua chave Pix",
      description:
        "Ela aparece no link de pagamento com o Pix copia e cola. O dinheiro cai direto na sua conta.",
    },
    {
      title: "Ligue o WhatsApp do aluno",
      description:
        "Ele recebe uma mensagem de boas-vindas e responde “Sim” para autorizar. Sem esse sim, nenhuma cobrança sai.",
    },
  ],
  // The form mirrors the app, which calls everyone "assinante".
  example: {
    formTitle: "Novo assinante",
    name: "Ana",
    value: "R$ 280,00",
    whatsapp: "(19) 98765-4321",
    day: "Dia 5",
    pixKey: "lucastenis@email.com",
  },
  studentTitle: "E para o seu aluno?",
  studentDescription:
    "Tudo acontece no WhatsApp dele: recebe a cobrança, paga no Pix, manda o comprovante e recebe a confirmação. Sem app, sem cadastro e sem custo para ele.",
  studentSteps,
  conversation: tennisConversation,
};

const featureCopy: Record<(typeof features)[number]["id"], { title: string; description: string }> = {
  alunos: {
    title: "Todos os seus alunos num lugar só",
    description:
      "Valor, dia da cobrança e histórico de cada um. Aluno viajou ou se machucou? Desligue a cobrança dele.",
  },
  mes: {
    title: "Quanto já entrou no mês",
    description: "O recebido sobe a cada pagamento que você confirma, sem planilha.",
  },
  comprovantes: {
    title: "Comprovante chega, você confirma com um toque",
    description:
      "Ele aparece no painel para você conferir entre uma aula e outra. Se algo não bater, recuse e o aluno é avisado.",
  },
  atrasados: {
    title: "Quem atrasou, todo dia às 8h no seu WhatsApp",
    description: "Um resumo com o que falta receber, quem está atrasado e quem vence amanhã.",
  },
};

export const tennisFeatures: FeaturesContent = {
  title: "Veja quem pagou sem abrir nenhuma conversa",
  description:
    "Enquanto o WhatsApp cobra, você acompanha a turma toda num lugar só, no celular ou no computador.",
  items: features.map((feature) => ({ id: feature.id, ...featureCopy[feature.id] })),
};

export type TennisTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  location?: string;
  photo?: { src: string; alt: string };
  /** Exemplo de interface. Não aparece em produção. */
  placeholder?: true;
};

/**
 * Itens com `placeholder: true` são exemplos de interface e só aparecem fora de produção.
 * Para publicar um depoimento real, troque o texto e apague `placeholder`.
 */
export const tennisTestimonials: {
  title: string;
  description: string;
  items: TennisTestimonial[];
} = {
  title: "Professores que já cobram com o Mensaliza",
  description: "Menos cobrança no intervalo. O comprovante fica no painel.",
  items: [
    {
      id: "marina",
      placeholder: true,
      quote:
        "Eu parava a aula para lembrar quem estava devendo. Agora o Mensaliza cobra, e o comprovante aparece no painel.",
      name: "Marina Alves",
      role: "Professora de tênis",
      location: "Campinas, SP",
    },
    {
      id: "rafael",
      placeholder: true,
      quote: "Antes eu procurava o print no meio da conversa. Hoje eu abro a lista e vejo quem já pagou.",
      name: "Rafael Nunes",
      role: "Professor de beach tennis",
      location: "Santos, SP",
    },
    {
      id: "camila",
      placeholder: true,
      quote:
        "Cadastrei a turma uma vez. No dia 10 a cobrança sai sozinha, e o Pix continua caindo na minha conta.",
      name: "Camila Rocha",
      role: "Professora de tênis e beach tennis",
      location: "Ribeirão Preto, SP",
    },
  ],
};

export const tennisFaq: FaqContent = {
  title: "Dúvidas de quem dá aula",
  items: [
    {
      question: "As cobranças saem do meu WhatsApp pessoal?",
      answer:
        "Não. Saem do número do assistente do Mensaliza, com o seu nome na mensagem. Seu WhatsApp fica livre para combinar aula. Na primeira vez, o aluno responde “Sim” para autorizar; sem essa autorização, nenhuma cobrança é enviada.",
    },
    {
      question: "Meu aluno precisa baixar algum app?",
      answer:
        "Não. Ele recebe a cobrança no WhatsApp que já usa, paga no Pix e manda a foto ou o PDF do comprovante na mesma conversa. Não cria conta e não paga nada a mais.",
    },
    {
      question: "Meus alunos já me pagam por Pix. Ainda faz sentido?",
      answer:
        "Sim, se a cobrança ainda depende de você lembrar e de procurar o comprovante depois. O aluno continua pagando o Pix direto para você. O Mensaliza manda a cobrança no dia e guarda o comprovante no painel.",
    },
    {
      question: "Posso cobrar valores diferentes por aluno?",
      answer:
        "Sim. Cada aluno tem o próprio valor e o próprio dia de cobrança: 1, 5, 10, 15, 20 ou 25. Uma aula avulsa entra como cobrança avulsa para o aluno. O Mensaliza não monta grade de horários nem pacote de aulas.",
    },
    {
      question: "Dou aula em arena ou clube. Funciona?",
      answer:
        "Sim. O lugar da aula não muda a cobrança: o Pix cai na chave que você cadastrou. Se a arena precisa receber uma parte, isso fica entre você e a arena. O Mensaliza não recebe nem segura nenhum valor.",
    },
    {
      question: "E se chover, o aluno viajar ou se machucar?",
      answer:
        "O Mensaliza não remarca aula. Se o aluno vai pausar o mês, desligue a cobrança dele no painel. Quando ele voltar, você liga de novo.",
    },
    {
      question: "E se o comprovante vier errado?",
      answer:
        "Todo comprovante passa pela sua conferência. Se algo não bater, você recusa e o aluno recebe uma mensagem pedindo um novo.",
    },
    {
      question: "Quanto custa depois do teste?",
      answer: `O plano ${essential.name} custa ${reais(essential.priceMonthly)}/mês e cobra até ${essential.maxSubscribers} alunos no WhatsApp. Se você só quer organizar a turma e cobrar do seu jeito, o ${basic.name} custa ${reais(basic.priceMonthly)}/mês. Os outros planos estão em Preços.`,
    },
    {
      question: "Como funciona o teste grátis e como cancelo?",
      answer: `Você cria a conta, cadastra seus alunos e, no fim do cadastro, informa o cartão no checkout seguro do Asaas. Nada é cobrado hoje: a primeira cobrança acontece depois dos ${TRIAL_DAYS} dias. Para cancelar, use o painel, o e-mail ${SUPPORT_EMAIL} ou o WhatsApp ${SUPPORT_WHATSAPP_DISPLAY}. Sem fidelidade e sem multa.`,
    },
  ],
};

export const tennisCta: CtaContent = {
  title: `Teste ${TRIAL_DAYS} dias com a sua turma`,
  description:
    "Cadastre um aluno, ligue o WhatsApp dele e veja a cobrança sair e o pagamento chegar no painel.",
};
