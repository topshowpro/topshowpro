# Stack & Herramientas — Top Show Pro

> Catálogo definitivo del stack técnico del sitio, con justificación y alternativas descartadas. Léase antes de introducir una herramienta nueva al proyecto.

## Resumen ejecutivo

Stack elegido para un sitio **marketing premium, dark, motion-heavy pero perf-first**, editable 100% por cliente no-técnico, con backend mínimo (sin DB propia), hosteable en Vercel gratis, con deploys previsualizables y Lighthouse ≥ 95.

**Pilares**:
1. **Next.js 15 App Router** para RSC + PPR + ISR + Edge
2. **Sanity v3** como única fuente de verdad editorial (cliente edita todo)
3. **Resend** para mails transaccionales
4. **Vercel** para hosting + preview deploys
5. **Framer Motion + Lenis** para motion moderno sin parallax
6. **shadcn/ui + Tailwind v4** para UI owned

Nada de DB transaccional. Nada de backend custom. Nada de analytics de terceros (scope inicial). Nada de librerías de animación pesadas.

---

## Tabla completa

| Capa | Herramienta | Versión | Razón | Alternativas descartadas |
|------|-------------|---------|-------|--------------------------|
| **Framework** | Next.js | 15.x (App Router) | RSC, PPR, ISR, Edge runtime, View Transitions API nativa, Turbopack dev | Astro (menos maduro para SSR dinámico + Studio embebido), Remix (menor ecosistema), Vite+React puro (no SSR out-of-the-box) |
| **Lenguaje** | TypeScript | 5.x strict | Seguridad de tipos con Sanity GROQ typed + schemas | JS plano (caos en schemas) |
| **Runtime** | Node.js | 20 LTS | Compatibilidad Next 15 | Node 22 (menos maduro en plataformas cloud) |
| **Package manager** | pnpm | 9.x | Velocidad + disk-efficient + monorepo-ready | npm (lento), yarn (legacy), bun (no todas deps OK) |
| **Styling** | Tailwind CSS | v4 | JIT, CSS vars nativas, DX top, perf | CSS Modules (más verboso), Emotion/styled-components (runtime cost), Panda CSS (immature) |
| **UI base** | shadcn/ui | latest | Componentes Radix accesibles, owned code (no black-box), Tailwind-native | Radix puro (sin estilos), Mantine (runtime pesado), MUI (opinionado, difícil override), Chakra (legacy v2) |
| **Iconos** | Lucide React + Material Symbols | latest | Lucide liviano + Material solo para icono técnico selectivo | Heroicons (menos variedad), FontAwesome (pesado), react-icons (bundle) |
| **Animación** | Framer Motion + Lenis + tailwindcss-motion + View Transitions API | Framer 11.x, Lenis 1.x | Stack moderno, composable, perf-first, sin parallax | **GSAP** (licensing + peso sin ScrollTrigger gratis), **Three.js/R3F** (overkill para marketing site), **Anime.js** (no maneja React bien), **Lottie** (archivos pesados) |
| **Forms** | React Hook Form + Zod | RHF 7.x, Zod 3.x | Validación type-safe server + client compartida, sin re-renders innecesarios | Formik (legacy), Final Form (abandonado), Valibot (menos ecosystem) |
| **CMS** | Sanity | v3 | Studio embebido en Next (`/studio`), GROQ potente, portable text, image CDN + LQIP, plan free generoso | **Payload CMS** (requiere Postgres, más setup), **Strapi** (hosting propio), **Contentful** (caro al escalar), **Prismic** (menos flexible), **MDX local** (cliente no-técnico no puede editar) |
| **Imágenes CMS** | `next-sanity-image` + Sanity CDN | - | AVIF/WebP auto, responsive srcsets, LQIP blur dataURL nativo | Cloudinary (costo extra), Uploadcare (propietario) |
| **Video hero** | `next/video` (default) o Mux | Mux opcional | Next/video nativo Next 15. Mux solo si videos grandes (>20MB) para HLS streaming | MP4 raw (lento), YouTube embed (branding + perf), Vimeo embed (caro) |
| **Mail** | Resend + React Email | Resend 3.x, react-email 2.x | API moderna, DKIM/SPF auto, templates en JSX (reutilizables con React), free tier 3000 mails/mes | **SendGrid** (deprecated UI), **Postmark** (más caro), **Mailgun** (legacy DX), **SES** (setup complejo DKIM) |
| **Anti-spam** | Cloudflare Turnstile | - | Sin Google, sin friction usuario, gratis, DNS-independent | **reCAPTCHA v3** (Google tracking), **hCaptcha** (menos moderno), honeypot solo (no robusto) |
| **Hosting** | Vercel | Hobby plan inicio, Pro si escala | ISR + Edge + Preview Deploys automáticos + integración Next 1:1, plan gratis alcanza para scope | **Netlify** (peor integración Next), **Cloudflare Pages** (no soporta todo PPR/RSC), **self-host** (sobrecarga) |
| **Fonts** | `next/font/google` | nativo | Self-hosting automático, CLS=0, sin FOIT, subset optimizado | `@fontsource` (manual), `<link>` CSS (CLS riesgo) |
| **SEO — Meta** | Next 15 Metadata API | nativo | Tipada, server-side, con `generateMetadata()` async de Sanity | next-seo (duplicado con API nativa) |
| **SEO — Sitemap** | `app/sitemap.ts` nativo + `next-sitemap` para extras | - | API nativa cubre 99%, plugin solo si multi-dominio o hreflang complejo | Manual (fuente de bugs) |
| **SEO — OG dinámico** | `@vercel/og` | 0.6.x | Edge runtime, genera PNG desde JSX, caché CDN | Placid/Bannerbear (costo), pre-generados (no escala) |
| **SEO — Structured data** | JSON-LD inline (`<JsonLd/>` componente) | - | Organization, Event, ItemList, BreadcrumbList. Google-compatible | `next-seo/jsonld` (wrapper innecesario) |
| **Analytics** | **Ninguno (scope inicial)** | - | Cliente no pidió. Evita cookies banner + peso | Vercel Analytics (futuro), Plausible (futuro si piden) |
| **Bundle analysis** | `@next/bundle-analyzer` | - | Dev-time, detecta libs pesadas antes de prod | Webpack Bundle Analyzer (Next ya integra) |
| **Tests E2E (opcional fase futura)** | Playwright | 1.x | Smoke tests críticos (form submit, nav) si hace falta | Cypress (más lento), Puppeteer (API bajo nivel) |
| **Linting** | ESLint (config Next) + TypeScript strict | - | Default Next, cero setup | Biome (todavía no 1:1 con ESLint Next) |
| **Formatting** | Prettier | - | Opinionado, DX | dprint (nicho) |
| **Git hooks (opcional)** | Husky + lint-staged | - | Pre-commit typecheck + lint | Lefthook (menos instalado), manual (olvida usuarios) |
| **Monorepo** | **No aplica** | - | Single app. Si en futuro se agrega un segundo sitio, migrar a Turborepo | - |

