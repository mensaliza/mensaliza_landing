import { SectionViewTracker } from "@/components/landing/section-view-tracker";
import type { LandingSectionId } from "@/lib/landing-analytics";
import { cn } from "@/lib/utils";

type SectionShellProps = React.ComponentProps<"section"> & {
  id?: string;
  labelledBy?: string;
  tinted?: boolean;
  analyticsSection?: LandingSectionId;
};

export function SectionShell({
  id,
  labelledBy,
  tinted = false,
  analyticsSection,
  className,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8",
        tinted && "bg-muted [&_.text-muted-foreground]:text-foreground/72",
        className
      )}
      {...props}
    >
      {analyticsSection ? <SectionViewTracker section={analyticsSection} /> : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">{children}</div>
    </section>
  );
}
