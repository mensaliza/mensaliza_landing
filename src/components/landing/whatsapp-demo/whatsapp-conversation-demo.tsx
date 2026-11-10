"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "cn";

import { PhoneFrame } from "./phone-frame";
import { createWaiter, useDemoPlayback } from "./use-demo-playback";
import {
  ConfirmedMessage,
  PaymentMessage,
  ReceiptReceivedMessage,
  ReceiptSentMessage,
  ReminderMessage,
  type Conversation,
} from "./whatsapp-messages";

/**
 * Port of the app's `WhatsappConversationDemo` (first screen of /auth/register):
 * charge → reminder → receipt → confirmation, looping while on screen.
 * The first message is visible at rest, so the hero never opens on an empty phone.
 */

type BubbleKind = "payment" | "reminder" | "receipt-sent" | "receipt-received" | "confirmed";

type Scene = {
  id: string;
  day: "charge" | "due";
  bubbles: BubbleKind[];
  staggered?: boolean;
};

const SCENES: Scene[] = [
  { id: "charge", day: "charge", bubbles: ["payment"] },
  { id: "reminder", day: "due", bubbles: ["reminder"] },
  { id: "proof", day: "due", bubbles: ["receipt-sent", "receipt-received"], staggered: true },
  { id: "confirmed", day: "due", bubbles: ["confirmed"] },
];

const ENTER_MS = 900;
const HOLD_MS = 2600;
const STAGGER_HOLD_MS = 1600;
const RESET_MS = 520;
const GAP_MS = 380;

type Reveal = { scene: number; bubbles: number };

/** Where the conversation is, so the panel card beside the phone can follow it. */
export type DemoStage = "charge" | "reminder" | "receipt" | "confirmed";

const STAGE_BY_SCENE: Record<string, DemoStage> = {
  charge: "charge",
  reminder: "reminder",
  proof: "receipt",
  confirmed: "confirmed",
};

type ChatItem =
  | { type: "day"; id: string; day: Scene["day"] }
  | { type: "bubble"; id: string; kind: BubbleKind; stagger: number };

const FIRST_REVEAL: Reveal = { scene: 0, bubbles: 1 };
const LAST_REVEAL: Reveal = {
  scene: SCENES.length - 1,
  bubbles: SCENES[SCENES.length - 1].bubbles.length,
};

function buildVisibleItems(reveal: Reveal): ChatItem[] {
  const items: ChatItem[] = [];
  let lastDay: Scene["day"] | null = null;

  for (let sceneIndex = 0; sceneIndex <= reveal.scene; sceneIndex++) {
    const scene = SCENES[sceneIndex];
    const count = sceneIndex < reveal.scene ? scene.bubbles.length : Math.max(0, reveal.bubbles);
    if (count <= 0) continue;

    if (scene.day !== lastDay) {
      items.push({ type: "day", id: `day-${scene.id}`, day: scene.day });
      lastDay = scene.day;
    }

    for (let bubbleIndex = 0; bubbleIndex < count; bubbleIndex++) {
      items.push({
        type: "bubble",
        id: `${scene.id}-${bubbleIndex}`,
        kind: scene.bubbles[bubbleIndex],
        stagger: scene.staggered ? 0 : bubbleIndex,
      });
    }
  }

  return items;
}

function idsFor(index: number, from: number, to: number) {
  const scene = SCENES[index];
  const ids: string[] = [];
  if (from === 0 && scene.day !== SCENES[index - 1]?.day) ids.push(`day-${scene.id}`);
  for (let i = from; i < to; i++) ids.push(`${scene.id}-${i}`);
  return ids;
}

