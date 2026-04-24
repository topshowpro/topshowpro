import Image from 'next/image';
import { TiltCard } from '@/components/ui/TiltCard';

type ServiceCardProps = {
  name: string;
  shortDesc: string;
  coverImage?: string | null;
};

export function ServiceCard({ name, shortDesc, coverImage }: ServiceCardProps) {
  return (
    <TiltCard
      className="service-card-reveal service-card-shell group/service h-full w-full rounded-[var(--radius-card)]"
      tiltIntensity={6}
    >
      <div
        className="service-card-reveal-inner relative flex aspect-auto flex-col justify-end overflow-hidden md:h-[23rem]"
      >
        {/* Background image */}
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            fill
            loading="lazy"
            className="object-cover opacity-35 transition-[opacity,transform] duration-700 delay-[150ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.03] group-hover/service:opacity-60"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/service:opacity-100"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(23,133,211,0.08) 0%, transparent 70%)' }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/service:opacity-100"
          style={{
            background:
              'linear-gradient(114deg, transparent 0%, rgba(23,133,211,0.16) 42%, rgba(123,97,255,0.16) 100%)',
          }}
        />

        <div className="relative z-10 p-8 transition-transform duration-500 group-hover/service:-translate-y-0.5">
          <h3 className="mb-3 font-display text-2xl text-white transition-[opacity,transform] duration-400 delay-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:translate-x-[2px]">
            {name}
          </h3>
          <p
            className="font-sans text-sm leading-relaxed opacity-88 transition-[opacity,transform] duration-400 delay-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:translate-y-0.5 group-hover/service:opacity-100"
            style={{ color: 'var(--text-muted)' }}
          >
            {shortDesc}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}
