# Cinematic Glass Pro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar de punta a punta Cinematic Glass Pro en navbar island, sistema CTA outline premium y animaciones refinadas para cards de servicios/equipamiento.

**Architecture:** Se centraliza el lenguaje visual en un CTA reusable (`Button` variant + helper wrapper) y utilidades CSS glass/motion para evitar estilos duplicados. El navbar evoluciona a island glass premium con estados top/scrolled y menú móvil coherente. Las cards se animan con Framer Motion + transiciones CSS respetando `prefers-reduced-motion` para una experiencia consistente y accesible.

**Tech Stack:** Next.js App Router (v16), React 19, TypeScript, Tailwind v4, shadcn/base-ui Button, Framer Motion.

---

### Task 1: Baseline técnico y contratos visuales

**Files:**
- Modify: `app/globals.css`
- Modify: `components/ui/button.tsx`
- Create: `components/ui/cta-outline-link.tsx`

- [ ] **Step 1: Definir tokens/utilidades Cinematic Glass Pro en global CSS**
  - Agregar clases utilitarias para:
    - `glass-island` (fondo translúcido premium + blur + borde sutil)
    - `glass-island-scrolled` (estado reforzado en scroll)
    - `glass-panel-mobile` (panel mobile consistente)
    - `motion-safe` para efectos solo cuando no hay reduced motion
  - Mantener paleta actual (`--bg-*`, `--accent-cyan`, `--text-*`) sin introducir colores nuevos fuera del sistema.

- [ ] **Step 2: Crear variante CTA outline premium reusable en Button**
  - En `components/ui/button.tsx`, incorporar `variant: cinematicOutline` con:
    - sin relleno sólido (outline/glass)
    - borde y glow cyan sutil
    - hover con beam/glow refinado (sin fill completo)
    - focus visible AA (`focus-visible:ring` + contraste correcto)
  - Mantener compatibilidad de variantes existentes.

- [ ] **Step 3: Crear wrapper reusable para links CTA**
  - Crear `components/ui/cta-outline-link.tsx` para encapsular:
    - `Link` de Next con estilo visual consistente
    - props base (`href`, `children`, `className`, `aria-label`)
    - reutilización directa en home/servicios/equipamiento/evento detalle y header.

- [ ] **Step 4: Verificación local de contrato visual**
  - Comprobar en código que ningún CTA principal nuevo depende de `btn-neon-outline` legacy.
  - Dejar `btn-neon` legacy intacto si hay usos secundarios fuera de alcance.

### Task 2: Navbar island premium (desktop + mobile)

**Files:**
- Modify: `components/nav/Header.tsx`

- [ ] **Step 1: Refactor de contenedor island y estados top/scrolled**
  - Mantener sticky/floating actual, migrando clases inline a utilidades glass.
  - Implementar transición suave de:
    - posición/escala/blur/sombra
    - opacidad del borde
  - Agregar estado `data-scrolled` para facilitar estilo declarativo.

- [ ] **Step 2: CTA Contacto del navbar con variante premium**
  - Reemplazar CTA existente por `CtaOutlineLink` o `Button` variant `cinematicOutline`.
  - Ajustar tamaño para navbar desktop y preservar legibilidad.

- [ ] **Step 3: Mobile menu coherente con el glass system**
  - Aplicar mismo lenguaje visual en panel móvil:
    - fondo translúcido + blur + borde sutil
    - animación de entrada/salida suave
    - CTA Contacto visible dentro del menú móvil con mismo estilo outline premium.

- [ ] **Step 4: Accesibilidad y UX del header**
  - Validar focus visible para links/botones.
  - Mantener `aria-label` del botón menú y cerrar menú al navegar.

### Task 3: Sistema CTA unificado en páginas principales

**Files:**
- Modify: `app/(site)/page.tsx`
- Modify: `app/(site)/servicios/page.tsx`
- Modify: `app/(site)/equipamiento/page.tsx`
- Modify: `app/(site)/eventos/[slug]/page.tsx`
- Modify: `components/services/ServiceTabs.tsx`

- [ ] **Step 1: Home**
  - Sustituir CTA principal de cierre por componente reusable outline premium.
  - Ajustar CTAs “Ver todos” principales (cuando apliquen como acción primaria de sección) para consistencia visual.

- [ ] **Step 2: Servicios**
  - Reemplazar CTA final “Hablemos” por CTA unificado.
  - Reemplazar CTAs dinámicos de `ServiceTabs` (desktop/mobile) al mismo patrón outline animado.

- [ ] **Step 3: Equipamiento**
  - Reemplazar CTA final “Solicitar cotización” por CTA unificado.

- [ ] **Step 4: Evento detalle**
  - Reemplazar CTA final “Contactanos” por CTA unificado.

- [ ] **Step 5: Revisión de accesibilidad**
  - Validar estados `hover`, `focus-visible`, `disabled` (si aplica).
  - Verificar contraste de texto/borde en fondos oscuros.

### Task 4: Animaciones premium para cards (servicios + equipamiento)

**Files:**
- Modify: `components/services/ServiceCard.tsx`
- Modify: `components/ui/TiltCard.tsx`
- Modify: `components/equipment/CategorySection.tsx`
- Modify: `lib/motion.ts` (solo si se requieren variantes nuevas)

- [ ] **Step 1: Servicios — reveal escalonado + hover depth elegante**
  - Integrar reveal por card con stagger consistente (sin duplicar animación de sección completa).
  - Refinar profundidad en hover:
    - leve lift/tilt
    - mejora de overlay/glow
    - transición suave (no agresiva).

- [ ] **Step 2: TiltCard motion-safe**
  - Respetar `prefers-reduced-motion` desactivando tilt dinámico cuando corresponda.
  - Mantener interacción keyboard/focus sin dependencia de mouse.

- [ ] **Step 3: Equipamiento — tarjetas de categorías con estado activo claro**
  - Mejorar transición entre estado normal/activo (borde, brillo, profundidad).
  - Añadir interacción refinada en hover para categorías y para ítems del detalle.
  - Mantener claridad visual de categoría seleccionada en desktop/mobile.

- [ ] **Step 4: Coherencia de motion global**
  - Ajustar duraciones/easing a perfil premium (200-300ms micro, 400-600ms reveal).
  - Evitar animaciones invasivas o distractoras.

### Task 5: Validación, calidad y release flow multi-rama

**Files:**
- N/A (validación + git)

- [ ] **Step 1: Validaciones técnicas mínimas**
  - Run: `pnpm typecheck`
  - Run: `pnpm build` (si no hay suite de tests/lint script disponible)
  - Capturar resultados y resolver errores antes de commitear.

- [ ] **Step 2: Verificación funcional rápida (manual)**
  - Confirmar visualmente:
    - navbar island top/scrolled + menú móvil
    - CTA outline unificado en páginas objetivo
    - cards de servicios/equipamiento con motion refinado
    - reduced motion sin efectos intrusivos.

- [ ] **Step 3: Git flow solicitado por usuario**
  - En `dev`:
    - `git add ...`
    - `git commit -m "feat: implement cinematic glass pro navbar cta and card motion"`
    - `git push origin dev`
  - Sincronización a `master`:
    - `git checkout master`
    - `git cherry-pick <commit-dev>`
    - `git push origin master`
  - Volver a trabajo en `dev`:
    - `git checkout dev`

- [ ] **Step 4: Evidencia de entrega**
  - Reportar en la entrega final:
    - plan + ruta
    - archivos modificados
    - implementación por bloque (navbar/CTA/cards)
    - comandos corridos + resultado
    - hashes en dev/master
    - riesgos y pendientes.
