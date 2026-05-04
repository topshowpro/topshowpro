import Image from 'next/image';

type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  // Quadruple items to ensure the track is always longer than the viewport
  const loop = [...clients, ...clients, ...clients, ...clients];

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
      <div 
        className="flex gap-12 md:gap-20 animate-[marquee_40s_linear_infinite] whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {loop.map((c, i) => {
          const content = (
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[240px] px-4 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              {c.logoUrl ? (
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={240}
                  height={80}
                  className="h-12 md:h-16 w-auto object-contain"
                  loading="lazy"
                  sizes="240px"
                />
              ) : (
                <span className="font-display text-xl md:text-2xl tracking-wider text-[var(--text-muted)] uppercase">
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
                className="block"
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
