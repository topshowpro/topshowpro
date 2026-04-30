import { LenisProvider } from '@/components/motion/LenisProvider';
import { Header } from '@/components/nav/Header';
import { Footer } from '@/components/nav/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_SITE_SETTINGS_CHROME, Q_SEO_DEFAULTS } from '@/sanity/lib/queries';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(Q_SEO_DEFAULTS, undefined, { tag: 'seoDefaults', revalidate: 30 });
  return buildMetadata({ titlePattern: seo?.titlePattern, description: seo?.description, ogImage: seo?.ogImage });
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<any>(Q_SITE_SETTINGS_CHROME, undefined, { tag: 'siteSettings', revalidate: 30 });
  return (
    <LenisProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--bg-elevated)] focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-white"
      >
        Saltar al contenido
      </a>
      <Header settings={settings} />
      <main id="main-content">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton />
    </LenisProvider>
  );
}
