import { CtaSection } from "@/components/landing/cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { LandingCampaignProvider } from "@/components/landing/landing-campaign";
import { PricingSection } from "@/components/landing/pricing-section";
import { ReliefSection } from "@/components/landing/relief-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { TennisHero } from "@/components/landing/tennis/tennis-hero";
import { TennisTestimonials } from "@/components/landing/tennis/tennis-testimonials";
import { WhatsAppFloatingButton } from "@/components/landing/whatsapp-floating-button";
import { JsonLd } from "@/components/seo/json-ld";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { buildBreadcrumbJsonLd, buildFaqPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { TENNIS_SIGNUP_CAMPAIGN_REF } from "@/lib/site-urls";
import {
  TENNIS_DEFAULT_PLAN,
  TENNIS_LANDING_PATH,
  tennisCta,
  tennisFaq,
  tennisFeatures,
  tennisFooterTagline,
  tennisHowItWorks,
  tennisNavLinks,
  tennisRelief,
} from "@/lib/tennis-landing-content";

export const metadata = buildPageMetadata({
  title: "Cobrança para professores de tênis e beach tennis",
  openGraphTitle: "Cobrança para professores de tênis e beach tennis — Mensaliza",
  description:
    "Para professores de tênis e beach tennis: o Mensaliza cobra seus alunos no WhatsApp, o comprovante chega na mesma conversa e você confirma no painel. O Pix cai direto na sua conta.",
  path: TENNIS_LANDING_PATH,
});

/** Campaign page: the home sections, in the home order, with copy for tennis teachers. */
export default function ProfessoresDeTenisPage() {
  return (
    <LandingCampaignProvider
      campaign={{
        audience: TENNIS_LANDING_AUDIENCE,
        signupRef: TENNIS_SIGNUP_CAMPAIGN_REF,
        plan: TENNIS_DEFAULT_PLAN,
        billingInterval: "monthly",
      }}
    >
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Professores de tênis e beach tennis", path: TENNIS_LANDING_PATH },
          ]),
          buildFaqPageJsonLd(tennisFaq.items),
        ]}
      />
      <SiteHeader blendWithHero links={tennisNavLinks} />
      <main id="conteudo-principal">
        <TennisHero />
        <ReliefSection content={tennisRelief} />
        <HowItWorksSection content={tennisHowItWorks} />
        <FeaturesSection content={tennisFeatures} />
        <TennisTestimonials />
        <PricingSection />
        <FaqSection content={tennisFaq} />
        <CtaSection content={tennisCta} />
      </main>
      <SiteFooter links={tennisNavLinks} tagline={tennisFooterTagline} />
      <WhatsAppFloatingButton />
    </LandingCampaignProvider>
  );
}
