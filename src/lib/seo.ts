import type { Metadata } from "next";

import {
  faqItems,
  pricingPlans,
  professionalSteps,
  studentSteps,
  TRIAL_DAYS,
} from "@/lib/landing-content";
import {
  INSTAGRAM_URL,
  SUPPORT_EMAIL,
  SUPPORT_WHATSAPP_DISPLAY,
} from "@/lib/site-urls";

export const SITE_URL = "https://mensaliza.com";
export const SITE_NAME = "Mensaliza";

export const DEFAULT_TITLE =
  "Mensaliza: cobrança de mensalidade automática no WhatsApp";

export const DEFAULT_DESCRIPTION =
  `Seus alunos recebem a cobrança no WhatsApp, pagam no Pix direto na sua conta e mandam o comprovante na mesma conversa. Teste ${TRIAL_DAYS} dias grátis.`;

export const OG_IMAGE = {
  url: "/og.jpeg",
  width: 1200,
  height: 630,
  alt: DEFAULT_TITLE,
} as const;

export const BRAND_THEME_COLOR = "#FE5B0D";

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
    sameAs: [INSTAGRAM_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      telephone: SUPPORT_WHATSAPP_DISPLAY,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
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

export function buildFaqPageJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }> = faqItems
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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
    name: "Como começar a cobrar seus alunos pelo Mensaliza",
    description:
      "Três passos para as cobranças de mensalidade saírem sozinhas no WhatsApp.",
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
    name: "Como o aluno paga a mensalidade pelo Mensaliza",
    description:
      "Do aviso no WhatsApp ao pagamento confirmado, sem app e sem custo para o aluno.",
    step: studentSteps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text,
      text,
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

/**
 * Drops the default static OG/Twitter image so the route's generated
 * `opengraph-image` / `twitter-image` files are the only ones in <head>.
 */
export function withGeneratedImages(metadata: Metadata): Metadata {
  // The `images` key must be absent (not undefined), or it also hides the generated files.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { images: _ogImages, ...openGraph } = metadata.openGraph ?? {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { images: _twitterImages, ...twitter } = metadata.twitter ?? {};
  return { ...metadata, openGraph, twitter };
}

export function buildArticleMetadata(options: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
}): Metadata {
  const base = buildPageMetadata(options);

  const { openGraph, ...rest } = withGeneratedImages(base);

  return {
    ...rest,
    openGraph: {
      ...openGraph,
      type: "article",
      publishedTime: options.publishedAt,
      modifiedTime: options.updatedAt ?? options.publishedAt,
      authors: [SITE_NAME],
      tags: options.tags,
    },
  };
}

export function buildBlogPostingJsonLd(post: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
}): JsonLd {
  const url = absoluteUrl(post.path);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "pt-BR",
    image: absoluteUrl(`${post.path}/opengraph-image`),
    keywords: post.tags?.join(", "),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl(OG_IMAGE.url) },
    },
  };
}

export function buildBlogJsonLd(options: {
  name: string;
  description: string;
  path: string;
  posts: ReadonlyArray<{ title: string; path: string; publishedAt: string }>;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    blogPost: options.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(post.path),
      datePublished: post.publishedAt,
    })),
  };
}
