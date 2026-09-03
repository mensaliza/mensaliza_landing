"use client";

import {
  CheckCircle2Icon,
  FileImageIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "cn";

type Phase =
  | "list-enter"
  | "list-hold"
  | "click"
  | "dialog-enter"
  | "dialog-hold"
  | "approve-press"
  | "success-enter"
  | "success-hold"
  | "exit";

const PHASE_MS: Record<Phase, number> = {
  "list-enter": 700,
  "list-hold": 1100,
  click: 650,
  "dialog-enter": 750,
  "dialog-hold": 1800,
  "approve-press": 450,
  "success-enter": 700,
  "success-hold": 2600,
  exit: 550,
};

const PHASE_ORDER: Phase[] = [
  "list-enter",
  "list-hold",
  "click",
  "dialog-enter",
  "dialog-hold",
  "approve-press",
  "success-enter",
  "success-hold",
  "exit",
];

export function ProofApprovalDemo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<Phase>("list-enter");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("success-hold");
      return;
    }

    if (!inView) return;

    let cancelled = false;
    let timer: number | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const loop = async () => {
      while (!cancelled) {
        setCycle((c) => c + 1);
        for (const next of PHASE_ORDER) {
          if (cancelled) return;
          setPhase(next);
          await wait(PHASE_MS[next]);
        }
      }
    };

    void loop();

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [inView, reducedMotion]);

  const playing = inView && !reducedMotion;
  const showDialog =
    phase === "dialog-enter" ||
    phase === "dialog-hold" ||
    phase === "approve-press";
  const showSuccess =
    phase === "success-enter" || phase === "success-hold" || phase === "exit";
  const showList = !showSuccess;
  const stepIndex = showSuccess && phase !== "exit" ? 2 : showDialog ? 1 : phase === "exit" ? 2 : 0;

  return (
    <div
      ref={rootRef}
      className={cn("proof-approval-demo relative", className)}
      aria-label="Demonstração animada da aprovação de comprovante no Mensaliza"
      role="img"
    >
      <div
        key={cycle}
        className={cn(
          "relative flex h-full flex-col",
          playing && `is-${phase}`
        )}
      >
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div>
            <p className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-foreground sm:text-sm">
              Pagamentos
            </p>
            <p className="text-[11px] text-foreground/72 sm:text-[11px]">
              Comprovantes pendentes de aprovação
            </p>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden>
            {["Recebido", "Verificar", "Aprovado"].map((label, index) => (
              <span
                key={label}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  index === stepIndex ? "w-5 bg-primary" : "w-1.5 bg-foreground/20"
                )}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          {showList ? (
            <div
              className={cn(
                "proof-list flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card",
                phase === "list-enter" && "is-entering"
              )}
            >
              <div className="hidden grid-cols-[1.2fr_0.7fr_0.7fr_auto] gap-2 border-b border-border/60 px-3 py-2 text-[11px] font-medium text-foreground/72 sm:grid">
                <span>Assinante</span>
                <span>Valor</span>
                <span>Status</span>
                <span className="text-right">Ação</span>
              </div>

              <PaymentRow
                name="maria clara leveghim"
                amount="R$ 200,00"
                status="Aprovado"
                muted
              />
              <PaymentRow
                name="lucas mendes oliveira"
                amount="R$ 400,00"
                status="Pendente"
                action="Verificar comprovante"
                highlight={phase === "list-hold" || phase === "click"}
                pressing={phase === "click"}
                active
              />
              <PaymentRow
                name="ana beatriz costa"
                amount="R$ 180,00"
                status="Em aberto"
                muted
              />
            </div>
          ) : null}

          {showDialog ? (
            <div
              className={cn(
                "proof-dialog-shell absolute inset-0 flex items-center justify-center p-1 sm:p-2",
                phase === "dialog-enter" && "is-entering"
              )}
            >
              <div className="absolute inset-0 rounded-xl bg-foreground/25" aria-hidden />
              <div
                className={cn(
                  "proof-dialog relative flex w-full max-w-[22rem] flex-col overflow-hidden rounded-xl border border-border bg-card",
                  phase === "approve-press" && "is-approving"
                )}
              >
                <div className="flex items-center justify-between border-b border-border/70 px-3 py-2.5">
                  <div>
                    <p className="text-[12px] font-semibold text-foreground sm:text-[13px]">
                      Verificar comprovante
                    </p>
                    <p className="text-[11px] text-foreground/72">
                      lucas mendes oliveira · R$ 400,00
                    </p>
                  </div>
                  <span className="flex size-7 items-center justify-center rounded-md text-foreground/40">
                    <XIcon className="size-3.5" aria-hidden />
                  </span>
                </div>

                <div className="px-3 py-3 sm:px-3.5 sm:py-3.5">
                  <ProofReceiptCard />
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-border/70 px-3 py-3 sm:px-3.5">
                  <span className="inline-flex h-9 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-[12px] font-semibold text-destructive">
                    Rejeitar
                  </span>
                  <span
                    className={cn(
                      "proof-approve-btn inline-flex h-9 items-center justify-center rounded-lg bg-primary text-[12px] font-semibold text-primary-foreground",
                      phase === "approve-press" && "is-pressed"
                    )}
                  >
                    Aprovar
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          {showSuccess ? (
            <div
              className={cn(
                "proof-success absolute inset-0 flex items-center justify-center",
                phase === "success-enter" && "is-entering",
                phase === "exit" && "is-exiting"
              )}
            >
              <div className="flex w-full max-w-[20rem] flex-col items-center gap-3 rounded-xl border border-border bg-card px-5 py-6 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <CheckCircle2Icon className="size-6" aria-hidden />
                </span>
                <div className="space-y-1">
                  <p className="font-heading text-base font-semibold tracking-[-0.02em] text-foreground">
                    Comprovante aprovado
                  </p>
                  <p className="text-[12px] leading-relaxed text-foreground/55 text-pretty">
                    Pagamento de <span className="font-semibold text-foreground">R$ 400,00</span> de
                    Lucas confirmado.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PaymentRow({
  name,
  amount,
  status,
  action,
  highlight = false,
  pressing = false,
  active = false,
  muted = false,
}: {
  name: string;
  amount: string;
  status: string;
  action?: string;
  highlight?: boolean;
  pressing?: boolean;
  active?: boolean;
  muted?: boolean;
}) {
  const pending = status === "Pendente";

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-2 border-b border-border/50 px-3 py-2.5 last:border-b-0 sm:grid-cols-[1.2fr_0.7fr_0.7fr_auto] sm:gap-2",
        muted && "opacity-55",
        highlight && "proof-row-highlight bg-primary/[0.04]",
        active && "relative"
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-foreground sm:text-xs">{name}</p>
        <p className="text-[11px] text-foreground/72 sm:hidden">{amount}</p>
      </div>
      <p className="hidden text-[11px] font-medium tabular-nums text-foreground sm:block">
        {amount}
      </p>
      <span
        className={cn(
          "hidden rounded-md px-1.5 py-0.5 text-[11px] font-medium sm:inline-flex",
          pending
            ? "bg-primary/12 text-primary"
            : status === "Aprovado"
              ? "bg-muted text-foreground/60"
              : "bg-muted text-foreground/55"
        )}
      >
        {status}
      </span>
      <div className="flex justify-end">
        {action ? (
          <span
            className={cn(
              "proof-verify-btn inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2 py-1.5 text-[11px] font-semibold text-primary",
              pressing && "is-pressed"
            )}
          >
            <FileImageIcon className="size-3" aria-hidden />
            {action}
          </span>
        ) : (
          <span className="text-[11px] text-foreground/72">—</span>
        )}
      </div>
    </div>
  );
}

function ProofReceiptCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-muted/50">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
        <span className="text-[11px] font-semibold text-foreground/72">Comprovante Pix</span>
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
          Enviado pelo cliente
        </span>
      </div>
      <div className="space-y-2 px-3 py-3">
        <div className="space-y-1.5">
          <div className="h-2 w-2/5 rounded-full bg-foreground/10" />
          <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
          <div className="h-2 w-3/5 rounded-full bg-foreground/10" />
          <div className="h-2 w-1/2 rounded-full bg-foreground/10" />
        </div>
        <div className="rounded-md bg-card px-3 py-2.5">
          <p className="text-[11px] text-foreground/72">Valor pago</p>
          <p className="font-heading text-lg font-semibold tracking-[-0.02em] text-foreground">
            R$ 400,00
          </p>
          <p className="mt-1 text-[11px] text-foreground/72">28/07/2026 · 10:41</p>
        </div>
      </div>
    </div>
  );
}
