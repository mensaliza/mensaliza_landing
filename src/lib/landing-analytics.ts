"use client";

import posthog from "posthog-js";

import { captureEvent } from "@/lib/analytics";

export type LandingCtaType = "signup" | "login" | "demo" | "how_it_works";

export type LandingCtaLocation =
  | "hero"
  | "header"
  | "header_mobile"
  | "pricing_plan"
  | "pricing_enterprise"
  | "footer"
  | "cta_section"
  | "not_found"
  | "mobile_bar";

export type LandingSectionId =
  | "hero"
  | "para_quem_e"
  | "comparativo"
  | "funcionalidades"
  | "como_funciona"
  | "precos"
  | "faq"
  | "agendar_demo";

export type LandingNavSource = "header" | "header_mobile" | "footer";

export type BillingInterval = "monthly" | "yearly";

export type HowItWorksTab = "professional" | "client";

export type DemoFormErrorType = "validation" | "api" | "network";

function slugifyQuestion(question: string): string {
  return question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function getUtmSourceFromSearchParams(
  searchParams: URLSearchParams | null,
): string | undefined {
  const utmSource = searchParams?.get("utm_source")?.trim();
  return utmSource || undefined;
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

export function trackLandingHowItWorksTabChanged(tab: HowItWorksTab) {
  captureEvent("landing_how_it_works_tab_changed", { tab });
}

export function trackLandingFaqExpanded(question: string) {
  captureEvent("landing_faq_expanded", {
    question_id: slugifyQuestion(question),
  });
}

export function trackLandingDemoFormStarted(props: {
  preselected_tier: string;
  utm_source?: string;
}) {
  captureEvent("landing_demo_form_started", props);
}

export function trackLandingDemoFormSubmitted(props: {
  tier: string;
  has_phone: boolean;
  has_message: boolean;
}) {
  captureEvent("landing_demo_form_submitted", props);
}

export function trackLandingDemoFormSucceeded(props: {
  tier: string;
  has_phone: boolean;
  has_message: boolean;
}) {
  captureEvent("landing_demo_form_succeeded", props);
}

export function trackLandingDemoFormFailed(props: {
  error_type: DemoFormErrorType;
  field?: string;
}) {
  captureEvent("landing_demo_form_failed", props);
}

export function identifyLandingDemoLead(props: {
  email: string;
  name: string;
  subscribers_tier: string;
  has_phone: boolean;
}) {
  try {
    posthog.identify(props.email, {
      name: props.name,
      subscribers_tier: props.subscribers_tier,
      has_phone: props.has_phone,
    });
  } catch {
    // analytics must never break the product
  }
}
