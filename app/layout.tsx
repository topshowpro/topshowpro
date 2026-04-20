import type { Metadata } from 'next';
import { playfair, anton, inter, spaceMono } from '@/lib/fonts';
import { buildMetadata } from '@/lib/seo';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = buildMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('trigger deploy');
  return (
    <html lang="es" className={`${playfair.variable} ${anton.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
