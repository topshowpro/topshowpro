import Image from 'next/image';

export function BrandsMarquee({ brands }: { brands: { name: string; logoUrl?: string | null; logo?: any; website?: string | null }[] }) {
  if (!brands || brands.length === 0) return null;

  // Use 4 sets for a perfect mathematical loop. 
  // With padding-right instead of gap, 1 set is exactly (Width + Padding) * N.
  const loop = [...brands, ...brands, ...brands, ...brands];

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
        className="flex animate-[marquee_120s_linear_infinite] whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        {loop.map((b, i) => {
          const logoToUse = b.logoUrl || b.logo?.asset?.url;
          
          const content = (
            <div className="flex items-center justify-center min-w-[200px] md:min-w-[320px] px-8 md:px-12 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-700 ease-out">
              {logoToUse ? (
                <Image
                  src={logoToUse}
                  alt={b.name}
                  width={320}
                  height={120}
                  className="h-10 md:h-14 w-auto object-contain"
                  loading="lazy"
                  sizes="320px"
                />
              ) : (
                <span className="font-display text-xl md:text-2xl tracking-[0.25em] text-[var(--text-muted)] uppercase opacity-80">
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
                className="block hover:scale-105 transition-transform duration-500"
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
