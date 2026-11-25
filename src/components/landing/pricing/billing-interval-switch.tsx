"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { trackLandingPricingIntervalChanged, type BillingInterval } from "@/lib/landing-analytics";
import { YEARLY_SAVINGS_PERCENT } from "@/lib/landing-content";
import { cn } from "cn";

/** "Mensal [switch] Anual" with the yearly discount next to it. */
export function BillingIntervalSwitch({
  interval,
  onIntervalChange,
  className,
}: {
  interval: BillingInterval;
  onIntervalChange: (interval: BillingInterval) => void;
  className?: string;
}) {
  const yearly = interval === "yearly";

  const setYearly = (next: boolean) => {
    const nextInterval: BillingInterval = next ? "yearly" : "monthly";
    if (nextInterval === interval) return;
    onIntervalChange(nextInterval);
    trackLandingPricingIntervalChanged(nextInterval);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setYearly(false)}
        className={cn(
          "text-[15px] font-medium transition-colors",
          yearly ? "text-foreground/60 hover:text-foreground" : "text-foreground"
        )}
      >
        Mensal
      </button>
      <SwitchPrimitive.Root
        checked={yearly}
        onCheckedChange={setYearly}
        aria-label="Cobrança anual"
        className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-foreground/15 p-0.5 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-primary/40 data-checked:bg-primary"
      >
        <SwitchPrimitive.Thumb className="block size-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] data-checked:translate-x-5" />
      </SwitchPrimitive.Root>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setYearly(true)}
        className={cn(
          "text-[15px] font-medium transition-colors",
          yearly ? "text-primary" : "text-foreground/60 hover:text-foreground"
        )}
      >
        Anual
      </button>
      <span className="rounded-full bg-primary px-2.5 py-1 text-[12px] font-bold tracking-wide text-white uppercase">
        Até {YEARLY_SAVINGS_PERCENT}% de desconto
      </span>
    </div>
  );
}