---

## Dependencias exactas a instalar

Después del `pnpm create next-app`:

### Producción

```bash
pnpm add \
  @sanity/client \
  next-sanity \
  @sanity/image-url \
  @sanity/vision \
  sanity \
  styled-components \
  @portabletext/react \
  react-hook-form \
  @hookform/resolvers \
  zod \
  resend \
  react-email \
  @react-email/components \
  @vercel/og \
  lenis \
  framer-motion \
  tailwindcss-motion \
  lucide-react \
  next-sitemap \
  clsx \
  tailwind-merge \
  class-variance-authority \
  @radix-ui/react-slot \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs \
  @radix-ui/react-accordion \
  @radix-ui/react-navigation-menu \
  @radix-ui/react-label \
  @radix-ui/react-separator \
  date-fns
```

### Dev

```bash
pnpm add -D \
  @types/node \
  @types/react \
  @types/react-dom \
  @next/bundle-analyzer \
  prettier \
  prettier-plugin-tailwindcss
```

### Mux (opcional, solo si videos hero > 20MB)

```bash
pnpm add @mux/mux-player-react @mux/mux-node
```

### Playwright (opcional fase futura)

```bash
pnpm add -D @playwright/test
```

### shadcn setup

```bash
pnpm dlx shadcn@latest init
# Preset: TypeScript, dark mode default, neutral base, CSS variables, src dir: no, paths @/*
pnpm dlx shadcn@latest add button dialog dropdown-menu tabs accordion sheet form label input textarea select separator
```

