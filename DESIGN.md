---
name: Mensaliza
description: Cobrança mensal automática via WhatsApp — visual system for the marketing site
colors:
  brand-orange: "oklch(0.68 0.19 55)"
  brand-orange-foreground: "oklch(1 0 0)"
  page-bg: "oklch(0.99 0 0)"
  ink: "oklch(0.18 0 0)"
  surface-muted: "oklch(0.955 0 0)"
  ink-muted: "oklch(0.42 0 0)"
  border-soft: "oklch(0.88 0 0)"
  card-white: "oklch(1 0 0)"
  status-late: "oklch(0.52 0.2 25)"
typography:
  display:
    fontFamily: "Lexend, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 5vw, 3.35rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Lexend, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Lexend, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "0.3rem"
  md: "0.4rem"
  lg: "0.5rem"
  xl: "0.7rem"
  pill: "9999px"
spacing:
  section-y: "4rem"
  section-y-lg: "5rem"
  card-padding: "1.5rem"
  card-padding-lg: "2rem"
  stack-md: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-orange}"
    textColor: "{colors.brand-orange-foreground}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "oklch(0.68 0.19 55 / 0.8)"
    textColor: "{colors.brand-orange-foreground}"
    rounded: "{rounded.lg}"
  button-outline:
    backgroundColor: "{colors.page-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  chip-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.5rem"
    height: "1.25rem"
  card-surface:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-padding}"
---

# Design System: Mensaliza

## 1. Overview

**Creative North Star: "The Alívio Desk"**

Mensaliza's marketing site should feel like a calm, organized workspace where billing stops being a personal burden. The visual language is **humano, organizado, aliviador** — direct and empathetic without debt-collector aggression or enterprise fintech coldness. Surfaces are clean and legible; **orange is the only brand color**; product artifacts (WhatsApp preview, due-date status, comprovante approval) do more work than abstract icon grids.

WhatsApp is a product channel, not a brand color. Never borrow WhatsApp green (or any green) for Mensaliza identity, atmosphere, or UI chrome.

The system explicitly rejects generic SaaS landing templates: no hero metrics, gradient text, cream paper backgrounds, uppercase eyebrow kickers on every section, ghost cards (border + wide shadow), glassmorphism, diagonal stripes, or insanely rounded 32px+ containers. Motion is restrained — state feedback only, with full `prefers-reduced-motion` respect.

**Key Characteristics:**

- **Single-accent discipline:** Brand orange carries logo, CTAs, focus rings, accents, and atmospheric warmth. Neutrals stay chroma 0.
- **Flat tonal layering:** Depth comes from borders and muted section bands, not drop shadows.
- **Artifact-first proof:** Hero and feature sections show real product flows, not decorative illustrations.
- **Mobile-first conversion:** Sticky header + bottom demo bar on small screens; 44px minimum touch targets.
- **Accessible status:** Paid/late/sent states always pair color with text labels; body text meets contrast on tinted sections.

## 2. Colors

True neutrals (chroma 0) with one deliberate accent — brand orange.

### Primary

- **Brand Orange** (`oklch(0.68 0.19 55)`): Logo mark, demo/conversion CTAs, focus rings, trust accents, step numbers, feature highlights, atmospheric washes. The sole chromatic brand signal.
- **Brand Orange Foreground** (`oklch(1 0 0)`): White text and icons on orange fills.

### Tertiary

- **Status Late** (`oklch(0.52 0.2 25)`): Overdue due dates and late badges only. Warm red-orange — visible but not aggressive collections red. Not a brand color.

### Neutral

- **Page Background** (`oklch(0.99 0 0)`): Default page surface. True off-white — no green or cream tint.
- **Ink** (`oklch(0.18 0 0)`): Headlines and primary body text.
- **Surface Muted** (`oklch(0.955 0 0)`): Section bands (Relief, FAQ). Cards inside tinted sections use white (`card-white`) for contrast.
- **Ink Muted** (`oklch(0.42 0 0)`): Secondary prose. On tinted sections, bump to `foreground/72` equivalent for ≥4.5:1 contrast.
- **Border Soft** (`oklch(0.88 0 0)`): Card borders, dividers, input strokes.
- **Card White** (`oklch(1 0 0)`): Elevated surfaces on muted bands and hero mockups.

