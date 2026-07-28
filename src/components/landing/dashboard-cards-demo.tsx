"use client";

import { ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type MetricRow = {
  label: string;
  value: string;
};

type DashboardCard = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  rows: MetricRow[];
  links: string[];
};

const CARDS: DashboardCard[] = [
  {
    id: "receita",
    title: "Receita do período",
    value: "R$ 3.280,00",
    subtitle: "recebidos até agora",
    rows: [
      { label: "Previsto", value: "R$ 4.940,00" },
      { label: "Taxa de recebimento", value: "66%" },
      { label: "A receber", value: "R$ 1.660,00" },
    ],
    links: ["Ver recebíveis"],
  },
  {
    id: "pendencias",
    title: "Pendências de cobrança",
    value: "R$ 4.655,00",
    subtitle: "em atraso agora",
    rows: [
      { label: "Pagamentos atrasados", value: "30" },
      { label: "Comprovantes pendentes", value: "4" },
      { label: "Aguardando aprovação", value: "R$ 1.600,00" },
    ],
    links: ["Ver atrasados", "Aprovar pendentes"],
  },
  {
    id: "assinantes",
    title: "Assinantes",
    value: "24",
    subtitle: "assinantes ativos",
    rows: [
      { label: "Receita recorrente mensal", value: "R$ 4.800,00" },
      { label: "Ticket médio", value: "R$ 200,00" },
      { label: "Autorizados WhatsApp", value: "83%" },
    ],
    links: ["Ver assinantes"],
  },
];

const ENTER_MS = 700;
const HOLD_MS = 2600;
const EXIT_MS = 550;
const GAP_MS = 180;

export function DashboardCardsDemo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

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
      setActiveIndex(0);
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
      let index = 0;
      while (!cancelled) {
        setActiveIndex(index);
        setPhase("enter");
        await wait(ENTER_MS);
        if (cancelled) break;

        setPhase("hold");
        await wait(HOLD_MS);
        if (cancelled) break;

        setPhase("exit");
        await wait(EXIT_MS);
        if (cancelled) break;

        await wait(GAP_MS);
        if (cancelled) break;

        index = (index + 1) % CARDS.length;
      }
    };

    void loop();

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [inView, reducedMotion]);

  const playing = inView && !reducedMotion;
  const card = CARDS[activeIndex];

  if (reducedMotion) {
    return (
      <div
        ref={rootRef}
        className={cn("dashboard-cards-demo relative", className)}
        aria-label="Cards principais do painel Mensaliza: receita, pendências e assinantes"
        role="img"
      >
        <div className="flex h-full flex-col justify-center gap-2.5 py-1 sm:gap-3">
          {CARDS.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-[10px] font-medium text-foreground/50">{item.title}</p>
                <p className="truncate text-[11px] text-foreground/45">{item.subtitle}</p>
              </div>
              <p className="shrink-0 font-heading text-sm font-semibold tracking-[-0.02em] text-foreground">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn("dashboard-cards-demo relative", className)}
      aria-label="Demonstração animada dos cards principais do painel Mensaliza"
      role="img"
    >
      <div className="relative flex h-full flex-col items-center justify-center gap-4 py-1 sm:gap-5">
        <div className="relative w-full max-w-[22rem]">
          <article
            key={card.id}
            className={cn(
              "dashboard-card flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card",
              playing && `is-${phase}`,
              !playing && "is-static"
            )}
          >
            <div className="flex flex-col gap-1 px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-3.5">
              <p className="text-[11px] font-medium text-foreground/50 sm:text-xs">
                {card.title}
              </p>
              <p className="dashboard-card-value font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                {card.value}
              </p>
              <p className="text-[11px] text-foreground/45 sm:text-xs">{card.subtitle}</p>
            </div>

            <div className="mx-3 mb-3 flex flex-col gap-2.5 rounded-lg bg-muted/70 px-3 py-3 sm:mx-4 sm:mb-4 sm:gap-3 sm:px-3.5 sm:py-3.5">
              <ul className="flex flex-col gap-2">
                {card.rows.map((row, index) => (
                  <li
                    key={row.label}
                    className="dashboard-card-row flex items-center justify-between gap-3 text-[11px] sm:text-xs"
                    style={{ "--i": index } as CSSProperties}
                  >
                    <span className="text-foreground/50">{row.label}</span>
                    <span className="font-semibold tabular-nums text-foreground">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-2.5">
                {card.links.map((link) => (
                  <span
                    key={link}
                    className="inline-flex items-center gap-0.5 text-[11px] font-medium text-foreground/55 sm:text-xs"
                  >
                    {link}
                    <ChevronRightIcon className="size-3" aria-hidden />
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>

        <div className="flex items-center gap-1.5" aria-hidden>
          {CARDS.map((item, index) => (
            <span
              key={item.id}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                index === activeIndex
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-foreground/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
