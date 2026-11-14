"use client";

import { CheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "cn";

type ScenePhase = "charge" | "receipt" | "review" | "approved";

const PHASES: ScenePhase[] = ["charge", "receipt", "review", "approved"];

const PHASE_MS: Record<ScenePhase, number> = {
  charge: 1400,
  receipt: 1500,
  review: 1100,
  approved: 10_000,
};

const PHASE_LABEL: Record<ScenePhase, string> = {
  charge: "O Mensaliza cobra",
  receipt: "A aluna envia o comprovante",
  review: "Você revisa no painel",
  approved: "Aprovado por você",
};

export function TennisHeroScene({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<ScenePhase>("charge");

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
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("approved");
      return;
    }

    if (!inView) {
      setPhase("charge");
      return;
    }

    const timer = window.setTimeout(() => {
      const index = PHASES.indexOf(phase);
      setPhase(PHASES[(index + 1) % PHASES.length]);
    }, PHASE_MS[phase]);

    return () => window.clearTimeout(timer);
  }, [inView, phase, reducedMotion]);

  const showReceipt = phase !== "charge";
  const showReview = phase === "review" || phase === "approved";
  const approved = phase === "approved";

  return (
    <figure
      ref={rootRef}
      id="tennis-hero-scene"
      className={cn("flex w-full max-w-[22rem] flex-col gap-3", className)}
      aria-label="O Mensaliza cobra a aluna Ana, ela envia o comprovante e você aprova no painel"
    >
      <p className="text-sm font-medium text-foreground" aria-live="polite">
        {PHASE_LABEL[phase]}
      </p>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border/80 px-3 py-2.5">
          <span className="size-2 rounded-full bg-primary" aria-hidden />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">Mensaliza</p>
            <p className="truncate text-xs text-foreground/72">Conversa com Ana</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-muted/50 px-3 py-3">
          <div
            key={phase === "charge" ? "charge-in" : "charge-hold"}
            className={cn(
              "max-w-[16rem] rounded-xl rounded-tl-sm border border-border bg-card px-3 py-2",
              !reducedMotion && phase === "charge" && "tennis-scene-rise"
            )}
          >
            <p className="text-sm leading-snug text-foreground text-pretty">
              Olá, Ana! Lucas registrou uma cobrança de R$&nbsp;280,00. Vencimento: 05/11/2026.
            </p>
            <p className="mt-1 text-xs text-foreground/72">09:12</p>
          </div>

          {showReceipt ? (
            <div
              className={cn(
                "ml-auto w-[9.5rem] rounded-xl rounded-tr-sm border border-primary/35 bg-primary/[0.06] px-3 py-2",
                !reducedMotion && phase === "receipt" && "tennis-scene-rise"
              )}
            >
              <div
                className="mb-2 flex h-14 flex-col justify-center gap-1 rounded-md border border-border bg-card px-2"
                aria-hidden
              >
                <span className="h-1 w-10 rounded-full bg-foreground/25" />
                <span className="h-1 w-14 rounded-full bg-foreground/15" />
                <span className="font-mono text-xs text-foreground/72">R$ 280,00</span>
              </div>
              <p className="text-sm font-medium text-foreground">Comprovante</p>
              <p className="text-xs text-foreground/72">10:04 · Ana</p>
            </div>
          ) : null}
        </div>

        {showReview ? (
          <div
            className={cn(
              "border-t border-border px-3 py-3",
              !reducedMotion && phase === "review" && "tennis-scene-rise"
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">Ana Costa</p>
              <p className="font-heading text-sm font-semibold tabular-nums text-foreground">R$&nbsp;280,00</p>
            </div>
            {approved ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                <CheckIcon className="size-4 text-primary" aria-hidden />
                Aprovado por você
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <span className="inline-flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium text-foreground">
                  Rejeitar
                </span>
                <span className="inline-flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                  Aprovar
                </span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </figure>
  );
}
