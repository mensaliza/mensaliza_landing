"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { heroMockups } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const TILT_MAX_X = 4.5;
const TILT_MAX_Y = 5.5;
const TILT_EASE = "transform 480ms cubic-bezier(0.16, 1, 0.3, 1)";

export function HeroMockupShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const sync = () => setTiltEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!tiltEnabled || !stageRef.current) return;

      const rect = stageRef.current.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      const next = {
        x: Math.max(-TILT_MAX_X, Math.min(TILT_MAX_X, -ny * TILT_MAX_X * 2)),
        y: Math.max(-TILT_MAX_Y, Math.min(TILT_MAX_Y, nx * TILT_MAX_Y * 2)),
      };

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => setTilt(next));
    },
    [tiltEnabled]
  );

  const handlePointerLeave = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-enter relative w-full max-w-5xl pt-2 sm:pt-4"
      style={{ "--hero-i": 4 } as CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={cn(
          "hero-stage-perspective relative mx-auto w-full",
          tiltEnabled && "hero-stage-perspective--live"
        )}
      >
        <div
          className="hero-stage-tilt relative mx-auto w-full"
          style={
            tiltEnabled
              ? {
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: TILT_EASE,
                }
              : undefined
          }
        >
          <div className="hero-stage-reveal relative mx-auto w-full max-w-[54rem]">
            <figure className="hero-browser relative overflow-hidden rounded-xl border border-border bg-white">
              <div
                aria-hidden
                className="flex items-center gap-3 border-b border-border/80 bg-[#f6f6f6] px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
              >
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
                  <span className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
                  <span className="size-2.5 rounded-full bg-[#28c840] sm:size-3" />
                </div>

                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-border/70 bg-white px-2.5 py-1.5 sm:px-3">
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="size-3 shrink-0 text-foreground/40 sm:size-3.5"
                      fill="none"
                    >
                      <path
                        d="M5.2 7.2V5.6a2.8 2.8 0 0 1 5.6 0v1.6M4.4 7.2h7.2v5.2H4.4V7.2Z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="truncate font-sans text-[11px] leading-none text-foreground/55 sm:text-xs">
                      app.mensaliza.com
                    </span>
                  </div>
                </div>

                <div className="hidden w-10 shrink-0 sm:block" />
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-white sm:aspect-[16/9.6]">
                <Image
                  src={heroMockups.dashboard.src}
                  alt={heroMockups.dashboard.alt}
                  width={heroMockups.dashboard.width}
                  height={heroMockups.dashboard.height}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 54rem"
                  className="h-full w-full select-none object-contain"
                />
              </div>

              <div aria-hidden className="hero-browser-fade" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
