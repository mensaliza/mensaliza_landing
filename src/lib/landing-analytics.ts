"use client";

import { captureEvent } from "@/lib/analytics";

export type LandingCtaType = "signup" | "login" | "whatsapp" | "how_it_works";

export type LandingCtaLocation =
  | "hero"
  | "header"
  | "header_mobile"
  | "how_it_works"
  | "pricing_plan"
  | "pricing_enterprise"
  | "faq"
  | "footer"
  | "cta_section"
  | "not_found"
  | "floating_button"
  | "blog_post";

export type LandingSectionId =
  | "hero"
  | "para_quem_e"
  | "comparativo"
  | "funcionalidades"
  | "como_funciona"
  | "precos"
  | "faq"
  | "cta_final";

export type LandingNavSource = "header" | "header_mobile" | "footer";

export type BillingInterval = "monthly" | "yearly";

function slugifyQuestion(question: string): string {
  return question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function trackLandingCta(props: {
  cta: LandingCtaType;
  location: LandingCtaLocation;
  plan?: string;
  billing_interval?: BillingInterval;
}) {
  captureEvent("landing_cta_clicked", props);
}

export function trackLandingNavClicked(props: {
  target_section: string;
  source: LandingNavSource;
}) {
  captureEvent("landing_nav_clicked", props);
}

export function trackLandingSectionViewed(section: LandingSectionId) {
  captureEvent("landing_section_viewed", { section });
}

export function trackLandingPricingIntervalChanged(interval: BillingInterval) {
  captureEvent("landing_pricing_interval_changed", { interval });
}

export function trackLandingPricingTierChanged(tier: string) {
  captureEvent("landing_pricing_tier_changed", { tier });
}

export function trackLandingFaqExpanded(question: string) {
  captureEvent("landing_faq_expanded", {
    question_id: slugifyQuestion(question),
  });
}
