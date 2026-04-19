# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # dev server (Turbopack, http://localhost:3000)
pnpm build        # production build
pnpm start        # production server
pnpm typecheck    # tsc --noEmit (no lint script — use typecheck)
```

No test runner configured. Type-check is the primary CI signal.

## Architecture

**Top Show Pro** — event tech rental company website (Argentina). Next.js 16 App Router + Sanity CMS + Resend email.

### Route structure

- `app/(site)/` — public-facing pages wrapped in Header/Footer layout
- `app/api/` — contact form, events endpoint, OG image gen, Sanity revalidation webhook
- `app/studio/[[...tool]]/` — embedded Sanity Studio at `/studio`

### Data strategy

Without `NEXT_PUBLIC_SANITY_PROJECT_ID`, all pages fall back to `lib/mock-data.ts`. Phase 2 wires up real Sanity data. Data fetching goes through `sanity/lib/queries.ts` (GROQ) + `sanity/lib/client.ts`.

### Sanity schema layout

```
sanity/schemas/
  documents/   # event, service, equipmentItem, brand, lead, …
  objects/     # seoFields, ctaBlock, mediaPicker
  singletons/  # siteSettings, hero, homepage, seoDefaults
```

`lead` is the contact form submission document — written via `SANITY_API_WRITE_TOKEN`.

### Design system

Dark-only cyberpunk aesthetic. Design tokens live in `app/globals.css` as CSS custom properties (`--bg-base`, `--accent-cyan`, `--accent-violet`, `--accent-mint`, etc.). shadcn/ui uses OKLch overrides. Utility classes like `.shadow-optic`, `.bg-focal-beam`, `.cta-gradient`, `.l-bracket` are defined there. Full reference: `docs-kickoff/DESIGN-SYSTEM.md`.

### Key lib files

- `lib/motion.ts` — shared Framer Motion variants
- `lib/seo.ts` — metadata builder (used in every route)
- `lib/mock-data.ts` — dev fallback, mirrors Sanity query shape
- `lib/resend.ts` — email helpers; templates in `lib/email-templates/`
- `lib/turnstile.ts` — Cloudflare Turnstile server-side validation

### Environment variables

See `.env.local.example`. Required for full functionality:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Enables Sanity data (without it → mock data) |
| `SANITY_API_READ_TOKEN` | SSR queries |
| `SANITY_API_WRITE_TOKEN` | Lead capture |
| `RESEND_API_KEY` | Contact email delivery |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Anti-spam |
| `SANITY_REVALIDATE_SECRET` | Webhook revalidation |

### Image handling

Remote images allowed from `cdn.sanity.io`, `images.unsplash.com`, `img.youtube.com`. Use `sanity/lib/image.ts` (wraps `@sanity/image-url`) for Sanity asset URLs.

### Animations

Lenis smooth scroll via `components/motion/LenisProvider.tsx` (root layout). Framer Motion `variants` from `lib/motion.ts`. Custom keyframes (`marquee`, `beam-sweep`, `scanline`) in `globals.css`.
