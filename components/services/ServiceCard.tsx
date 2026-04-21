import Image from 'next/image';
import { TiltCard } from '@/components/ui/TiltCard';

type ServiceCardProps = {
  name: string;
  shortDesc: string;
  coverImage?: string | null;
};

export function ServiceCard({ name, shortDesc, coverImage }: ServiceCardProps) {
  return (
    <TiltCard className="h-full w-full">
      <div
        className="group relative flex aspect-auto flex-col justify-end overflow-hidden l-bracket shadow-optic transition-all duration-500 md:aspect-[4/5]"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <span className="l-bracket-bl" />
        <span className="l-bracket-br" />

        {/* Background image */}
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            fill
            loading="lazy"
            className="object-cover opacity-30 transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-50"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(23,133,211,0.08) 0%, transparent 70%)' }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(114deg, transparent 0%, rgba(23,133,211,0.16) 42%, rgba(123,97,255,0.16) 100%)',
          }}
        />

        <div className="relative z-10 p-8 transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="font-display text-2xl text-white mb-3">{name}</h3>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
            {shortDesc}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}
