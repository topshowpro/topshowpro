# Equipamiento Secondary Hero Neon Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un fondo neon sutil y premium detrás del módulo secundario de hero en `/equipamiento` ("¿Necesitás cotizar?"), con comportamiento accesible y performance-safe.

**Architecture:** Se implementa un backdrop reusable específico para la sección (`SecondaryHeroNeonBackdrop`) que compone lenguaje visual existente (grid, glow, neon orbs) y una capa de “light sweep” inspirada en Remotion pero ejecutada en CSS para evitar costo de runtime/deps. La integración queda encapsulada en `app/(site)/equipamiento/page.tsx` con capas `pointer-events-none` y contenido en `z-10`. Se define un contrato de reduced-motion explícito para apagar animaciones sin perder atmósfera.

**Tech Stack:** Next.js App Router v16, React 19, TypeScript, Tailwind v4 + utilities globales en `app/globals.css`, componentes UI/motion existentes (`FadeIn`, `NeonOrbs`, `CtaOutlineLink`).

---

## Visual Direction and Option Decision (before coding)

- **Option A (chosen):** CSS-first neon ambient (orbs + radial glow + soft sweep) usando tokens actuales (`--accent-cyan`, `--bg-*`). Pros: cero dependencias nuevas, performance alta, simple de mantener.
- **Option B (not now):** Video loop prerender estilo Remotion (`.webm`) detrás del módulo. Pros: look cinematográfico más rico; Contras: peso de assets, decode cost, mayor complejidad de responsive/reduced-motion.
- **Option C (not now):** Canvas/WebGL ambient effect. Pros: control total; Contras: alto riesgo de ruido/performance y fuera de YAGNI.

Decisión YAGNI: implementar Option A ahora y dejar hook visual para evolucionar a B si marketing pide mayor espectacularidad.

## File Structure Mapping

- **Create:** `components/equipment/SecondaryHeroNeonBackdrop.tsx`  
  Responsabilidad: capa visual reusable para el hero secundario (orbs, glow, sweep, vignette), sin lógica de negocio.
- **Modify:** `app/(site)/equipamiento/page.tsx`  
  Responsabilidad: envolver el CTA secundario en contenedor `relative overflow-hidden`, montar backdrop detrás, mantener copy/CTA actuales.
- **Modify:** `app/globals.css`  
  Responsabilidad: utilidades CSS dedicadas al secondary hero neon (sweep sutil, máscara/vignette y reduced-motion específico).
- **Create:** `docs/qa/equipamiento-secondary-hero-neon.md`  
  Responsabilidad: checklist de QA visual/a11y/performance para validación manual repetible (porque el repo no tiene runner de tests front configurado).

### Task 1: Preparar contrato de calidad (TDD ligero + baseline)

**Files:**
- Create: `docs/qa/equipamiento-secondary-hero-neon.md`
- Modify: `app/(site)/equipamiento/page.tsx`

- [ ] **Step 1: Escribir primero el checklist QA (estado inicial esperado: FAIL parcial)**

```md
# QA — Equipamiento Secondary Hero Neon

## Scope
- Ruta: `/equipamiento`
- Módulo: CTA con copy "¿Necesitás cotizar?"

## Visual checks
- [ ] Se ve glow neon sutil detrás del módulo (sin competir con el texto)
- [ ] No hay flicker ni banding visible en desktop (1440px)
- [ ] En mobile (375px) el efecto se mantiene limpio (sin ruido)

## Accessibility checks
- [ ] Las capas decorativas usan `aria-hidden="true"`
- [ ] El CTA mantiene foco visible y contraste AA
- [ ] Con `prefers-reduced-motion: reduce` no hay animaciones activas

## Performance checks
- [ ] No aparecen layout shifts al entrar en viewport
- [ ] Scroll fluido, sin jank perceptible
```

- [ ] **Step 2: Marcar baseline actual (sin efecto nuevo) como evidencia de fallo inicial**

Run: `npm run dev`  
Expected: la sección CTA actual no tiene backdrop neon dedicado, por lo tanto el checklist anterior todavía no se cumple completo.

