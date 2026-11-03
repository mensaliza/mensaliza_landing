export const tennisCtaLabel = "Começar meu teste grátis" as const;

export const tennisTrialConditions =
  "30 dias grátis. É preciso cadastrar um cartão de crédito. Nenhum valor é cobrado agora. A assinatura começa a ser cobrada automaticamente ao final desses 30 dias, na data mostrada no cadastro." as const;

export const tennisDashboardImage = {
  src: "/images/dashboard-new.png",
  alt: "Painel do Mensaliza com base de assinantes, pendências de cobrança e ações do dia",
  width: 2880,
  height: 1600,
} as const;

export const tennisHero = {
  eyebrow: "Professores de tênis e beach tennis",
  headline:
    "Você dá aula o dia inteiro. Por que ainda precisa cobrar seus alunos um por um?",
  subheadline:
    "Depois que o aluno autoriza, o bot do Mensaliza envia a cobrança pelo WhatsApp. O comprovante volta nessa mesma conversa, e você aprova no painel. O Pix vai direto para você.",
  support: "Menos tempo cobrando. Mais tempo na quadra.",
  ctaLabel: tennisCtaLabel,
  trialConditions: tennisTrialConditions,
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

export const tennisSolution = {
  title: "Deixe o Mensaliza cuidar da rotina de cobrança.",
  lead: "Você cadastra o aluno uma vez. O bot envia a cobrança, o comprovante chega no painel, e a decisão de aprovar continua sua.",
  blocks: [
    {
      id: "automatic-charge",
      title: "Cobrança automática",
      body: "Cadastre o aluno, o valor da mensalidade e o dia de vencimento. Depois que ele autoriza, o bot do Mensaliza envia as cobranças nas datas configuradas — pelo WhatsApp do Mensaliza, não pelo seu.",
    },
    {
      id: "receipts",
      title: "Comprovantes no painel",
      body: "O aluno manda a foto ou o PDF do comprovante na mesma conversa com o bot. Você acompanha o documento no painel, sem procurar mensagem antiga.",
    },
    {
      id: "review",
      title: "Aprovar ou rejeitar",
      body: "Cada comprovante passa pela sua revisão. Você aprova ou rejeita no painel. O Pix é pago a você. O Mensaliza não recebe esse valor e não confirma o pagamento no banco.",
    },
  ],
} as const;

export const tennisHowItWorks = {
  title: "Simples para você. Prático para seus alunos.",
  lead: "Do cadastro à revisão do comprovante, em quatro passos.",
  steps: [
    {
      step: "Passo 1",
      title: "Cadastre seus alunos",
      description:
        "Informe o nome, o WhatsApp, o valor da mensalidade e o dia de vencimento.",
    },
    {
      step: "Passo 2",
      title: "Seu aluno autoriza as mensagens",
      description:
        "Você envia o convite pelo painel. O bot do Mensaliza pede autorização no WhatsApp. As cobranças automáticas só começam depois que o aluno autoriza.",
    },
    {
      step: "Passo 3",
      title: "As cobranças são enviadas automaticamente",
      description:
        "Nas datas configuradas, o bot envia a mensagem com os dados da cobrança. Você não escreve para cada aluno.",
    },
    {
      step: "Passo 4",
      title: "Receba e confira os comprovantes",
      description:
        "O aluno responde na mesma conversa com a foto ou o PDF. No painel, você aprova ou rejeita.",
    },
  ],
} as const;

export const tennisProduct = {
  title:
    "Suas cobranças organizadas, sem depender de conversas perdidas no WhatsApp.",
  lead: "O painel reúne seus alunos e os comprovantes. A conversa com o bot é onde a cobrança acontece.",
  image: tennisDashboardImage,
  flow: [
    {
      id: "authorization",
      title: "Autorização",
      body: "O bot pede autorização no WhatsApp. Sem o sim do aluno, nenhuma cobrança automática é enviada.",
    },
    {
      id: "charge",
      title: "Cobrança",
      body: "No dia de vencimento, a mensagem sai nas datas configuradas, com os dados da cobrança.",
    },
    {
      id: "receipt",
      title: "Comprovante",
      body: "O aluno envia a foto ou o PDF nessa mesma conversa.",
    },
    {
      id: "approval",
      title: "Aprovação",
      body: "O comprovante aparece no painel para você aprovar ou rejeitar. O Pix segue para a sua conta.",
    },
  ],
} as const;

export const tennisRoutineBenefits = {
  title: "Mais tempo para focar nas aulas. Menos trabalho administrativo.",
  lead: "A quadra continua sendo o seu trabalho. A cobrança deixa de depender da sua memória.",
  benefits: [
    {
      id: "less-manual",
      title: "Menos cobrança manual",
      body: "O lembrete sai pelo bot no dia de vencimento. Você não monta a lista de mensagens.",
    },
    {
      id: "organized-receipts",
      title: "Comprovantes organizados",
      body: "Foto e PDF ficam no painel, ligados ao aluno, em vez de se perderem no seu WhatsApp.",
    },
    {
      id: "visible-status",
      title: "Status visível",
      body: "Dá para ver quem está pendente, quem já mandou comprovante e o que ainda falta você revisar.",
    },
    {
      id: "scheduled-dues",
      title: "Vencimentos programados",
      body: "As cobranças recorrentes seguem as datas configuradas de cada aluno.",
    },
  ],
} as const;

export const tennisFaq = {
  title: "Perguntas frequentes",
  items: [
    {
      question: "As cobranças são enviadas pelo meu WhatsApp pessoal?",
      answer:
        "Não. As mensagens são enviadas pelo WhatsApp do Mensaliza, depois que o aluno autoriza. Nada sai do seu WhatsApp pessoal.",
    },
    {
      question: "Preciso cadastrar cada aluno?",
      answer:
        "Sim. Você cadastra os alunos que deseja acompanhar e configura o valor e o dia de vencimento de cada um.",
    },
    {
      question: "O aluno precisa autorizar as mensagens?",
      answer:
        "Sim. O bot do Mensaliza solicita autorização no WhatsApp antes de iniciar as cobranças automáticas.",
    },
    {
      question: "Como recebo os comprovantes?",
      answer:
        "O aluno envia a foto ou o PDF do comprovante na conversa com o bot do Mensaliza. O arquivo fica no painel para você revisar.",
    },
    {
      question: "O Mensaliza confirma o pagamento automaticamente?",
      answer:
        "Não. O Pix é pago a você. O Mensaliza não recebe esse valor e não confirma o pagamento no banco. Você aprova ou rejeita o comprovante no painel.",
    },
    {
      question: "Preciso cadastrar um cartão de crédito?",
      answer: `Sim. ${tennisTrialConditions}`,
    },
    {
      question: "Como funciona o período de teste?",
      answer: tennisTrialConditions,
    },
  ],
} as const;

export const tennisFinalCta = {
  title: "Passe menos tempo cobrando. Aproveite mais tempo na quadra.",
  body: "Organize as cobranças dos seus alunos e acompanhe os comprovantes pelo Mensaliza.",
  ctaLabel: tennisCtaLabel,
  trialConditions: tennisTrialConditions,
} as const;
