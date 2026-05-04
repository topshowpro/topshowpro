import Image from 'next/image';

export function BrandsMarquee({ brands }: { brands: { name: string; logoUrl?: string | null; logo?: any; website?: string | null }[] }) {
  if (!brands || brands.length === 0) return null;

  // Quadruple items to ensure the track is always longer than the viewport
  // and the loop is seamless even on ultra-wide screens.
  const loop = [...brands, ...brands, ...brands, ...brands];

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
        {loop.map((b, i) => {
          const logoToUse = b.logoUrl || b.logo?.asset?.url;
          
          const content = (
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[240px] px-4 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              {logoToUse ? (
                <Image
                  src={logoToUse}
                  alt={b.name}
                  width={240}
                  height={80}
                  className="h-12 md:h-16 w-auto object-contain"
                  loading="lazy"
                  sizes="240px"
                />
              ) : (
                <span className="font-display text-xl md:text-2xl tracking-wider text-[var(--text-muted)] uppercase">
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
                className="block"
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
