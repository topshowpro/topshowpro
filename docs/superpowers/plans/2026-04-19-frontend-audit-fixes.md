# Frontend Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical and medium-priority frontend issues found in the design audit — accessibility, hover states via CSS, form UX, skeleton loaders, breadcrumbs, animation polish.

**Architecture:** Direct file edits; no new abstractions. CSS-only hover replaces onMouseOver/onMouseOut inline handlers. Form fields get IDs so labels associate correctly. Skeleton loader is a new component. All changes stay in existing file structure.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, Framer Motion, react-hook-form + Zod, CSS custom properties.

---

## File Map

| File | What Changes |
|---|---|
| `components/contact/ContactForm.tsx` | htmlFor/id on all fields, remove `outline:'none'`, error color, CSS class refs |
| `app/globals.css` | `.form-input`, `.form-select`, `.form-textarea` CSS classes; `--color-error` token |
| `components/nav/Header.tsx` | Remove onMouseOver/onMouseOut, add CSS hover via Tailwind |
| `components/services/ServiceTabs.tsx` | Remove onMouseOver/onMouseOut on CTA, use CSS hover |
| `components/events/EventCard.tsx` | Replace hardcoded rgba border with `var(--accent-cyan)` |
| `components/motion/BeamSweep.tsx` | Replace hardcoded rgba color with CSS var |
| `components/events/EventSkeleton.tsx` | New — shimmer skeleton card |
| `app/(site)/eventos/page.tsx` | Add loading state with skeleton |
| `components/services/ServiceCard.tsx` | Render icon prop |
| `app/(site)/eventos/[slug]/page.tsx` | Add breadcrumb back link |
| `components/equipment/BrandsMarquee.tsx` | Add mask-image edge fade |
| `lib/motion.ts` | Add exit variants to all variant objects |
| `components/motion/RevealText.tsx` | Remove pr-2, use gap instead |
| `app/(site)/servicios/page.tsx` | Add left border accent to stats |

---

## Task 1: Fix ContactForm — Accessibility (htmlFor/id)

**Files:**
- Modify: `components/contact/ContactForm.tsx`

- [ ] **Step 1: Add IDs to all inputs and link labels**

Replace the form fields block (lines 59–106) with:

```tsx
<div>
  <label htmlFor="category" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
    Categoría
  </label>
  <select id="category" {...register('category')} style={{ ...inputStyle, cursor: 'pointer' }}>
    <option value="" style={{ backgroundColor: 'var(--bg-elevated)' }}>Seleccioná una opción</option>
    {categories.map((c) => (
      <option key={c.label} value={c.label} style={{ backgroundColor: 'var(--bg-elevated)' }}>
        {c.label}
      </option>
    ))}
  </select>
  {errors.category && (
    <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.category.message}</p>
  )}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  <div>
    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
      Nombre / Empresa
    </label>
    <input id="name" {...register('name')} style={inputStyle} />
    {errors.name && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.name.message}</p>}
  </div>
  <div>
    <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
      Teléfono
    </label>
    <input id="phone" {...register('phone')} style={inputStyle} />
  </div>
</div>

<div>
  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
    Email
  </label>
  <input id="email" type="email" {...register('email')} style={inputStyle} />
  {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.email.message}</p>}
</div>

<div>
  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
    Consulta
  </label>
  <textarea id="message" {...register('message')} rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
  {errors.message && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.message.message}</p>}
</div>
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm typecheck
```
Expected: no errors related to ContactForm.

- [ ] **Step 3: Commit**

```bash
git add components/contact/ContactForm.tsx
git commit -m "fix(contact): associate labels with inputs via htmlFor/id, normalize error color"
```

---

## Task 2: Add `--color-error` token + form CSS classes to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add error token to `:root` block (after `--text-faint` line)**

```css
/* Error */
--color-error: #FF6B6B;
```

Also add to `@theme inline {}` block (after `--color-fg-faint` line):

```css
--color-error: var(--color-error);
```

Wait — this would be circular. Instead, add only to `:root`, and reference it as `var(--color-error)` in components (already done in Task 1 with inline `style={{ color: 'var(--color-error)' }}`). No `@theme inline` entry needed.

- [ ] **Step 2: Add form utility classes (at end of file, before closing)**

