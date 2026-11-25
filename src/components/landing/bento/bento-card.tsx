import type { ReactNode } from "react";

import { cn } from "cn";

/** A bento card: the scene on the stage, then a short title and one or two lines under it. */
export function BentoCard({
  title,
  description,
  children,
  className,
  stageClassName,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
  className?: string;
  stageClassName?: string;
}) {
  return (
    <article className={cn("bento-stage flex min-w-0 flex-col overflow-hidden rounded-[1.75rem]", className)}>
      {/* No clipping here: the article clips the sides, so shadows can fade into the text area. */}
      <div className={cn("relative", stageClassName ?? "h-72")}>{children}</div>
      <div className="flex flex-col gap-1.5 px-6 pt-1 pb-6 sm:px-7 sm:pb-7">
        <h3 className="text-lg leading-snug font-semibold tracking-[-0.015em] text-balance sm:text-xl">{title}</h3>
        <div className="max-w-[46ch] text-[15px] leading-relaxed text-foreground/70 text-pretty">{description}</div>
      </div>
    </article>
  );
}
