import Image from 'next/image';

type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  return (
    <section
      className="relative px-4 sm:px-6 py-14"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {clients.map((c) => (
            c.website ? (
              <a
                key={c.name}
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[90px] items-center justify-center border transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                {c.logoUrl ? (
                  <Image
                    src={c.logoUrl}
                    alt={c.name}
                    width={180}
                    height={64}
                    className="h-10 md:h-12 object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    loading="lazy"
                    sizes="(max-width: 768px) 140px, 180px"
                  />
                ) : (
                  <span className="font-festival-heading text-xl md:text-2xl tracking-wide text-center px-2" style={{ color: 'var(--text-primary)' }}>
                    {c.name}
                  </span>
                )}
              </a>
            ) : (
              <div
                key={c.name}
                className="group flex min-h-[90px] items-center justify-center border transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                {c.logoUrl ? (
                  <Image
                    src={c.logoUrl}
                    alt={c.name}
                    width={180}
                    height={64}
                    className="h-10 md:h-12 object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    loading="lazy"
                    sizes="(max-width: 768px) 140px, 180px"
                  />
                ) : (
                  <span className="font-festival-heading text-xl md:text-2xl tracking-wide text-center px-2" style={{ color: 'var(--text-primary)' }}>
                    {c.name}
                  </span>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
