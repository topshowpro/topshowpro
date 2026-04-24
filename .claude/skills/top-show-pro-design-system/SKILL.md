---
name: top-show-pro-design-system
description: Design system aislado de Top Show Pro. Use when working on any UI component, page, or style decision in the top-show-pro Next.js project — color tokens, typography (Bebas Neue/Montserrat/Space Mono), motion presets (Lenis + Framer Motion), component patterns (L-bracket corners, frosted glass, beam sweep), tailwind config, CSS variables. Auto-triggers on mentions of Top Show Pro UI/design/tokens/branding.
---

# Top Show Pro — Design System

Fuente de verdad única para decisiones de diseño del sitio **Top Show Pro** (empresa rental de tecnología para eventos). Usá esta skill antes de crear o modificar cualquier componente/estilo.

## Concepto general

- **Dark-first**: fondos muy oscuros (`#0A0A0A`), superficies tonales (no bordes)
- **Tech/blueprint aesthetic**: cyan como acento, Space Mono para datos, L-brackets en cards
- **Motion moderno** (no parallax): Lenis smooth + Framer reveal + View Transitions API
- **Tipografía alto impacto**: Bebas Neue para titulares de alto contraste, Montserrat para lectura limpia.
- **Detalle técnico**: Space Mono para chips, specs y metadata operacional.

## Paleta (CSS variables)

```css
:root {
  /* Fondos */
  --bg-base: #0A0A0A;           /* Principal */
  --bg-elevated: #1A1A1A;       /* Secundario (cards, navbar) */
  --bg-surface: #131313;        /* Superficie intermedia (Stitch) */
  --bg-surface-hi: #1F1F1F;     /* Hover de cards */

  /* Acentos */
  --accent-cyan: #1785d3;       /* Principal (CTAs, hover, highlights) */
  --accent-violet: #7B61FF;     /* Secundario (resaltar palabras clave) */
  --accent-mint: #00FF9C;       /* Indicadores técnicos/estados */

  /* Texto */
  --text-primary: #FFFFFF;      /* Titulares, botones */
  --text-secondary: #5AA7E0;    /* Subtítulos */
  --text-muted: #CCCCCC;        /* Body, descripciones */
  --text-faint: #7A7A7A;        /* Micro-text, captions */

  /* Estados */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(0, 191, 255, 0.3);
  --overlay-dark: rgba(0, 0, 0, 0.6);
}
```

**Regla**: no introducir colores fuera de esta paleta. Si falta uno, discutir antes de agregar. Mantener minimalismo cromático.

## Tipografías

| Rol | Familia | Peso | Tamaño típico | Uso |
|-----|---------|------|---------------|-----|
| Display/H1 | **Bebas Neue** | 400 | `clamp(3rem, 8vw, 7.5rem)` | Hero phrase. `ls: -0.01em`, `lh: 0.9`. |
| H2/H3 | **Bebas Neue** | 400 | `clamp(1.9rem, 4vw, 3.5rem)` | Titulares de sección. `ls: -0.008em`, `lh: 1`. |
| Subtítulos | **Montserrat** | 500 | `text-xl` a `text-2xl` | Subhead, intro párrafos. |
| Body | **Montserrat** | 400-500 | `text-base` | Descripciones, copy largo. `lh: 1.65`. |
| UI/Botones | **Montserrat** | 500-600 | `text-sm` uppercase tracking-wide | CTAs, navbar. |
| Técnico/Data | **Space Mono** | 400 | `text-xs` a `text-sm` | Specs equipamiento, fecha de evento, chips técnicos. |

**Setup con `next/font`**:

```ts
// lib/fonts.ts
import { Bebas_Neue, Montserrat, Space_Mono } from 'next/font/google';

export const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});
```

## Escala tipográfica (titulares alto impacto tipo Christie Lites)

```css
.text-display { font-family: var(--font-display); font-weight: 400; font-size: clamp(3rem, 8vw, 7.5rem); line-height: 0.9; letter-spacing: -0.01em; }
.text-hero    { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.4rem, 6vw, 5.5rem); line-height: 0.95; letter-spacing: -0.008em; }
.text-h2      { font-family: var(--font-display); font-weight: 400; font-size: clamp(1.9rem, 4vw, 3.5rem); line-height: 1; letter-spacing: -0.008em; }
.text-h3      { font-family: var(--font-display); font-weight: 400; font-size: clamp(1.4rem, 2.8vw, 2.3rem); line-height: 1.05; }
```

**Regla**: evitar cursivas forzadas en titulares display; usar contraste de tamaño y tracking para jerarquía.

## Spacing / Layout

- Base: 4px (0.25rem)
- Grid de contenido: max-width `1440px`
- Padding contenido horizontal: `px-6 md:px-12 lg:px-24`
- Secciones verticales: `py-24 md:py-32` para bloques mayores
- Grid overlay opcional (tipo Stitch): `background-image` con lines cada 24px, 5% opacity

## Componentes patrones

### L-bracket corners (cards de servicios/eventos)

```tsx
<div className="relative">
  {/* Corners */}
  <span className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/40" />
  <span className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/40" />
  <span className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/40" />
  <span className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/40" />
  {/* Content */}
</div>
```

