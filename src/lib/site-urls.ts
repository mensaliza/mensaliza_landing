export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";

export const DEMO_URL =
  process.env.NEXT_PUBLIC_DEMO_URL?.trim() || "/#agendar-demo";

export const ENTERPRISE_EMAIL =
  process.env.NEXT_PUBLIC_ENTERPRISE_EMAIL?.trim() || "contato@mensaliza.com";

export function getAppLinkProps():
  | { href: string; target: "_blank"; rel: "noopener noreferrer" }
  | null {
  if (!isExternalUrl(APP_URL)) {
    return null;
  }

  return {
    href: APP_URL,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

export function getDemoLinkProps(): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  if (isExternalUrl(DEMO_URL)) {
    return {
      href: DEMO_URL,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return { href: DEMO_URL };
}

export function getEnterpriseMailtoHref(): string {
  const params = new URLSearchParams({
    subject: "Plano Enterprise — Mensaliza",
    body: "Olá! Quero conversar sobre o plano Enterprise para a minha base de assinantes.",
  });

  return `mailto:${ENTERPRISE_EMAIL}?${params.toString()}`;
}
