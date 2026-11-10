import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { SignupButton } from "@/components/landing/signup-button";
import { Button } from "@/components/ui/button";

export function NotFoundSection() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="flex min-h-svh min-w-0 flex-col justify-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <h1
          id="not-found-heading"
          className="max-w-[16ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance"
        >
          Essa página não existe
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-foreground/75 text-pretty">
          O endereço pode estar errado, ou o link saiu do ar. Volte ao início ou crie sua conta
          e deixe a cobrança dos seus alunos no automático.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            className="min-h-11 w-full px-4 font-medium sm:w-auto"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Voltar ao início
          </Button>
          <SignupButton className="w-full px-4 sm:w-auto" location="not_found" />
        </div>
      </div>
    </section>
  );
}
