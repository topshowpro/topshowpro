import Image from 'next/image';

type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  const loop = [...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden py-16"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div className="flex gap-8 md:gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
        {loop.map((c, i) => (
          c.website ? (
            <a
              key={i}
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[200px] grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300"
            >
              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={220}
                  height={80}
                  className="h-14 md:h-16 w-auto object-contain"
                  loading="lazy"
                  sizes="220px"
                />
              ) : (
                <span className="font-display text-2xl tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {c.name}
                </span>
              )}
            </a>
          ) : (
            <div
              key={i}
              className="flex items-center justify-center min-w-[200px] grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300"
            >
              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={220}
                  height={80}
                  className="h-14 md:h-16 w-auto object-contain"
                  loading="lazy"
                  sizes="220px"
                />
              ) : (
                <span className="font-display text-2xl tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {c.name}
                </span>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
