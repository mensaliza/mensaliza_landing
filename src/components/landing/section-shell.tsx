import { cn } from "@/lib/utils";

type SectionShellProps = React.ComponentProps<"section"> & {
  id?: string;
  tinted?: boolean;
};

export function SectionShell({
  id,
  tinted = false,
  className,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8",
        tinted && "bg-linear-120 from-[#fdfbfb] to-[#ebedee] [&_.text-muted-foreground]:text-foreground/72",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">{children}</div>
    </section>
  );
}
