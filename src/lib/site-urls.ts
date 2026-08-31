export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";

/** Inbox for demo requests and commercial contact (until contato@ is live). */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "mensaliza.app@gmail.com";

const DEFAULT_APP_ORIGIN = "https://app.mensaliza.com";

export const APP_ORIGIN = isExternalUrl(APP_URL)
  ? APP_URL.replace(/\/$/, "")
  : DEFAULT_APP_ORIGIN;

function appHref(path = ""): string {
  if (!path) {
    return APP_ORIGIN;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${APP_ORIGIN}${normalized}`;
}

function externalLinkProps(href: string): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  if (!isExternalUrl(href)) {
    return { href };
  }

  return {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

export function getAppLinkProps(): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  return externalLinkProps(appHref());
}

export function getLoginHref(): string {
  return appHref("/auth/login");
}

export function getLoginLinkProps(): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  return externalLinkProps(getLoginHref());
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

export function getSignupHref(options?: {
  plan?: string;
  interval?: "monthly" | "yearly";
}): string {
  const base = appHref("/auth/register");

  const params = new URLSearchParams();
  if (options?.plan) {
    params.set("plan", options.plan);
  }
  if (options?.interval) {
    params.set("interval", options.interval);
  }

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

export function getSignupLinkProps(options?: {
  plan?: string;
  interval?: "monthly" | "yearly";
}): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  return externalLinkProps(getSignupHref(options));
}
