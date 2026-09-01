"use client";

import {
  MessageCircleIcon,
  MoreHorizontalIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { cn } from "@/lib/utils";

type TagTone = "purple" | "blue" | "pink";
type PayStatus = "open" | "late";
type Situation = "active" | "inactive";
type WhatsApp = "authorized" | "pending";

type Subscriber = {
  id: string;
  name: string;
  phone: string;
  tags: { label: string; tone: TagTone }[];
  payStatus: PayStatus;
  billingDay: number;
  situation: Situation;
  whatsapp: WhatsApp;
  createdAt: string;
  isNew?: boolean;
};

const BASE_SUBSCRIBERS: Subscriber[] = [
  {
    id: "1",
    name: "Giovani",
    phone: "(22) 22222-2222",
    tags: [{ label: "Tennis", tone: "purple" }],
    payStatus: "open",
    billingDay: 10,
    situation: "inactive",
    whatsapp: "pending",
    createdAt: "22/07/2026",
  },
  {
    id: "2",
    name: "Maria Clara",
    phone: "(55) 55555-5555",
    tags: [{ label: "Beach Tennis", tone: "blue" }],
    payStatus: "open",
    billingDay: 5,
    situation: "inactive",
    whatsapp: "pending",
    createdAt: "22/07/2026",
  },
  {
    id: "3",
    name: "Lucas",
    phone: "(11) 11111-1111",
    tags: [{ label: "Tennis", tone: "purple" }],
    payStatus: "late",
    billingDay: 5,
    situation: "inactive",
    whatsapp: "pending",
    createdAt: "22/07/2026",
  },
  {
    id: "4",
    name: "Julia",
    phone: "(22) 22222-2222",
    tags: [{ label: "Beach Tennis", tone: "blue" }],
    payStatus: "open",
    billingDay: 10,
    situation: "active",
    whatsapp: "authorized",
    createdAt: "22/07/2026",
  },
  {
    id: "5",
    name: "Ana Beatriz",
    phone: "(33) 33333-3333",
    tags: [{ label: "Tennis", tone: "pink" }],
    payStatus: "open",
    billingDay: 10,
    situation: "inactive",
    whatsapp: "pending",
    createdAt: "22/07/2026",
  },
];

const NEW_SUBSCRIBER: Subscriber = {
  id: "new",
  name: "Camila",
  phone: "(44) 44444-4444",
  tags: [
    { label: "Tennis", tone: "purple" },
    { label: "Beach Tennis", tone: "blue" },
  ],
  payStatus: "open",
  billingDay: 10,
  situation: "active",
  whatsapp: "authorized",
  createdAt: "27/07/2026",
  isNew: true,
};

type Phase = "enter" | "scan" | "insert" | "hold" | "exit";

const PHASE_MS: Record<Phase, number> = {
  enter: 1400,
  scan: 2200,
  insert: 1600,
  hold: 2400,
  exit: 900,
};

const TAG_CLASS: Record<TagTone, string> = {
  purple: "bg-muted text-foreground",
  blue: "bg-primary/12 text-primary",
  pink: "bg-secondary text-foreground",
};

const TABLE_COLS =
  "grid-cols-[minmax(6.75rem,1.45fr)_minmax(5.5rem,1.15fr)_minmax(5rem,0.85fr)_4rem_5.75rem_1.5rem]";

export function SubscribersListDemo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<Phase>("enter");
  const [showNew, setShowNew] = useState(false);
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
      setShowNew(true);
      setPhase("hold");
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
        setShowNew(false);
        setCycle((c) => c + 1);
        setPhase("enter");
        await wait(PHASE_MS.enter);
        if (cancelled) break;

        setPhase("scan");
        await wait(PHASE_MS.scan);
        if (cancelled) break;

        setShowNew(true);
        setPhase("insert");
        await wait(PHASE_MS.insert);
        if (cancelled) break;

        setPhase("hold");
        await wait(PHASE_MS.hold);
        if (cancelled) break;

        setPhase("exit");
        await wait(PHASE_MS.exit);
      }
    };

    void loop();

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [inView, reducedMotion]);

  const rows = showNew ? [NEW_SUBSCRIBER, ...BASE_SUBSCRIBERS.slice(0, 4)] : BASE_SUBSCRIBERS;
  const playing = inView && !reducedMotion;
  const highlightLate = phase === "scan" || phase === "insert";
  const ctaPulse = phase === "insert";

  return (
    <div
      ref={rootRef}
      className={cn("subscribers-demo relative", className)}
      aria-label="Demonstração animada da lista de assinantes do Mensaliza"
      role="img"
    >
      <div
        key={cycle}
        className={cn(
          "subscribers-demo-stage flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card",
          playing && `is-${phase}`
        )}
      >
        <div className="subscribers-demo-chrome flex items-center gap-2 border-b border-border/70 px-3 py-2 sm:px-3.5 sm:py-2.5">
          <PanelLeftIcon className="size-3.5 shrink-0 text-foreground/45 sm:size-4" aria-hidden />
          <span className="font-heading text-[13px] font-semibold tracking-[-0.01em] text-foreground sm:text-sm">
            Assinantes
          </span>
        </div>

        <div className="subscribers-demo-toolbar flex flex-wrap items-center gap-1.5 border-b border-border/60 px-3 py-2 sm:gap-2 sm:px-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1 sm:px-2.5 sm:py-1.5">
            <SearchIcon className="size-3 shrink-0 text-foreground/40 sm:size-3.5" aria-hidden />
            <span className="truncate text-[11px] text-foreground/72 sm:text-[11px]">
              Buscar por nome ou apelido...
            </span>
          </div>
          <div className="hidden items-center gap-1.5 md:flex">
            <span className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground/72 sm:py-1.5">
              + Status
            </span>
            <span className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground/72 sm:py-1.5">
              + Tags
            </span>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-0.5 rounded-lg bg-primary px-2 py-1 text-[11px] font-semibold text-primary-foreground sm:gap-1 sm:px-2.5 sm:py-1.5",
              ctaPulse && "subscribers-demo-cta-pulse"
            )}
          >
            <PlusIcon className="size-3 sm:size-3.5" aria-hidden />
            Novo assinante
          </span>
        </div>

        <div className="subscribers-demo-table min-h-0 flex-1 overflow-hidden">
          <div
            className={cn(
              "hidden gap-1.5 border-b border-border/50 px-3 py-1.5 text-[11px] font-medium text-foreground/72 sm:grid sm:px-3.5",
              TABLE_COLS
            )}
          >
            <span>Assinante</span>
            <span>Tags</span>
            <span>Status</span>
            <span>Cobrança</span>
            <span>WhatsApp</span>
            <span className="sr-only">Ações</span>
          </div>

          <ul className="flex flex-col">
            {rows.map((subscriber, index) => {
              const isLate = subscriber.payStatus === "late";
              const isHighlighted = highlightLate && isLate;
              const enterDelay = subscriber.isNew ? 0 : index;

              return (
                <li
                  key={`${cycle}-${subscriber.id}`}
                  className={cn(
                    "subscribers-demo-row border-b border-border/40 px-3 py-1.5 last:border-b-0 sm:px-3.5 sm:py-2",
                    playing && !subscriber.isNew && phase === "enter" && "is-entering",
                    playing && subscriber.isNew && phase === "insert" && "is-inserting",
                    isHighlighted && "is-highlighted",
                    phase === "exit" && playing && "is-exiting"
                  )}
                  style={{ "--i": enterDelay } as CSSProperties}
                >
                  <div
                    className={cn(
                      "grid items-center gap-1.5 max-sm:grid-cols-[1fr_auto] max-sm:gap-2",
                      TABLE_COLS
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold leading-tight text-foreground">
                        {subscriber.name}
                      </p>
                      <p className="truncate text-[11px] leading-tight text-foreground/72">
                        {subscriber.phone}
                      </p>
                    </div>

                    <div className="hidden min-w-0 flex-wrap items-center gap-1 sm:flex px-2">
                      {subscriber.tags.length === 0 ? (
                        <span className="text-[11px] text-foreground/35">—</span>
                      ) : (
                        subscriber.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={cn(
                              "rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none text-nowrap",
                              TAG_CLASS[tag.tone]
                            )}
                          >
                            {tag.label}
                          </span>
                        ))
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-1.5 sm:justify-start">
                      <PayStatusBadge status={subscriber.payStatus} />
                      <SituationBadge
                        situation={subscriber.situation}
                        className="sm:hidden"
                      />
                    </div>

                    <span className="hidden text-[11px] text-foreground/72 sm:block">
                      Dia {subscriber.billingDay}
                    </span>

                    <WhatsAppBadge
                      status={subscriber.whatsapp}
                      className="hidden sm:inline-flex"
                    />

                    <span className="hidden justify-end text-foreground/35 sm:flex">
                      <MoreHorizontalIcon className="size-3.5" aria-hidden />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="subscribers-demo-footer mt-auto flex items-center justify-between gap-2 border-t border-border/60 px-3 py-1.5 text-[11px] text-foreground/72 sm:px-3.5">
          <span>
            Mostrando {rows.length} de {rows.length} resultados
          </span>
          <span className="hidden sm:inline">Linhas: 10</span>
        </div>
      </div>
    </div>
  );
}

function PayStatusBadge({ status }: { status: PayStatus }) {
  const late = status === "late";
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium">
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          late ? "bg-late" : "bg-primary"
        )}
        aria-hidden
      />
      <span className={late ? "text-late" : "text-foreground/72"}>
        {late ? "Atrasado" : "Em aberto"}
      </span>
    </span>
  );
}

function SituationBadge({
  situation,
  className,
}: {
  situation: Situation;
  className?: string;
}) {
  const active = situation === "active";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-none",
        active
          ? "bg-primary/12 text-primary"
          : "bg-muted text-foreground/72",
        className
      )}
    >
      <UserIcon className="size-2.5" aria-hidden />
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}

function WhatsAppBadge({
  status,
  className,
}: {
  status: WhatsApp;
  className?: string;
}) {
  const authorized = status === "authorized";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-none",
        authorized
          ? "bg-primary/12 text-primary"
          : "bg-muted text-foreground/72",
        className
      )}
    >
      <MessageCircleIcon className="size-2.5" aria-hidden />
      {authorized ? "Autorizado" : "Pendente"}
    </span>
  );
}
