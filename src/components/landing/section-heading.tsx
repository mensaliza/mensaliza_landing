import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="text-[clamp(1.875rem,3vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
