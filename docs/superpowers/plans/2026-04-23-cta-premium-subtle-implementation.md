# CTA Premium Subtle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Roll out a unified premium-subtle CTA style across reusable site CTAs while keeping the main navbar `Contacto` CTA unchanged.

**Architecture:** Implement the new CTA look at a single source of truth (`cinematicOutline` in the shared button variant) and support it with one dedicated global CSS utility for precise hover/focus/motion behavior. Reusable CTA consumers (`CtaOutlineLink`) inherit automatically, so no per-page styling drift is introduced. Navbar action remains isolated via `navbar-contact-glass` and is intentionally excluded.

**Tech Stack:** Next.js 16, React 19, TypeScript, class-variance-authority, Tailwind utility classes, global CSS (`app/globals.css`)

---

### Task 1: Define CTA Premium Subtle CSS Primitive

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add a dedicated `.btn-cta-premium` block below existing button utility sections**

```css
/* ── CTA Premium Subtle ───────────────────────────────────────────────────── */
.btn-cta-premium {
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--accent-cyan) 30%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--bg-surface-hi) 55%, transparent) 0%,
    var(--bg-surface) 100%
  );
  color: var(--text-primary);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.28);
  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 220ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-cta-premium:hover:not(:disabled),
.btn-cta-premium:focus-visible:not(:disabled) {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--accent-cyan) 52%, transparent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 0 1px color-mix(in srgb, var(--accent-cyan) 20%, transparent),
    0 10px 24px color-mix(in srgb, var(--accent-cyan) 18%, transparent);
}

.btn-cta-premium:active:not(:disabled) {
  transform: scale(0.985);
}

.btn-cta-premium:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent-cyan) 70%, transparent);
  outline-offset: 2px;
}

.btn-cta-premium:disabled {
  border-color: color-mix(in srgb, var(--accent-cyan) 14%, transparent);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .btn-cta-premium {
    transition: border-color 220ms ease, box-shadow 220ms ease;
  }

  .btn-cta-premium:hover:not(:disabled),
  .btn-cta-premium:focus-visible:not(:disabled),
  .btn-cta-premium:active:not(:disabled) {
    transform: none;
  }
}
```

- [ ] **Step 2: Run typecheck to ensure no CSS import side-effects break build graph**

Run: `npm run typecheck`
Expected: command exits with code 0 and no TypeScript errors.

- [ ] **Step 3: Commit CSS primitive**

```bash
git add app/globals.css
git commit -m "feat(ui): add premium subtle CTA base styles"
```

### Task 2: Wire Shared CTA Variant to the New Primitive

**Files:**
- Modify: `components/ui/button.tsx`

- [ ] **Step 1: Replace `cinematicOutline` variant classes to use the premium primitive**

```ts
cinematicOutline:
  "btn-cta-premium font-sans font-semibold uppercase tracking-[0.14em] text-[11px] text-white border-transparent bg-transparent shadow-none hover:scale-100",
```

- [ ] **Step 2: Keep existing size behavior unchanged (`lg` remains current default in CTA wrapper)**

```ts
type CtaOutlineLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  className?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
};

export function CtaOutlineLink({ className, size = "lg", ...props }: CtaOutlineLinkProps) {
  return <Link className={cn(buttonVariants({ variant: "cinematicOutline", size }), className)} {...props} />;
}
```

- [ ] **Step 3: Run typecheck after variant update**

Run: `npm run typecheck`
Expected: command exits with code 0.

- [ ] **Step 4: Commit shared variant wiring**

```bash
git add components/ui/button.tsx components/ui/cta-outline-link.tsx
git commit -m "feat(ui): apply premium subtle style to shared CTA variant"
```

### Task 3: Protect Navbar Contact CTA From Regression

**Files:**
- Verify only: `components/nav/Header.tsx`, `app/globals.css`

- [ ] **Step 1: Confirm header still uses `navbar-contact-glass` class and not CTA variant**

```tsx
<Link
  href="/contacto"
  className="navbar-contact-glass inline-flex h-8 items-center justify-center rounded-lg px-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
>
  Contacto
</Link>
```

- [ ] **Step 2: Run dev server and visually verify desktop + mobile navbar Contact CTA remains unchanged**

Run: `npm run dev`
Expected: header `Contacto` looks identical to previous glass style on desktop and mobile menu.

- [ ] **Step 3: Commit only if any explicit guard/comment/update was needed (otherwise skip commit)**

```bash
git add components/nav/Header.tsx app/globals.css
git commit -m "test(ui): verify navbar contact CTA remains isolated"
```

### Task 4: Validate CTA Rollout Across All Reusable Consumers

**Files:**
- Verify usage: `app/(site)/page.tsx`
- Verify usage: `app/(site)/servicios/page.tsx`
- Verify usage: `app/(site)/equipamiento/page.tsx`
- Verify usage: `app/(site)/eventos/[slug]/page.tsx`
- Verify usage: `components/services/ServiceTabs.tsx`

- [ ] **Step 1: Confirm all reusable CTA instances still use `CtaOutlineLink` and no local overrides force old style**

```tsx
<CtaOutlineLink href="/contacto" className="h-10 px-7 text-xs">
  Contactanos
</CtaOutlineLink>
```

- [ ] **Step 2: Manual state checks (idle/hover/focus-visible/active/disabled) on each page listed above**

Run: `npm run dev`
Expected:
- Idle: dark base + cyan accent border, radius 8px.
- Hover: subtle lift + controlled halo.
- Focus-visible: clear cyan ring.
- Active: slight compression.
- Disabled (where present): reduced contrast, no emphasis motion.

- [ ] **Step 3: Capture any page-specific class conflicts and fix only via shared classes (no one-off page hacks)**

```tsx
// Preferred fix shape in shared source, not per page:
cinematicOutline: "btn-cta-premium ..."
```

- [ ] **Step 4: Commit rollout stabilization**

```bash
git add components/ui/button.tsx app/globals.css app/(site)/page.tsx app/(site)/servicios/page.tsx app/(site)/equipamiento/page.tsx app/(site)/eventos/[slug]/page.tsx components/services/ServiceTabs.tsx
git commit -m "fix(ui): stabilize premium subtle CTA states across site"
```

### Task 5: Final Verification and Documentation Sync

**Files:**
- Verify: `docs/superpowers/specs/2026-04-23-cta-premium-subtle-design.md`
- Optional update if needed: same spec file

- [ ] **Step 1: Build production bundle for regression confidence**

Run: `npm run build`
Expected: successful Next.js build with no type/runtime errors.

- [ ] **Step 2: Compare implementation against spec acceptance criteria**

```md
- Reusable CTAs feel premium and coherent.
- Impact is subtle (precision over heavy glow).
- Navbar `Contacto` CTA remains unchanged.
```

- [ ] **Step 3: If implementation diverges from spec wording, update spec for exactness (no ambiguity)**

```md
## Visual Specification
- Motion duration set to 220ms with cubic-bezier(0.16, 1, 0.3, 1).
```

- [ ] **Step 4: Final commit for verification/docs sync**

```bash
git add docs/superpowers/specs/2026-04-23-cta-premium-subtle-design.md
git commit -m "docs: align CTA premium subtle spec with implementation details"
```

## Self-Review

- Spec coverage: architecture, component scope, visual states, accessibility, reduced motion, exclusion of navbar CTA, and validation matrix are all mapped to tasks above.
- Placeholder scan: no TODO/TBD placeholders remain; all steps include concrete file paths and commands.
- Type consistency: the plan uses `cinematicOutline`, `CtaOutlineLink`, and `navbar-contact-glass` consistently across all tasks.
