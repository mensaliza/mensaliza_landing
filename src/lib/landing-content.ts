import { SUPPORT_EMAIL, SUPPORT_WHATSAPP_DISPLAY } from "./site-urls";

export {
  APP_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LEGAL_EMAIL,
  SUPPORT_EMAIL,
  SUPPORT_WHATSAPP_DISPLAY,
  SUPPORT_WHATSAPP_URL,
  getLoginLinkProps,
  isExternalUrl,
} from "./site-urls";

/**
 * Free-trial length shown on the site. Must match `SIGNUP_TRIAL_DAYS` in the
 * app's production env (signups on 2026-11-09 report `trial_days: 14`).
 */
export const TRIAL_DAYS = 14;

/** One name for the sign-up action across the whole site. */
export const SIGNUP_CTA_LABEL = `Testar ${TRIAL_DAYS} dias grátis`;

/** Short version for tight spots (mobile header). */
export const SIGNUP_CTA_SHORT_LABEL = "Testar grátis";

/** The deal, in one line, next to every primary button. */
export const TRIAL_TERMS = `${TRIAL_DAYS} dias grátis · nada é cobrado hoje · cancele quando quiser`;

export const navLinks = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Preços", href: "/#precos" },
  { label: "Dúvidas", href: "/#faq" },
  { label: "Blog", href: "/blog" },
] as const;

/** Header keeps a short list; the rest is found by scrolling. */
export const headerNavLinks = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Preços", href: "/#precos" },
  { label: "Dúvidas", href: "/#faq" },
  { label: "Blog", href: "/blog" },
] as const;

export const audienceLine =
  "Para personal trainer, professor de música, idiomas ou reforço, nutricionista, psicólogo e quem mais cobra mensalidade de alunos, pacientes ou clientes.";

/** Shown as a sliding strip under the "who it is for" heading; `audienceLine` stays for screen readers. */
export const audienceProfessions = [
  "Personal trainer",
  "Professor de música",
  "Professor de inglês",
  "Nutricionista",
  "Psicólogo",
  "Reforço escolar",
  "Pilates",
  "Yoga",
  "Escola de idiomas",
  "Treinador de corrida",
  "Professor de dança",
  "Fonoaudiólogo",
] as const;

/** The demo in the hero. Copy mirrors the app's real WhatsApp messages. */
export const heroConversation = {
  providerName: "Rafa Personal",
  subscriberName: "Ana",
  value: "R$ 150,00",
  dueDate: "dia 17",
} as const;

/** Day chips in the demo; timeless on purpose, since the page is built once and cached. */
export const heroConversationDays = {
  charge: "Dia da cobrança",
  due: "Dia do vencimento",
} as const;

export const painPoints = [
  {
    before: 'Mandar "oi, tudo bem? só lembrando da mensalidade…" para cada assinante, todo mês.',
    after: "No dia combinado, o Mensaliza manda a cobrança no WhatsApp por você.",
  },
  {
    before: "Procurar o print do Pix no meio das conversas para saber quem pagou.",
    after: "O comprovante chega organizado no painel. Você confere e confirma.",
  },
  {
    before: "O constrangimento de cobrar quem atrasou.",
    after: "O lembrete sai do Mensaliza. A sua conversa com o assinante fica longe da cobrança.",
  },
] as const;

/** The four cards of "O seu painel"; each one has its own scene in `components/landing/bento`. */
export const features = [
  {
    id: "alunos",
    title: "Todos os seus assinantes num lugar só",
    description:
      "Valor, dia de vencimento e histórico de cada um. Pausou a mensalidade? Desligue a cobrança.",
  },
  {
    id: "mes",
    title: "Quanto já entrou no mês",
    description: "O recebido sobe a cada pagamento que você confirma, sem planilha.",
  },
  {
    id: "comprovantes",
    title: "Comprovante chega, você confirma com um toque",
    description: "Ele aparece no painel para você conferir. Se algo não bater, recuse e o assinante é avisado.",
  },
  {
    id: "atrasados",
    title: "Quem atrasou, todo dia às 8h no seu WhatsApp",
    description:
      "Um resumo com o que falta receber, quem está atrasado e quem vence amanhã.",
  },
] as const;

export const professionalSteps = [
  {
    title: "Cadastre seus assinantes",
    description: "Nome, WhatsApp, valor e dia de vencimento. Pode começar com um só.",
  },
  {
    title: "Cadastre sua chave Pix",
    description: "Ela aparece no link de pagamento com o Pix copia e cola. O dinheiro cai direto na sua conta.",
  },
  {
    title: "Ligue o WhatsApp do assinante",
    description:
      "Ele recebe uma mensagem de boas-vindas e responde “Sim” para autorizar. A partir daí, as cobranças saem sozinhas.",
  },
] as const;

