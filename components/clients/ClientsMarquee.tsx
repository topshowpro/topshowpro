import Image from 'next/image';

type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  // Use 6 repetitions for a seamless, slow loop
  const loop = [...clients, ...clients, ...clients, ...clients, ...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    >
      <div 
        className="flex gap-16 md:gap-24 animate-marquee-slow whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        {loop.map((c, i) => {
          const content = (
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[280px] px-6 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500 ease-out">
              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={280}
                  height={100}
                  className="h-12 md:h-16 w-auto object-contain"
                  loading="lazy"
                  sizes="280px"
                />
              ) : (
                <span className="font-display text-xl md:text-2xl tracking-[0.2em] text-[var(--text-muted)] uppercase opacity-80">
                  {c.name}
                </span>
              )}
            </div>
          );

          if (c.website) {
            return (
              <a
                key={`${c.name}-${i}`}
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                {content}
              </a>
            );
          }

          return <div key={`${c.name}-${i}`}>{content}</div>;
        })}
      </div>
    </div>
  );
}
