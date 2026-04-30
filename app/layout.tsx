import type { Metadata, Viewport } from 'next';
import { bebas, montserrat, spaceMono } from '@/lib/fonts';
import { buildMetadata } from '@/lib/seo';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = buildMetadata({});

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebas.variable} ${montserrat.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
