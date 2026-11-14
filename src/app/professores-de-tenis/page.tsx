import { TennisFaq } from "@/components/landing/tennis/tennis-faq";
import { TennisFinalCta } from "@/components/landing/tennis/tennis-final-cta";
import { TennisHero } from "@/components/landing/tennis/tennis-hero";
import { TennisHowItWorks } from "@/components/landing/tennis/tennis-how-it-works";
import { TennisMobileBar } from "@/components/landing/tennis/tennis-mobile-bar";
import { TennisPain } from "@/components/landing/tennis/tennis-pain";
import { TennisPricing } from "@/components/landing/tennis/tennis-pricing";
import { TennisProduct } from "@/components/landing/tennis/tennis-product";
import { TennisSiteFooter } from "@/components/landing/tennis/tennis-site-footer";
import { TennisSiteHeader } from "@/components/landing/tennis/tennis-site-header";
import { TennisTestimonials } from "@/components/landing/tennis/tennis-testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata, buildTennisLandingJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Cobrança para professores de tênis e beach tennis",
  openGraphTitle:
    "Cobrança para professores de tênis e beach tennis — Mensaliza",
  description:
    "Para professores de tênis e beach tennis: o Mensaliza cobra pelo WhatsApp, o comprovante chega na mesma conversa e você aprova no painel. O Pix cai direto na sua conta.",
  path: "/professores-de-tenis",
});

export default function ProfessoresDeTenisPage() {
  return (
    <>
      <JsonLd data={buildTennisLandingJsonLd()} />
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <TennisSiteHeader />
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
        <TennisSiteFooter />
      </div>
      <TennisMobileBar />
    </>
  );
}
