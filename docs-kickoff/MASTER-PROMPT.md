Sos responsable de scaffoldear el sitio **Top Show Pro** — empresa rental de tecnología para eventos/espectáculos (teatro, discotecas, corporativos, fiestas) con sede en Argentina.

El sitio debe quedar **navegable end-to-end con mock data** al finalizar esta sesión. Las APIs (Sanity, Resend, Turnstile) se configuran después en una segunda fase con solo editar `.env.local`.

### Reglas operativas

1. **Trabajá en la carpeta actual** (no creés subcarpeta `top-show-pro/`). Asumí que la carpeta está vacía
2. **Documentos de referencia** en el directorio: `STACK-TOOLS.md` (herramientas + rationale), `CMS-GUIDE.md` (guía cliente Sanity), `SKILLS-RECOMENDADAS.md` (skills). Leélos si tenés dudas contextuales
3. **Skill de diseño**: si está disponible en `~/.claude/skills/top-show-pro-design-system/SKILL.md`, invocala ante decisiones de UI/estilo. Si no, seguí las guías de este prompt
4. **No preguntes detalles menores**: hacé elecciones razonables siguiendo el plan
5. **Usá TaskCreate** para trackear las 10 fases de abajo
6. **Probá `pnpm dev` al final** para confirmar que compila y arranca

---

## CONTEXTO DEL PROYECTO

### Quiénes son

Top Show Pro es una empresa argentina de rental de equipamiento técnico para eventos. Trabajan con iluminación, sonido, pantallas LED, stages. Servicios: Técnica Teatral, Rental Discotecas, Eventos Corporativos, Venta de Equipamiento, Servicio Técnico.

Referencia del sitio actual (a superar visualmente): `https://www.topshowpro.com.ar`. Ejemplo de página de evento: `https://www.topshowpro.com.ar/lizy-tagliani/`.

### Referencias de diseño (look & feel premium)

- `https://europe.4wall.com/rentals/video` — hero videos + layouts
- `https://www.christielites.com/` — escala tipográfica + filtros de categoría
- `https://www.claypaky.it/en/innovation` — dark + tech aesthetic
- `https://www.yavax.us/` — motion + interactividad moderna

### Objetivo visual

- Oscuro, tecnológico, cyan como acento
- Tipografía grande e impactante en titulares (Bebas Neue)
- Motion moderno (no parallax): Lenis smooth scroll + Framer Motion + View Transitions API
- Performance: Lighthouse ≥ 95 en producción

---

## STACK FINAL

| Capa | Herramienta | Versión |
|------|-------------|---------|
| Framework | Next.js | 15.x App Router + PPR + Turbopack |
| Lenguaje | TypeScript | 5.x strict |
| Styling | Tailwind CSS | v4 |
| UI primitives | shadcn/ui + Radix | latest |
| Animación | Framer Motion + Lenis + tailwindcss-motion | Framer 11, Lenis 1 |
| CMS | Sanity | v3 (Studio embebido en `/studio`) |
| Mail | Resend + React Email | 3.x / 2.x |
| Anti-spam | Cloudflare Turnstile | - |
| Hosting | Vercel | Hobby inicio |
| Forms | React Hook Form + Zod | 7.x / 3.x |
| Fonts | `next/font/google` | nativo (Bebas Neue, Montserrat, Orbitron) |

Detalle completo con rationale: ver `STACK-TOOLS.md`.

---

## REFERENCIAS VISUALES STITCH (CRÍTICO)

En esta misma carpeta (junto a este `MASTER-PROMPT.md`) hay una subcarpeta **`stitch_premium_event_showcase/`** con mockups HTML + screenshots generados en Google Stitch. Son la **referencia visual de máxima prioridad** para cada página.

### Mapeo carpeta Stitch → ruta Next

Al implementar cada página, **LEÉ** el `code.html` correspondiente y **OBSERVÁ** el `screen.png` para replicar layout, espaciado, tipografía y micro-interacciones:

| Carpeta Stitch | Archivos | Ruta Next a implementar |
|----------------|----------|-------------------------|
| `home_top_show_pro_elite_v3/` | `code.html`, `screen.png` | `app/(site)/page.tsx` — Home |
| `servicios_ingenier_a_audiovisual_v3/` | `code.html`, `screen.png` | `app/(site)/servicios/page.tsx` |
| `proyectos_portfolio_elite_v3/` | `code.html`, `screen.png` | `app/(site)/eventos/page.tsx` |
| `proyecto_detalle_lizy_tagliani_elite_v3/` | `code.html`, `screen.png` | `app/(site)/eventos/[slug]/page.tsx` |
| `equipamiento_marcas_globales_v3/` | `code.html`, `screen.png` | `app/(site)/equipamiento/page.tsx` |
| `contacto_optic_terminal/` | `code.html`, `screen.png` | `app/(site)/contacto/page.tsx` |
| `aether_optic_innovation/` | `DESIGN.md` | Notas del design system "Precision Optic" |
| `aether_pro_tech/` | `DESIGN.md` | Notas del design system "Kinetic Blueprint" (variante) |

### Cómo usar las referencias

1. Antes de implementar una página, **abrí** su `code.html` con Read + `screen.png` con Read (es PNG, Claude puede verlo)
2. Extraé del `code.html`:
   - Estructura del DOM (qué secciones hay, en qué orden)
   - Clases Tailwind utilizadas (muchas se reutilizan tal cual)
   - Componentes únicos (modals, hero layouts, grids específicos)
3. Del `screen.png`:
   - Proporciones visuales
   - Ritmo tipográfico
   - Densidad de información
   - Espaciado entre secciones
4. Implementá el componente React respetando el layout del mock, pero:
   - Adaptá los datos al schema Sanity real (mock data por ahora)
   - Usá los componentes shadcn + Tailwind v4 del stack
   - Respetá los tokens del design system (ver sección "Tokens" abajo)

### ⚠️ Conflicto de tipografía — **cliente gana**

Los design systems Stitch usan **Space Grotesk / Epilogue / Inter**. El brief del cliente Top Show Pro especifica **Bebas Neue / Montserrat / Orbitron**.

**Resolución**: Usar las fuentes del cliente (Bebas Neue display + Montserrat body + Orbitron tech). Los mockups Stitch son referencia de **composición, colores, layout y micro-interacciones**, NO de tipografía.

Mapeo directo:

- Donde Stitch usa `font-display` (Space Grotesk / Epilogue) → usar **Bebas Neue** (`font-display` del proyecto)
- Donde Stitch usa body (Inter) → usar **Montserrat** (`font-sans` del proyecto)
- Donde Stitch usa Orbitron → usar **Orbitron** (coincide, `font-mono` del proyecto)

### Tokens extra del Stitch "Precision Optic" a incorporar

Además de los tokens en `DESIGN-SYSTEM.md` y Fase B de este prompt, respetá estos patterns del design system "Precision Optic":

- **Surface hierarchy "dark-on-dark"**: base `#131313` → nested `#1C1B1B` → interactive `#2A2A2A` → modal `#353534`. Crea efecto "stepping" sin bordes
- **"No-Line" rule**: prohibido `border` 1px sólido para separar secciones. Usar cambios tonales o negative space. Si hace falta delineación por accesibilidad, `ghost border`: `border-white/15`
- **L-bracket corner**: en top-right de cards, bracket en color `accent-cyan` como "Blueprint detail"
- **Ambient shadow con cyan**: `box-shadow: 0 20px 40px rgba(0, 191, 255, 0.08)` en elementos que flotan
- **Focal gradient**: hero con `radial-gradient` desde `accent-cyan` 15% a transparente, mimicking un haz de luz
- **Engineering grid background**: overlay 24px (ya lo tenés como utility `.grid-overlay`)
- **Card padding**: 32px interno para "Industrial Minimalism"
- **List active item**: 4px left-accent bar en `accent-cyan` en lugar de bullet/divider
- **Particle chip**: selection chip con círculo 4px glow cyan al estar active
- **CTA gradient**: buttons primary pueden tener gradient 135° de `#8FD6FF` → `#1785d3`
- **Micro-interactions**: elementos aparecen con "beam sweep" effect (ya tenés la utility `animate-beam-sweep`)
- **Rounded**: **prohibido** `rounded-full` excepto action chips específicos. Default `rounded-sm` (0.125rem) o `rounded-none`