### Named Rules

**The One-Voice Rule.** Orange is brand and action. There is no second brand accent. Channel names (WhatsApp, Pix) are communicated in copy and icons, never by adopting those platforms' colors.

**The Tinted-Section Rule.** On `bg-muted` sections, never use default muted-foreground at full strength for body copy — darken to ~72% foreground opacity or use ink directly.

## 3. Typography

**Display Font:** Lexend (with Geist, system-ui fallback)  
**Body Font:** Geist (with system-ui fallback)  
**Label/Mono Font:** Geist Mono for step numbers and status microcopy where monospace aids scanability

**Character:** Open, low-stress display (Lexend) paired with a clean neo-grotesque for body (Geist). Lexend’s wide apertures carry *aliviador* — headlines read easily under mobile glare; Geist keeps UI and prose organized. Confident semibold display without shouting — tracking stays at or above −0.04em on large type.

**Physical object:** A clear clinic-wall notice anyone can read without strain — relief first, not quirky workshop labels (Bricolage) or soft SaaS geometrics (Manrope). Not an editorial display serif.

### Hierarchy

- **Display** (600, `clamp(2.35rem, 5vw, 3.35rem)`, line-height 1.08, tracking −0.02em): Hero headline only. Use `text-wrap: balance`. Max emotional weight lives here.
- **Headline** (600, `clamp(1.875rem, 3vw, 2.75rem)`, line-height 1.15, tracking −0.02em): Section titles (`SectionHeading`) and final CTA. Always balanced.
- **Title** (600, 1.125–1.25rem, line-height ~1.3, tracking −0.01em): Feature card titles, step titles, FAQ triggers, persona names.
- **Body** (400, 1rem / 1.125rem on large screens, line-height 1.625): Prose, descriptions, accordion answers. Cap line length at 65–75ch.
- **Label** (500, 0.75rem, normal case): Status chips, "Antes / Com Mensaliza", micro timestamps. Minimum 11px on mobile (`text-[11px]` acceptable for dense UI labels only).

### Named Rules

**The Balance Rule.** Apply `text-wrap: balance` on h1–h3; `text-wrap: pretty` on long prose blocks.

**The No-Shout Rule.** Display heading max ≤ 3.35rem (~54px) on this landing. Letter-spacing never tighter than −0.04em.

**The Body-Is-Geist Rule.** `--font-sans` must resolve to `var(--font-geist), …`. Never leave body on bare `ui-sans-serif, system-ui` — subtitles and descriptions inherit sans and must look branded, not OS-chrome.

## 4. Elevation

This system is **flat by default**. Depth is conveyed through tonal layering (white cards on muted section bands, subtle orange tint on final CTA) and 1px borders — not drop shadows.

Cards use a single solid border (`border-border` or semantic tints like `border-primary/35`) with **no paired box-shadow**. Focus states use a 3px ring in brand orange at 50% opacity, not shadow elevation.

The sticky header uses a bottom border only (`border-b border-border/60`), not blur/glass — except the mobile demo bar which uses `backdrop-blur-sm` strictly for legibility over scrolling content.

### Shadow Vocabulary

No decorative shadow scale. The only shadow-like treatment is the skip-link focus panel (`shadow-sm`) for keyboard visibility.

### Named Rules

**The No Ghost Card Rule.** Never combine `border: 1px solid` with a soft wide drop shadow on the same element. Pick border OR a tight functional shadow (≤8px blur) — this project picks border.

**The Flat-By-Default Rule.** Surfaces rest flat. Elevation is semantic (white card on muted band), not decorative.

## 5. Components

### Buttons

- **Shape:** Gently rounded (8px / `rounded-lg`), height 44px at `lg` size (`h-11`).
- **Primary (Demo CTA):** Brand orange background, white text, semibold. Label: "Começar agora" / "Agendar demonstração". Arrow icon optional on desktop; full-width on mobile bar.
- **Hover / Focus:** Primary fill dims to 80% opacity; white label stays. Focus-visible ring in orange (`ring-3 ring-ring/50`). Active state: 1px translate-y press.
- **Outline:** White/card background, soft border, muted hover fill. Used for "Entrar" secondary CTA.
- **Ghost:** Transparent with muted hover. Used for in-page navigation links ("Ver como funciona →") with orange on hover.

