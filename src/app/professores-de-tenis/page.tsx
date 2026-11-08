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
    "Para professores de tênis e beach tennis: cobrança pelo WhatsApp do Mensaliza, comprovante na mesma conversa e aprovação no painel. O Pix vai direto para você.",
  path: "/professores-de-tenis",
});

export default function ProfessoresDeTenisPage() {
  return (
    <>
      <JsonLd data={buildTennisLandingJsonLd()} />
      <div className="fixed inset-0 flex flex-col lg:static lg:block lg:h-auto">
        <div
          id="tennis-scroll"
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain lg:contents"
        >
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
      </div>
    </>
  );
}
