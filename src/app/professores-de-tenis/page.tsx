import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { TennisFaq } from "@/components/landing/tennis/tennis-faq";
import { TennisFinalCta } from "@/components/landing/tennis/tennis-final-cta";
import { TennisHero } from "@/components/landing/tennis/tennis-hero";
import { TennisHowItWorks } from "@/components/landing/tennis/tennis-how-it-works";
import { TennisMobileBar } from "@/components/landing/tennis/tennis-mobile-bar";
import { TennisPain } from "@/components/landing/tennis/tennis-pain";
import { TennisPricing } from "@/components/landing/tennis/tennis-pricing";
import { TennisProduct } from "@/components/landing/tennis/tennis-product";
import { TennisTestimonials } from "@/components/landing/tennis/tennis-testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { TENNIS_LANDING_AUDIENCE } from "@/lib/landing-analytics";
import { buildPageMetadata, buildTennisLandingJsonLd } from "@/lib/seo";
import { TENNIS_SIGNUP_CAMPAIGN_REF } from "@/lib/site-urls";
import {
  TENNIS_LANDING_PATH,
  tennisFooterTagline,
  tennisNavLinks,
  tennisPlan,
} from "@/lib/tennis-landing-content";

export const metadata = buildPageMetadata({
  title: "Cobrança para professores de tênis e beach tennis",
  openGraphTitle:
    "Cobrança para professores de tênis e beach tennis — Mensaliza",
  description:
    "Para professores de tênis e beach tennis: o Mensaliza cobra pelo WhatsApp, o comprovante chega na mesma conversa e você aprova no painel. O Pix cai direto na sua conta.",
  path: TENNIS_LANDING_PATH,
});

export default function ProfessoresDeTenisPage() {
  return (
    <>
      <JsonLd data={buildTennisLandingJsonLd()} />
      <SiteHeader
        blendWithHero
        links={tennisNavLinks}
        audience={TENNIS_LANDING_AUDIENCE}
        signup={{
          label: "Testar grátis",
          location: "tennis_header",
          mobileLocation: "tennis_header_mobile",
          plan: tennisPlan.slug,
          billingInterval: tennisPlan.interval,
          audience: TENNIS_LANDING_AUDIENCE,
          campaignRef: TENNIS_SIGNUP_CAMPAIGN_REF,
        }}
      />
      <main id="conteudo-principal">
        <TennisHero />
        <TennisPain />
        <TennisHowItWorks />
        <TennisProduct />
        <TennisTestimonials />
        <TennisPricing />
        <TennisFaq />
        <TennisFinalCta />
      </main>
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <SiteFooter
          links={tennisNavLinks}
          tagline={tennisFooterTagline}
          showDemoLink={false}
          audience={TENNIS_LANDING_AUDIENCE}
        />
      </div>
      <TennisMobileBar />
    </>
  );
}
