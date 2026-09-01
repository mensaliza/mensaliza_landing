import type { Metadata } from "next";

import {
  clientSteps,
  essentialFaqItems,
  pricingPlans,
  professionalSteps,
} from "@/lib/landing-content";

export const SITE_URL = "https://mensaliza.com";
export const SITE_NAME = "Mensaliza";

export const DEFAULT_TITLE =
  "Mensaliza — Cobrança mensal automática via WhatsApp";

export const DEFAULT_DESCRIPTION =
  "Organize assinantes, envie cobranças no dia certo pelo WhatsApp e aprove comprovantes — sem processar pagamentos.";

export const OG_IMAGE = {
  url: "/og.jpeg",
  width: 1200,
  height: 630,
  alt: DEFAULT_TITLE,
} as const;

export const BRAND_THEME_COLOR = "#e87722";

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildOpenGraph(options?: {
  title?: string;
  description?: string;
  path?: string;
}): NonNullable<Metadata["openGraph"]> {
  const title = options?.title ?? DEFAULT_TITLE;
  const description = options?.description ?? DEFAULT_DESCRIPTION;
  const path = options?.path ?? "/";

  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [OG_IMAGE],
  };
}

export function buildTwitter(options?: {
  title?: string;
  description?: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: options?.title ?? DEFAULT_TITLE,
    description: options?.description ?? DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  };
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: buildOpenGraph(),
    twitter: buildTwitter(),
    ...(googleSiteVerification
      ? {
          verification: {
            google: googleSiteVerification,
          },
        }
      : {}),
    other: {
      "darkreader-lock": "darkreader-lock",
    },
  };
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  openGraphTitle?: string;
}): Metadata {
  const openGraphTitle = options.openGraphTitle ?? options.title;
  const openGraph = buildOpenGraph({
    title: openGraphTitle,
    description: options.description,
    path: options.path,
  });

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: options.path,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph,
    twitter: buildTwitter({
      title: openGraphTitle,
      description: options.description,
    }),
  };
}

type JsonLd = Record<string, unknown>;

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(OG_IMAGE.url),
    description: DEFAULT_DESCRIPTION,
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildSoftwareApplicationJsonLd(): JsonLd {
  const offers = pricingPlans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: (plan.priceMonthly / 100).toFixed(2),
    priceCurrency: "BRL",
    url: absoluteUrl("/#precos"),
    availability: "https://schema.org/InStock",
  }));

  const lowPrice = Math.min(...pricingPlans.map((plan) => plan.priceMonthly));
  const highPrice = Math.max(...pricingPlans.map((plan) => plan.priceMonthly));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: (lowPrice / 100).toFixed(2),
      highPrice: (highPrice / 100).toFixed(2),
      priceCurrency: "BRL",
      offerCount: pricingPlans.length,
      offers,
    },
  };
}

export function buildFaqPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: essentialFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHowToJsonLd(): JsonLd {
  const professionalHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como usar o Mensaliza como profissional",
    description:
      "Do cadastro ao comprovante aprovado em poucos passos para o profissional.",
    step: professionalSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const clientHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como funciona o Mensaliza para o cliente",
    description:
      "Do cadastro ao comprovante aprovado em poucos passos para o cliente.",
    step: clientSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [professionalHowTo, clientHowTo],
  };
}

export function buildBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildHomeJsonLd(): JsonLd[] {
  return [
    buildSoftwareApplicationJsonLd(),
    buildFaqPageJsonLd(),
    buildHowToJsonLd(),
  ];
}

export function buildLayoutJsonLd(): JsonLd[] {
  return [buildOrganizationJsonLd(), buildWebSiteJsonLd()];
}
