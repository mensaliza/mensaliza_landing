import type { Metadata } from "next";

import { NotFoundSection } from "@/components/landing/not-found-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "Página não encontrada — Mensaliza",
  description:
    "Essa página não existe. Volte ao início do Mensaliza ou crie sua conta.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader blendWithHero />
      <main id="conteudo-principal" className="flex flex-1 flex-col">
        <NotFoundSection />
      </main>
      <SiteFooter />
    </>
  );
}
