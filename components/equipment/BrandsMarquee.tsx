import Image from 'next/image';

export function BrandsMarquee({ brands }: { brands: { name: string; logoUrl?: string | null; logo?: any; website?: string | null }[] }) {
  if (!brands || brands.length === 0) return null;

  // Use 6 repetitions for an extremely long track that hides any reset "tics"
  const loop = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

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
        {loop.map((b, i) => {
          const logoToUse = b.logoUrl || b.logo?.asset?.url;
          
          const content = (
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[280px] px-6 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500 ease-out">
              {logoToUse ? (
                <Image
                  src={logoToUse}
                  alt={b.name}
                  width={280}
                  height={100}
                  className="h-12 md:h-16 w-auto object-contain"
                  loading="lazy"
                  sizes="280px"
                />
              ) : (
                <span className="font-display text-xl md:text-2xl tracking-[0.2em] text-[var(--text-muted)] uppercase opacity-80">
                  {b.name}
                </span>
              )}
            </div>
          );

          if (b.website) {
            return (
              <a
                key={`${b.name}-${i}`}
                href={b.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                {content}
              </a>
            );
          }

          return <div key={`${b.name}-${i}`}>{content}</div>;
        })}
      </div>
    </div>
  );
}
