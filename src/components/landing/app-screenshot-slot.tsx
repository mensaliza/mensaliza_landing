import Image from "next/image";

import { cn } from "@/lib/utils";

type AppScreenshotSlotProps = {
  label: string;
  alt?: string;
  src?: string;
  className?: string;
  priority?: boolean;
};

export function AppScreenshotSlot({
  label,
  alt,
  src,
  className,
  priority = false,
}: AppScreenshotSlotProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-card",
          className
        )}
      >
        <Image
          src={src}
          alt={alt ?? label}
          width={1600}
          height={1000}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-dashed border-border/80 bg-muted/30",
        className
      )}
      aria-hidden={!alt}
    >
      <div className="flex aspect-[5/4] flex-col items-center justify-center gap-2 p-6 text-center sm:aspect-[4/3]">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          App
        </span>
        <p className="max-w-[12rem] text-sm leading-snug text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
