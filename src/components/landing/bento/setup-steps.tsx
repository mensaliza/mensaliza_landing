import { CheckIcon } from "lucide-react";
import type { ReactNode } from "react";

import { professionalSteps } from "@/lib/landing-content";
import { cn } from "cn";

/**
 * The professional's three setup steps as one column of cards: number, title and line on the
 * left, a small piece of the app on the right showing what that step looks like.
 */

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn("flex min-w-0 flex-col gap-1", className)}>
      <span className="text-[10.5px] font-medium text-foreground/50">{label}</span>
      <span className="flex h-7 items-center truncate rounded-md px-2 text-[12px] font-medium ring-1 ring-foreground/10 ring-inset">
        {value}
      </span>
    </span>
  );
}

function StudentFormPiece() {
  return (
    <div className="bento-piece w-[13.5rem] rounded-xl p-3">
      <span className="text-[12px] font-semibold">Novo aluno</span>
      <div className="mt-2 grid grid-cols-[1fr_5rem] gap-2">
        <Field label="Nome" value="Ana" />
        <Field label="Valor" value="R$ 150,00" />
        <Field label="WhatsApp" value="(11) 98765-4321" />
        <Field label="Vencimento" value="Dia 17" />
      </div>
    </div>
  );
}

function PixKeyPiece() {
  return (
    <div className="bento-piece w-[13.5rem] rounded-xl p-3">
      <Field label="Sua chave Pix" value="rafapersonal@email.com" />
      <span className="mt-2.5 inline-flex h-6 items-center gap-1.5 rounded-full bg-[#d3f8dd] px-2.5 text-[11.5px] font-semibold text-[#047a33]">
        <CheckIcon className="size-3" strokeWidth={3} aria-hidden />
        Chave salva
      </span>
    </div>
  );
}

function AuthorizationPiece() {
  return (
    <div className="flex w-[14rem] flex-col gap-1.5">
      <div className="overflow-hidden rounded-xl rounded-tl-sm bg-white text-[11.5px] leading-snug shadow-[0_1px_1px_rgb(0_0_0/0.06)]">
        <p className="px-2.5 pt-2 pb-1.5">Você autoriza receber mensagens do nosso bot?</p>
        <p className="border-t border-foreground/8 py-1.5 text-center font-medium text-[#0a7cff]">Sim, autorizo</p>
      </div>
      <div className="ml-auto w-fit rounded-xl rounded-tr-sm bg-[oklch(from_var(--primary)_0.93_calc(c*0.35)_h)] px-2.5 py-1.5 text-[11.5px] font-medium">
        Sim, autorizo
      </div>
    </div>
  );
}

const PIECES: { piece: ReactNode; whatsapp?: boolean }[] = [
  { piece: <StudentFormPiece /> },
  { piece: <PixKeyPiece /> },
  { piece: <AuthorizationPiece />, whatsapp: true },
];

export function SetupSteps({ className }: { className?: string }) {
  return (
    <ol className={cn("flex list-none flex-col gap-4 p-0", className)}>
      {professionalSteps.map((step, index) => {
        const { piece, whatsapp } = PIECES[index];
        return (
          <li
            key={step.title}
            className="bento-stage bento-stage--on-tint grid flex-1 overflow-hidden rounded-[1.75rem] sm:grid-cols-[minmax(0,1fr)_14rem] lg:grid-cols-[minmax(0,1fr)_11.5rem] xl:grid-cols-[minmax(0,1fr)_15.5rem]"
          >
            <div className="flex flex-col gap-1.5 p-5 sm:p-6">
              <span aria-hidden className="text-[13px] font-semibold text-primary tabular-nums">
                Passo {index + 1}
              </span>
              <h3 className="text-lg leading-snug font-semibold tracking-[-0.015em]">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-foreground/70 text-pretty">{step.description}</p>
            </div>

            {/* What this step looks like in the app; the piece runs off the bottom edge */}
            <div
              aria-hidden
              className={cn(
                "relative flex min-h-36 justify-center overflow-hidden pt-5 max-sm:order-first sm:justify-start sm:pt-6 sm:pl-5",
                whatsapp ? "bg-[#efeae2]" : "bg-[oklch(0.962_0.004_70)]"
              )}
            >
              <div className="bento-fade-step">{piece}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