export const studentSteps = [
  "Recebe a cobrança no WhatsApp, com valor e vencimento.",
  "Abre o link e paga com o Pix copia e cola ou o QR code.",
  "Manda o comprovante na mesma conversa.",
  "Recebe a confirmação quando você aprova.",
] as const;

export const YEARLY_SAVINGS_PERCENT = 20;

export const pricingTiers = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Organização sem cobrança no WhatsApp",
    maxSubscribers: 0,
    priceMonthly: 4900,
    priceYearly: 3900,
    popular: false,
    custom: false,
  },
  {
    id: "essential",
    name: "Essential",
    tagline: "Até 100 assinantes cobrados no WhatsApp",
    maxSubscribers: 100,
    priceMonthly: 9900,
    priceYearly: 7900,
    popular: true,
    custom: false,
  },
  {
    id: "business",
    name: "Business",
    tagline: "Até 150 assinantes cobrados no WhatsApp",
    maxSubscribers: 150,
    priceMonthly: 14900,
    priceYearly: 11900,
    popular: false,
    custom: false,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Até 200 assinantes cobrados no WhatsApp",
    maxSubscribers: 200,
    priceMonthly: 19900,
    priceYearly: 15900,
    popular: false,
    custom: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "",
    maxSubscribers: null,
    priceMonthly: null,
    priceYearly: null,
    popular: false,
    custom: true,
  },
] as const;

export const pricingPlans = pricingTiers.filter((tier) => !tier.custom);

export const pricingEnterprise = {
  name: "Mais de 200 assinantes?",
  description: "Montamos um plano sob medida. Fale com a gente no WhatsApp.",
} as const;

/** What the quota means, said once in the pricing section and in the FAQ. */
export const quotaExplanation =
  "Em todos os planos você cadastra quantos assinantes quiser. O plano define quantos deles recebem a cobrança automática no WhatsApp. Chegou no limite? Os demais continuam no painel, só sem a cobrança automática, e você pode trocar de plano quando quiser.";

export const faqItems = [
  {
    question: "Quanto custa para o meu assinante?",
    answer:
      "Nada. Ele não paga taxa, não instala app e não cria conta. Recebe a mensagem no WhatsApp, paga no Pix e manda o comprovante na mesma conversa.",
  },
  {
    question: "Como o dinheiro chega até mim?",
    answer:
      "Direto na sua conta, pelo Pix. O Mensaliza não recebe nem segura o dinheiro do assinante: o link de pagamento mostra a sua chave Pix com o copia e cola e o QR code.",
  },
  {
    question: "De qual número a mensagem sai?",
    answer:
      "Do número do assistente do Mensaliza, com o seu nome na mensagem. Seu WhatsApp pessoal fica livre. Na primeira vez, o assinante recebe uma mensagem de boas-vindas e responde “Sim” para autorizar. Sem essa autorização, nenhuma cobrança é enviada: é regra do WhatsApp.",
  },
  {
    question: "Como funciona o teste grátis?",
    answer: `Você cria a conta, cadastra seus assinantes e, no fim do cadastro, informa o cartão no checkout seguro do Asaas. Nada é cobrado hoje: a primeira cobrança acontece depois dos ${TRIAL_DAYS} dias de teste. Se cancelar antes, não paga nada.`,
  },
  {
    question: "O que acontece quando passo do limite do plano?",
    answer: `${quotaExplanation} Desativar um assinante não libera vaga: para isso, desligue o WhatsApp dele.`,
  },
  {
    question: "E se o assinante mandar um comprovante errado?",
    answer:
      "Todo comprovante passa pela sua conferência. Se algo não bater, você recusa e o assinante recebe uma mensagem pedindo um novo.",
  },
  {
    question: "Meus dados e os dos meus assinantes estão seguros?",
    answer:
      "Sim. Os dados ficam guardados com medidas de segurança e o cartão do seu plano é processado pelo Asaas, sem passar pelo Mensaliza. O que tratamos, e com quem compartilhamos, está na Política de privacidade.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: `Sim. Sem fidelidade e sem multa. Você cancela pelo painel, pelo e-mail ${SUPPORT_EMAIL} ou pelo WhatsApp ${SUPPORT_WHATSAPP_DISPLAY}.`,
  },
] as const;