### Chips

- **Style:** Pill shape (`rounded-full` / `rounded-4xl`), secondary muted background, xs semibold text.
- **State:** Semantic tints for status (brand orange / late / muted) with text labels — never color alone. No platform-green status tokens.

### Cards / Containers

- **Corner Style:** 12px effective (`rounded-xl` / 0.7rem) — never 32px+.
- **Background:** White on default and tinted sections; subtle orange tint (`bg-primary/[0.03]`) for highlighted feature cards.
- **Shadow Strategy:** None at rest (see Elevation).
- **Border:** Single 1px soft border; feature highlights use `border-primary/35`.
- **Internal Padding:** 24px mobile / 32px desktop (`p-6 sm:p-8`).

### Inputs / Fields

- **Style:** Shared border token, rounded-lg, ring focus in brand orange.
- **Focus:** 3px ring, border shift to ring color.
- **Error / Disabled:** Destructive tint at 10% background (reserved for forms; minimal use on marketing site).

### Navigation

- **Desktop:** Sticky shell. At the top of the landing hero the bar is flush and transparent. On scroll (and on non-landing pages) it contracts into a floating cell: inset padding, `rounded-2xl`, single border, `bg-background/95` + light backdrop blur for legibility — no drop shadow (no ghost-card).
- **Mobile:** 44×44px menu trigger; sheet drawer with full-width demo CTA at bottom.
- **In-page anchors:** `scroll-mt-24` on sections; nav hrefs use `/#secao` for cross-route compatibility.

### Product Mockup Panel (Signature)

- **Message bubble stack:** Outline bubble (client message) + tinted bubble (payment link in brand orange).
- **Pix confirmation row:** Orange icon circle + amount + client name truncate — never WhatsApp green.
- **Due-date ruler:** 3×2 grid on mobile, horizontal on desktop. Each day shows text status label + day number + client name. Label: "Vencimentos do mês".

## 6. Do's and Don'ts

### Do:

- **Do** use brand orange for identity, trust accents, automation cues, and conversion CTAs.
- **Do** show concrete product artifacts (message preview, comprovante row, due-date ruler) instead of abstract feature icon grids.
- **Do** keep section radii at `rounded-xl` (≈12px) and button radii at `rounded-lg` (8px).
- **Do** pair every status color (paid, late, sent) with a Portuguese text label.
- **Do** respect `prefers-reduced-motion: reduce` — disable scroll-smooth and collapse animation durations.
- **Do** maintain ≥4.5:1 body text contrast on tinted `bg-muted` sections.
- **Do** lead with relief-oriented copy (*menos peso na consciência, mais previsibilidade no bolso*) — design should feel aliviador, not cobrança agressiva.

### Don't:

- **Don't** use green of any kind as a brand, accent, atmosphere, or status token — including WhatsApp green. WhatsApp is copy/channel only.
- **Don't** use generic SaaS landing templates: hero metrics, gradient text, cream paper backgrounds, uppercase eyebrow kickers on every section, identical icon-card grids.
- **Don't** adopt aggressive collections or debt-recovery tone in color or copy — Mensaliza removes embarrassment; it doesn't threaten clients.
- **Don't** position visually as a payment gateway (Stripe/PagSeguro-style "we process your payments") — money goes direct to the professional.
- **Don't** use over-engineered enterprise billing UI patterns that imply complexity, contracts, or maquininha requirements.
- **Don't** use 2026 AI landing tells: editorial serif drop caps, glassmorphism cards, diagonal stripe backgrounds, or insanely rounded 32px+ card radii.
- **Don't** combine border + wide soft shadow on cards (ghost-card pattern).
- **Don't** use side-stripe borders, gradient text, or decorative motion (blur orbs, staggered section entrances, pulse animations).
- **Don't** use status colors as the only signal — always include text.
