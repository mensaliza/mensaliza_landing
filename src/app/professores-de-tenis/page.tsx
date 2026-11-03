import { TennisFaq } from "@/components/landing/tennis/tennis-faq";
import { TennisFinalCta } from "@/components/landing/tennis/tennis-final-cta";
import { TennisHero } from "@/components/landing/tennis/tennis-hero";
import { TennisHowItWorks } from "@/components/landing/tennis/tennis-how-it-works";
import { TennisMobileBar } from "@/components/landing/tennis/tennis-mobile-bar";
import { TennisPain } from "@/components/landing/tennis/tennis-pain";
import { TennisProduct } from "@/components/landing/tennis/tennis-product";
import { TennisRoutine } from "@/components/landing/tennis/tennis-routine";
import { TennisSiteFooter } from "@/components/landing/tennis/tennis-site-footer";
import { TennisSiteHeader } from "@/components/landing/tennis/tennis-site-header";
import { TennisSolution } from "@/components/landing/tennis/tennis-solution";
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
      <TennisSiteHeader />
      <main id="conteudo-principal">
        <TennisHero />
        <TennisPain />
        <TennisSolution />
        <TennisHowItWorks />
        <TennisProduct />
        <TennisRoutine />
        <TennisFaq />
        <TennisFinalCta />
      </main>
      <div className="pb-[calc(5.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <TennisSiteFooter />
      </div>
      <TennisMobileBar />
    </>
  );
}
