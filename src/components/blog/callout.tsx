import { cn } from "cn";

type CalloutProps = {
  title?: string;
  /** "tip" uses the brand tint; "note" stays neutral. */
  tone?: "tip" | "note";
  children: React.ReactNode;
};

export function Callout({ title, tone = "tip", children }: CalloutProps) {
  return (
    <aside
      className={cn(
        "my-6 flex flex-col gap-2 rounded-xl border p-5 text-foreground/80 [&_p]:m-0",
        tone === "tip"
          ? "border-primary/35 bg-primary/[0.04]"
          : "border-border bg-muted/60"
      )}
    >
      {title ? (
        <p className="font-heading text-base font-semibold tracking-[-0.01em] text-foreground">
          {title}
        </p>
      ) : null}
      <div className="flex flex-col gap-2 leading-relaxed">{children}</div>
    </aside>
  );
}
