export {
  APP_URL,
  CONTACT_EMAIL,
  getAppLinkProps,
  getDemoHref,
  getDemoLinkProps,
  isExternalUrl,
} from "./site-urls";

export const navLinks = [
  { label: "Para quem é", href: "/#para-quem-e" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Preços", href: "/#precos" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const trustBullets = [
  "Sem maquininha",
  "Não processa pagamentos — o dinheiro fica com você",
  "Controle total dos comprovantes",
  "Cobrança no dia certo, sem você precisar lembrar",
] as const;


export const heroMockups = {
  dashboard: {
    src: "/images/dashboard-white.png",
    alt: "Painel do Mensaliza com base de assinantes, pendências de cobrança e ações do dia",
    width: 2880,
    height: 1614,
  },
  subscribers: {
    src: "/images/subscribers.png",
    alt: "Base de assinantes do Mensaliza com cadastro de assinantes, status ativo / inativo, data de vencimento e histórico de pagamentos",
    width: 5016,
    height: 2462,
  },
  laptop: {
    src: "/images/laptop_mockup.png",
    alt: "Painel do Mensaliza com base de assinantes, pendências de cobrança e ações do dia",
    width: 3880,
    height: 2400,
  },
  phone: {
    src: "/images/phone_mockup.png",
    alt: "Link de cobrança no celular do cliente com envio de comprovante",
    width: 1385,
    height: 2676,
  },
} as const;

export const heroCallouts = [
  {
    id: "dashboard",
    title: "Painel do profissional",
    body: "Assinantes, pendências e comprovantes em um só lugar.",
    tone: "default" as const,
  },
  {
    id: "whatsapp",
    title: "Cobrança automática",
    body: "Lembrete no WhatsApp no dia do vencimento.",
    tone: "brand" as const,
  },
  {
    id: "client-link",
    title: "Link para o cliente",
    body: "Valor, instruções e envio de comprovante — sem app.",
    tone: "brand" as const,
  },
  {
    id: "receipt",
    title: "Comprovante na hora",
    body: "Cliente envia pelo celular; você aprova no painel.",
    tone: "default" as const,
  },
] as const;

export const audienceSectionFooter = "Se você cobra na mão todo mês, o Mensaliza foi feito para você.";

export const supportingCapability =
  "Também inclui base de assinantes, previsão do mês e alertas de atraso — no mesmo painel.";

export const personas = [
  {
    persona: "Nutricionistas",
    icon: "apple" as const,
    tagline: "Planos mensais sem correr atrás de cada paciente",
  },
  {
    persona: "Psicólogas",
    icon: "brain" as const,
    tagline: "Lembrete no tom certo, sem pesar na relação",
  },
  {
    persona: "Professores de esporte",
    icon: "trophy" as const,
    tagline: "Turmas grandes, controle claro de quem pagou",
  },
  {
    persona: "Personal trainers",
    icon: "dumbbell" as const,
    tagline: "Mensalidades organizadas fora do seu WhatsApp pessoal",
  },
  {
    persona: "Mentores e comunidades",
    icon: "users" as const,
    tagline: "Membros em dia — sem surpresa no fim do mês",
  },
  {
    persona: "Negócios por assinatura",
    icon: "store" as const,
    tagline: "Base de assinantes que escala sem planilha",
  },
] as const;

export const features = [
  {
    icon: "users" as const,
    title: "Você tem dificuldade para organizar sua base de clientes?",
    description:
      "Cadastre todos os seus assinantes em um só lugar. Veja quem está ativo, quem está inativo, datas de vencimento e histórico de pagamentos. Ative ou desative assinantes quando quiser — sem planilha, sem caderno.",
    bullets: [
      "Cadastro completo de assinantes",
      "Status ativo / inativo",
      "Data de vencimento por cliente",
      "Histórico de pagamentos",
    ],
    highlight: true,
  },
  {
    icon: "chart" as const,
    title: "Não sabe quanto vai entrar no mês ou quem está atrasado?",
    description:
      "Tenha visão clara da sua receita recorrente. Veja recebimentos previstos para o mês, pagamentos confirmados, pendentes de aprovação e clientes em atraso. Tome decisões com dados, não com achismo.",
    bullets: [
      "Previsão de recebimentos do mês",
      "Pagamentos confirmados vs. pendentes",
      "Alertas de atraso",
      "Dashboard financeiro simplificado",
    ],
    highlight: true,
  },
  {
    icon: "whatsapp" as const,
    title: "Cobrança no dia certo, sem você precisar mandar mensagem",
    description:
      'No vencimento de cada assinante, o Mensaliza envia a cobrança via WhatsApp. Sem você abrir o celular, sem lista de contatos, sem "oi, lembra da mensalidade?".',
    bullets: [
      "Envio automático no dia de pagamento",
      "Lembrete de vencimento no tom certo",
      "Funciona enquanto você atende ou descansa",
    ],
    highlight: true,
  },
  {
    icon: "check" as const,
    title: "Cliente envia o comprovante, você aprova em segundos",
    description:
      "Seu cliente paga do jeito que vocês combinarem, envia print ou PDF do comprovante pelo link. Você recebe tudo no dashboard e aprova ou rejeita com um clique. Simples, rápido e sob seu controle.",
    bullets: [
      "Comprovante por imagem ou PDF",
      "Fila de aprovação no dashboard",
      "Aprovar ou rejeitar com um clique",
      "Histórico completo por assinante",
    ],
    highlight: true,
  },
] as const;

export const reliefComparison = [
  {
    criterion: "Gestão de assinantes",
    before: "Planilha desatualizada, dados espalhados",
    after: "Base centralizada com status em tempo real",
  },
  {
    criterion: "Cobranças",
    before: "Você lembra (ou esquece) de cobrar um a um",
    after: "Lembrete automático no dia do vencimento",
  },
  {
    criterion: "Mensagens",
    before: 'Você manda "oi, tudo bem? só lembrando..."',
    after: "Mensagem no tom certo, enviada pelo Mensaliza",
  },
  {
    criterion: "Comprovantes",
    before: "Prints e PDFs perdidos no WhatsApp",
    after: "Fila organizada com aprovação em um clique",
  },
  {
    criterion: "Controle do mês",
    before: "Incerteza sobre quem pagou e quem está atrasado",
    after: "Visão clara do mês, assinante por assinante",
  },
  {
    criterion: "Relacionamento",
    before: "Constrangimento de cobrar pessoalmente",
    after: "Você mantém a relação; o sistema envia o lembrete",
  },
] as const;

export const professionalSteps = [
  {
    step: "Passo 1",
    title: "Cadastre seus assinantes",
    description: "Adicione nome, valor, vencimento e como o cliente deve pagar.",
  },
  {
    step: "Passo 2",
    title: "Configure a cobrança",
    description: "Defina a mensagem e o horário de envio. O Mensaliza cuida do resto.",
  },
  {
    step: "Passo 3",
    title: "Acompanhe no dashboard",
    description: "Veja quem pagou, quem está pendente e quem está atrasado.",
  },
  {
    step: "Passo 4",
    title: "Aprove os comprovantes",
    description: "Cliente envia, você valida. Pronto.",
  },
] as const;

export const clientSteps = [
  {
    step: "Passo 1",
    title: "Recebe a mensagem no WhatsApp",
    description: "No dia do pagamento, chega uma mensagem de cobrança.",
  },
  {
    step: "Passo 2",
    title: "Visualiza as informações de pagamento",
    description: "Valor e instruções de pagamento que o profissional definiu.",
  },
  {
    step: "Passo 3",
    title: "Paga do jeito combinado",
    description:
      "Do jeito que vocês acordaram — direto para você, sem intermediação.",
  },
  {
    step: "Passo 4",
    title: "Envia o comprovante",
    description: "Envia imagem ou PDF pelo WhatsApp.",
  },
  {
    step: "Passo 5",
    title: "Aguarda aprovação",
    description: "O profissional confirma e o pagamento fica registrado.",
  },
] as const;

export const videoScript = [
  "Você cobra mensalidade e cansou de mandar mensagem um por um?",
  "Mostrar profissional olhando WhatsApp, planilha bagunçada, cliente atrasado.",
  "Cadastro rápido de assinante no Mensaliza.",
  "Mensagem automática chegando no WhatsApp do cliente.",
  "Cliente abre link → paga → envia comprovante.",
  "Profissional aprova comprovante, vê receita prevista e atrasos.",
  "Mensaliza. Cobrança automática. Sem constrangimento.",
] as const;

export const pricingSharedFeatures = [
  "Dashboard financeiro",
  "Gestão de assinantes",
  "Gestão de pagamentos",
  "Cobrança automática via WhatsApp",
  "Recebimento de comprovantes",
  "Previsão de recebimentos",
] as const;

export const pricingTiers = [
  {
    id: "25",
    subscribers: 25,
    label: "25",
    price: "R$ 69",
    pricePeriod: "/ mês",
    custom: false,
    popular: false,
  },
  {
    id: "50",
    subscribers: 50,
    label: "50",
    price: "R$ 109",
    pricePeriod: "/ mês",
    custom: false,
    popular: true,
  },
  {
    id: "100",
    subscribers: 100,
    label: "100",
    price: "R$ 139",
    pricePeriod: "/ mês",
    custom: false,
    popular: false,
  },
  {
    id: "150",
    subscribers: 150,
    label: "150",
    price: "R$ 199",
    pricePeriod: "/ mês",
    custom: false,
    popular: false,
  },
  {
    id: "150-plus",
    subscribers: 151,
    label: "150+",
    price: "Sob consulta",
    pricePeriod: null,
    custom: true,
    popular: false,
  },
] as const;

export const pricingEnterprise = {
  name: "Enterprise",
  description:
    "Acima de 150 assinantes ou necessidades sob medida. Vamos conversar.",
} as const;

export const faqItems = [
  {
    question: "O Mensaliza processa pagamentos?",
    answer:
      "Não. O Mensaliza não é gateway de pagamento. Seu cliente paga direto para você, do jeito que vocês combinarem. A plataforma organiza a cobrança e centraliza os comprovantes para você aprovar ou rejeitar.",
  },
  {
    question: "Como o cliente faz o pagamento?",
    answer:
      "Você define as instruções no link de cobrança — conta, chave ou outro meio que vocês usem. O cliente paga pelo banco ou app dele, no valor combinado, e envia o comprovante de volta pelo mesmo link.",
  },
  {
    question: "Como funciona a cobrança via WhatsApp?",
    answer:
      "No dia de pagamento de cada assinante, o Mensaliza envia automaticamente uma mensagem via WhatsApp com o link de cobrança. Você apenas configura a daa. Não precisa mandar mensagem manualmente.",
  },
  {
    question: "Meu cliente precisa instalar algum app?",
    answer:
      "Não. Ele recebe a mensagem no WhatsApp, paga do jeito combinado e envia o comprovante — tudo pelo celular, sem cadastro.",
  },
  {
    question: "E se o cliente enviar um comprovante errado ou falso?",
    answer:
      "Você tem controle total. Todo comprovante passa pela sua aprovação no dashboard. Se algo não bater, você rejeita e o assinante é notificado para reenviar.",
  },
  {
    question: "Posso ativar e desativar assinantes?",
    answer:
      "Sim. Assinantes inativos não recebem cobrança. Útil para pausas, cancelamentos ou clientes sazonais.",
  },
  {
    question: "Funciona para qualquer tipo de profissional?",
    answer:
      "Sim, desde que você tenha clientes pagando mensalmente — nutricionistas, psicólogas, professores de esporte, personal trainers, mentores, comunidades e pequenos negócios com assinatura.",
  },
  {
    question: "Preciso de maquininha ou conta PJ?",
    answer:
      "Não. O Mensaliza não exige maquininha nem conta PJ. Seu cliente paga do jeito que vocês combinarem — transferência, depósito ou outro meio.",
  },
  {
    question: "Meus dados e os dos meus clientes estão seguros?",
    answer:
      "Sim. Seus dados e os de seus assinantes são armazenados com segurança e não são compartilhados com terceiros.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Sem fidelidade, sem multa. Você cancela quando quiser pelo painel ou entrando em contato.",
  },
  {
    question: "Como começo?",
    answer:
      "Agende uma demonstração e tire todas as dúvidas antes de começar. Em poucos minutos você vê o sistema funcionando.",
  },
] as const;

export const coreFeatures = [features[2], features[3]] as const;

export const essentialFaqItems = [
  faqItems[0],
  faqItems[2],
  faqItems[3],
  faqItems[4],
  faqItems[9],
  faqItems[10],
] as const;

export const dueDates = [
  { day: 3, status: "paid" as const, name: "Ana" },
  { day: 5, status: "paid" as const, name: "Carlos" },
  { day: 10, status: "sent" as const, name: "Julia" },
  { day: 12, status: "pending" as const, name: "Marcos" },
  { day: 15, status: "late" as const, name: "Paula" },
  { day: 20, status: "upcoming" as const, name: "Rafael" },
] as const;
