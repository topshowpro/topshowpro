# Design System — Top Show Pro

> Referencia rápida de tokens y patrones. Skill completa en `.claude/skills/top-show-pro-design-system/SKILL.md`.

## Concepto

Dark-first, tech/blueprint aesthetic. Fondos muy oscuros, cyan como acento principal, tipografía de alto impacto. Motion moderno sin parallax.

---

## Color tokens (CSS variables)

```css
/* Fondos */
--bg-base: #0A0A0A          /* Principal */
--bg-elevated: #1A1A1A      /* Cards, navbar */
--bg-surface: #131313       /* Superficie intermedia */
--bg-surface-hi: #1F1F1F    /* Hover de cards */

/* Acentos */
--accent-cyan: #1785d3      /* CTAs, hover, highlights */
--accent-violet: #7B61FF    /* Palabras clave secundarias */
--accent-mint: #00FF9C      /* Indicadores técnicos / estados */

/* Texto */
--text-primary: #FFFFFF     /* Titulares, botones */
--text-secondary: #5AA7E0   /* Subtítulos */
--text-muted: #CCCCCC       /* Body, descripciones */
--text-faint: #7A7A7A       /* Micro-text, captions */

/* Estados */
--border-subtle: rgba(255, 255, 255, 0.08)
--border-accent: rgba(0, 191, 255, 0.3)
--overlay-dark: rgba(0, 0, 0, 0.6)
```

Regla: no introducir colores fuera de esta paleta. No inlinear hex values en componentes.

---

## Tipografía

| Rol | Familia | Uso |
|-----|---------|-----|
| Display / H1 | **Bebas Neue** | Hero phrase, titulares hero |
| H2 / H3 | **Bebas Neue** | Titulares de sección |
| Subtítulos / Body | **Montserrat** | Copy, descripción, CTAs, navbar |
| Técnico / Data | **Orbitron** | Specs equipamiento, fechas, chips |

Variables font: `--font-display`, `--font-sans`, `--font-mono`. Configuradas en `lib/fonts.ts`.

### Escala display

```css
.text-display  /* clamp(3rem, 8vw, 8rem)   line-height: 0.9  tracking: -0.02em */
.text-hero     /* clamp(2.5rem, 6vw, 6rem) line-height: 1    tracking: -0.01em */
.text-h2       /* clamp(2rem, 4vw, 4rem)   line-height: 1.1 */
.text-h3       /* clamp(1.5rem, 2.5vw, 2.5rem) line-height: 1.2 */
```

---

## Motion presets (en `lib/motion.ts`)

| Preset | Uso |
|--------|-----|
| `fadeIn` | Entrada genérica (opacity + y:20, 600ms) |
| `revealUp` | Reveal scrollable con delay stagger (y:40, 800ms) |
| `staggerContainer` | Wrapper para animar hijos en cascada (stagger 80ms) |
| `revealTextWords` | Palabras que suben desde overflow (700ms) |
| `flipCard` | Card flip 3D (600ms) |
| `modalLedOpen` | Modal / lightbox scale-in (400ms) |

**Duraciones**: micro-interactions 200–300ms, reveals 400–600ms, hero/page transitions 700–900ms.  
**Easing premium**: `[0.16, 1, 0.3, 1]` para reveals, `[0.25, 0.4, 0.25, 1]` para fade.  
**Reduced motion**: `MotionConfig reducedMotion="user"` en el root — Framer lo gestiona automáticamente.

---

## Lenis (smooth scroll)

Config en `components/motion/LenisProvider.tsx`: `duration: 1.2`, `smoothWheel: true`, `touchMultiplier: 1.5`.

---

## Patrones de componentes

### L-bracket corners
Cuatro `<span>` absolutos en esquinas con `border-l/r border-t/b border-white/40`. Usado en cards de servicios y eventos.

### Frosted glass surface
```
bg-[var(--bg-surface)]/60 backdrop-blur-2xl border border-white/5
```

### Beam sweep hover
Gradiente cyan que cruza el elemento al hover: `from-transparent via-cyan-400/20 to-transparent`, `translate-x-[-100%] → translate-x-[100%]`, duración 1000ms.

### Botón primario
`bg-[var(--bg-elevated)] border border-white/10` → hover: `bg-[var(--accent-cyan)] text-black border-transparent`.

### Chip técnico (Orbitron)
`font-mono text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-[var(--accent-cyan)]`

### Radial gradient (hero / sección destacada)
```css
background: radial-gradient(ellipse at top, rgba(23,133,211,0.15) 0%, transparent 50%);
```

---

## Aspect ratios estándar

| Contexto | Ratio |
|----------|-------|
| Hero video / image | 16:9 desktop, 4:5 mobile |
| Event card | 4:5 |
| Gallery thumbnail | 4:3 |
| Brand logo container | 1:1 |
| Service card media | 3:2 |

---

## Iconografía

- **Lucide React**: 90% de los iconos (UI general)
- **Material Symbols** (selectivo, Google Fonts CSS): contexto técnico (`lightbulb`, `speaker`, `music_note`, `tv_gen`, `build`)

No mezclar las dos librerías en la misma sección.

---

## Accesibilidad

- Contraste mínimo AA en texto crítico
- Focus rings: `ring-2 ring-[var(--accent-cyan)] ring-offset-2 ring-offset-[var(--bg-base)]`
- Alt text obligatorio (requerido por schema Sanity)
- Formularios: labels asociados, `aria-invalid`, `aria-describedby` para errores

---

## Checklist antes de mergear un componente

- [ ] Solo tokens de la paleta (ningún hex fuera de ella)
- [ ] Tipografía con roles correctos (display=Bebas, body=Montserrat, mono=Orbitron)
- [ ] Motion respeta `prefers-reduced-motion`
- [ ] Focus states visibles
- [ ] Alt text en imágenes
- [ ] Responsive en 375 / 768 / 1440px
- [ ] `'use client'` solo cuando realmente necesario

---

## Skill completa

Para la referencia exhaustiva con código completo (Tailwind config, font setup, todos los variants de Framer, Lenis config, reglas de evolución del sistema):

`.claude/skills/top-show-pro-design-system/SKILL.md`