```css
/* Form field utilities */
.form-input,
.form-select,
.form-textarea {
  background-color: var(--bg-elevated);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  width: 100%;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 15px;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-cyan);
}

.form-textarea {
  resize: vertical;
}

.form-select {
  cursor: pointer;
}
```

- [ ] **Step 3: Update ContactForm to use CSS classes (replace `inputStyle` object)**

In `components/contact/ContactForm.tsx`, delete the `inputStyle` object (lines 19–28). Then:
- Change `<select ... style={{ ...inputStyle, cursor: 'pointer' }}>` → `<select ... className="form-select">`
- Change `<input ... style={inputStyle} />` → `<input ... className="form-input" />`
- Change `<input type="email" ... style={inputStyle} />` → `<input type="email" ... className="form-input" />`
- Change `<textarea ... style={{ ...inputStyle, resize: 'vertical' }} />` → `<textarea ... className="form-textarea" />`

The option `style={{ backgroundColor: 'var(--bg-elevated)' }}` stays inline (browser quirk for select options).

- [ ] **Step 4: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/contact/ContactForm.tsx
git commit -m "feat(design-system): add form CSS classes and error color token; clean up ContactForm inline styles"
```

---

## Task 3: Header — Replace onMouseOver with CSS hover

**Files:**
- Modify: `components/nav/Header.tsx`

- [ ] **Step 1: Replace nav link hover handlers with CSS class**

Current (lines 41–52):
```tsx
<Link
  key={l.href}
  href={l.href}
  className="font-sans text-sm uppercase tracking-widest transition"
  style={{ color: 'var(--text-muted)' }}
  onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
  onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
>
  {l.label}
</Link>
```

Replace with:
```tsx
<Link
  key={l.href}
  href={l.href}
  className="font-sans text-sm uppercase tracking-widest transition nav-link"
>
  {l.label}
