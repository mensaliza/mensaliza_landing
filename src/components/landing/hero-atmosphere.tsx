import { cn } from "@/lib/utils";

type HeroAtmosphereProps = {
  className?: string;
  /** Full-viewport pages (404) skip the bottom fade used on the landing hero. */
  fullViewport?: boolean;
};

export function HeroAtmosphere({
  className,
  fullViewport = false,
}: HeroAtmosphereProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "hero-atmosphere-layer pointer-events-none absolute inset-0 z-0",
        fullViewport && "hero-atmosphere-layer--full",
        className
      )}
    >
      <div className="hero-plains">
        <div className="hero-plain" />
        <div className="hero-plain hero-plain--2" />
        <div className="hero-plain hero-plain--3" />
      </div>
      <div className="hero-atmosphere hero-atmosphere--header-left" />
      <div className="hero-atmosphere hero-atmosphere--header-right" />
      <div className="hero-atmosphere hero-atmosphere--side-left" />
      <div className="hero-atmosphere hero-atmosphere--side-right" />
      {fullViewport ? (
        <>
          <div className="hero-atmosphere hero-atmosphere--footer-left" />
          <div className="hero-atmosphere hero-atmosphere--footer-right" />
        </>
      ) : null}
    </div>
  );
}
