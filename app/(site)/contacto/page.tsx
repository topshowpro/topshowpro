import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_CONTACT_CATEGORIES, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { ContactForm } from '@/components/contact/ContactForm';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Contacto',
  description: 'Contactate con Top Show Pro. Dejanos tu consulta y te respondemos en 24hs hábiles.',
  path: '/contacto',
});

export default async function ContactoPage() {
  const [categories, settings] = await Promise.all([
    sanityFetch<any[]>(Q_CONTACT_CATEGORIES, undefined, 'contactCategory'),
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, 'siteSettings'),
  ]);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <div
        className="pt-20 md:pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {settings?.contactoHero && (
          <Image src={settings.contactoHero} alt="" fill className="object-cover opacity-25" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span
            className="font-mono text-xs uppercase tracking-widest mb-4 block"
            style={{ color: 'var(--accent-cyan)' }}
          >
            — Hablemos
          </span>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
          >
            Contacto
          </h1>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="px-4 sm:px-6 py-16 max-w-7xl mx-auto pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        <div className="flex flex-col">
          <p className="font-sans text-lg mb-12" style={{ color: 'var(--text-muted)' }}>
            Dejanos tu consulta y te respondemos en 24hs hábiles.
          </p>
          <ContactForm categories={categories ?? []} />
        </div>

        <aside className="space-y-8 lg:pt-8">
          {/* Contact info */}
          <div
            className="p-8 l-bracket"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            <span className="l-bracket-bl" />
            <span className="l-bracket-br" />
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--text-faint)' }}
            >
              Contacto general
            </p>
            <p className="font-sans text-lg text-white mb-1">{settings?.email}</p>
            <p className="font-sans text-lg" style={{ color: 'var(--text-muted)' }}>{settings?.phone}</p>
          </div>

          {settings?.techContact && (
            <div
              className="p-8"
              style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-faint)' }}
              >
                Soporte técnico
              </p>
              <p className="font-sans text-lg text-white mb-1">{settings.techContact.name}</p>
              <p className="font-sans text-base" style={{ color: 'var(--text-muted)' }}>{settings.techContact.phone}</p>
              <p className="font-sans text-base" style={{ color: 'var(--text-muted)' }}>{settings.techContact.email}</p>
            </div>
          )}

          <div
            className="p-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--text-faint)' }}
            >
              Horario
            </p>
            <p className="font-sans text-lg" style={{ color: 'var(--text-muted)' }}>{settings?.schedule}</p>
          </div>

          {settings?.address && (
            <div
              className="p-8"
              style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-faint)' }}
              >
                Dirección
              </p>
              <p className="font-sans text-base" style={{ color: 'var(--text-muted)' }}>{settings.address}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