Agregalos a `app/globals.css` como utilities si los ves reutilizables:

```css
/* Stitch-specific utilities */
.shadow-optic {
  box-shadow: 0 20px 40px rgba(0, 191, 255, 0.08);
}

.bg-focal-beam {
  background: radial-gradient(ellipse at top, rgba(0, 191, 255, 0.15) 0%, transparent 50%);
}

.border-ghost {
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.cta-gradient {
  background: linear-gradient(135deg, #8FD6FF 0%, #1785d3 100%);
}

.list-active-accent {
  border-left: 4px solid var(--accent-cyan);
  padding-left: 1rem;
}
```

---

## FASES DE EJECUCIÓN

### Fase A — Inicialización

1. Creá el proyecto Next:

```bash
pnpm create next-app@latest . --ts --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

Si el comando falla por carpeta no vacía (porque tiene los `.md`), movelos primero:

```bash
mkdir -p docs-kickoff && mv *.md docs-kickoff/ 2>/dev/null || true
pnpm create next-app@latest . --ts --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

Luego opcionalmente volvelos: `mv docs-kickoff/*.md .` o dejalos en `docs-kickoff/`.

1. Instalá deps de producción:

```bash
pnpm add \
  @sanity/client next-sanity @sanity/image-url @sanity/vision sanity styled-components \
  @portabletext/react \
  react-hook-form @hookform/resolvers zod \
  resend react-email @react-email/components \
  @vercel/og \
  lenis framer-motion tailwindcss-motion \
  lucide-react \
  next-sitemap \
  clsx tailwind-merge class-variance-authority \
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs @radix-ui/react-accordion @radix-ui/react-navigation-menu \
  @radix-ui/react-label @radix-ui/react-separator \
  date-fns
```

1. Deps dev:

```bash
pnpm add -D @types/node @types/react @types/react-dom @next/bundle-analyzer prettier prettier-plugin-tailwindcss
```

1. Inicializá shadcn (dark + neutral + CSS vars):

```bash
pnpm dlx shadcn@latest init -d
```

Respuestas si pregunta: TypeScript yes, App Router yes, no src/, alias `@/*`, CSS variables yes, base color Neutral, utilities `@/lib/utils`.

1. Agregá componentes shadcn base:

```bash
pnpm dlx shadcn@latest add button dialog dropdown-menu tabs accordion sheet form label input textarea select separator
```

---

### Fase B — Configuración base

Creá/editá estos archivos con el contenido provisto.

#### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
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
        fg: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        sans: ['var(--font-sans)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        hero: ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'beam-sweep': 'beam-sweep 1s ease-out',
        scanline: 'scanline 3s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'beam-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scanline: {
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

#### `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Fondos */
  --bg-base: #0A0A0A;
  --bg-elevated: #1A1A1A;
  --bg-surface: #131313;
  --bg-surface-hi: #1F1F1F;

  /* Acentos */
  --accent-cyan: #1785d3;
  --accent-violet: #7B61FF;
  --accent-mint: #00FF9C;

  /* Texto */
  --text-primary: #FFFFFF;
  --text-secondary: #5AA7E0;
  --text-muted: #CCCCCC;
  --text-faint: #7A7A7A;

  /* Layout */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --overlay-dark: rgba(0, 0, 0, 0.6);
}

html {
  background-color: var(--bg-base);
  color-scheme: dark;
}

body {
  background-color: var(--bg-base);
  color: var(--text-muted);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--accent-cyan);
  color: var(--bg-base);
}

/* Focus visibility */
:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Grid overlay utility (Stitch-style 24px grid) */
.grid-overlay {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* L-bracket corners utility */
.l-bracket::before,
.l-bracket::after,
.l-bracket > .l-bracket-br,
.l-bracket > .l-bracket-bl {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-color: rgba(255, 255, 255, 0.4);
  border-style: solid;
}
.l-bracket::before {
  top: 0; left: 0;
  border-width: 1px 0 0 1px;
}
.l-bracket::after {
  top: 0; right: 0;
  border-width: 1px 1px 0 0;
}
.l-bracket > .l-bracket-bl {
  bottom: 0; left: 0;
  border-width: 0 0 1px 1px;
}
.l-bracket > .l-bracket-br {
  bottom: 0; right: 0;
  border-width: 0 1px 1px 0;
}
```

#### `lib/fonts.ts`

```ts
import { Bebas_Neue, Montserrat, Orbitron } from 'next/font/google';

export const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});
```

#### `next.config.ts`

```ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    ppr: 'incremental',
    viewTransition: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
};

export default config;
```

Si Next 15 no acepta `ppr: 'incremental'` en tu versión, usá `ppr: true` o remové la flag.

#### `tsconfig.json`

Asegurate que tenga:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

(Next ya genera el resto).

#### `.env.local.example`

```env
# Sanity (Fase 2)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
SANITY_REVALIDATE_SECRET=

# Resend (Fase 2)
RESEND_API_KEY=
RESEND_FROM="Top Show Pro <hola@topshowpro.com>"
RESEND_TO=contacto@topshowpro.com

# Cloudflare Turnstile (Fase 2)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://topshowpro.vercel.app

# Mux (opcional - solo si videos > 20MB)
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
```

---

### Fase C — Schemas Sanity

Creá la estructura:

```
sanity/
├── env.ts
├── sanity.config.ts
├── schemas/
│   ├── index.ts
│   ├── singletons/
│   │   ├── siteSettings.ts
│   │   ├── hero.ts
│   │   ├── homepage.ts
│   │   └── seoDefaults.ts
│   ├── documents/
│   │   ├── event.ts
│   │   ├── eventCategory.ts
│   │   ├── service.ts
│   │   ├── equipmentCategory.ts
│   │   ├── equipmentItem.ts
│   │   ├── brand.ts
│   │   ├── contactCategory.ts
│   │   └── lead.ts
│   └── objects/
│       ├── seoFields.ts
│       ├── ctaBlock.ts
│       └── mediaPicker.ts
└── lib/
    ├── client.ts
    ├── queries.ts
    └── image.ts
```

#### `sanity/env.ts`

```ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const hasSanity = Boolean(projectId);
```

#### `sanity/sanity.config.ts`

```ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { apiVersion, dataset, projectId } from './env';

