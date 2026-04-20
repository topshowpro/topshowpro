'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { RevealText } from '@/components/motion/RevealText';
import { NeonOrbs } from '@/components/ui/NeonOrbs';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';

type Slide = { phrase: string; accentColor?: string; videoUrl?: string | null; posterUrl?: string | null };

export function HeroVideoCarousel({ slides, banner }: { slides: Slide[]; banner?: { text?: string; cta?: { label: string; link: string } } }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[idx];

  return (
    <section className="relative min-h-screen h-[100svh] w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Focal beam background effect */}
      <div className="absolute inset-0 bg-focal-beam" />

      {/* Neon ambient orbs */}
      <NeonOrbs orbs={[
        { color: 'cyan',   drift: 'a', size: '700px', top: '-180px',  right: '-150px', opacity: 0.7 },
        { color: 'violet', drift: 'b', size: '500px', bottom: '-120px', left: '-80px',  opacity: 0.6 },
        { color: 'mint',   drift: 'c', size: '300px', top: '40%',     left: '55%',     opacity: 0.35 },
      ]} />

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {slide?.videoUrl ? (
            <video
              src={slide.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-70"
              poster={slide.posterUrl ?? undefined}
            />
          ) : slide?.posterUrl ? (
            <Image
              src={slide.posterUrl}
              alt=""
              fill
              className="object-cover opacity-70"
              priority
              sizes="100vw"
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.9)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1
          className="text-center max-w-5xl font-display text-white leading-none text-neon-cyan"
          style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
        >
          <RevealText text={slide?.phrase ?? ''} key={idx} />
        </h1>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-24 inset-x-0 z-10 flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="w-8 h-0.5 transition-all"
              style={{ backgroundColor: i === idx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.3)' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {banner?.text && (
        <div
          className="absolute bottom-0 inset-x-0 z-10 py-3 px-6 flex items-center justify-center gap-6"
          style={{ backgroundColor: 'var(--accent-cyan)' }}
        >
          <span className="font-display text-xl md:text-2xl tracking-wider text-black">{banner.text}</span>
          {banner.cta && (
            <CtaOutlineLink href={banner.cta.link} className="h-8 px-3 text-[10px] text-black hover:text-black focus-visible:text-black">
              {banner.cta.label} →
            </CtaOutlineLink>
          )}
        </div>
      )}
    </section>
  );
}
