import {
  AppleIcon,
  BrainIcon,
  DumbbellIcon,
  StoreIcon,
  TrophyIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { personas } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const personaIcons = {
  apple: AppleIcon,
  brain: BrainIcon,
  trophy: TrophyIcon,
  dumbbell: DumbbellIcon,
  users: UsersIcon,
  store: StoreIcon,
} as const satisfies Record<(typeof personas)[number]["icon"], LucideIcon>;

type PersonaTileProps = {
  persona: (typeof personas)[number]["persona"];
  tagline: (typeof personas)[number]["tagline"];
  icon: (typeof personas)[number]["icon"];
  className?: string;
};

export function PersonaTile({ persona, tagline, icon, className }: PersonaTileProps) {
  const Icon = personaIcons[icon];

  return (
    <article
      className={cn(
        "bg-card flex h-full flex-col gap-3 rounded-xl border border-border p-5 sm:p-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden
        >
          <Icon className="size-4.5 stroke-2" />
        </div>
        <h3 className="min-w-0 text-base font-semibold tracking-[-0.01em] text-balance">{persona}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
        {tagline}
      </p>
    </article>
  );
}