export default defineConfig({
  name: 'top-show-pro',
  title: 'Top Show Pro CMS',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
```

#### `sanity/schemas/index.ts`

```ts
import siteSettings from './singletons/siteSettings';
import hero from './singletons/hero';
import homepage from './singletons/homepage';
import seoDefaults from './singletons/seoDefaults';
import event from './documents/event';
import eventCategory from './documents/eventCategory';
import service from './documents/service';
import equipmentCategory from './documents/equipmentCategory';
import equipmentItem from './documents/equipmentItem';
import brand from './documents/brand';
import contactCategory from './documents/contactCategory';
import lead from './documents/lead';
import seoFields from './objects/seoFields';
import ctaBlock from './objects/ctaBlock';
import mediaPicker from './objects/mediaPicker';

export const schemaTypes = [
  // singletons
  siteSettings, hero, homepage, seoDefaults,
  // documents
  event, eventCategory, service, equipmentCategory, equipmentItem, brand, contactCategory, lead,
  // objects
  seoFields, ctaBlock, mediaPicker,
];
```

#### `sanity/schemas/objects/seoFields.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title override' }),
    defineField({ name: 'description', type: 'text', rows: 2, title: 'Description override', validation: (r) => r.max(160) }),
    defineField({ name: 'ogImage', type: 'image', title: 'OG Image (opcional)' }),
    defineField({ name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false }),
  ],
});
```

#### `sanity/schemas/objects/ctaBlock.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'link', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'variant',
      type: 'string',
      options: { list: ['primary', 'ghost'] },
      initialValue: 'primary',
    }),
  ],
});
```

#### `sanity/schemas/objects/mediaPicker.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'mediaPicker',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      options: { list: ['image', 'videoUrl', 'muxAsset'] },
      initialValue: 'image',
    }),
    defineField({ name: 'image', type: 'image', hidden: ({ parent }) => parent?.kind !== 'image' }),
    defineField({ name: 'videoUrl', type: 'url', hidden: ({ parent }) => parent?.kind !== 'videoUrl' }),
  ],
});
```

#### `sanity/schemas/singletons/siteSettings.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'schedule', type: 'string', title: 'Horario atención' }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'facebook', type: 'url' },
        { name: 'linkedin', type: 'url' },
        { name: 'youtube', type: 'url' },
      ],
    }),
    defineField({
      name: 'techContact',
      title: 'Contacto Técnico',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
      ],
    }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Site Settings' }) },
});
```

#### `sanity/schemas/singletons/hero.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'video', type: 'file', options: { accept: 'video/*' } },
            { name: 'poster', type: 'image', title: 'Poster image' },
            { name: 'phrase', type: 'string', validation: (r) => r.required() },
            {
              name: 'accentColor',
              type: 'string',
              options: { list: ['cyan', 'violet', 'mint'] },
              initialValue: 'cyan',
            },
          ],
          preview: { select: { title: 'phrase', media: 'poster' } },
        },
      ],
    }),
    defineField({
      name: 'bannerAzul',
      title: 'Banner azul (bottom)',
      type: 'object',
      fields: [
        { name: 'text', type: 'string' },
        { name: 'cta', type: 'ctaBlock' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero' }) },
});
```

#### `sanity/schemas/singletons/homepage.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'intro', type: 'array', of: [{ type: 'block' }], title: 'Intro (Hacemos que todo suceda)' }),
    defineField({
      name: 'featuredEvents',
      title: 'Eventos destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'ctaLabel', type: 'string', initialValue: 'Contactanos' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});
```

#### `sanity/schemas/singletons/seoDefaults.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoDefaults',
  title: 'SEO Defaults',
  type: 'document',
  fields: [
    defineField({ name: 'titlePattern', type: 'string', initialValue: '{page} | Top Show Pro' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', type: 'image' }),
  ],
  preview: { prepare: () => ({ title: 'SEO Defaults' }) },
});
```

#### `sanity/schemas/documents/eventCategory.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'eventCategory',
  title: 'Event Category',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'label' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'icon', type: 'string', description: 'Ícono opcional (Lucide/Material)' }),
  ],
  preview: { select: { title: 'label' } },
});
```

#### `sanity/schemas/documents/event.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'eventCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'dateStart', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'dateEnd', type: 'date', title: 'Fecha fin (opcional, temporadas)' }),
    defineField({ name: 'client', type: 'string', title: 'Cliente/Productora' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'equipmentUsed',
      title: 'Equipos utilizados',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'video', type: 'url', title: 'URL video (YouTube/Vimeo/Mux)' }),
    defineField({
      name: 'tagsTecnicos',
      title: 'Tags técnicos',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Iluminación', 'Sonido', 'LED', 'Stage', 'Backline'] },
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Destacar en home', initialValue: false }),
    defineField({ name: 'seo', type: 'seoFields' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'heroImage' },
  },
  orderings: [
    { title: 'Fecha desc', name: 'dateDesc', by: [{ field: 'dateStart', direction: 'desc' }] },
  ],
});
```

#### `sanity/schemas/documents/service.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'icon', type: 'string', description: 'Lucide icon name' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'shortDesc', type: 'text', rows: 2 }),
    defineField({ name: 'longDesc', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'cta', type: 'ctaBlock' }),
  ],
  preview: { select: { title: 'name', subtitle: 'shortDesc' } },
  orderings: [{ title: 'Orden asc', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
```

#### `sanity/schemas/documents/equipmentCategory.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'equipmentCategory',
  title: 'Equipment Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'items', type: 'array', of: [{ type: 'reference', to: [{ type: 'equipmentItem' }] }] }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name' } },
});
```

#### `sanity/schemas/documents/equipmentItem.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'equipmentItem',
  title: 'Equipment Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'brand', type: 'reference', to: [{ type: 'brand' }] }),
    defineField({ name: 'specs', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'datasheet', type: 'file', options: { accept: 'application/pdf' } }),
  ],
  preview: { select: { title: 'name', subtitle: 'brand.name', media: 'photo' } },
});
```

#### `sanity/schemas/documents/brand.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logoBw', title: 'Logo B/N', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'website', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logoBw' } },
});
```

#### `sanity/schemas/documents/contactCategory.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactCategory',
  title: 'Contact Category',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'label' } },
});
```

#### `sanity/schemas/documents/lead.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'message', type: 'text', rows: 5 }),
    defineField({ name: 'createdAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'read', type: 'boolean', initialValue: false, title: 'Leído' }),
  ],
  preview: { select: { title: 'name', subtitle: 'email' } },
  orderings: [{ title: 'Fecha desc', name: 'dateDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
});
```

#### `sanity/lib/client.ts`

```ts
import { createClient, type SanityClient } from '@sanity/client';
import { apiVersion, dataset, hasSanity, projectId } from '../env';
import { mockSanity } from '@/lib/mock-data';

export const sanityClient: SanityClient | null = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>, tag?: string): Promise<T> {
  if (!sanityClient) return mockSanity.resolve<T>(query, params);
  return sanityClient.fetch<T>(query, params, {
    next: { tags: tag ? [tag] : undefined, revalidate: 3600 },
  });
}
```

#### `sanity/lib/queries.ts`

```ts
export const Q_HERO = `*[_type == "hero"][0]{
  slides[]{
    phrase, accentColor,
    "posterUrl": poster.asset->url,
    "videoUrl": video.asset->url
  },
  bannerAzul{ text, cta }
}`;

export const Q_HOMEPAGE = `*[_type == "homepage"][0]{
  intro,
  ctaLabel,
  "featuredEvents": featuredEvents[]->{
    title, subtitle, "slug": slug.current, dateStart, dateEnd,
    "category": category->{label, "slug": slug.current},
    "heroImage": heroImage.asset->{url, metadata{lqip}}
  }
}`;

export const Q_SITE_SETTINGS = `*[_type == "siteSettings"][0]`;

export const Q_EVENTS_LIST = (category?: string) => `*[_type == "event"${category ? ` && category->slug.current == "${category}"` : ''}] | order(dateStart desc) {
  title, subtitle, "slug": slug.current, dateStart, dateEnd,
  "category": category->{label, "slug": slug.current},
  "heroImage": heroImage.asset->{url, metadata{lqip}}
}`;

export const Q_EVENT_DETAIL = `*[_type == "event" && slug.current == $slug][0]{
  title, subtitle, dateStart, dateEnd, client, location,
  description, equipmentUsed, tagsTecnicos, video,
  "category": category->{label, "slug": slug.current},
  "heroImage": heroImage.asset->{url, metadata{lqip}},
  "gallery": gallery[].asset->{url, metadata{lqip}},
  seo
}`;

export const Q_EVENT_CATEGORIES = `*[_type == "eventCategory"] | order(order asc){ label, "slug": slug.current, icon }`;

export const Q_SERVICES = `*[_type == "service"] | order(order asc){
  name, icon, shortDesc, longDesc,
  "gallery": gallery[].asset->{url, metadata{lqip}},
  cta
}`;

export const Q_EQUIPMENT_CATEGORIES = `*[_type == "equipmentCategory"] | order(order asc){
  name, "slug": slug.current, description,
  "items": items[]->{
    name, specs,
    "photo": photo.asset->{url, metadata{lqip}},
    "brand": brand->{name}
  }
}`;

export const Q_BRANDS = `*[_type == "brand"] | order(name asc){
  name, website,
  "logoUrl": logoBw.asset->url
}`;

export const Q_CONTACT_CATEGORIES = `*[_type == "contactCategory"] | order(order asc){ label }`;

export const Q_SEO_DEFAULTS = `*[_type == "seoDefaults"][0]`;
```

#### `sanity/lib/image.ts`

```ts
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '../env';

