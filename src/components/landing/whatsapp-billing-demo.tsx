"use client";

import { CheckCheckIcon, LinkIcon, PhoneIcon, VideoIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type BubbleSide = "bot" | "customer";

type ChatBubble = {
  id: string;
  side: BubbleSide;
  kind: "text" | "link" | "receipt";
  text?: string;
  time: string;
};

type Scene = {
  id: string;
  day: string;
  bubbles: ChatBubble[];
};

const SCENES: Scene[] = [
  {
    id: "reminder",
    day: "20 de julho",
    bubbles: [
      {
        id: "r1",
        side: "bot",
        kind: "text",
        text: "Oi, Lucas! Passando para lembrar da sua mensalidade de R$ 400,00.",
        time: "09:12",
      },
      {
        id: "r2",
        side: "bot",
        kind: "link",
        text: "Pagar mensalidade · vence em 28/07",
        time: "09:12",
      },
    ],
  },
  {
    id: "lastday",
    day: "28 de julho",
    bubbles: [
      {
        id: "l1",
        side: "bot",
        kind: "text",
        text: "Lucas, hoje é o último dia para pagar sua mensalidade de R$ 400,00.",
        time: "08:05",
      },
      {
        id: "l2",
        side: "bot",
        kind: "link",
        text: "Abrir cobrança · R$ 400,00",
        time: "08:05",
      },
    ],
  },
  {
    id: "proof",
    day: "28 de julho",
    bubbles: [
      {
        id: "p1",
        side: "customer",
        kind: "receipt",
        time: "10:41",
      },
      {
        id: "p2",
        side: "bot",
        kind: "text",
        text: "Recebemos seu comprovante, Lucas! Obrigado — em breve confirmamos o pagamento.",
        time: "10:41",
      },
    ],
  },
];

const ENTER_MS = 1200;
const HOLD_MS = 2400;
const EXIT_MS = 500;
const GAP_MS = 220;

/** Proof scene: look at receipt, then reveal thank-you + scroll */
const PROOF_RECEIPT_HOLD_MS = 2000;
const PROOF_THANKS_ENTER_MS = 900;
const PROOF_THANKS_HOLD_MS = 3200;

export function WhatsappBillingDemo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [visibleCount, setVisibleCount] = useState(2);

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
      setSceneIndex(2);
      setPhase("hold");
      setVisibleCount(SCENES[2].bubbles.length);
      return;
    }

    if (!inView) return;

    let cancelled = false;
    let timer: number | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const runStandardScene = async (index: number) => {
      setSceneIndex(index);
      setVisibleCount(SCENES[index].bubbles.length);
      setPhase("enter");
      await wait(ENTER_MS);
      if (cancelled) return;

      setPhase("hold");
      await wait(HOLD_MS);
      if (cancelled) return;

      setPhase("exit");
      await wait(EXIT_MS);
      if (cancelled) return;

      await wait(GAP_MS);
    };

    const runProofScene = async (index: number) => {
      setSceneIndex(index);
      setVisibleCount(1);
      setPhase("enter");
      await wait(ENTER_MS);
      if (cancelled) return;

      // Let the receipt sit on screen before thank-you + scroll
      setPhase("hold");
      await wait(PROOF_RECEIPT_HOLD_MS);
      if (cancelled) return;

      setVisibleCount(2);
      setPhase("enter");
      await wait(PROOF_THANKS_ENTER_MS);
      if (cancelled) return;

      setPhase("hold");
      await wait(PROOF_THANKS_HOLD_MS);
      if (cancelled) return;

      setPhase("exit");
      await wait(EXIT_MS);
      if (cancelled) return;

      await wait(GAP_MS);
    };

    const loop = async () => {
      let index = 0;
      while (!cancelled) {
        if (SCENES[index].id === "proof") {
          await runProofScene(index);
        } else {
          await runStandardScene(index);
        }
        if (cancelled) break;
        index = (index + 1) % SCENES.length;
      }
    };

    void loop();

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [inView, reducedMotion]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const scrollToEnd = () => {
      scroller.scrollTo({
        top: scroller.scrollHeight,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    };

    // Keep receipt framed at the top until thank-you appears.
    if (sceneIndex === 2 && visibleCount <= 1 && phase !== "exit") {
      scroller.scrollTop = 0;
      return;
    }

    if (phase === "enter" && visibleCount <= 1) {
      scroller.scrollTop = 0;
    }

    const delays =
      sceneIndex === 2 && visibleCount > 1
        ? [80, 280, 520]
        : [180, 420, 720];

    const timers = delays.map((ms) => window.setTimeout(scrollToEnd, ms));

    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [sceneIndex, phase, visibleCount, reducedMotion]);

  const playing = inView && !reducedMotion;
  const scene = SCENES[sceneIndex];
  const visibleBubbles = scene.bubbles.slice(0, visibleCount);

  return (
    <div
      ref={rootRef}
      className={cn("whatsapp-billing-demo relative", className)}
      aria-label="Demonstração animada das mensagens de cobrança no WhatsApp"
      role="img"
    >
      <div className="relative flex h-full items-center justify-center py-1 sm:py-2">
        <div className="whatsapp-phone flex h-full w-full max-w-[17.5rem] flex-col overflow-hidden rounded-[1.35rem] border border-border bg-[#ececec] shadow-[inset_0_0_0_1px_oklch(1_0_0/0.4)] sm:max-w-[18.5rem]">
          <header className="flex shrink-0 items-center gap-2.5 border-b border-black/5 bg-[#f0f2f5] px-3 py-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              M
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-tight text-foreground">
                Mensaliza
              </p>
              <p className="truncate text-[10px] leading-tight text-foreground/45">
                cobrança automática
              </p>
            </div>
            <div className="flex items-center gap-2.5 text-foreground/40">
              <VideoIcon className="size-3.5" aria-hidden />
              <PhoneIcon className="size-3.5" aria-hidden />
            </div>
          </header>

          <div
            ref={scrollRef}
            className="whatsapp-scroll relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2.5 py-3"
          >
            <div
              key={scene.id}
              className={cn(
                "whatsapp-scene flex min-h-full flex-col justify-end gap-2",
                playing && `is-${phase}`,
                !playing && "is-static"
              )}
            >
              <div
                className={cn(
                  "whatsapp-day mx-auto rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-medium text-foreground/50",
                  playing && phase === "enter" && visibleCount === 1 && "is-entering"
                )}
              >
                {scene.day}
              </div>

              {visibleBubbles.map((bubble, index) => {
                const isNewBubble =
                  playing &&
                  phase === "enter" &&
                  (scene.id !== "proof" || visibleCount === 1
                    ? true
                    : index === visibleCount - 1);

                return (
                  <div
                    key={bubble.id}
                    className={cn(
                      "whatsapp-bubble flex w-full",
                      bubble.side === "customer" ? "justify-end" : "justify-start",
                      isNewBubble && "is-entering"
                    )}
                    style={
                      {
                        "--i": scene.id === "proof" && visibleCount > 1 ? 0 : index,
                      } as CSSProperties
                    }
                  >
                    <BubbleContent bubble={bubble} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center gap-1.5 border-t border-black/5 bg-[#f0f2f5] px-3 py-2">
            {SCENES.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  index === sceneIndex
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-foreground/20"
                )}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BubbleContent({ bubble }: { bubble: ChatBubble }) {
  const isCustomer = bubble.side === "customer";

  if (bubble.kind === "receipt") {
    return (
      <div className="max-w-[78%] overflow-hidden rounded-xl rounded-br-sm bg-[oklch(from_var(--primary)_0.93_calc(c*0.35)_h)] p-1.5">
        <ReceiptMock />
        <BubbleMeta time={bubble.time} outgoing />
      </div>
    );
  }

  if (bubble.kind === "link") {
    return (
      <div className="max-w-[85%] overflow-hidden rounded-xl rounded-bl-sm bg-white px-2.5 py-2">
        <div className="mb-1.5 overflow-hidden rounded-lg border border-primary/20 bg-primary/[0.06]">
          <div className="flex items-center gap-2 px-2.5 py-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LinkIcon className="size-3.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-foreground">
                Link de cobrança
              </p>
              <p className="truncate text-[10px] text-foreground/50">
                {bubble.text}
              </p>
            </div>
          </div>
        </div>
        <p className="text-[11px] leading-snug text-primary">mensaliza.com/pagar</p>
        <BubbleMeta time={bubble.time} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "max-w-[85%] rounded-xl px-2.5 py-2 text-[12px] leading-snug text-foreground",
        isCustomer
          ? "rounded-br-sm bg-[oklch(from_var(--primary)_0.93_calc(c*0.35)_h)]"
          : "rounded-bl-sm bg-white"
      )}
    >
      <p className="text-pretty">{bubble.text}</p>
      <BubbleMeta time={bubble.time} outgoing={isCustomer} />
    </div>
  );
}

function BubbleMeta({
  time,
  outgoing = false,
}: {
  time: string;
  outgoing?: boolean;
}) {
  return (
    <span className="mt-1 flex items-center justify-end gap-0.5 text-[9px] leading-none text-foreground/40">
      {time}
      {outgoing ? <CheckCheckIcon className="size-3 text-primary/70" aria-hidden /> : null}
    </span>
  );
}

function ReceiptMock() {
  return (
    <div className="relative aspect-[5/3.4] w-[8.25rem] overflow-hidden rounded-md bg-white sm:w-[9rem]">
      <div className="flex h-full flex-col gap-1 p-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold text-foreground/50">Comprovante Pix</span>
          <span className="rounded bg-primary/10 px-1 py-0.5 text-[8px] font-semibold text-primary">
            Enviado
          </span>
        </div>
        <div className="mt-0.5 space-y-1">
          <div className="h-1.5 w-3/5 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-2/5 rounded-full bg-foreground/10" />
        </div>
        <div className="mt-auto rounded-md bg-muted/80 px-2 py-1.5">
          <p className="text-[8px] text-foreground/45">Valor</p>
          <p className="font-heading text-[12px] font-semibold tracking-[-0.02em] text-foreground">
            R$ 400,00
          </p>
        </div>
      </div>
    </div>
  );
}
