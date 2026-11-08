import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { LOGO_MARK_PATHS, LOGO_VIEWBOX, LOGO_WORDMARK_PATH } from "@/components/logo-paths";

export const OG_SIZE = { width: 1200, height: 630 } as const;

// Hex equivalents of the DESIGN.md tokens (ImageResponse doesn't support oklch or CSS variables).
const colors = {
  orange: "#FE5B0D",
  orangeTint: "#FFEEE5",
  pageBg: "#FCFCFC",
  ink: "#161616",
  inkMuted: "#545454",
  border: "#DEDEDE",
} as const;

const FONTS_DIR = join(process.cwd(), "src/assets/fonts");

// Only the weights actually used. woff (not woff2): ImageResponse accepts ttf, otf and woff.
const fontsPromise = Promise.all([
  readFile(join(FONTS_DIR, "lexend-latin-600-normal.woff")),
  readFile(join(FONTS_DIR, "geist-latin-500-normal.woff")),
]);

/**
 * Shortens a headline for the image: drops a trailing "(...)" aside and the
 * subtitle after ":". The full title stays in the page and meta tags.
 */
export function toOgTitle(title: string): string {
  return title
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/:\s.*$/, "")
    .trim();
}

/** Steps the title down so long headlines still fit in three lines. */
function titleFontSize(title: string): number {
  if (title.length <= 45) return 72;
  if (title.length <= 70) return 62;
  if (title.length <= 95) return 54;
  return 48;
}

const LOGO_HEIGHT = 44;

function OgLogo() {
  return (
    <svg
      width={(LOGO_VIEWBOX.width / LOGO_VIEWBOX.height) * LOGO_HEIGHT}
      height={LOGO_HEIGHT}
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      fill="none"
    >
      <path d={LOGO_WORDMARK_PATH} fill={colors.ink} />
      {LOGO_MARK_PATHS.map((d) => (
        <path key={d} d={d} fill={colors.orange} />
      ))}
    </svg>
  );
}

export async function renderBlogOgImage(options: {
  title: string;
  /** Small pill above the title, e.g. the post category. */
  label: string;
  /** Bottom-left caption, e.g. "mensaliza.com/blog". */
  footer: string;
  /** Overrides the length-based size when a specific headline needs tuning. */
  titleSize?: number;
}): Promise<ImageResponse> {
  const [lexend, geist] = await fontsPromise;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: colors.pageBg,
          fontFamily: "Geist",
        }}
      >
        <div style={{ width: 20, height: "100%", background: colors.orange }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 80px 60px 72px",
          }}
        >
          <OgLogo />

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: colors.orangeTint,
                  color: colors.orange,
                  fontSize: 26,
                }}
              >
                {options.label}
              </div>
            </div>
            <div
              style={{
                display: "block",
                fontFamily: "Lexend",
                fontSize: options.titleSize ?? titleFontSize(options.title),
                lineHeight: 1.14,
                letterSpacing: "-0.02em",
                color: colors.ink,
                lineClamp: 3,
              }}
            >
              {options.title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `2px solid ${colors.border}`,
              paddingTop: 24,
              fontSize: 26,
              color: colors.inkMuted,
            }}
          >
            <span>{options.footer}</span>
            <span>Cobrança mensal via WhatsApp</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Lexend", data: lexend, weight: 600, style: "normal" },
        { name: "Geist", data: geist, weight: 500, style: "normal" },
      ],
    }
  );
}