- [ ] **Step 3: Commit de baseline para trazabilidad (frequent commit #1)**

```bash
git add docs/qa/equipamiento-secondary-hero-neon.md app/(site)/equipamiento/page.tsx
git commit -m "test: add qa checklist for equipamiento secondary hero neon"
```

### Task 2: Crear backdrop reusable neon sutil (implementación mínima)

**Files:**
- Create: `components/equipment/SecondaryHeroNeonBackdrop.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Escribir componente mínimo de backdrop (sin tocar aún la página)**

```tsx
import { NeonOrbs } from '@/components/ui/NeonOrbs';

export function SecondaryHeroNeonBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="secondary-hero-neon-vignette absolute inset-0" />
      <div className="secondary-hero-neon-glow absolute inset-0" />
      <div className="secondary-hero-neon-sweep absolute inset-0" />
      <NeonOrbs
        orbs={[
          { color: 'cyan', drift: 'a', size: '460px', top: '-180px', left: '-120px', opacity: 0.35 },
          { color: 'violet', drift: 'b', size: '380px', top: '-120px', right: '-100px', opacity: 0.22 },
          { color: 'mint', drift: 'c', size: '320px', bottom: '-180px', left: '25%', opacity: 0.16 },
        ]}
      />
    </div>
  );
}
```

- [ ] **Step 2: Agregar utilidades CSS específicas para este módulo (DRY, sin hex nuevos)**

```css
.secondary-hero-neon-vignette {
  background:
    radial-gradient(120% 85% at 50% 0%, color-mix(in srgb, var(--accent-cyan) 14%, transparent) 0%, transparent 62%),
    linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--bg-base) 72%, transparent) 100%);
}

.secondary-hero-neon-glow {
  background:
    radial-gradient(40% 30% at 18% 25%, color-mix(in srgb, var(--accent-cyan) 14%, transparent), transparent 72%),
    radial-gradient(35% 28% at 82% 20%, color-mix(in srgb, var(--accent-cyan) 10%, transparent), transparent 70%);
}

.secondary-hero-neon-sweep::before {
  content: '';
  position: absolute;
  inset: -20% 0;
  background: linear-gradient(
    100deg,
    transparent 20%,
    color-mix(in srgb, var(--accent-cyan) 14%, transparent) 50%,
    transparent 80%
  );
  filter: blur(18px);
  animation: secondary-hero-neon-sweep 10s ease-in-out infinite;
}

@keyframes secondary-hero-neon-sweep {
  0%, 100% { transform: translateX(-18%) translateY(0); opacity: 0.24; }
  50% { transform: translateX(18%) translateY(-2%); opacity: 0.36; }
}
```

- [ ] **Step 3: Definir reduced-motion explícito para este backdrop**

```css
@media (prefers-reduced-motion: reduce) {
  .secondary-hero-neon-sweep::before {
    animation: none;
    opacity: 0.16;
    transform: none;
  }
}
```

- [ ] **Step 4: Validación técnica local de la unidad**

Run: `npm run typecheck`  
Expected: PASS (sin errores de tipos en el nuevo componente/CSS).

- [ ] **Step 5: Commit de implementación mínima (frequent commit #2)**

```bash
git add components/equipment/SecondaryHeroNeonBackdrop.tsx app/globals.css
git commit -m "feat: add reusable neon backdrop for equipamiento secondary hero"
```

### Task 3: Integrar backdrop en `/equipamiento` secondary hero

**Files:**
- Modify: `app/(site)/equipamiento/page.tsx`

- [ ] **Step 1: Importar backdrop y preparar contenedor relativo con capas**

```tsx
import { SecondaryHeroNeonBackdrop } from '@/components/equipment/SecondaryHeroNeonBackdrop';
```

```tsx
<section className="relative overflow-hidden px-6 py-32 text-center">
  <SecondaryHeroNeonBackdrop />

  <div className="absolute inset-0 grid-overlay opacity-[0.16]" aria-hidden="true" />

  <FadeIn className="relative z-10">
    <h2 className="font-display text-white mb-6 leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
      ¿Necesitás cotizar?
    </h2>
    <p className="font-sans text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
      Pedinos un presupuesto personalizado para tu proyecto.
    </p>
    <CtaOutlineLink href="/contacto" className="h-10 px-7 text-xs">
      Solicitar cotización
    </CtaOutlineLink>
  </FadeIn>
