# CTA Premium Subtle Design Spec

Date: 2026-04-23
Project: top-show-pro
Status: Approved in chat

## Goal

Redesign all reusable CTA buttons across the site with a more refined visual style that feels cool, impactful, and subtle, while explicitly excluding the `Contacto` CTA in the main navbar.

## Scope

In scope:
- Reusable CTA components used in site pages (`home`, `servicios`, `equipamiento`, `eventos`, event detail, and equivalent sections).
- Shared CTA visual language and states in the central button system.
- Consistent behavior for desktop and mobile.

Out of scope:
- Main navbar `Contacto` CTA (`navbar-contact-glass` in `components/nav/Header.tsx`).
- Form submit buttons, tabs, icon-only buttons, and other non-CTA controls unless they explicitly consume the shared CTA variant.
- Data fetching, API behavior, content model, routing, and business logic.

## Approved Direction

Chosen approach: single unified CTA system (Option 1).

Approved style decisions:
- Impact level: subtle premium.
- Base appearance: dark background with cyan-accented border (not cyan-filled).
- Shape: slightly rounded corners (`8px`).
- Coverage: all reusable CTAs except navbar main `Contacto`.

## Architecture

Use one shared CTA style contract in the existing reusable button pipeline so all CTA consumers inherit the same design from a single source of truth.

Primary integration points:
- `components/ui/button.tsx` (variant definitions and state behavior).
- `components/ui/cta-outline-link.tsx` (CTA link wrapper that consumes the shared variant).
- `app/globals.css` (supporting tokenized visual behavior only where needed).

Explicit exception:
- Keep `navbar-contact-glass` unchanged in `components/nav/Header.tsx` for both desktop and mobile nav contexts.

## Visual Specification

### Base (idle)
- Background: dark elevated surface aligned with existing tokens (`--bg-surface` / `--bg-elevated`).
- Border: thin cyan-tinted outline with restrained opacity.
- Text: high legibility white, uppercase tracking consistent with existing CTA typography.
- Radius: `8px`.

### Hover
- Subtle vertical lift (`translateY(-1px)`).
- Slight border/accent contrast increase.
- Very soft halo/glow, low radius and low opacity.
- No aggressive neon bloom.

### Active
- Micro compression (`scale(0.985)`) with quick recovery.

### Focus-visible
- Clear cyan focus ring with offset, more obvious than hover.
- Keyboard focus must remain visible on dark and mixed-media backgrounds.

### Disabled
- Reduced contrast and no emphasis effects.
- Motion and glow removed.

### Motion
- Duration: `200-240ms`.
- Easing: `[0.16, 1, 0.3, 1]`.
- Respect `prefers-reduced-motion` by suppressing movement-heavy transitions.

## Data Flow and Behavior Impact

This change is presentation-only. No data flow changes are introduced.

Render path remains:
- Page section components -> shared CTA wrapper/component -> shared button variant -> final DOM button/link.

No new runtime dependencies are required.

## Risks and Mitigations

Risk: CTA can lose contrast over media-heavy backgrounds.
- Mitigation: validate contrast in hero/video contexts and tune border/text/halo intensity with tokens.

Risk: style leakage to non-CTA controls.
- Mitigation: scope variant updates to CTA-specific variants only.

Risk: unintended visual drift in navbar contact action.
- Mitigation: explicit exclusion and regression check for `navbar-contact-glass`.

## Validation Plan

Manual visual verification matrix:
- `app/(site)/page.tsx`
- `app/(site)/servicios/page.tsx`
- `app/(site)/equipamiento/page.tsx`
- `app/(site)/eventos/[slug]/page.tsx`
- Any other pages using `CtaOutlineLink`

Checks:
- CTA consistency (idle/hover/active/focus/disabled).
- Mobile and desktop parity.
- Focus-visible accessibility.
- No regressions on navbar `Contacto` CTA in both desktop and mobile menu.

Success criteria:
- Reusable CTAs feel more premium and coherent.
- Visual impact increases through precision, not heavy effects.
- Navbar `Contacto` CTA remains unchanged.

## Non-Goals (YAGNI)

- No new CTA family tree or multiple thematic CTA systems.
- No palette expansion beyond existing design tokens.
- No refactor unrelated to CTA styling.
