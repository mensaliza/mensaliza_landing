"use client";

import { SignupButton } from "@/components/landing/signup-button";
import { TRIAL_TERMS } from "@/lib/landing-content";

type BlogCtaProps = {
  title?: string;
  description?: string;
};

/** Conversion block for posts. Usable inside MDX as `<BlogCta />`. */
export function BlogCta({
  title = "Deixe o Mensaliza cobrar por você",
  description = "No dia combinado, o Mensaliza manda a cobrança de cada aluno no WhatsApp e reúne os comprovantes num painel. O Pix cai direto na sua conta.",
}: BlogCtaProps) {
  return (
    <aside className="my-10 flex flex-col gap-4 rounded-xl border border-primary/35 bg-primary/[0.04] p-6 sm:p-8">
      <p className="font-heading text-xl font-semibold tracking-[-0.01em] text-balance text-foreground">
        {title}
      </p>
      <p className="m-0 leading-relaxed text-pretty text-foreground/72">{description}</p>
      <div className="flex flex-col gap-2">
        <SignupButton location="blog_post" className="w-full sm:w-auto sm:self-start" />
        <p className="m-0 text-sm text-foreground/70">{TRIAL_TERMS}</p>
      </div>
    </aside>
  );
}
