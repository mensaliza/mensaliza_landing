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

const ENTER_MS = 900;
const HOLD_MS = 2000;
const RESET_MS = 520;
const GAP_MS = 380;

/** Proof scene: look at receipt, then reveal thank-you + scroll */
const PROOF_RECEIPT_HOLD_MS = 1800;
const PROOF_THANKS_ENTER_MS = 800;
const PROOF_THANKS_HOLD_MS = 2800;

type Reveal = {
  scene: number;
  bubbles: number;
};

type ChatItem =
  | { type: "day"; id: string; day: string }
  | { type: "bubble"; id: string; bubble: ChatBubble; stagger: number };

function buildVisibleItems(reveal: Reveal): ChatItem[] {
  const items: ChatItem[] = [];
  let lastDay: string | null = null;

  for (let sceneIndex = 0; sceneIndex <= reveal.scene; sceneIndex++) {
    const scene = SCENES[sceneIndex];
    const count =
      sceneIndex < reveal.scene ? scene.bubbles.length : Math.max(0, reveal.bubbles);
    if (count <= 0) continue;

    if (scene.day !== lastDay) {
      items.push({
        type: "day",
        id: `day-${scene.day}`,
        day: scene.day,
      });
      lastDay = scene.day;
    }

    for (let bubbleIndex = 0; bubbleIndex < count; bubbleIndex++) {
      items.push({
        type: "bubble",
        id: scene.bubbles[bubbleIndex].id,
        bubble: scene.bubbles[bubbleIndex],
        stagger: bubbleIndex,
      });
    }
  }

  return items;
}

export function WhatsappBillingDemo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [reveal, setReveal] = useState<Reveal>({ scene: 0, bubbles: 0 });
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());

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
      const last = SCENES.length - 1;
      setSceneIndex(last);
      setPhase("hold");
      setReveal({ scene: last, bubbles: SCENES[last].bubbles.length });
      setEnteringIds(new Set());
      return;
    }

    if (!inView) return;

    let cancelled = false;
    let timer: number | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const revealBatch = (next: Reveal, ids: string[]) => {
      setReveal(next);
      setEnteringIds(new Set(ids));
      setPhase("enter");
    };

    const idsForScene = (index: number, fromBubble: number, toBubble: number) => {
      const scene = SCENES[index];
      const ids: string[] = [];
      const previousDay = index > 0 ? SCENES[index - 1].day : null;
      if (fromBubble === 0 && scene.day !== previousDay) {
        ids.push(`day-${scene.day}`);
      }
      for (let i = fromBubble; i < toBubble; i++) {
        ids.push(scene.bubbles[i].id);
      }
      return ids;
    };

    const runStandardScene = async (index: number) => {
      const scene = SCENES[index];
      setSceneIndex(index);
      revealBatch(
        { scene: index, bubbles: scene.bubbles.length },
        idsForScene(index, 0, scene.bubbles.length)
      );
      await wait(ENTER_MS);
      if (cancelled) return;

      setPhase("hold");
      setEnteringIds(new Set());
      await wait(HOLD_MS);
    };

    const runProofScene = async (index: number) => {
      setSceneIndex(index);

      revealBatch({ scene: index, bubbles: 1 }, idsForScene(index, 0, 1));
      await wait(ENTER_MS);
      if (cancelled) return;

      setPhase("hold");
      setEnteringIds(new Set());
      await wait(PROOF_RECEIPT_HOLD_MS);
      if (cancelled) return;

      revealBatch({ scene: index, bubbles: 2 }, idsForScene(index, 1, 2));
      await wait(PROOF_THANKS_ENTER_MS);
      if (cancelled) return;

      setPhase("hold");
      setEnteringIds(new Set());
      await wait(PROOF_THANKS_HOLD_MS);
    };

    const resetConversation = async () => {
      setPhase("exit");
      setEnteringIds(new Set());
      await wait(RESET_MS);
      if (cancelled) return;

      setReveal({ scene: 0, bubbles: 0 });
      setSceneIndex(0);
      await wait(GAP_MS);
    };

    const loop = async () => {
      while (!cancelled) {
        setReveal({ scene: 0, bubbles: 0 });
        setEnteringIds(new Set());
        setPhase("enter");

        for (let index = 0; index < SCENES.length; index++) {
          if (cancelled) return;
          if (SCENES[index].id === "proof") {
            await runProofScene(index);
          } else {
            await runStandardScene(index);
          }
        }

        if (cancelled) return;
        await resetConversation();
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

    if (reveal.bubbles <= 0 && reveal.scene === 0) {
      scroller.scrollTop = 0;
      return;
    }

    const delays = [60, 220, 480, 760];
    const timers = delays.map((ms) => window.setTimeout(scrollToEnd, ms));

    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [reveal, phase, reducedMotion]);

  const playing = inView && !reducedMotion;
  const items = buildVisibleItems(
    reducedMotion
      ? { scene: SCENES.length - 1, bubbles: SCENES[SCENES.length - 1].bubbles.length }
      : reveal
  );

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
              className={cn(
                "whatsapp-scene flex min-h-full flex-col justify-end gap-2",
                playing && `is-${phase}`,
                !playing && "is-static"
              )}
            >
              {items.map((item) => {
                if (item.type === "day") {
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "whatsapp-day mx-auto rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-medium text-foreground/50",
                        playing && enteringIds.has(item.id) && "is-entering"
                      )}
                    >
                      {item.day}
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "whatsapp-bubble flex w-full",
                      item.bubble.side === "customer" ? "justify-end" : "justify-start",
                      playing && enteringIds.has(item.id) && "is-entering"
                    )}
                    style={{ "--i": item.stagger } as CSSProperties}
                  >
                    <BubbleContent bubble={item.bubble} />
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