---

## Infraestructura externa (Fase 2)

### Cuentas necesarias

| Servicio | Qué configurar | Costo inicio | Link |
|----------|---------------|--------------|------|
| **Sanity** | Project ID, dataset `production`, 2 tokens (read + write), CORS origins, webhook `POST → /api/revalidate` | Free hasta 10k docs / 1M API calls/mes | sanity.io |
| **Resend** | API key. Dominio verificado (DKIM/SPF/DMARC) cuando haya domain real. Inicio: `onboarding@resend.dev` para testing | Free 100 mails/día, 3000/mes | resend.com |
| **Cloudflare** | Turnstile widget (site key + secret key). DNS management si se mueve domain | Free | cloudflare.com |
| **Vercel** | Proyecto conectado a repo Git, env vars configuradas, dominio custom (cuando haya) | Free Hobby alcanza | vercel.com |
| **Mux** (opcional) | Token ID + secret, asset uploads | Free 1 asset, pay-as-you-go | mux.com |

### Webhooks

**Sanity → Next ISR**:
- URL: `https://topshowpro.vercel.app/api/revalidate`
- Secret: `SANITY_REVALIDATE_SECRET` (hash random de 32 chars)
- Trigger: create, update, delete en cualquier document
- Body: `{ _type, _id, slug }` → el endpoint resuelve qué tag revalidar

### DNS / Dominio

Scope inicial: dominio `topshowpro.vercel.app` (gratis).

