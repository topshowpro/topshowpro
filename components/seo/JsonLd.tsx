export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Top Show Pro',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app',
        logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app'}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+54-11-1234-5678',
          contactType: 'customer service',
          areaServed: 'AR',
          availableLanguage: 'Spanish',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Buenos Aires',
          addressCountry: 'AR',
        },
        sameAs: [
          'https://instagram.com/topshowpro',
        ],
      }}
    />
  );
}
