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