const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source: any) {
  return builder.image(source).auto('format').quality(80);
}
```

---

### Fase D — Libs + Mock Data

#### `lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end?: string) {
  const s = new Date(start).toLocaleDateString('es-AR');
  if (!end) return s;
  const e = new Date(end).toLocaleDateString('es-AR');
  return `${s} — ${e}`;
}
```

#### `lib/motion.ts`

```ts
import type { Variants } from 'framer-motion';

export const easePremium = [0.16, 1, 0.3, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: easePremium },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const revealTextWords: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export const modalLedOpen: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: easePremium } },
};
```

#### `lib/mock-data.ts`

```ts
export const MOCK_HERO = {
  slides: [
    {
      phrase: 'Producción completa. Sin vueltas.',
      accentColor: 'cyan',
      posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920',
      videoUrl: null,
    },
    {
      phrase: 'Donde los grandes eventos empiezan.',
      accentColor: 'violet',
      posterUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920',
      videoUrl: null,
    },
  ],
  bannerAzul: { text: 'Menos proveedores. Más Top Show.', cta: { label: 'Contactanos', link: '/contacto', variant: 'primary' } },
};

export const MOCK_EVENTS = [
  {
    title: 'Lizy Tagliani',
    subtitle: 'Sí!!! Quiero…un music hall para todo público',
    slug: 'lizy-tagliani',
    dateStart: '2024-07-05',
    dateEnd: '2025-02-11',
    client: 'Productora Ejemplo',
    location: 'Calle Corrientes, Buenos Aires',
    category: { label: 'Teatro', slug: 'teatro' },
    heroImage: { url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Moviles 7R', 'Moviles 740', 'Par Z', 'Aura', 'Pantalla Led 6×4 mts – Pitch 3.9'],
    tagsTecnicos: ['Iluminación', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'A diez años de su debut en Calle Corrientes, Lizy Tagliani regresa con Sí!!! Quiero…un music hall para todo público.' }] }],
    featured: true,
  },
  {
    title: 'Night Fest Córdoba',
    subtitle: 'Festival electrónico',
    slug: 'night-fest-cordoba',
    dateStart: '2025-01-15',
    client: 'Club Alpha',
    location: 'Córdoba',
    category: { label: 'Discoteca', slug: 'discoteca' },
    heroImage: { url: 'https://images.unsplash.com/photo-1571266028243-381def1c16a2?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['L-Acoustics K2', 'Robe MegaPointe', 'Pantalla LED 8×5'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Festival electrónico outdoor con 5000 asistentes.' }] }],
    featured: true,
  },
  {
    title: 'Convención Corporativa XYZ',
    subtitle: 'Lanzamiento producto 2026',
    slug: 'convencion-xyz',
    dateStart: '2026-03-10',
    client: 'Empresa XYZ',
    location: 'Hilton Buenos Aires',
    category: { label: 'Corporativo', slug: 'corporativo' },
    heroImage: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Line array', 'Consola Yamaha', 'Pantalla LED 10×3 Pitch 2.6'],
    tagsTecnicos: ['Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Evento corporativo de lanzamiento.' }] }],
    featured: true,
  },
];

export const MOCK_EVENT_CATEGORIES = [
  { label: 'Teatro', slug: 'teatro' },
  { label: 'Discoteca', slug: 'discoteca' },
  { label: 'Corporativo', slug: 'corporativo' },
  { label: 'Privados', slug: 'privados' },
];

export const MOCK_SERVICES = [
  { name: 'Técnica Teatral', icon: 'theater', shortDesc: 'Soluciones técnicas para producciones teatrales de alto nivel.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
  { name: 'Rental Discotecas', icon: 'music', shortDesc: 'Tecnología de alto impacto para venues nocturnos.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
  { name: 'Eventos Corporativos', icon: 'briefcase', shortDesc: 'Soluciones integrales para eventos empresariales.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
  { name: 'Venta de Equipamiento', icon: 'shopping-bag', shortDesc: 'Tecnología profesional para quienes buscan calidad.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
];

export const MOCK_BRANDS = [
  { name: 'Claypaky', website: 'https://claypaky.it', logoUrl: null },
  { name: 'Robe', website: 'https://robe.cz', logoUrl: null },
  { name: 'L-Acoustics', website: 'https://l-acoustics.com', logoUrl: null },
  { name: 'Meyer Sound', website: 'https://meyersound.com', logoUrl: null },
  { name: 'Martin Professional', website: 'https://martin.com', logoUrl: null },
];

export const MOCK_EQUIPMENT_CATEGORIES = [
  { name: 'Iluminación', slug: 'iluminacion', description: 'Móviles, LED, efectos.', items: [] },
  { name: 'Sonido', slug: 'sonido', description: 'Line arrays, monitores, consolas.', items: [] },
  { name: 'Stage', slug: 'stage', description: 'Estructuras, truss, blackout.', items: [] },
  { name: 'Pantallas LED', slug: 'pantallas-led', description: 'Indoor/outdoor, varios pitches.', items: [] },
];

export const MOCK_SITE_SETTINGS = {
  logo: null,
  address: 'Av. Siempre Viva 123, CABA',
  email: 'hola@topshowpro.com',
  phone: '+54 11 1234-5678',
  schedule: 'Lunes a Viernes 9-18hs',
  socials: {
    instagram: 'https://instagram.com/topshowpro',
    facebook: null,
    linkedin: null,
    youtube: null,
  },
  techContact: { name: 'Juan Pérez', phone: '+54 11 8765-4321', email: 'tecnico@topshowpro.com' },
};

export const MOCK_CONTACT_CATEGORIES = [
  { label: 'Producción Teatral' },
  { label: 'Discoteca' },
  { label: 'Evento Corporativo' },
  { label: 'Fiesta Privada' },
  { label: 'Otro' },
];

/**
 * Mock resolver que mapea queries GROQ a fixtures. Suficiente para desarrollo local sin Sanity.
 */
export const mockSanity = {
  resolve<T>(query: string, params?: Record<string, unknown>): Promise<T> {
    if (query.includes('hero')) return Promise.resolve(MOCK_HERO as T);
    if (query.includes('homepage')) return Promise.resolve({ intro: [], ctaLabel: 'Contactanos', featuredEvents: MOCK_EVENTS.filter((e) => e.featured) } as T);
    if (query.includes('siteSettings')) return Promise.resolve(MOCK_SITE_SETTINGS as T);
    if (query.includes('eventCategory')) return Promise.resolve(MOCK_EVENT_CATEGORIES as T);
    if (query.includes('event') && query.includes('$slug')) {
      const slug = params?.slug as string;
      return Promise.resolve((MOCK_EVENTS.find((e) => e.slug === slug) ?? null) as T);
    }
    if (query.includes('event')) return Promise.resolve(MOCK_EVENTS as T);
    if (query.includes('service')) return Promise.resolve(MOCK_SERVICES as T);
    if (query.includes('equipmentCategory')) return Promise.resolve(MOCK_EQUIPMENT_CATEGORIES as T);
    if (query.includes('brand')) return Promise.resolve(MOCK_BRANDS as T);
    if (query.includes('contactCategory')) return Promise.resolve(MOCK_CONTACT_CATEGORIES as T);
    if (query.includes('seoDefaults')) return Promise.resolve({ titlePattern: '{page} | Top Show Pro', description: 'Rental de tecnología para eventos y espectáculos' } as T);
    return Promise.resolve([] as T);
  },
};
```

#### `lib/resend.ts`

```ts
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
  category?: string;
  phone?: string;
  company?: string;
}) {
  if (!resend) {
    console.log('[Resend mock] contact form payload:', params);
    return { ok: true, mock: true };
  }
  const from = process.env.RESEND_FROM || 'Top Show Pro <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'contacto@topshowpro.com';
  await resend.emails.send({
    from,
    to,
    subject: `Nueva consulta: ${params.category ?? 'General'}`,
    html: `<p><strong>${params.name}</strong> (${params.email})</p>
           <p>Empresa: ${params.company ?? '-'}<br/>Tel: ${params.phone ?? '-'}</p>
           <p>${params.message}</p>`,
  });
  return { ok: true };
}
```

#### `lib/turnstile.ts`

```ts
export async function verifyTurnstile(token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });
  const data: { success: boolean } = await res.json();
  return data.success;
}
```

#### `lib/seo.ts`

```ts
import type { Metadata } from 'next';

