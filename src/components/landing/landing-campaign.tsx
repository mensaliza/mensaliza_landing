"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

import { registerEventProperties, unregisterEventProperty } from "@/lib/analytics";
import type { BillingInterval, LandingAudience } from "@/lib/landing-analytics";
import type { SignupCampaignRef } from "@/lib/site-urls";

/**
 * A campaign page (e.g. /professores-de-tenis) reuses the home sections as they are.
 * What changes is set once here: every event on the page gets `audience`, and every
 * sign-up button carries the campaign's `ref` and preselected plan.
 */
export type LandingCampaign = {
  audience: LandingAudience;
  signupRef: SignupCampaignRef;
  plan?: string;
  billingInterval?: BillingInterval;
};

const LandingCampaignContext = createContext<LandingCampaign | null>(null);

export function useLandingCampaign() {
  return useContext(LandingCampaignContext);
}

export function LandingCampaignProvider({
  campaign,
  children,
}: {
  campaign: LandingCampaign;
  children: ReactNode;
}) {
  useEffect(() => {
    registerEventProperties({ audience: campaign.audience });
    // Leaving the page (client navigation to the home) must not keep tagging events.
    return () => unregisterEventProperty("audience");
  }, [campaign.audience]);

  return (
    <LandingCampaignContext.Provider value={campaign}>{children}</LandingCampaignContext.Provider>
  );
}