</Link>
```

- [ ] **Step 2: Add `.nav-link` utility to `app/globals.css`**

```css
/* Navigation */
.nav-link {
  color: var(--text-muted);
}
.nav-link:hover {
  color: var(--accent-cyan);
}
```

- [ ] **Step 3: Add mobile menu animation**

Current (line 66–82):
```tsx
{open && (
  <div
    className="md:hidden px-6 py-8 space-y-4"
    style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
  >
    ...
  </div>
)}
```

Replace with (add `motion` import from `framer-motion` at top if not present):
```tsx
import { AnimatePresence, motion } from 'framer-motion';
```

```tsx
<AnimatePresence>
  {open && (
    <motion.div
      className="md:hidden px-6 py-8 space-y-4"
      style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={() => setOpen(false)}
          className="block font-display text-3xl text-white hover:opacity-70 transition"
        >
          {l.label}
        </Link>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

- [ ] **Step 4: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 5: Commit**

```bash
git add components/nav/Header.tsx app/globals.css
git commit -m "fix(nav): replace onMouseOver with CSS hover; animate mobile menu with Framer Motion"
```

---

## Task 4: ServiceTabs — Replace CTA onMouseOver with CSS

**Files:**
- Modify: `components/services/ServiceTabs.tsx`

- [ ] **Step 1: Replace inline hover handlers on CTA link (lines 61–69)**

Current:
```tsx
<a
  href={current.cta.link}
  className="inline-block px-6 py-3 font-sans text-sm uppercase tracking-widest transition hover:text-black"
  style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'black'; }}
  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'; e.currentTarget.style.color = 'white'; }}
>
  {current.cta.label}
</a>
```

Replace with:
```tsx
<a
  href={current.cta.link}
  className="service-cta inline-block px-6 py-3 font-sans text-sm uppercase tracking-widest transition"
>
  {current.cta.label}
</a>
```

- [ ] **Step 2: Add `.service-cta` to `app/globals.css`**

```css
/* Service CTA button */
.service-cta {
  background-color: var(--bg-elevated);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}
.service-cta:hover {
  background-color: var(--accent-cyan);
  color: var(--bg-base);
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/services/ServiceTabs.tsx app/globals.css
git commit -m "fix(services): replace onMouseOver with CSS hover on service CTA"
```

---

## Task 5: Fix hardcoded rgba colors → CSS vars

**Files:**
- Modify: `components/events/EventCard.tsx`
- Modify: `components/motion/BeamSweep.tsx`

- [ ] **Step 1: Fix EventCard category badge border (line 44)**

Current:
```tsx
style={{ color: 'var(--accent-cyan)', border: '1px solid rgba(23,133,211,0.4)' }}
```

Replace with:
```tsx
style={{ color: 'var(--accent-cyan)', border: '1px solid color-mix(in srgb, var(--accent-cyan) 40%, transparent)' }}
```

- [ ] **Step 2: Fix BeamSweep gradient color (line 4)**

Current:
```tsx
<div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[rgba(23,133,211,0.2)] to-transparent opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:translate-x-[200%]" />
```

Replace with:
```tsx
<div className="absolute inset-y-0 -left-1/2 w-1/2 opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:translate-x-[200%]"
  style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent-cyan) 20%, transparent), transparent)' }}
/>
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/events/EventCard.tsx components/motion/BeamSweep.tsx
git commit -m "fix(design-system): replace hardcoded rgba colors with CSS var references"
```

---

## Task 6: Events page — Skeleton loader

**Files:**
- Create: `components/events/EventSkeleton.tsx`
- Modify: `app/(site)/eventos/page.tsx`

- [ ] **Step 1: Create EventSkeleton component**

```tsx
// components/events/EventSkeleton.tsx
export function EventSkeleton() {
  return (
    <div className="relative block overflow-hidden aspect-[4/5] animate-pulse" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="absolute inset-x-0 bottom-0 p-5 space-y-3">
        <div className="h-3 w-16 rounded-none" style={{ backgroundColor: 'var(--bg-surface-hi)' }} />
        <div className="h-8 w-3/4 rounded-none" style={{ backgroundColor: 'var(--bg-surface-hi)' }} />
        <div className="h-3 w-1/2 rounded-none" style={{ backgroundColor: 'var(--bg-surface-hi)' }} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update EventosPage to show skeletons while loading**

In `app/(site)/eventos/page.tsx`, add `loading` state and import EventSkeleton:

```tsx
'use client';
import { useEffect, useState } from 'react';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';
import { EventSkeleton } from '@/components/events/EventSkeleton';

export default function EventosPage() {
  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events?cats=1')
      .then((r) => r.json())
      .then(setCats);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/events${active ? `?category=${active}` : ''}`)
      .then((r) => r.json())
      .then((data) => { setEvents(data); setLoading(false); });
  }, [active]);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <div
        className="pt-32 pb-16 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest mb-4 block" style={{ color: 'var(--accent-cyan)' }}>
            — Portfolio
          </span>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
          >
            Eventos
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 px-6 max-w-7xl mx-auto pb-24">
        <EventFilter categories={cats} active={active} onSelect={setActive} />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)}
          </div>
        ) : (
          <EventGrid events={events} />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/events/EventSkeleton.tsx app/(site)/eventos/page.tsx
git commit -m "feat(events): add skeleton loader while events data is fetching"
```

---

## Task 7: ServiceCard — Render icon prop

**Files:**
- Modify: `components/services/ServiceCard.tsx`

- [ ] **Step 1: Render icon as text/emoji above title**

Current signature accepts `icon?: string` but doesn't use it. The icons in mock data are emoji strings like `'💡'`, `'🔊'`. Add render:

```tsx
type ServiceCardProps = {
  name: string;
  shortDesc: string;
  icon?: string;
};

export function ServiceCard({ name, shortDesc, icon }: ServiceCardProps) {
  return (
    <div className="relative l-bracket p-8 aspect-[4/5] flex flex-col justify-end group overflow-hidden shadow-optic"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <span className="l-bracket-bl" />
      <span className="l-bracket-br" />

      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(23,133,211,0.05) 0%, transparent 70%)' }}
      />

      {icon && (
        <span className="text-4xl mb-4 relative z-10 block" aria-hidden="true">{icon}</span>
      )}
      <h3 className="font-display text-2xl text-white mb-3 relative z-10">{name}</h3>
      <p className="font-sans text-sm relative z-10" style={{ color: 'var(--text-muted)' }}>{shortDesc}</p>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add components/services/ServiceCard.tsx
git commit -m "feat(services): render icon prop in ServiceCard"
```

---

## Task 8: Event detail — Add breadcrumb back link

**Files:**
- Modify: `app/(site)/eventos/[slug]/page.tsx`

- [ ] **Step 1: Add breadcrumb above hero**

Add `import Link from 'next/link';` at the top if not already there.

Insert this block immediately inside `<article>`, before `<header className="relative h-[70svh]...">`:

```tsx
<div className="px-6 pt-24 pb-0 max-w-7xl mx-auto">
  <Link
    href="/eventos"
    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition nav-link"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M10 12L6 8l4-4" />
    </svg>
    Volver a eventos
  </Link>
</div>
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/eventos/[slug]/page.tsx"
git commit -m "feat(eventos): add back breadcrumb link to event detail page"
```

---

## Task 9: BrandsMarquee — Add edge fade with mask-image

**Files:**
- Modify: `components/equipment/BrandsMarquee.tsx`

- [ ] **Step 1: Add mask-image to wrapper**

Current wrapper:
```tsx
<div className="relative overflow-hidden py-16" style={{ borderTop: '...', borderBottom: '...' }}>
```

Replace with:
```tsx
<div
  className="relative overflow-hidden py-16"
  style={{
    borderTop: '1px solid rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
  }}
>
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add components/equipment/BrandsMarquee.tsx
git commit -m "fix(equipment): add mask-image fade to BrandsMarquee edges"
```

---

## Task 10: Add exit variants to lib/motion.ts

**Files:**
- Modify: `lib/motion.ts`

- [ ] **Step 1: Add exit states to all variants**

Replace full file content:

```ts
import type { Variants } from 'framer-motion';

export const easePremium = [0.16, 1, 0.3, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

export const revealTextWords: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.3 } },
};

export const modalLedOpen: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { scale: 0.92, opacity: 0, transition: { duration: 0.3 } },
};
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "feat(motion): add exit variants to all Framer Motion variant objects"
```

---

## Task 11: RevealText — Fix word spacing (remove pr-2)

**Files:**
- Modify: `components/motion/RevealText.tsx`

- [ ] **Step 1: Replace pr-2 with gap-based spacing**

Current (line 11):
```tsx
<motion.span variants={revealTextWords} className="inline-block pr-2">{w}</motion.span>
```

Replace with:
```tsx
<motion.span variants={revealTextWords} className="inline-block">{w}</motion.span>
```

And add a space character after each word (except last), or change the outer wrapper to use gap:

```tsx
export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.25em' }}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={revealTextWords} className="inline-block">{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add components/motion/RevealText.tsx
git commit -m "fix(motion): replace pr-2 word padding with flexbox gap in RevealText"
```

---

## Task 12: Stats — Add left border accent

**Files:**
- Modify: `app/(site)/servicios/page.tsx`

- [ ] **Step 1: Add left border to each stat card (lines 55–70)**

Current:
```tsx
<div key={stat.label} className="text-center">
  <p className="font-display text-5xl text-white mb-2" style={{ color: 'var(--accent-cyan)' }}>
    {stat.num}
  </p>
  <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
    {stat.label}
  </p>
</div>
```

Replace with:
```tsx
<div key={stat.label} className="pl-4 text-left" style={{ borderLeft: '2px solid var(--accent-cyan)' }}>
  <p className="font-display text-5xl mb-2" style={{ color: 'var(--accent-cyan)' }}>
    {stat.num}
  </p>
  <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
    {stat.label}
  </p>
</div>
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/servicios/page.tsx"
git commit -m "fix(servicios): add left border accent to stats for visual hierarchy"
```

---

## Final Verification

- [ ] Run `pnpm build` — verify no build errors
- [ ] Start dev server `pnpm dev` and visually check:
  - Contact form: labels clickable → focus lands on correct input
  - Header: nav links turn cyan on hover without JS
  - Mobile nav: menu slides in/out smoothly
  - Events page: skeletons appear before content loads
  - Event detail: "← Volver a eventos" visible below header
  - Servicios: stats have cyan left border
  - BrandsMarquee: edges fade to transparent
  - ServiceCard: icon emoji visible above title (if mock data has icon field)
- [ ] Commit any final cleanup
