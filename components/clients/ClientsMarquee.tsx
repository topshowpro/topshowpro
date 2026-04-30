import Image from 'next/image';

type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  const loop = [...clients, ...clients];

  return (
    <section
      className="relative overflow-hidden py-14"
      style={{ 
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div className="flex gap-8 md:gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {loop.map((c, i) => (
          c.website ? (
            <a
              key={i}
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center min-w-[180px] md:min-w-[220px] transition-all duration-300"
            >
              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={220}
                  height={78}
                  className="h-12 md:h-14 object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                  sizes="220px"
                />
              ) : (
                <span className="font-festival-heading text-xl md:text-2xl tracking-wide text-center px-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                  {c.name}
                </span>
              )}
            </a>
          ) : (
            <div
              key={i}
              className="group flex items-center justify-center min-w-[180px] md:min-w-[220px] transition-all duration-300"
            >
              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={220}
                  height={78}
                  className="h-12 md:h-14 object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                  sizes="220px"
                />
              ) : (
                <span className="font-festival-heading text-xl md:text-2xl tracking-wide text-center px-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                  {c.name}
                </span>
              )}
            </div>
          )
        ))}
      </div>
    </section>
  );
}