export function buildMetadata(opts: {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  path?: string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app';
  const title = opts.title ? `${opts.title} | Top Show Pro` : 'Top Show Pro | Rental de tecnología para eventos';
  const description = opts.description ?? 'Rental de tecnología para eventos y espectáculos. Iluminación, sonido, pantallas LED, stages.';
  const ogImage = opts.ogImage ?? `${siteUrl}/opengraph-image.jpg`;
  const url = opts.path ? `${siteUrl}${opts.path}` : siteUrl;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url, siteName: 'Top Show Pro', images: [ogImage], locale: 'es_AR', type: 'website' },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}
```

---

### Fase E — Componentes

Creá estos componentes. Cada archivo `'use client'` si usa hooks/state/framer-motion en navegador.

#### `components/motion/LenisProvider.tsx`

```tsx
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
    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

#### `components/motion/FadeIn.tsx`

```tsx
'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion';

export function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} variants={fadeIn} transition={{ delay }}>
      {children}
    </motion.div>
  );
}
```

#### `components/motion/RevealText.tsx`

```tsx
'use client';
import { motion } from 'framer-motion';
import { revealTextWords, staggerContainer } from '@/lib/motion';

export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span className={className} initial="hidden" animate="visible" variants={staggerContainer}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={revealTextWords} className="inline-block pr-2">{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
```

#### `components/motion/BeamSweep.tsx`

```tsx
export function BeamSweep({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/20 to-transparent opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:translate-x-[200%]" />
    </div>
  );
}
```

#### `components/hero/HeroVideoCarousel.tsx`

```tsx
'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { RevealText } from '@/components/motion/RevealText';

type Slide = { phrase: string; accentColor?: string; videoUrl?: string | null; posterUrl?: string | null };

export function HeroVideoCarousel({ slides, banner }: { slides: Slide[]; banner?: { text?: string; cta?: { label: string; link: string } } }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[idx];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg-base">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {slide?.videoUrl ? (
            <video src={slide.videoUrl} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-50" poster={slide.posterUrl ?? undefined} />
          ) : slide?.posterUrl ? (
            <Image src={slide.posterUrl} alt="" fill className="object-cover opacity-50" priority />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base/90" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1 className="font-display text-display text-center text-fg-primary max-w-5xl">
          <RevealText text={slide?.phrase ?? ''} key={idx} />
        </h1>
      </div>

      {banner?.text && (
        <div className="absolute bottom-0 inset-x-0 z-10 bg-accent-cyan text-black py-3 px-6 flex items-center justify-center gap-6">
          <span className="font-display text-xl md:text-2xl tracking-wider">{banner.text}</span>
          {banner.cta && (
            <a href={banner.cta.link} className="font-sans text-xs font-medium uppercase tracking-widest border-b border-black pb-0.5">
              {banner.cta.label} →
            </a>
          )}
        </div>
      )}
    </section>
  );
}
```

#### `components/events/EventCard.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatDateRange } from '@/lib/utils';

export type EventCardProps = {
  title: string;
  subtitle?: string;
  slug: string;
  dateStart: string;
  dateEnd?: string;
  category: { label: string };
  heroImage: { url: string; metadata?: { lqip?: string } };
};

export function EventCard({ title, subtitle, slug, dateStart, dateEnd, category, heroImage }: EventCardProps) {
  return (
    <Link href={`/eventos/${slug}`} className="group relative block overflow-hidden bg-bg-surface aspect-[4/5]">
      <Image src={heroImage.url} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" placeholder={heroImage.metadata?.lqip ? 'blur' : 'empty'} blurDataURL={heroImage.metadata?.lqip} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
        <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-accent-cyan border border-accent-cyan/40 px-2 py-0.5">{category.label}</span>
        <h3 className="font-display text-3xl text-fg-primary leading-none">{title}</h3>
        {subtitle && <p className="font-sans text-sm text-fg-muted line-clamp-2">{subtitle}</p>}
        <p className="font-mono text-xs text-fg-faint uppercase">{formatDateRange(dateStart, dateEnd)}</p>
      </div>
    </Link>
  );
}
```

#### `components/events/EventGrid.tsx`

```tsx
import { EventCard, type EventCardProps } from './EventCard';

export function EventGrid({ events }: { events: EventCardProps[] }) {
  if (!events.length) return <p className="text-center text-fg-muted py-20">No hay eventos aún.</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((e) => (
        <EventCard key={e.slug} {...e} />
      ))}
    </div>
  );
}
```

#### `components/events/EventFilter.tsx`

```tsx
'use client';
import { cn } from '@/lib/utils';

export function EventFilter({ categories, active, onSelect }: { categories: { label: string; slug: string }[]; active: string | null; onSelect: (slug: string | null) => void }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <button onClick={() => onSelect(null)} className={cn('px-4 py-2 font-mono text-xs uppercase tracking-widest transition', active === null ? 'bg-accent-cyan text-black' : 'border border-white/20 text-fg-muted hover:border-accent-cyan')}>
        Todos
      </button>
      {categories.map((c) => (
        <button key={c.slug} onClick={() => onSelect(c.slug)} className={cn('px-4 py-2 font-mono text-xs uppercase tracking-widest transition', active === c.slug ? 'bg-accent-cyan text-black' : 'border border-white/20 text-fg-muted hover:border-accent-cyan')}>
          {c.label}
        </button>
      ))}
    </div>
  );
}
```

#### `components/services/ServiceTabs.tsx`

```tsx
'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Service = { name: string; shortDesc: string; longDesc: any; gallery: any[]; cta?: { label: string; link: string } };

