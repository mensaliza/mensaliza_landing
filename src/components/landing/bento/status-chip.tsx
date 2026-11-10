import { cn } from "cn";

export type PaymentStatus = "paid" | "open" | "late" | "paused";

const LABEL: Record<PaymentStatus, string> = {
  paid: "Pago",
  open: "Em aberto",
  late: "Atrasado",
  paused: "Pausado",
};

/** Vivid status colours: a bright dot and a saturated tint, so the state reads at a glance. */
const TONE: Record<PaymentStatus, string> = {
  paid: "bg-[#d3f8dd] text-[#047a33]",
  open: "bg-foreground/[0.06] text-foreground/70",
  late: "bg-[#ffe0dc] text-[#d81e10]",
  paused: "text-foreground/50 ring-1 ring-foreground/15 ring-inset",
};

const DOT: Record<PaymentStatus, string | null> = {
  paid: "bg-[#14c95a]",
  open: null,
  late: "bg-[#ff3b30]",
  paused: null,
};

/** Payment status, with the app's wording. `animate` pops it in when it just changed. */
export function StatusChip({ status, animate = false }: { status: PaymentStatus; animate?: boolean }) {
  return (
    <span
      key={status}
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold whitespace-nowrap",
        TONE[status],
        animate && "bento-pop"
      )}
    >
      {DOT[status] ? <span aria-hidden className={cn("size-1.5 rounded-full", DOT[status])} /> : null}
      {LABEL[status]}
    </span>
  );
}
