# Project Rules — بل بیوتی لب (dental/booking site)

Rules for every change in this repo. Keep them.

## Stack
- **Next.js 16 (App Router) + TypeScript** — strict mode, no `any`.
- **Tailwind CSS v4** — utilities + design tokens declared once in `app/globals.css` via `@theme`. No random hex values, arbitrary font families, or inline styles in components.
- **State:** `zustand` is the **only** state manager. Stores: `store/booking-store.ts` (wizard), `store/ui-store.ts` (lightbox/menu). No Redux, Context stores, Jotai, etc.
- **Animation:** `framer-motion` is the **only** animation library. No CSS keyframe hacks duplicated per component — reusable motion variants live in `lib/motion.ts`.

## Structure
- `app/` — routes, layout, global styles. Server components by default.
- `components/` — UI building blocks. `"use client"` **only** when a component needs state, event handlers, or motion.
- `lib/` — site content (`site.ts`), shared types, motion variants. Content never gets hardcoded in JSX.
- `store/` — zustand stores only.
- `public/images/` — static assets. Named clearly (`portfolio-1.svg` …), referenced from `site.ts`.

## Content & data
- **All copy, nav links, portfolio items, prices, socials live in `lib/site.ts`.** Components render from props/data, never inline strings, so re-branding means editing one file.
- Types for content are defined in `lib/site.ts` and imported everywhere.
- **The site is Persian (RTL).** `lang="fa" dir="rtl"` on `<html>`, Vazirmatn via `next/font` in `app/layout.tsx`.
- Never use `tracking-*` or `uppercase` on Persian text — it breaks the joined script. Latin-only strings (monogram, social shorts) may keep tracking.
- Prefer logical utilities (`start-*/end-*/text-start`) over `left/right/text-left` so layout stays correct in RTL.
- Format numbers, prices (Toman) and dates with the `Intl`-based helpers in `lib/nail-flow.ts` — never hand-roll digits.

## Images
- Always `next/image` with meaningful `alt` text. SVGs pass through unoptimized automatically.
- Placeholder images are local SVGs; replacing them with real photos (same filename) requires no code change.

## Conventions
- New sections = one component per section + entry in `app/page.tsx`, with an `id` anchor matching a nav link.
- Keep components presentational; interaction state goes through a zustand store (e.g. `ui-store.ts`, `booking-store.ts`).
- Multi-step flows keep their step logic in a store, never in component-local state.

## Design system (app/globals.css is the single source)
- Tokens: `--bg/--surface/--surface-dark/--primary/--accent/--accent-strong/--text/--muted/--line/--success/--error` + `shadow-soft/lift`. Use Tailwind utilities generated from them (`bg-bg`, `text-muted`, `border-line`, …). No random hex values or inline styles in components.
- Palette is intentionally small: warm off-white, charcoal, champagne gold, soft green (success), muted red (error). Don't add colors.
- Cards: `rounded-2xl border border-line bg-surface`; hover = `-translate-y-0.5` + `hover:shadow-lift`. No heavy shadows or gradients.
- Primary button: `rounded-full bg-primary text-bg` (or `bg-accent` on dark bands); min height `min-h-11` (~44px touch target).
- Icons are inline SVGs in `components/icons.tsx` — stroke-based, 1.6 width, `aria-hidden`.

## Motion
- All framer variants live in `lib/motion.ts` — subtle and fast (0.2–0.6s, ease `[0.22,1,0.36,1]`). No flashy animation.
- `MotionProvider` (reducedMotion="user") wraps the app; the global CSS also forces reduced durations under `prefers-reduced-motion`. Never bypass it.
- Wizard steps transition with the direction-aware `slideX` variant.

## Booking wizard (app/book)
- Flow data & pure helpers live in `lib/booking.ts` (steps, options, Jalali dates, slots, phone validation, tracking ID). Components render from that data — no hardcoded option lists in JSX.
- Wizard state lives only in `store/booking-store.ts` with the `canEnter` step-order guard; `direction` (+1/−1) drives step transitions. Don't add component-local step state.
- Changing the date clears the picked time; changing the condition clears downstream selections.
- Prototype only — no real payment; no sensitive data stored. Copy stays in `lib/site.ts` / `lib/booking.ts`.

## Testing
- `vitest` tests in `lib/booking.test.ts` cover the wizard: step guards, multi-select, date/time coupling, back navigation, confirmation validation, tracking ID and phone validation. When you change the flow, update these tests first.
- Run `npx tsc --noEmit`, `npm run lint`, `npm test`, and `npm run build` before considering work done.
- **Payments:** the booking flow is a prototype — no real payment integration. Never collect or store card numbers as anything other than an ignored demo field.
- Commits: short imperative subject + body explaining the why.