Cuando se compre `topshowpro.com` (o se reutilice `.com.ar` existente):
1. Vercel → Project → Settings → Domains → Add → seguir wizard
2. Cloudflare DNS → agregar registros A/CNAME indicados por Vercel
3. Auto-SSL via Vercel (Let's Encrypt)
4. Redirects `www` ↔ apex según preferencia
5. Actualizar `NEXT_PUBLIC_SITE_URL` en Vercel env vars

---

## Variables de entorno completas

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
SANITY_REVALIDATE_SECRET=

# Resend
RESEND_API_KEY=
RESEND_FROM="Top Show Pro <hola@topshowpro.com>"
RESEND_TO=contacto@topshowpro.com

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://topshowpro.vercel.app

# Mux (opcional)
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
```

**Feature flag pattern**: El código chequea `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` antes de crear el Sanity client. Si falta, usa `lib/mock-data.ts`. Idem `RESEND_API_KEY` — si falta, el form loguea payload en consola. Permite desarrollar sin APIs.

---

## Decisiones clave explicadas

### Por qué Sanity y no Payload/Strapi/Contentful

- **Payload**: requiere Postgres self-hosted → infra extra (Neon/Supabase), deploy más complejo, hardening
- **Strapi**: misma historia, hostearlo en Vercel no es trivial
- **Contentful**: excelente pero carísimo al escalar y menos flexibilidad en schemas complejos como Portable Text
- **Sanity**: Studio embebido en tu mismo Next app (ruta `/studio`), cliente edita sin salir del dominio, CDN global de imágenes incluido, GROQ muy potente para joins/refs, free tier generoso, scoped tokens por operación (read vs write)

### Por qué sin DB propia

- Scope del sitio: informativo + leads + cms editorial
- Sanity ya es la DB editorial
- Leads: se guardan como docs `lead` en Sanity → panel + search + filtros gratis en Studio
- Sin analytics custom (futuro)
- Si aparece necesidad futura (carrito, login, bookings): agregar Neon/Supabase sin romper nada

### Por qué Framer Motion y no GSAP

- GSAP ScrollTrigger (el killer feature) requiere licencia paga Club GreenSock para uso comercial
- GSAP añade ~50kb gzipped; Framer Motion es similar pero ya usado por shadcn/Radix patterns
- Framer integra mejor con RSC + View Transitions API nativa
- Para el 90% de efectos no necesitamos el poder extra de GSAP
- Si aparece un efecto imposible en Framer, se puede agregar GSAP puntual sin contrato (solo ScrollTrigger requiere pago)

### Por qué Lenis y no locomotive-scroll

- Lenis es la evolución moderna de locomotive, del mismo autor
- Lenis pesa 7kb vs 20kb+ de locomotive
- API minimalista, integración trivial con Framer
- Respeta `prefers-reduced-motion` nativo

### Por qué Resend y no SendGrid/Postmark

- API más limpia (`await resend.emails.send({...})`)
- React Email integración oficial → plantillas en JSX reutilizables
- DKIM/SPF setup guiado con un wizard
- Free tier suficiente (3000 mails/mes cubre leads del sitio)
- Dashboard con delivery tracking

### Por qué Turnstile y no reCAPTCHA

- No trackea usuarios (Cloudflare respeta privacidad)
- No requiere mostrar el widget visible (auto mode)
- Gratis sin quotas molestas
- DNS-agnostic (no necesita Cloudflare como DNS)

### Por qué Vercel y no Netlify/CF Pages

- Next 15 features (PPR, ISR on-demand, View Transitions) están 1:1 con Vercel
- Preview deploys por PR automáticos
- Edge runtime para `/api/og` gratis
- Analytics/logs decentes en free tier
- Integración con Sanity webhook directa

---

## Librerías explícitamente NO usadas

Si aparecen en un PR, pedir justificación específica antes de mergear:

- **jQuery**: obsoleto, bundle
- **Moment.js**: reemplazado por `date-fns` o `Intl` nativo
- **Lodash**: la mayoría de métodos son oneliners en ES2024
- **Bootstrap**: peleado con Tailwind
- **GSAP sin licencia Club**: licensing turbio
- **Three.js/R3F**: overkill para marketing site, añade 100kb+
- **Redux/MobX**: innecesario en este scope (state local + Sanity fetch es suficiente)
- **SWR/React Query**: innecesario (RSC + Suspense ya resuelve fetching)
- **styled-components (runtime)**: conflict con Tailwind + Sanity Studio lo requiere solo como peer, usarlo solo donde Studio lo fuerza

---

## Matriz de decisión rápida (nuevo requerimiento)

| Si necesito... | Usar... |
|----------------|---------|
| Animación nueva | Framer Motion primero. Si no alcanza, agregar GSAP puntual |
| Nuevo schema Sanity | Definir en `sanity/schemas/documents/*.ts` siguiendo pattern existente |
| Nuevo mail | React Email template en `lib/email-templates/*.tsx` |
| Nuevo componente UI | shadcn add primero. Si no existe, componer con Radix + Tailwind |
| Fetch de datos en RSC | `sanityFetch()` con cache + tag |
| Fetch en client | server action preferida. Si no, `fetch` con tag |
| Dato externo (API de terceros) | Server action o route handler, cacheable |
| Dato transaccional (carrito, sesión) | **Pedir stack upgrade**: agregar DB (Neon) + auth (Clerk/NextAuth) |

---

## Upgrade path futuro (fuera de scope inicial)

Si el proyecto crece:

1. **Multi-idioma** (ES → EN, PT): agregar `next-intl` + field `locale` en Sanity docs
2. **Analytics**: Vercel Analytics (gratis 2500 eventos/mes) o PostHog
3. **A/B testing**: Vercel Edge Config + middleware split
4. **Carrito/bookings**: Stripe + Neon/Supabase + NextAuth
5. **Blog**: nuevo schema `post` en Sanity + ruta `/blog`
6. **Múltiples sitios** (ej: topshowpro AR + UY): Turborepo + shared packages
7. **PWA offline**: `@ducanh2912/next-pwa`
8. **E2E tests reales**: Playwright + Chromatic visual regression

Todo esto se adiciona sin rewrite.
