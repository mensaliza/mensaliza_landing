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
    <article className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2">
        <Icon className="size-5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
        <h3 className="min-w-0 text-base font-semibold tracking-[-0.01em] text-balance">
          {persona}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-foreground/72 text-pretty sm:text-base">
        {tagline}
      </p>
    </article>
  );
}
