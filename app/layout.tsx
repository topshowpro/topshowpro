import type { Metadata } from 'next';
import { bebas, montserrat, orbitron } from '@/lib/fonts';
import { buildMetadata } from '@/lib/seo';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = buildMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebas.variable} ${montserrat.variable} ${orbitron.variable}`}>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
