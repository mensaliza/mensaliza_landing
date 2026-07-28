---
target: homepage (src/app/page.tsx)
total_score: 26
p0_count: 1
p1_count: 2
timestamp: 2026-07-22T00-31-18Z
slug: src-app-page-tsx
---
Method: dual-agent (A: 6ed0bf22-1bbc-48a9-80af-d90b491163ab · B: 0b00acf4-8ba5-42a2-871c-faa9ec8a0c66)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No active nav on scroll; video/pricing visibly placeholder; `Entrar` → `#` |
| 2 | Match System / Real World | 4 | Strong pt-BR: Pix, WhatsApp, comprovante, personas |
| 3 | User Control and Freedom | 3 | Anchor nav + mobile sheet; dead app link hurts |
| 4 | Consistency and Standards | 3 | Cohesive shadcn rhythm; uppercase micro-labels inconsistent |
| 5 | Error Prevention | 2 | Placeholder URLs/pricing create false affordances |
| 6 | Recognition Rather Than Recall | 2 | Long page; 16 feature bullets; trust message buried until mid-page |
| 7 | Flexibility and Efficiency | 2 | No skip-to-demo/pricing; expected for marketing |
| 8 | Aesthetic and Minimalist Design | 2 | Repetitive section grammar; card density |
| 9 | Error Recovery | 3 | FAQ covers objections; no live support path |
| 10 | Help and Documentation | 3 | 11 FAQ items; no search or guided path |
| **Total** | | **26/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment:** Borderline AI slop. Copy saves it (Pix/WhatsApp specificity, `ReliefSection` embarrassment narrative); layout loses it (icon-card feature grid, orange shadcn template, `rounded-3xl` + border + shadow cards, decorative mono). Not instantly "AI made this," but visually undifferentiated from generic Brazilian SaaS starters.

**Deterministic scan:** CLI `detect.mjs` returned `[]` (exit 0) on `src/app/page.tsx` + `src/components/landing`. Manual Assessment B found 36 line-level issues the detector cannot see: contrast failures on tinted sections (`text-muted-foreground` on `bg-muted/50`), 7 border+shadow pairs, 5 reduced-motion gaps, placeholder `href="#"`, non-button video play control, logo without accessible name.

**Visual overlays:** Not available — browser automation unavailable in Assessment B; live-server started then stopped. No reliable user-visible overlay.

## Overall Impression

The landing has the right **words** for Mensaliza's "alívio" promise and strong product artifacts in the hero (`HeroVisual`, `DueDateRuler`). The **structure** still reads like a template: nine sections with the same heading→grid rhythm, a 16-bullet feature wall, and placeholder proof at the exact moments conversion requires trust. The single biggest opportunity: **distill the page around the emotional peak (`ReliefSection`) and real product demos**, then harden CTAs before any visual polish.

## What's Working

1. **`HeroVisual`** — WhatsApp bubble, Pix confirmation, due-date ruler with text labels (Pago/Atrasado). Shows the real flow; aligns with PRODUCT.md "mostrar o fluxo real."
2. **`ReliefSection`** — *"Cobrar não precisa ser constrangedor"* with before/after cards. Directly addresses the core embarrassment fear rare in billing SaaS.
3. **`HowItWorksSection`** — Dual-audience tabs plus alert that Mensaliza não processa pagamentos. Clearest trust statement on the page.

## Priority Issues

### [P0] Broken conversion paths and placeholder proof
- **Why:** `APP_URL = "#"`, demo flows to in-page anchor only, video section admits placeholder, pricing shows "(placeholder)". Trust collapses at the click.
- **Fix:** Wire real Calendly/WhatsApp demo URL and app login; embed video or remove section; replace fake R$ values with "sob consulta na demo" until confirmed.
- **Suggested command:** `$impeccable harden homepage CTAs, video, and pricing placeholders`

### [P1] `FeaturesSection` icon-card grid — generic + cognitive overload
- **Why:** Classic SaaS pattern; 4×4 bullets; `highlight: true` on WhatsApp/comprovante features never rendered in UI.
- **Fix:** Collapse to 2 hero features with mockups; wire `highlight` prop; move bullets behind expand or FAQ.
- **Suggested command:** `$impeccable distill FeaturesSection`

### [P1] Page length and section sameness fight "alívio"
- **Why:** Nine sections with identical grammar; emotional payoff in `ReliefSection` sits four sections below fold.
- **Fix:** Merge audience into hero or relief; defer video until real; consolidate pricing CTAs.
- **Suggested command:** `$impeccable distill homepage`

### [P2] Contrast and accessibility gaps (Assessment B manual)
- **Why:** Muted text fails AA on tinted sections; primary orange eyebrow ~2.8:1; WhatsApp status chips ~2.2:1 on tints; no `prefers-reduced-motion` guards; video play is a div not a button.
- **Fix:** Darken muted on tinted surfaces; bump primary text contrast; add motion-reduce overrides; convert play control to `<button>`.
- **Suggested command:** `$impeccable audit landing`

### [P2] Visual system reads template, not human ally
- **Why:** Orange-on-white shadcn default, ghost cards, backdrop-blur header — could be any SaaS.
- **Fix:** Tighten radii to 12–16px; drop border+shadow pairing; committed WhatsApp-green for trust, orange for CTA only.
- **Suggested command:** `$impeccable quieter homepage cards; $impeccable colorize`

## Persona Red Flags

**Jordan (First-Timer):** *"Régua de vencimentos"* jargon in hero before value lands; must scroll past audience + 4 feature cards before relief narrative; 11 FAQ items with no "start here" guidance; pricing placeholders signal "not real yet."

**Casey (Mobile):** Demo CTA in sticky header top-right — outside thumb zone; `DueDateRuler` horizontal scroll with 10px text; video play looks tappable but does nothing; long scroll through uniform sections on 3G.

**Camila (Nutricionista):** Persona listed first (good) but page shifts to generic SaaS in features; no FAQ answer to *"pacientes vão achar que sou robô?"*; relief section too far down; R$ 49–199 placeholders feel like another subscription weight, not alívio.

## Minor Observations

- Hero h1 at `lg:text-7xl` + `tracking-tighter` hits typographic ceiling; watch Portuguese overflow.
- Headline differs from PRODUCT.md memorable line (*"Pare de cobrar seus clientes um por um..."*).
- Footer legal links point to `#`.
- Dark mode tokens exist but landing is light-only.

## Questions to Consider

1. If the promise is "you don't send the awkward message," why is the longest section a 16-bullet feature grid instead of one full-screen WhatsApp thread?
2. Would Camila feel more relief if pricing disappeared until demo?
3. Is `ReliefSection` the real homepage — and everything else SEO scaffolding?
