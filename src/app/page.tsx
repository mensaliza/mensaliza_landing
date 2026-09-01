import type { Metadata } from "next";

import { AudienceSection } from "@/components/landing/audience-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ReliefSection } from "@/components/landing/relief-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  buildHomeJsonLd,
  buildOpenGraph,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: buildOpenGraph({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <SiteHeader blendWithHero />
      <main id="conteudo-principal">
        <HeroSection />
        <AudienceSection />
        <ReliefSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <div className="pb-24 lg:pb-0">
        <SiteFooter />
      </div>
    </>
  );
}
