import { LenisProvider } from '@/components/motion/LenisProvider';
import { Header } from '@/components/nav/Header';
import { Footer } from '@/components/nav/Footer';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_SITE_SETTINGS, Q_SEO_DEFAULTS } from '@/sanity/lib/queries';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(Q_SEO_DEFAULTS, undefined, 'seoDefaults');
  return buildMetadata({ description: seo?.description });
}

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
