import { cn } from "cn"

import { LOGO_MARK_PATHS, LOGO_WORDMARK_PATH } from "@/components/logo-paths"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  return (
    <div
      className={cn("translate-z-0", {
        "h-5": size === "sm", // 24px
        "h-6": size === "md", // 28px
        "h-7": size === "lg", // 32px
      })}
    >
      <svg
        className="h-full w-auto"
        width="1692"
        height="295"
        viewBox="0 0 1692 295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={LOGO_WORDMARK_PATH} fill="var(--foreground)" />
        {LOGO_MARK_PATHS.map((d) => (
          <path key={d} d={d} fill="var(--primary)" />
        ))}
      </svg>
    </div>
  )
}
