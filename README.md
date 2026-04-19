# Top Show Pro — Sitio Web Oficial

Sitio web de **Top Show Pro**, empresa de rental de tecnología para eventos y espectáculos (iluminación, sonido, pantallas LED, stages) con sede en Argentina.

## Stack

| Capa | Herramienta |
|------|-------------|
| Framework | Next.js 16 App Router |
| Lenguaje | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animación | Framer Motion + Lenis |
| CMS | Sanity v3 (Studio en `/studio`) |
| Mail | Resend + React Email |
| Anti-spam | Cloudflare Turnstile |
| Hosting | Vercel |
| Forms | React Hook Form + Zod |

Ver `docs-kickoff/STACK-TOOLS.md` para detalle completo con rationale.

## Quickstart

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`. El sitio funciona **con mock data** sin necesitar APIs externas.

## Variables de entorno

Copiá `.env.local.example` a `.env.local` y completá los valores:

```bash
cp .env.local.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto Sanity (Fase 2) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset Sanity (default: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versión API Sanity |
| `SANITY_API_READ_TOKEN` | Token lectura Sanity |
| `SANITY_API_WRITE_TOKEN` | Token escritura Sanity (para leads) |
| `SANITY_REVALIDATE_SECRET` | Secret para webhook revalidación |
| `RESEND_API_KEY` | API key de Resend para emails |
| `RESEND_FROM` | Dirección de envío |
| `RESEND_TO` | Dirección de recepción |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Secret key Cloudflare Turnstile |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio en producción |

## Scripts

```bash
pnpm dev          # Servidor de desarrollo (Turbopack)
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm typecheck    # Verificación TypeScript
```

## Estructura

```
app/
├── (site)/          # Rutas públicas con Header/Footer
│   ├── page.tsx         # Home
│   ├── servicios/       # Página servicios
│   ├── eventos/         # Lista eventos + [slug] detalle
│   ├── equipamiento/    # Catálogo equipamiento
│   └── contacto/        # Formulario de contacto
├── api/             # API routes
│   ├── contact/         # POST formulario
│   ├── events/          # GET lista/categorías
│   ├── og/              # OG image generator
│   └── revalidate/      # POST Sanity webhook
├── studio/          # Sanity Studio embebido
├── sitemap.ts       # Sitemap automático
└── robots.ts        # Robots.txt
components/
├── hero/            # HeroVideoCarousel
├── events/          # EventCard, EventGrid, EventFilter, LedDisplay
├── services/        # ServiceTabs, ServiceCard
├── equipment/       # BrandsMarquee, CategorySection
├── contact/         # ContactForm
├── nav/             # Header, Footer
├── motion/          # LenisProvider, FadeIn, RevealText, BeamSweep
└── seo/             # JsonLd
lib/
├── utils.ts         # cn(), formatDateRange()
├── motion.ts        # Framer Motion variants
├── mock-data.ts     # Mock data para desarrollo
├── resend.ts        # Email (Resend)
├── turnstile.ts     # Anti-spam (Cloudflare)
├── seo.ts           # buildMetadata()
└── email-templates/ # React Email templates
sanity/
├── schemas/         # Tipos CMS (event, service, brand, etc.)
└── lib/             # client.ts, queries.ts, image.ts
```

## Desarrollo

### Mock data
Sin `NEXT_PUBLIC_SANITY_PROJECT_ID` configurado, todas las páginas usan mock data de `lib/mock-data.ts`. El formulario de contacto logea en consola del servidor.

### Activar APIs (Fase 2)
1. Crear proyecto en sanity.io → copiar Project ID en `.env.local`
2. Crear cuenta en resend.com → copiar API key
3. Crear site en Cloudflare Turnstile → copiar keys
4. Configurar webhook Sanity → `/api/revalidate` con `x-sanity-secret`

## Referencias
- `docs-kickoff/CMS-GUIDE.md` — Guía cliente para usar Sanity Studio
- `docs-kickoff/DESIGN-SYSTEM.md` — Design system tokens y patterns
- `docs-kickoff/STACK-TOOLS.md` — Detalle del stack y alternativas