export function ServiceTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div>
      <div className="hidden md:flex border-b border-white/10 mb-12">
        {services.map((s, i) => (
          <button key={s.name} onClick={() => setActive(i)} className={cn('px-6 py-4 font-display text-xl tracking-wide transition relative', active === i ? 'text-accent-cyan' : 'text-fg-muted hover:text-fg-primary')}>
            {s.name}
            {active === i && <motion.div layoutId="tab-indicator" className="absolute inset-x-0 -bottom-px h-[2px] bg-accent-cyan" />}
          </button>
        ))}
      </div>

      <div className="hidden md:block min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            <h3 className="font-display text-5xl text-fg-primary mb-4">{current.name}</h3>
            <p className="font-sans text-lg text-fg-muted max-w-3xl mb-8">{current.shortDesc}</p>
            {current.cta && (
              <a href={current.cta.link} className="inline-block px-6 py-3 bg-bg-elevated border border-white/10 text-fg-primary font-sans text-sm uppercase tracking-widest hover:bg-accent-cyan hover:text-black transition">
                {current.cta.label}
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden space-y-2">
        {services.map((s, i) => (
          <details key={s.name} className="border-b border-white/10 group">
            <summary className="font-display text-2xl text-fg-primary py-4 cursor-pointer list-none flex items-center justify-between">
              {s.name}
              <span className="font-mono text-sm group-open:rotate-45 transition">+</span>
            </summary>
            <div className="pb-6">
              <p className="font-sans text-base text-fg-muted">{s.shortDesc}</p>
              {s.cta && <a href={s.cta.link} className="inline-block mt-4 px-4 py-2 border border-accent-cyan text-accent-cyan font-sans text-xs uppercase">{s.cta.label}</a>}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
```

#### `components/equipment/BrandsMarquee.tsx`

```tsx
export function BrandsMarquee({ brands }: { brands: { name: string; logoUrl?: string | null }[] }) {
  const loop = [...brands, ...brands];
  return (
    <div className="relative overflow-hidden py-16 border-y border-white/5">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {loop.map((b, i) => (
          <div key={i} className="flex items-center justify-center min-w-[160px] grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition">
            {b.logoUrl ? (
              <img src={b.logoUrl} alt={b.name} className="h-10 object-contain" />
            ) : (
              <span className="font-display text-2xl text-fg-muted tracking-wider">{b.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### `components/contact/ContactForm.tsx`

```tsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  category: z.string().min(1, 'Seleccioná una categoría'),
  name: z.string().min(2, 'Ingresá tu nombre'),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Contanos un poco más'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ categories }: { categories: { label: string }[] }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
    if (res.ok) setSent(true);
  }

  return (
    <div className="relative perspective-1000">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" initial={{ rotateY: 0 }} exit={{ rotateY: 180 }} transition={{ duration: 0.6 }}>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Categoría</label>
              <select {...register('category')} className="w-full bg-bg-elevated border border-white/10 px-4 py-3 text-fg-primary">
                <option value="">Seleccioná una opción</option>
                {categories.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Nombre / Empresa</label>
                <input {...register('name')} className="w-full bg-bg-elevated border border-white/10 px-4 py-3 text-fg-primary" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Teléfono</label>
                <input {...register('phone')} className="w-full bg-bg-elevated border border-white/10 px-4 py-3 text-fg-primary" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Email</label>
              <input type="email" {...register('email')} className="w-full bg-bg-elevated border border-white/10 px-4 py-3 text-fg-primary" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Consulta</label>
              <textarea {...register('message')} rows={5} className="w-full bg-bg-elevated border border-white/10 px-4 py-3 text-fg-primary" />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-accent-cyan text-black font-sans text-sm uppercase tracking-widest hover:bg-accent-cyan/80 transition">
              {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
            </button>
          </motion.form>
        ) : (
          <motion.div key="success" className="text-center py-16" initial={{ rotateY: -180 }} animate={{ rotateY: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="font-display text-5xl text-accent-cyan mb-4">¡Gracias!</h3>
            <p className="font-sans text-lg text-fg-muted">Respondemos dentro de las 24hs hábiles.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

#### `components/nav/Header.tsx`

```tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/equipamiento', label: 'Equipamiento' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all', scrolled ? 'bg-bg-base/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent')}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wider text-fg-primary">TOP SHOW PRO</Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-sans text-sm uppercase tracking-widest text-fg-muted hover:text-accent-cyan transition">{l.label}</Link>
          ))}
        </div>
        <button onClick={() => setOpen((o) => !o)} className="md:hidden text-fg-primary p-2" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} /></svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-bg-base border-t border-white/5 px-6 py-8 space-y-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-display text-3xl text-fg-primary">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
```

#### `components/nav/Footer.tsx`

```tsx
export function Footer({ settings }: { settings: any }) {
  return (
    <footer className="bg-bg-elevated border-t border-white/5 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-3xl text-fg-primary mb-4">TOP SHOW PRO</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.address}</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.email}</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.phone}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-4">Horario</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.schedule}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-4">Redes</p>
          <div className="flex flex-col gap-2">
            {settings?.socials?.instagram && <a href={settings.socials.instagram} className="font-sans text-sm text-fg-muted hover:text-accent-cyan">Instagram</a>}
            {settings?.socials?.facebook && <a href={settings.socials.facebook} className="font-sans text-sm text-fg-muted hover:text-accent-cyan">Facebook</a>}
            {settings?.socials?.linkedin && <a href={settings.socials.linkedin} className="font-sans text-sm text-fg-muted hover:text-accent-cyan">LinkedIn</a>}
            {settings?.socials?.youtube && <a href={settings.socials.youtube} className="font-sans text-sm text-fg-muted hover:text-accent-cyan">YouTube</a>}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center font-mono text-xs text-fg-faint uppercase tracking-widest">
        © {new Date().getFullYear()} Top Show Pro. Todos los derechos reservados.
      </div>
    </footer>
  );
}
```

#### Componentes adicionales

Siguiendo el mismo patrón, creá:

- `components/events/LedDisplay.tsx` — modal con `@radix-ui/react-dialog` + scanline effect + scale-in animation
- `components/equipment/CategorySection.tsx` — bloque por categoría con Radix Accordion
- `components/seo/JsonLd.tsx` — componente `<script type="application/ld+json">` con data del `Organization`, `ItemList`, `Event`, `BreadcrumbList`
- `components/services/ServiceCard.tsx` — card con L-bracket corners usando la clase utility `.l-bracket`
- `components/services/ServiceAccordion.tsx` — Radix Accordion para mobile (refactor del `<details>` embebido en ServiceTabs si querés separar)
- `components/contact/FlipSuccess.tsx` — si querés mover la animación fuera de `ContactForm.tsx`
- `components/hero/HeroPhrase.tsx` — si querés extraer el texto del hero con su RevealText

Usá los patterns de la skill `top-show-pro-design-system` para mantener consistencia.

---

### Fase F — Páginas

> **ANTES de escribir cada página**: Read el `code.html` y `screen.png` del mockup Stitch correspondiente (ver tabla de mapeo en sección "REFERENCIAS VISUALES STITCH" arriba). Extraé estructura DOM, clases Tailwind, micro-interacciones. Implementá respetando el layout del mock + tokens del design system + fuentes del brief cliente (Bebas/Montserrat/Orbitron).

#### `app/layout.tsx` (root)

```tsx
import type { Metadata } from 'next';
import { bebas, montserrat, orbitron } from '@/lib/fonts';
import { buildMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = buildMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebas.variable} ${montserrat.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

#### `app/(site)/layout.tsx`

```tsx
import { LenisProvider } from '@/components/motion/LenisProvider';
import { Header } from '@/components/nav/Header';
import { Footer } from '@/components/nav/Footer';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_SITE_SETTINGS } from '@/sanity/lib/queries';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<any>(Q_SITE_SETTINGS, undefined, 'siteSettings');
  return (
    <LenisProvider>
      <Header />
      <main>{children}</main>
      <Footer settings={settings} />
    </LenisProvider>
  );
}
```

#### `app/(site)/page.tsx` (Home)

```tsx
import { sanityFetch } from '@/sanity/lib/client';
import { Q_HERO, Q_HOMEPAGE, Q_BRANDS, Q_SERVICES } from '@/sanity/lib/queries';
import { HeroVideoCarousel } from '@/components/hero/HeroVideoCarousel';
import { EventGrid } from '@/components/events/EventGrid';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { FadeIn } from '@/components/motion/FadeIn';

export default async function HomePage() {
  const [hero, homepage, brands, services] = await Promise.all([
    sanityFetch<any>(Q_HERO, undefined, 'hero'),
    sanityFetch<any>(Q_HOMEPAGE, undefined, 'homepage'),
    sanityFetch<any[]>(Q_BRANDS, undefined, 'brand'),
    sanityFetch<any[]>(Q_SERVICES, undefined, 'service'),
  ]);

  return (
    <>
      <HeroVideoCarousel slides={hero?.slides ?? []} banner={hero?.bannerAzul} />

      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-display text-hero text-fg-primary mb-8">Hacemos que todo suceda</h2>
          <p className="font-sans text-lg text-fg-muted leading-relaxed">
            Acá es donde los eventos cobran vida. Somos tu aliado integral en soluciones técnicas para espectáculos y eventos.
            Iluminación, sonido, pantallas LED, estructuras y todo lo que lo hace posible son nuestro campo de acción.
          </p>
        </FadeIn>
      </section>

      <section className="px-6 py-24 max-w-7xl mx-auto">
        <FadeIn><h2 className="font-display text-hero text-fg-primary mb-12">Servicios</h2></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.map((s: any) => (
            <div key={s.name} className="relative l-bracket bg-bg-surface p-8 aspect-[4/5] flex flex-col justify-end">
              <span className="l-bracket-bl" />
              <span className="l-bracket-br" />
              <h3 className="font-display text-2xl text-fg-primary mb-3">{s.name}</h3>
              <p className="font-sans text-sm text-fg-muted">{s.shortDesc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 max-w-7xl mx-auto">
        <FadeIn><h2 className="font-display text-hero text-fg-primary mb-12">Eventos destacados</h2></FadeIn>
        <EventGrid events={homepage?.featuredEvents ?? []} />
      </section>

      <BrandsMarquee brands={brands ?? []} />

      <section className="px-6 py-32 text-center">
        <FadeIn>
          <h2 className="font-display text-hero text-fg-primary mb-6">¿Tu próximo evento?</h2>
          <a href="/contacto" className="inline-block px-8 py-4 bg-accent-cyan text-black font-sans text-sm uppercase tracking-widest hover:bg-accent-cyan/80 transition">
            Contactanos
          </a>
        </FadeIn>
      </section>
    </>
  );
}
```

#### `app/(site)/servicios/page.tsx`

```tsx
import { sanityFetch } from '@/sanity/lib/client';
import { Q_SERVICES } from '@/sanity/lib/queries';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { FadeIn } from '@/components/motion/FadeIn';

export default async function ServiciosPage() {
  const services = await sanityFetch<any[]>(Q_SERVICES, undefined, 'service');
  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <FadeIn>
        <h1 className="font-display text-display text-fg-primary mb-6">Servicios</h1>
        <p className="font-sans text-lg text-fg-muted max-w-2xl mb-16">Soluciones técnicas integrales para cada tipo de evento.</p>
      </FadeIn>
      <ServiceTabs services={services ?? []} />
    </div>
  );
}
```

#### `app/(site)/eventos/page.tsx`

```tsx
'use client';
import { useEffect, useState } from 'react';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';

export default function EventosPage() {
  const [cats, setCats] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/events?cats=1').then((r) => r.json()).then(setCats);
  }, []);
  useEffect(() => {
    fetch(`/api/events${active ? `?category=${active}` : ''}`).then((r) => r.json()).then(setEvents);
  }, [active]);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-24">
      <h1 className="font-display text-display text-fg-primary mb-12">Eventos</h1>
      <EventFilter categories={cats} active={active} onSelect={setActive} />
      <EventGrid events={events} />
    </div>
  );
}
```

(Hacé también `app/api/events/route.ts` que use `sanityFetch` + queries para filtros server-side.)

#### `app/(site)/eventos/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EVENT_DETAIL } from '@/sanity/lib/queries';
import { formatDateRange } from '@/lib/utils';
import { PortableText } from '@portabletext/react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, `event:${slug}`);
  return buildMetadata({
    title: event?.title,
    description: event?.subtitle,
    ogImage: event?.heroImage?.url,
    path: `/eventos/${slug}`,
  });
}

export default async function EventoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, `event:${slug}`);
  if (!event) notFound();

  return (
    <article className="pt-20">
      <header className="relative h-[70svh] w-full overflow-hidden">
        {event.heroImage && <Image src={event.heroImage.url} alt={event.title} fill className="object-cover" priority />}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan mb-4">{event.category?.label}</span>
          <h1 className="font-display text-display text-fg-primary">{event.title}</h1>
          {event.subtitle && <p className="font-sans text-xl md:text-2xl text-fg-secondary mt-2">{event.subtitle}</p>}
          <p className="font-mono text-sm text-fg-muted mt-4">{formatDateRange(event.dateStart, event.dateEnd)}</p>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="prose prose-invert font-sans text-lg text-fg-muted">
          {event.description && <PortableText value={event.description} />}
        </div>
      </section>

      {event.equipmentUsed?.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-display text-hero text-fg-primary mb-8">Equipos utilizados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {event.equipmentUsed.map((e: string, i: number) => (
              <div key={i} className="bg-bg-surface border border-white/5 px-5 py-4 font-mono text-sm text-fg-muted">
                {e}
              </div>
            ))}
          </div>
        </section>
      )}

      {event.gallery?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-display text-hero text-fg-primary mb-8">Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.gallery.map((g: any, i: number) => (
              <div key={i} className="relative aspect-[4/3] bg-bg-surface">
                <Image src={g.url} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 py-24 text-center">
        <h2 className="font-display text-hero text-fg-primary mb-6">¿Necesitás algo similar?</h2>
        <a href="/contacto" className="inline-block px-8 py-4 bg-accent-cyan text-black font-sans text-sm uppercase tracking-widest">
          Contactanos
        </a>
      </section>
    </article>
  );
}
```

#### `app/(site)/equipamiento/page.tsx`

Similar a servicios pero con acordeón de categorías + brands marquee al final.

#### `app/(site)/contacto/page.tsx`

```tsx
import { sanityFetch } from '@/sanity/lib/client';
import { Q_CONTACT_CATEGORIES, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { ContactForm } from '@/components/contact/ContactForm';

export default async function ContactoPage() {
  const [categories, settings] = await Promise.all([
    sanityFetch<any[]>(Q_CONTACT_CATEGORIES, undefined, 'contactCategory'),
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, 'siteSettings'),
  ]);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h1 className="font-display text-display text-fg-primary mb-6">Contacto</h1>
        <p className="font-sans text-lg text-fg-muted mb-12">Dejanos tu consulta y te respondemos en 24hs hábiles.</p>
        <ContactForm categories={categories ?? []} />
      </div>
      <aside className="space-y-8 pt-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Contacto general</p>
          <p className="font-sans text-lg text-fg-primary">{settings?.email}</p>
          <p className="font-sans text-lg text-fg-muted">{settings?.phone}</p>
        </div>
        {settings?.techContact && (
          <div className="border-t border-white/5 pt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Soporte técnico</p>
            <p className="font-sans text-lg text-fg-primary">{settings.techContact.name}</p>
            <p className="font-sans text-lg text-fg-muted">{settings.techContact.phone}</p>
            <p className="font-sans text-lg text-fg-muted">{settings.techContact.email}</p>
          </div>
        )}
        <div className="border-t border-white/5 pt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-2">Horario</p>
          <p className="font-sans text-lg text-fg-muted">{settings?.schedule}</p>
        </div>
      </aside>
    </div>
  );
}
```

#### `app/studio/[[...tool]]/page.tsx`

```tsx
'use client';
import dynamic from 'next/dynamic';
import config from '@/sanity/sanity.config';

