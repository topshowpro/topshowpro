import Image from 'next/image';
import { TiltCard } from '@/components/ui/TiltCard';

type ServiceCardProps = {
  name: string;
  shortDesc: string;
  coverImage?: string | null;
};

export function ServiceCard({ name, shortDesc, coverImage }: ServiceCardProps) {
  return (
    <TiltCard className="w-full h-full">
      <div
        className="relative l-bracket aspect-auto md:aspect-[4/5] flex flex-col justify-end group overflow-hidden shadow-optic"
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
            className="object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-700"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(0,191,255,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 p-8">
          <h3 className="font-display text-2xl text-white mb-3">{name}</h3>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{shortDesc}</p>
        </div>
      </div>
    </TiltCard>
  );
}