### Frosted glass surface

```
bg-[var(--bg-surface)]/60 backdrop-blur-2xl border border-white/5
```

### Beam sweep hover (cyan gradient slide)

```tsx
<div className="group relative overflow-hidden">
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                  bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%]
                  transition-transform duration-1000" />
</div>
```

### Botón primario

```tsx
<button className="
  px-6 py-3
  font-sans font-medium text-sm uppercase tracking-wider
  bg-[var(--bg-elevated)] text-white
  border border-white/10
  hover:bg-[var(--accent-cyan)] hover:text-black hover:border-transparent
  transition-all duration-300
">
  Contactanos
</button>
```

### Chip técnico (Space Mono)

```tsx
<span className="
  inline-flex items-center gap-2 px-3 py-1
  font-mono text-xs uppercase tracking-wider
  bg-white/5 border border-white/10
  text-[var(--accent-cyan)]
">
  <Icon /> Iluminación
</span>
```

### Radial gradient background (hero/sección destacada)

```css
background: radial-gradient(
  ellipse at top,
  rgba(0, 191, 255, 0.15) 0%,
  transparent 50%
);
```

## Motion presets (Framer Motion variants)

```ts
// lib/motion.ts
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  },
};

export const revealUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const revealTextWords = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  },
};

export const flipCard = {
  front: { rotateY: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  back:  { rotateY: 180, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const modalLedOpen = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
};
```

**Regla de durations**: micro-interactions 200-300ms, component reveals 400-600ms, hero/page transitions 700-900ms. Todo con easing cubic-bezier premium (`[0.16, 1, 0.3, 1]`).

**`prefers-reduced-motion`**: todas las animaciones respetan. Framer auto-gestiona si `MotionConfig reducedMotion="user"` está en root.

## Lenis config (smooth scroll)

```tsx
// components/motion/LenisProvider.tsx
'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

## Tailwind config (extension)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
          surface: 'var(--bg-surface)',
          'surface-hi': 'var(--bg-surface-hi)',
        },
        accent: {
          cyan: 'var(--accent-cyan)',
          violet: 'var(--accent-violet)',
          mint: 'var(--accent-mint)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        hero: ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'beam-sweep': 'beam-sweep 1s ease-out',
        'scanline': 'scanline 3s linear infinite',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'beam-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scanline': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
};

export default config;
```

## Aspect ratios estándar

| Contexto | Ratio | Tailwind |
|----------|-------|----------|
| Hero video/image full-bleed | 16:9 desktop, 4:5 mobile | `aspect-video md:aspect-[16/9]` |
| Event card | 4:5 | `aspect-[4/5]` |
| Gallery thumbnail | 4:3 | `aspect-[4/3]` |
| Brand logo container | 1:1 | `aspect-square` |
| Service card media | 3:2 | `aspect-[3/2]` |

## Iconografía

- **Lucide React** para UI general (arrow, menu, close, send)
- **Material Symbols** (selectivo, via Google Fonts CSS) para contexto técnico: `lightbulb`, `speaker`, `music_note`, `tv_gen`, `build`

No mezclar dos librerías en la misma sección. Usar Lucide para el 90% y Material Symbols solo cuando la semántica técnica gana (equipamiento).

## Accesibilidad

- Contraste mínimo: AA en texto crítico. Testear combos cyan-sobre-dark (suficiente si cyan >= `#1785d3` sobre negro)
- Focus rings: `ring-2 ring-[var(--accent-cyan)] ring-offset-2 ring-offset-[var(--bg-base)]`
- Reduced motion: respetado globalmente vía `MotionConfig reducedMotion="user"`
- Alt text obligatorio en imágenes (Sanity schema lo requiere)
- Formularios: labels asociados, `aria-invalid`, `aria-describedby` para errores
- Teclado: tabIndex correcto en carousels custom (hero, tabs, accordion ya manejado por Radix)

## Checklist antes de mergear un componente nuevo

- [ ] Usa solo tokens de la paleta definida (grep `#` en el archivo no devuelve hex fuera de la paleta)
- [ ] Tipografía usa las 3 familias con roles correctos (display = Bebas, body = Montserrat, mono = Space Mono)
- [ ] Motion respeta `prefers-reduced-motion`
- [ ] Focus states visibles (`focus:ring-2 ring-cyan`)
- [ ] Alt text en imágenes
- [ ] Responsive testeado en 375px, 768px, 1440px
- [ ] No usa librerías de motion pesadas (GSAP, Three.js, Lottie grande)
- [ ] `'use client'` solo si realmente necesita hooks/state

## Referencias visuales

- **Hero/layout**: `europe.4wall.com/rentals/video`
- **Escala tipográfica**: `christielites.com`
- **Dark + tech aesthetic**: `claypaky.it/en/innovation`, `yavax.us`
- **Cards con L-brackets y frosted glass**: mockups Stitch internos (`stitch_premium_event_showcase`)

## Regla de evolución

Si necesitás agregar un token/patrón nuevo:
1. Primero verificá si existe un token existente que sirva
2. Si realmente falta, editá **este archivo** primero
3. Después actualizá `tailwind.config.ts` + `app/globals.css` para reflejarlo
4. Nunca inlines hex values en componentes
