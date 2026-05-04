# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Snapshot

**Top Show Pro** is the marketing site for an event tech rental company in Argentina.
Stack: Next.js 16 App Router + TypeScript strict + Tailwind v4 + shadcn/ui + Framer Motion + Lenis + Sanity v3 + Resend.

## Commands

```bash
pnpm dev          # dev server (Turbopack, http://localhost:3000)
pnpm build        # production build
pnpm start        # production server
pnpm typecheck    # tsc --noEmit (primary CI signal)
```

No test runner is configured in this repo. Use `pnpm typecheck` plus manual visual QA for UI changes.

## Architecture

- `app/(site)/` public pages (Header/Footer layout)
- `app/api/` contact form, events endpoint, OG image, Sanity revalidation webhook
- `app/studio/[[...tool]]/` embedded Sanity Studio at `/studio`

Data path for CMS content:
- Queries in `sanity/lib/queries.ts`
- Client config in `sanity/lib/client.ts`
- Image URL builder in `sanity/lib/image.ts`

Fallback mode:
- If `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing, pages fall back to `lib/mock-data.ts`

## Current UX / Performance / Responsive Baseline

- Motion is premium but must degrade cleanly with `prefers-reduced-motion` (implemented across hero, tabs, forms, Lenis, and global CSS).
- Images should use `next/image` with accurate `sizes`; reserve `priority` for above-the-fold assets only.
- Keep mobile/desktop parity for CTAs and nav behavior; avoid desktop-only interactions.
- Prefer CSS/Tailwind interaction states over JS-only hover handlers when equivalent.
- Maintain accessibility and performance guardrails: no heavy animation regressions, no unnecessary layout shift, no blocked interaction on mobile.

## Design System

Dark cyberpunk visual system with tokenized CSS variables in `app/globals.css` (color, glow, glass, motion helpers).
Shared motion variants live in `lib/motion.ts`.
Design reference: `docs-kickoff/DESIGN-SYSTEM.md`.

## Key Lib Files

- `lib/motion.ts` shared Framer Motion variants
- `lib/seo.ts` metadata builder used across routes
- `lib/mock-data.ts` development fallback matching Sanity query shapes
- `lib/resend.ts` email helpers (`lib/email-templates/`)
- `lib/turnstile.ts` server-side Cloudflare Turnstile validation

## Environment Variables

See `.env.local.example` for the full list. Core variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Enable Sanity content (otherwise mock data) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version |
| `SANITY_API_READ_TOKEN` | SSR Sanity queries |
| `SANITY_API_WRITE_TOKEN` | Lead capture writes |
| `SANITY_REVALIDATE_SECRET` | Revalidation webhook secret |
| `RESEND_API_KEY` | Contact email delivery |
| `RESEND_FROM` / `RESEND_TO` | Email sender / recipient |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Anti-spam |
| `NEXT_PUBLIC_SITE_URL` | Production canonical URL |
