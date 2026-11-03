export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";

/** Customer support, account, cancellation, and demo requests. */
export const SUPPORT_EMAIL = "atendimento@mensaliza.com";

/** Public customer-support WhatsApp, shown as dialed in Brazil. */
export const SUPPORT_WHATSAPP_DISPLAY = "+55 19 99264-7318";

export const SUPPORT_WHATSAPP_URL = "https://wa.me/5519992647318";

/** Legal notices, LGPD, data-subject rights, and the privacy team channel. */
export const LEGAL_EMAIL = "contato@mensaliza.com";

export const INSTAGRAM_HANDLE = "@mensaliza";

export const INSTAGRAM_URL = "https://www.instagram.com/mensaliza";

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

/** Query keys copied from the current page onto the signup URL. */
export const SIGNUP_CAMPAIGN_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type SignupCampaignQueryKey = (typeof SIGNUP_CAMPAIGN_QUERY_KEYS)[number];

/** Added only when a campaign landing explicitly asks for it. */
export const TENNIS_SIGNUP_CAMPAIGN_REF = "professores-de-tenis" as const;

export type SignupCampaignRef = typeof TENNIS_SIGNUP_CAMPAIGN_REF;

export type SignupSearchParams = {
  get(name: string): string | null;
};

export type SignupHrefOptions = {
  plan?: string;
  interval?: "monthly" | "yearly";
  /** Current page query string. Only `SIGNUP_CAMPAIGN_QUERY_KEYS` are copied. */
  searchParams?: SignupSearchParams | null;
  /** Sets `ref`. Home CTAs omit this. */
  campaignRef?: SignupCampaignRef;
};

/**
 * Signup URL on the app. Keeps `plan` and `interval`, copies the campaign
 * allowlist from `searchParams`, and sets `ref` only when `campaignRef` is passed.
 */
export function getSignupHref(options?: SignupHrefOptions): string {
  const base = appHref("/auth/register");

  const params = new URLSearchParams();
  if (options?.plan) {
    params.set("plan", options.plan);
  }
  if (options?.interval) {
    params.set("interval", options.interval);
  }

  const searchParams = options?.searchParams;
  if (searchParams) {
    for (const key of SIGNUP_CAMPAIGN_QUERY_KEYS) {
      const value = searchParams.get(key)?.trim();
      if (value) {
        params.set(key, value);
      }
    }
  }

  if (options?.campaignRef) {
    params.set("ref", options.campaignRef);
  }

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

export function getSignupLinkProps(options?: SignupHrefOptions): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  return externalLinkProps(getSignupHref(options));
}