</section>
```

- [ ] **Step 2: Ajustar intensidad si el texto pierde jerarquía (criterio premium+sutil)**

```tsx
<div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_srgb,var(--bg-base)_45%,transparent)_100%)]" aria-hidden="true" />
```

- [ ] **Step 3: Verificar que no se alteró navegación/CTA/foco**

Run: `npm run dev`  
Expected: el botón “Solicitar cotización” sigue clickeable y con focus ring visible; capas visuales no capturan eventos (`pointer-events-none`).

- [ ] **Step 4: Commit de integración (frequent commit #3)**

```bash
git add app/(site)/equipamiento/page.tsx
git commit -m "feat: integrate subtle neon secondary hero backdrop in equipamiento"
```

### Task 4: Validar accesibilidad, performance y reduced-motion

**Files:**
- Modify: `docs/qa/equipamiento-secondary-hero-neon.md`

- [ ] **Step 1: Ejecutar checks automáticos disponibles del proyecto**

Run: `npm run typecheck`  
Expected: PASS.

Run: `npm run build`  
Expected: PASS y generación exitosa de la ruta `/equipamiento`.

- [ ] **Step 2: QA manual desktop/mobile/reduced-motion y documentar resultado**

Run: `npm run dev`  
Expected:
- Desktop 1440px: glow visible pero no invasivo.
- Mobile 375px: sin ruido visual ni clipping abrupto.
- DevTools `prefers-reduced-motion: reduce`: sweep/orb animations apagadas o estáticas.

```md
## Resultados ejecución
- typecheck: PASS
- build: PASS
- desktop visual: PASS/FAIL + nota
- mobile visual: PASS/FAIL + nota
- reduced-motion: PASS/FAIL + nota
```

- [ ] **Step 3: Commit de validación (frequent commit #4)**

```bash
git add docs/qa/equipamiento-secondary-hero-neon.md
git commit -m "test: validate neon secondary hero accessibility and performance"
```

### Task 5: Cierre DRY/YAGNI y preparación de evolución futura

**Files:**
- Modify: `components/equipment/SecondaryHeroNeonBackdrop.tsx`
- Modify: `docs/qa/equipamiento-secondary-hero-neon.md`

- [ ] **Step 1: DRY pass (eliminar duplicación y props innecesarios)**

```tsx
const ORBS = [
  { color: 'cyan', drift: 'a', size: '460px', top: '-180px', left: '-120px', opacity: 0.35 },
  { color: 'violet', drift: 'b', size: '380px', top: '-120px', right: '-100px', opacity: 0.22 },
  { color: 'mint', drift: 'c', size: '320px', bottom: '-180px', left: '25%', opacity: 0.16 },
] as const;

export function SecondaryHeroNeonBackdrop() {
  return <NeonOrbs orbs={[...ORBS]} />;
}
```

- [ ] **Step 2: YAGNI pass (dejar fuera Remotion runtime por ahora)**

```md
## Out of scope (YAGNI)
- No integrar `remotion` runtime/package en esta iteración.
- No agregar video background en `/public` hasta validar impacto de conversión con la versión CSS-first.
```

- [ ] **Step 3: Commit de hardening final (frequent commit #5)**

```bash
git add components/equipment/SecondaryHeroNeonBackdrop.tsx docs/qa/equipamiento-secondary-hero-neon.md
git commit -m "chore: harden secondary hero neon implementation scope and contracts"
```

## Testing Commands (single runbook)

1. `npm run typecheck`  
   Expected: `tsc --noEmit` termina sin errores.
2. `npm run build`  
   Expected: build de Next.js exitoso, sin errores en App Router.
3. `npm run dev`  
   Expected: `/equipamiento` renderiza el CTA secundario con fondo neon sutil; CTA funcional y foco visible.

## Self-Review (completed)

- **Spec coverage:** cubre propuesta visual neon sutil, compatibilidad stack actual (shadcn/Tailwind/CSS), guardrails de accesibilidad/performance y reduced-motion; incluye decisión sobre opción Remotion (postergada por YAGNI).
- **Placeholder scan:** no quedan `TODO`, `TBD`, ni pasos ambiguos; cada tarea incluye paths concretos, snippets y comandos.
- **Type consistency:** nombres de componente/clases consistentes entre tareas (`SecondaryHeroNeonBackdrop`, `secondary-hero-neon-*`, `NeonOrbs`).
- **Gap fix aplicado:** se agregó `docs/qa/equipamiento-secondary-hero-neon.md` para tener TDD/QA verificable pese a no existir test runner frontend en el repo.

Plan complete and saved to `docs/superpowers/plans/2026-04-21-equipamiento-secondary-hero-neon-effects.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
