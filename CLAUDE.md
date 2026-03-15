# Ketchup Crimes — Claude Code Project Context

> Read this file at the start of every session. It is the single source of truth
> for this project's design decisions, conventions, and constraints.

---

## What this project is

**ketchupcrimes.com** is a niche humor merchandise storefront and content brand.
The premise: ketchup is a crime, and we are the world's foremost authority on
condiment-related offenses. Think government law enforcement agency that has
completely lost perspective on what constitutes a real crime.

The brand sits at the intersection of:
- The Onion (deadpan institutional authority applied to absurd subjects)
- True crime aesthetic (forensic documents, evidence bags, wanted posters)
- Impulse-buy / gift-friendly merch (stickers, mugs, t-shirts, hoodies)

The brand never winks at the camera. Every touchpoint is played completely straight.

---

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Payments:** Stripe Checkout (hosted, not embedded)
- **Fulfillment:** Printify (webhook-based, fully automated)
- **Hosting:** Vercel (hobby tier)
- **Domain:** ketchupcrimes.com

---

## Design tokens

### Colours

| Name | Hex | Usage |
|---|---|---|
| `crime-black` | `#0A0A0A` | Primary background, dominant surface |
| `parchment` | `#F5F0E8` | Document backgrounds, off-white text on dark |
| `evidence-red` | `#CC2200` | Accent only — stamps, alerts, emphasis |
| `tape-yellow` | `#F5C518` | Crime scene tape elements only |
| `muted-gray` | `#888880` | Secondary text, metadata |

**Rules:**
- Evidence red is used sparingly — max one element per section
- Never use pure white (`#FFFFFF`) — always use parchment (`#F5F0E8`)
- Never use Heinz red (`#C8102E`) — too on the nose
- Dark backgrounds are the default. Light (parchment) surfaces are for "document" components only

### Typography

| Role | Font | Source | Weight |
|---|---|---|---|
| Wordmark / headlines | Big Shoulders Display | Google Fonts | 800 |
| Subheadings | Big Shoulders Display | Google Fonts | 600 |
| Body / UI | Special Elite | Google Fonts | 400 |
| Document copy | Courier Prime | Google Fonts | 400 / 700 |
| Metadata / labels | Space Mono | Google Fonts | 400 |

**Rules:**
- Never use rounded, friendly, or script fonts anywhere
- The humor comes from the content — typography stays institutional
- All caps is acceptable for headlines and stamps only
- Tracking (letter-spacing) should be slightly wide on labels: `0.08em`

### Graphic language

These SVG elements are core to the visual identity. Build them as reusable components:

- **Crime scene tape** — diagonal yellow/black stripe pattern, used as dividers and accents
- **Rubber stamps** — "CLASSIFIED", "EVIDENCE", "CASE CLOSED", "EXHIBIT A"
  rendered in red with a slight rotation (-2deg to +2deg) and opacity ~0.85
- **Evidence labels** — parchment rectangle with case number, date, description fields
- **Case file tabs** — folder tab component for navigation or section headers
- **Fingerprint motif** — subtle background texture element (low opacity, ~0.04)

---

## Brand voice

Ketchup Crimes is the world's foremost authority on condiment-related offenses.
We document, prosecute, and mock those who put ketchup on things that deserve better.
Our tone is that of a very serious institution investigating a very stupid problem —
think government pamphlet written by someone with deeply personal feelings about hot dogs.
We never wink at the camera; the joke is that we are completely sincere.
Every post, product description, and caption is filed as official evidence.

### Voice rules

- Write product descriptions as evidence inventory forms
- Write section headers as official department headings
- Use case numbers, file numbers, and dates wherever plausible
- "Bureau of Ketchup Enforcement" is the implied institution behind the brand
- Never use exclamation marks — they break the deadpan
- Avoid casual language like "check out" or "shop now" — prefer "review evidence" or "file a report"

### Copy examples (use as reference)

| Generic | Ketchup Crimes version |
|---|---|
| "Shop now" | "Review evidence" |
| "New arrivals" | "Recent case files" |
| "Add to cart" | "File as evidence" |
| "Free shipping on orders over $50" | "Complimentary evidence transport. Orders exceeding $50 CAD." |
| "Coming soon" | "Investigation in progress" |
| "Subscribe for updates" | "Request case file updates" |
| "Sold out" | "Evidence destroyed" |

---

## Project structure

```
ketchupcrimes.com/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, nav
│   ├── page.tsx            # Homepage / coming soon (Phase 1)
│   ├── shop/
│   │   ├── page.tsx        # Product grid
│   │   └── [slug]/
│   │       └── page.tsx    # Individual product page
│   ├── crimes/             # Content / blog section
│   │   └── page.tsx        # Crime of the week feed
│   └── api/
│       ├── stripe/         # Stripe webhook handler
│       └── printify/       # Printify webhook handler
├── components/
│   ├── ui/                 # Reusable primitives
│   │   ├── Stamp.tsx       # Rubber stamp component
│   │   ├── EvidenceLabel.tsx
│   │   ├── CrimeTape.tsx
│   │   └── CaseFileTab.tsx
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   └── shop/
│       ├── ProductCard.tsx
│       └── CartButton.tsx
├── lib/
│   ├── printify.ts         # Printify API client
│   └── stripe.ts           # Stripe helpers
├── public/
│   ├── images/
│   │   ├── designs/        # Merch design files
│   │   └── og/             # OG images per page
│   └── fonts/              # Self-hosted fallbacks
├── CLAUDE.md               # This file
└── .env.local              # API keys (never commit)
```

---

## Environment variables needed

```bash
# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Printify
PRINTIFY_API_TOKEN=
PRINTIFY_SHOP_ID=

# App
NEXT_PUBLIC_SITE_URL=https://ketchupcrimes.com
```

---

## Phase tracker

| Phase | Status | Description |
|---|---|---|
| 0 | Done | Domain, social handles, brand direction |
| 1 | Active | Coming soon landing page |
| 2 | Backlog | First 10 designs + Printify products |
| 3 | Backlog | Full storefront build |
| 4 | Backlog | Social foundation (IG + TikTok) |
| 5 | Backlog | Automation pipeline (n8n + Claude API) |
| 6 | Backlog | Scale — catalog expansion + multi-channel |

---

## Conventions

- Use TypeScript throughout — no `.js` files
- Tailwind utility classes only — no custom CSS files except for font imports
- All components are functional — no class components
- Framer Motion for all animations — no CSS keyframes
- Images use Next.js `<Image>` component always — never bare `<img>`
- Use `async/await` — no `.then()` chains
- Error states and loading states required on all data-fetching components

---

## Current session notes

_Update this section at the start of each session with what you're working on._

Session 1: Building coming soon landing page (Phase 1).
