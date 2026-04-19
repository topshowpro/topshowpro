# Stack — Top Show Pro

> Referencia rápida. Documentación completa en `docs-kickoff/STACK-TOOLS.md`.

## Pilares

| Capa | Herramienta | Por qué |
|------|-------------|---------|
| Framework | **Next.js 15** (App Router) | RSC, PPR, ISR, Edge runtime |
| Lenguaje | **TypeScript 5** strict | Tipos seguros con GROQ + schemas Sanity |
| Package manager | **pnpm 9** | Velocidad, eficiencia de disco |
| Estilos | **Tailwind CSS v4** + **shadcn/ui** | Owned code, Radix accesible, JIT |
| CMS | **Sanity v3** | Studio embebido en `/studio`, GROQ, image CDN, free tier generoso |
| Mail | **Resend** + **React Email** | API limpia, templates JSX, DKIM guiado |
| Anti-spam | **Cloudflare Turnstile** | Sin Google tracking, sin fricción |
| Hosting | **Vercel** | ISR + Edge + Preview deploys, integración 1:1 con Next |
| Animación | **Framer Motion** + **Lenis** | Motion moderno, perf-first, respeta `prefers-reduced-motion` |
| Fuentes | `next/font/google` | Self-hosting automático, CLS=0 |

## Lo que NO usamos (y por qué)

- **GSAP**: ScrollTrigger requiere licencia paga para uso comercial
- **Three.js / R3F**: overkill para marketing site (+100 KB)
- **Redux / React Query**: innecesario — RSC + Suspense + Sanity fetch cubren todo
- **Locomotive Scroll**: reemplazado por Lenis (mismo autor, 7 KB vs 20 KB+)
- **jQuery, Moment, Lodash**: obsoletos / cubiertos por estándar

## Servicios externos necesarios

| Servicio | Propósito |
|----------|-----------|
| sanity.io | CMS + image CDN |
| resend.com | Mails transaccionales |
| cloudflare.com | Turnstile (anti-spam) |
| vercel.com | Hosting + preview deploys |
| mux.com (opcional) | Streaming video si archivos > 20 MB |

## Decisión rápida ante nueva necesidad

| Si necesito... | Usar... |
|----------------|---------|
| Animación nueva | Framer Motion primero |
| Nuevo schema de contenido | `sanity/schemas/documents/*.ts` |
| Nuevo template de mail | `lib/email-templates/*.tsx` |
| Nuevo componente UI | `shadcn add` primero, luego Radix + Tailwind |
| Dato externo (API) | Server action o route handler |
| Carrito / login / bookings | Pedir stack upgrade: Neon + Clerk/NextAuth |

## Guía completa

Ver `docs-kickoff/STACK-TOOLS.md` para tabla exhaustiva con versiones, alternativas descartadas, comandos de instalación y upgrade path futuro.
