export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";

/** Inbox for demo requests and commercial contact (until contato@ is live). */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "mensaliza.app@gmail.com";

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

export function getDemoHref(assinantes?: string): string {
  if (assinantes) {
    return `/?assinantes=${encodeURIComponent(assinantes)}#agendar-demo`;
  }

  return `/#agendar-demo`;
}

export function getDemoLinkProps(assinantes?: string): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  const href = getDemoHref(assinantes);

  return { href };
}