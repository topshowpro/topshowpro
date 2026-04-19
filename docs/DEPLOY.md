# Deploy Guide — Top Show Pro

Step-by-step guide to go from a fresh clone to a live production deployment.

---

## Prerequisites

- Node 20 LTS, pnpm 9
- Accounts created at: sanity.io, resend.com, cloudflare.com, vercel.com
- Repo pushed to GitHub (Vercel reads from it)

---

## 1. Sanity setup

### Create the project

```bash
pnpm sanity init
# Choose: existing dataset or create "production"
# This generates your projectId
```

### Get your credentials

1. Go to `https://sanity.io/manage` → select your project
2. **Project ID**: shown on the project overview page
3. **Read token**: Settings → API → Tokens → Add API token → name: `next-read`, permissions: `Viewer`
4. **Write token**: Add API token → name: `next-write`, permissions: `Editor`
5. **CORS origins**: Settings → API → CORS origins → add:
   - `http://localhost:3000`
   - `https://topshowpro.vercel.app` (and custom domain when ready)

### Generate the revalidate secret

```bash
# Generate a random 32-char hex string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save this value — you'll need it for both `.env.local` and the Sanity webhook.

### Configure `.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
SANITY_API_READ_TOKEN=<read-token>
SANITY_API_WRITE_TOKEN=<write-token>
SANITY_REVALIDATE_SECRET=<32-char-hex>
```

---

## 2. Resend setup

1. Sign up at `https://resend.com` → Dashboard → API Keys → Create API Key
2. Copy the key (shown only once)
3. For testing without a verified domain, use `onboarding@resend.dev` as the from address
4. When you have a real domain, go to Domains → Add Domain → follow the DKIM/SPF/DMARC wizard

### Configure `.env.local`

```env
RESEND_API_KEY=re_<your-key>
RESEND_FROM="Top Show Pro <hola@topshowpro.com>"
RESEND_TO=contacto@topshowpro.com
```

Note: `RESEND_FROM` must use a verified domain in production. During development, replace with `onboarding@resend.dev`.

---

## 3. Cloudflare Turnstile setup

1. Go to `https://cloudflare.com` → Sign in (no need to move your DNS)
2. Turnstile → Add site:
   - Name: `Top Show Pro`
   - Domain: `topshowpro.vercel.app` (add more domains as needed)
   - Widget mode: `Managed` (invisible by default, challenges only suspicious traffic)
3. Copy **Site Key** and **Secret Key**

### Configure `.env.local`

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key>
TURNSTILE_SECRET_KEY=<secret-key>
```

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is safe to expose in the browser. `TURNSTILE_SECRET_KEY` must remain server-side only.

---

## 4. Vercel deploy

### Option A — CLI (fastest for first deploy)

```bash
pnpm add -g vercel
vercel login
vercel --prod
```

Follow the prompts: link to existing project or create new, confirm framework detection (Next.js).

### Option B — GitHub integration (recommended for ongoing work)

1. Push your repo to GitHub
2. Go to `https://vercel.com/new` → Import Git Repository → select your repo
3. Vercel auto-detects Next.js — click **Deploy**
4. From this point, every push to `main` triggers a production deploy; every PR gets a preview deploy URL

---

## 5. Set environment variables in Vercel

Go to Vercel Dashboard → your project → **Settings** → **Environment Variables**.

Add each variable from `.env.local`, setting them for **Production** (and **Preview** if you want Sanity to work in preview deploys too):

| Variable | Environment |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Production, Preview |
| `NEXT_PUBLIC_SANITY_DATASET` | Production, Preview |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Production, Preview |
| `SANITY_API_READ_TOKEN` | Production, Preview |
| `SANITY_API_WRITE_TOKEN` | Production, Preview |
| `SANITY_REVALIDATE_SECRET` | Production |
| `RESEND_API_KEY` | Production |
| `RESEND_FROM` | Production |
| `RESEND_TO` | Production |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production, Preview |
| `TURNSTILE_SECRET_KEY` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | Production |
| `MUX_TOKEN_ID` | Production (if using Mux) |
| `MUX_TOKEN_SECRET` | Production (if using Mux) |

After saving, trigger a redeploy: Deployments → latest deploy → **Redeploy**.

---

## 6. Configure Sanity webhook → `/api/revalidate`

This webhook tells Next.js to revalidate cached pages whenever content changes in Sanity Studio.

1. Go to `https://sanity.io/manage` → your project → **API** → **Webhooks** → **Create webhook**
2. Configure:
   - **Name**: `Next ISR revalidate`
   - **URL**: `https://topshowpro.vercel.app/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: leave empty (revalidates on any document change)
   - **Projection**: `{ _type, _id, "slug": slug.current }`
   - **HTTP method**: POST
   - **Secret**: paste your `SANITY_REVALIDATE_SECRET` value
3. Click **Save**
4. Test it: publish any document in Studio → check Vercel logs under Functions → `/api/revalidate` should show a 200

---

## 7. Custom domain (optional)

When you have a domain (e.g. `topshowpro.com`):

1. Vercel → project → **Settings** → **Domains** → **Add** → type your domain → follow the wizard
2. Vercel shows you DNS records to add (A record for apex, CNAME for www)
3. In Cloudflare DNS (or your registrar), add those records
4. SSL is provisioned automatically by Vercel (Let's Encrypt)
5. Update the following env vars in Vercel:
   - `NEXT_PUBLIC_SITE_URL` → `https://topshowpro.com`
   - `RESEND_FROM` → `Top Show Pro <hola@topshowpro.com>` (ensure domain is verified in Resend)
6. Update Sanity webhook URL to use the new domain
7. Add the new domain to Sanity CORS origins

---

## Verify the deployment

- Home loads at your URL
- `/studio` opens Sanity Studio and you can log in
- Contact form submits → you receive the email + lead appears in Studio → Leads
- Edit a doc in Studio → publish → page updates within ~5 seconds
- `/api/og` returns a PNG for any event URL
- Lighthouse score >= 95 on home