const NextStudio = dynamic(() => import('next-sanity/studio').then((m) => m.NextStudio), { ssr: false });

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

Agregá `next-sanity` si no está (`pnpm add next-sanity`).

---

### Fase G — API routes + Email templates

#### `app/api/contact/route.ts`

```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/resend';
import { verifyTurnstile } from '@/lib/turnstile';
import { sanityClient } from '@/sanity/lib/client';

const schema = z.object({
  category: z.string(),
  name: z.string().min(2),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(10),
  turnstileToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const okCaptcha = await verifyTurnstile(data.turnstileToken);
    if (!okCaptcha) return NextResponse.json({ error: 'Captcha inválido' }, { status: 400 });

    if (sanityClient && process.env.SANITY_API_WRITE_TOKEN) {
      const writeClient = sanityClient.withConfig({ token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false });
      await writeClient.create({ _type: 'lead', ...data, createdAt: new Date().toISOString(), read: false });
    }

    await sendContactEmail(data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error', err);
    return NextResponse.json({ error: 'Error procesando' }, { status: 500 });
  }
}
```

#### `app/api/revalidate/route.ts`

```ts
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const secret = req.headers.get('x-sanity-secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const tags = [body._type, `${body._type}:${body.slug?.current}`].filter(Boolean);
  tags.forEach((t) => revalidateTag(t));
  return NextResponse.json({ revalidated: tags });
}
```

#### `app/api/events/route.ts`

```ts
import { NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EVENT_CATEGORIES, Q_EVENTS_LIST } from '@/sanity/lib/queries';

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.has('cats')) {
    const cats = await sanityFetch<any[]>(Q_EVENT_CATEGORIES, undefined, 'eventCategory');
    return NextResponse.json(cats);
  }
  const category = url.searchParams.get('category') ?? undefined;
  const events = await sanityFetch<any[]>(Q_EVENTS_LIST(category), undefined, 'event');
  return NextResponse.json(events);
}
```

#### `app/api/og/route.tsx`

```tsx
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Top Show Pro';
  const subtitle = searchParams.get('subtitle') ?? 'Rental de tecnología para eventos';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #131313 70%, #1785d3 200%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 80, color: 'white', letterSpacing: '-0.02em', lineHeight: 1, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 32, color: '#5AA7E0', marginTop: 16 }}>{subtitle}</div>
        <div style={{ fontSize: 18, color: '#1785d3', marginTop: 40, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Top Show Pro</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

#### `app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EVENTS_LIST } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app';
  const events = await sanityFetch<any[]>(Q_EVENTS_LIST(), undefined, 'event');
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/servicios`, lastModified: new Date() },
    { url: `${base}/eventos`, lastModified: new Date() },
    { url: `${base}/equipamiento`, lastModified: new Date() },
    { url: `${base}/contacto`, lastModified: new Date() },
    ...events.map((e) => ({ url: `${base}/eventos/${e.slug}`, lastModified: new Date(e.dateStart) })),
  ];
}
```

