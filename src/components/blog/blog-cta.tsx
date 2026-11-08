"use client";

import { ArrowRightIcon } from "lucide-react";

import { SignupButton } from "@/components/landing/signup-button";
import { Button } from "@/components/ui/button";
import { trackLandingCta } from "@/lib/landing-analytics";
import { getDemoLinkProps } from "@/lib/site-urls";

type BlogCtaProps = {
  title?: string;
  description?: string;
};

/** Conversion block for posts. Usable inside MDX as `<BlogCta />`. */
export function BlogCta({
  title = "Deixe o Mensaliza cobrar por você",
  description = "No vencimento de cada assinante, o Mensaliza envia a cobrança pelo WhatsApp e reúne os comprovantes num painel. O Pix cai direto na sua conta.",
}: BlogCtaProps) {
  const demoLink = getDemoLinkProps();

  return (
    <aside className="my-10 flex flex-col gap-4 rounded-xl border border-primary/35 bg-primary/[0.04] p-6 sm:p-8">
      <p className="font-heading text-xl font-semibold tracking-[-0.01em] text-balance text-foreground">
        {title}
      </p>
      <p className="m-0 leading-relaxed text-pretty text-foreground/72">{description}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          size="lg"
          className="demo-cta-motion w-full sm:w-auto"
          nativeButton={false}
          render={
            <a
              {...demoLink}
              onClick={() => trackLandingCta({ cta: "demo", location: "blog_post" })}
            />
          }
        >
          Agendar demonstração
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
        {/* Same destination as the header's "Começar" (app sign-up). */}
        <SignupButton
          variant="outline"
          label="Começar grátis"
          showIcon={false}
          location="blog_post"
          className="w-full sm:w-auto"
        />
      </div>
    </aside>
  );
}