export function WhatsappConversationDemo({
  conversation,
  dayLabels,
  className,
  onStageChange,
}: {
  conversation: Conversation;
  dayLabels: Record<Scene["day"], string>;
  className?: string;
  onStageChange?: (stage: DemoStage) => void;
}) {
  const { ref, inView, reducedMotion } = useDemoPlayback<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("hold");
  const [reveal, setReveal] = useState<Reveal>(FIRST_REVEAL);
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (reducedMotion || !inView) return;
    const timer = createWaiter();

    const revealBatch = (next: Reveal, ids: string[]) => {
      setReveal(next);
      setEnteringIds(new Set(ids));
      setPhase("enter");
    };

    const hold = async (ms: number) => {
      setPhase("hold");
      setEnteringIds(new Set());
      await timer.wait(ms);
    };

    const runScene = async (index: number) => {
      const scene = SCENES[index];

      if (!scene.staggered) {
        revealBatch({ scene: index, bubbles: scene.bubbles.length }, idsFor(index, 0, scene.bubbles.length));
        await timer.wait(ENTER_MS);
        if (timer.cancelled) return;
        await hold(HOLD_MS);
        return;
      }

      for (let bubble = 0; bubble < scene.bubbles.length; bubble++) {
        revealBatch({ scene: index, bubbles: bubble + 1 }, idsFor(index, bubble, bubble + 1));
        await timer.wait(ENTER_MS);
        if (timer.cancelled) return;
        await hold(bubble === scene.bubbles.length - 1 ? HOLD_MS : STAGGER_HOLD_MS);
        if (timer.cancelled) return;
      }
    };

    const loop = async () => {
      // The first message is already on screen: let it be read before the rest arrives.
      await timer.wait(HOLD_MS);

      while (!timer.cancelled) {
        for (let index = 1; index < SCENES.length; index++) {
          if (timer.cancelled) return;
          await runScene(index);
        }

        if (timer.cancelled) return;
        setPhase("exit");
        setEnteringIds(new Set());
        await timer.wait(RESET_MS);
        if (timer.cancelled) return;
        revealBatch(FIRST_REVEAL, idsFor(0, 0, 1));
        await timer.wait(GAP_MS + ENTER_MS);
        if (timer.cancelled) return;
        await hold(HOLD_MS);
      }
    };

    void loop();
    return () => timer.cancel();
  }, [inView, reducedMotion]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const scrollToEnd = () =>
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
    const timers = [60, 220, 480, 760].map((ms) => window.setTimeout(scrollToEnd, ms));
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [reveal, phase, reducedMotion]);

  const playing = inView && !reducedMotion;
  const shownReveal = reducedMotion ? LAST_REVEAL : reveal;
  const items = buildVisibleItems(shownReveal);
  const stage = STAGE_BY_SCENE[SCENES[shownReveal.scene].id];

  useEffect(() => {
    onStageChange?.(stage);
  }, [stage, onStageChange]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      role="img"
      aria-label={`Exemplo de conversa no WhatsApp: ${conversation.subscriberName} recebe a cobrança de ${conversation.value}, o lembrete no vencimento, envia o comprovante do Pix e recebe a confirmação do pagamento.`}
    >
      <PhoneFrame>
        <ChatHeader />

        <div
          ref={scrollRef}
          className="whatsapp-scroll relative min-h-0 flex-1 overflow-hidden bg-[#efeae2] px-2.5 py-3"
        >
          <div className={cn("whatsapp-scene flex min-h-full flex-col justify-end gap-2", playing && `is-${phase}`)}>
            {items.map((item) =>
              item.type === "day" ? (
                <div
                  key={item.id}
                  className={cn(
                    "whatsapp-day mx-auto rounded-md bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_0_rgb(0_0_0/0.06)]",
                    playing && enteringIds.has(item.id) && "is-entering"
                  )}
                >
                  {dayLabels[item.day]}
                </div>
              ) : (
                <div
                  key={item.id}
                  className={cn(
                    "whatsapp-bubble flex w-full",
                    item.kind === "receipt-sent" ? "justify-end" : "justify-start",
                    playing && enteringIds.has(item.id) && "is-entering"
                  )}
                  style={{ "--i": item.stagger } as CSSProperties}
                >
                  <Bubble kind={item.kind} conversation={conversation} />
                </div>
              )
            )}
          </div>
        </div>

        <ChatComposer />
      </PhoneFrame>
    </div>
  );
}

/** WhatsApp's verified-business seal. */
function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-label="Conta comercial verificada" role="img">
      <path
        fill="#1d9bf0"
        d="M12 1.5l2.4 1.8 3-.2.9 2.9 2.6 1.6-.9 2.9.9 2.9-2.6 1.6-.9 2.9-3-.2L12 22.5l-2.4-1.8-3 .2-.9-2.9-2.6-1.6.9-2.9-.9-2.9 2.6-1.6.9-2.9 3 .2z"
      />
      <path
        d="M8.2 12.3l2.5 2.5 5.1-5.3"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatHeader() {
  return (
    <header className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-[#f6f6f6] py-1 pr-3 pl-1">
      <ChevronLeftIcon className="size-[18px] shrink-0 text-[#0a7cff]" strokeWidth={2.5} aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element -- 2.9KB avatar, decorative */}
      <img
        src="/images/mensaliza-whatsapp-avatar.jpg"
        alt=""
        width={28}
        height={28}
        className="size-7 shrink-0 rounded-full border border-black/5 object-cover"
      />
      <p className="flex min-w-0 flex-1 items-center gap-1 text-[12px] leading-tight font-semibold tracking-[-0.01em] text-foreground">
        <span className="truncate">Assistente do Mensaliza</span>
        <VerifiedBadge />
      </p>
      <svg
        viewBox="0 0 24 24"
        className="size-[18px] shrink-0 text-[#0a7cff]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
        <path d="M15.5 10.5l5-3v9l-5-3z" />
      </svg>
    </header>
  );
}

function ChatComposer() {
  return (
    <div aria-hidden className="flex shrink-0 items-center gap-2 bg-[#f6f6f6] px-2.5 pt-2 pb-1.5 text-[#0a7cff]">
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
      <span className="h-7 min-w-0 flex-1 rounded-full border border-black/10 bg-white" />
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
        <circle cx="12" cy="12.5" r="3.2" />
      </svg>
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
      </svg>
    </div>
  );
}

function Bubble({ kind, conversation }: { kind: BubbleKind; conversation: Conversation }) {
  if (kind === "payment") return <PaymentMessage conversation={conversation} />;
  if (kind === "reminder") return <ReminderMessage conversation={conversation} />;
  if (kind === "receipt-sent") return <ReceiptSentMessage conversation={conversation} />;
  if (kind === "receipt-received") return <ReceiptReceivedMessage conversation={conversation} />;
  return <ConfirmedMessage conversation={conversation} />;
}