#### `app/robots.ts`

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api'] },
    sitemap: `${base}/sitemap.xml`,
  };
}
```

#### `lib/email-templates/ContactEmail.tsx` (React Email)

```tsx
import { Html, Body, Container, Heading, Text, Hr } from '@react-email/components';

export default function ContactEmail({ name, email, company, phone, category, message }: any) {
  return (
    <Html>
      <Body style={{ background: '#0A0A0A', color: '#FFFFFF', fontFamily: 'system-ui' }}>
        <Container style={{ padding: 32, maxWidth: 600 }}>
          <Heading style={{ color: '#1785d3' }}>Nueva consulta de {category}</Heading>
          <Text><strong>{name}</strong> ({email})</Text>
          <Text>Empresa: {company ?? '-'}</Text>
          <Text>Teléfono: {phone ?? '-'}</Text>
          <Hr />
          <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

---

### Fase H — README + docs

Generá `README.md` con:

- Descripción breve
- Stack resumen (linkea a `STACK-TOOLS.md` si está en el repo)
- Quickstart: `pnpm install && pnpm dev`
- Variables de entorno (copia `.env.local.example` y explicá cada una)
- Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `sanity dev`, `sanity deploy`
- Estructura de carpetas (árbol)
- Guía desarrollo: feature flags, mock data, cómo activar APIs
- Referencias: CMS-GUIDE, SKILLS-RECOMENDADAS

También creá:

- `docs/STACK.md` — resumen del stack (o referencia a `STACK-TOOLS.md`)
- `docs/CMS.md` — guía cliente (copia de `CMS-GUIDE.md`)
- `docs/DESIGN.md` — ref a la skill `top-show-pro-design-system`
- `docs/DEPLOY.md` — pasos Vercel + Sanity webhook + dominio

---

### Fase I — Git init + smoke test

```bash
git init
echo "node_modules\n.next\n.env.local\n*.log" > .gitignore
git add .
git commit -m "feat: scaffold inicial Top Show Pro (Next 15 + Sanity + Resend + Tailwind v4)"
```

Corré `pnpm dev`. Abrí `http://localhost:3000`:

- [ ] Home carga con hero de mock data
- [ ] `/servicios` muestra 4 tabs/accordion
- [ ] `/eventos` muestra grid con 3 mock events
- [ ] `/eventos/lizy-tagliani` muestra detalle con equipos
- [ ] `/equipamiento` muestra 4 categorías + marquee brands
- [ ] `/contacto` muestra form + datos
- [ ] Form: completar y enviar → `[Resend mock] contact form payload:` en consola + UI muestra animación flip "¡Gracias!"
- [ ] Mobile (Chrome DevTools 375px): nav hamburger funciona
- [ ] `pnpm typecheck` pasa sin errores
- [ ] `pnpm build` compila

Si algo falla, debuggealo con `superpowers:systematic-debugging`.

---

## CHECKLIST FINAL (Fase 1 — lo que quedás con scaffold)

- [ ] Repo git inicializado con primer commit
- [ ] `pnpm dev` arranca sin errores
- [ ] Todas las rutas públicas cargan (home, servicios, eventos, eventos/[slug], equipamiento, contacto)
- [ ] `/studio` muestra Studio vacío (sin projectId) — OK, se configura en Fase 2
- [ ] Form contacto muestra flip success y loguea payload en consola server
- [ ] Animaciones funcionan (hero fade, Lenis smooth, reveal texts, marquee brands)
- [ ] Responsive mobile OK
- [ ] TypeCheck y build sin errores
- [ ] Lighthouse ≥ 90 local
- [ ] **Cada página visualmente respeta el mockup Stitch correspondiente** (comparar con `screen.png` de la carpeta `stitch_premium_event_showcase/` respectiva)
- [ ] Skill `top-show-pro-design-system` instalada en `.claude/skills/` del repo (copiada desde `DESIGN-SYSTEM.md`)
- [ ] Carpeta `stitch_premium_event_showcase/` accesible desde el repo (en `docs-refs/stitch/` o nivel hermano) para referencia futura

---

## PASOS FASE 2 (después, con APIs)

Ver `STACK-TOOLS.md` para detalle. Resumen:

1. **Sanity**: `pnpm sanity init` → projectId → pegar en `.env.local` → `pnpm sanity deploy`
2. **Resend**: crear cuenta, API key, pegar en `.env.local`
3. **Turnstile**: Cloudflare dashboard → keys → `.env.local`
4. Poblar Studio con contenido real (seguir `CMS-GUIDE.md`)
5. Webhook Sanity → `/api/revalidate` con secret
6. Deploy Vercel: `vercel --prod` (o conectar repo GitHub)
7. Configurar envs en Vercel dashboard
8. (Opcional) Custom domain

---

## REFERENCIAS CRUZADAS

Archivos que deben estar en la misma carpeta que este `MASTER-PROMPT.md` al correrlo. **Todos viajaron juntos en el zip desde la máquina origen**:

| Archivo | Rol |
|---------|-----|
| **`MASTER-PROMPT.md`** (este) | Instrucciones completas de scaffold |
| **`STACK-TOOLS.md`** | Catálogo herramientas + rationale + alternativas descartadas. Consultar para "¿por qué X y no Y?" |
| **`CMS-GUIDE.md`** | Guía operativa del cliente para usar Sanity Studio (10 ejemplos). Copiar a `docs/CMS.md` del repo generado |
| **`DESIGN-SYSTEM.md`** | Design system completo (tokens, tipografías, motion, componentes patterns). Se agrega como skill en `.claude/skills/top-show-pro-design-system/SKILL.md` dentro del repo para que auto-trigger en futuras sesiones |
| **`SKILLS-RECOMENDADAS.md`** | Skills Claude Code + hooks óptimos + skills custom a crear |
| **`stitch_premium_event_showcase/`** | Subcarpeta con mockups HTML + screenshots de Stitch (6 páginas con `code.html` + `screen.png` + 2 DESIGN.md de sistemas de diseño). **Referencia visual de máxima prioridad** (ver sección "REFERENCIAS VISUALES STITCH" arriba) |

### Qué hacer con `DESIGN-SYSTEM.md` al inicio del scaffold

Copialo al repo como skill instalable:

```bash
mkdir -p .claude/skills/top-show-pro-design-system
cp ../DESIGN-SYSTEM.md .claude/skills/top-show-pro-design-system/SKILL.md
# (ajustar path según donde corras; si los .md están en la misma carpeta que el repo, usá ./DESIGN-SYSTEM.md)
```

Así, en sesiones futuras de Claude Code (cuando iteres, agregues features, etc.), la skill se activa automáticamente al tocar UI/estilos.

### Qué hacer con `stitch_premium_event_showcase/`

**Mantenerla accesible**. Opciones:

- **A**: Dejarla al lado del repo (nivel hermano) y Claude la accede con paths `../stitch_premium_event_showcase/...`
- **B (preferida)**: Moverla al repo como `docs-refs/stitch/` (gitignored o committed según preferencia). Así Claude la accede desde la raíz: `docs-refs/stitch/home_top_show_pro_elite_v3/code.html`

```bash
mkdir -p docs-refs
cp -r ../stitch_premium_event_showcase docs-refs/stitch
echo "docs-refs/" >> .gitignore   # o no, si querés commitear las refs
```

Durante el scaffold, Claude usa Read sobre esos archivos al implementar cada página.

---

## FIN DEL PROMPT

Empezá por Fase A. Usá TaskCreate para trackear fases. Al terminar todas, arrancá `pnpm dev` y validá el checklist. Reportá estado final al operador humano.

Si encontrás bloqueos: pará, explicá qué pasó, proponé fix. No escondas errores.
