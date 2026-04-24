'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RevealText } from '@/components/motion/RevealText';

type Slide = {
  phrase: string;
  accentColor?: string;
  videoUrl?: string | null;
  posterUrl?: string | null;
  posterLqip?: string | null;
};

type NetworkInformationWithSaveData = {
  saveData?: boolean;
};

function heroPosterLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = new URL(src);
  const targetWidth = Math.min(width, 2560);
  const mobileWidth = targetWidth <= 1024;
  const adaptiveQuality = quality ?? (mobileWidth ? 44 : 62);

  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'max');
  url.searchParams.set('w', String(targetWidth));
  url.searchParams.set('q', String(adaptiveQuality));

  return url.toString();
}

export function HeroVideoCarousel({ slides, banner }: { slides: Slide[]; banner?: { text?: string; cta?: { label: string; link: string } } }) {
  const [idx, setIdx] = useState(0);
  const [allowVideo, setAllowVideo] = useState(false);
  const [allowFirstSlideVideo, setAllowFirstSlideVideo] = useState(false);
  const [deferVideo, setDeferVideo] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.matchMedia('(max-width: 1024px)').matches;
    const isFirstVisit = window.localStorage.getItem('tsp-first-visit-done') !== '1';
    const connection = (navigator as Navigator & { connection?: NetworkInformationWithSaveData }).connection;
    const saveData = connection?.saveData === true;
    const canAutoplayFirstSlide = !reducedMotion && !saveData;

    window.localStorage.setItem('tsp-first-visit-done', '1');

    setAllowFirstSlideVideo(canAutoplayFirstSlide);
    setAllowVideo(!isFirstVisit && canAutoplayFirstSlide && !coarsePointer && !narrowViewport);
  }, []);

  useEffect(() => {
    if (!allowVideo) {
      setDeferVideo(true);
      return;
    }

    const enableVideo = () => setDeferVideo(false);

    const id = window.setTimeout(enableVideo, 8000);
    window.addEventListener('pointerdown', enableVideo, { once: true, passive: true });
    window.addEventListener('keydown', enableVideo, { once: true });

    return () => {
      window.clearTimeout(id);
      window.removeEventListener('pointerdown', enableVideo);
      window.removeEventListener('keydown', enableVideo);
    };
  }, [allowVideo]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[idx];
  const isFirstSlide = idx === 0;
  const showVideo = Boolean(slide?.videoUrl) && ((isFirstSlide && allowFirstSlideVideo) || (allowVideo && !deferVideo));
  const showPoster = Boolean(slide?.posterUrl) && !showVideo;
  const firstSlidePosterUrl = slides[0]?.posterUrl ?? null;

  return (
    <section className="relative min-h-screen h-[100svh] w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {firstSlidePosterUrl && <link rel="preload" as="image" href={firstSlidePosterUrl} fetchPriority="high" />}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {showVideo ? (
            <video
              src={slide.videoUrl!}
              autoPlay
              muted
              loop
              playsInline
              preload={isFirstSlide ? 'metadata' : 'none'}
              className="h-full w-full object-cover"
              poster={slide.posterUrl ?? undefined}
            />
          ) : showPoster ? (
            <Image
              src={slide.posterUrl!}
              alt=""
              fill
              className="object-cover"
              preload={isFirstSlide}
              loading={isFirstSlide ? 'eager' : 'lazy'}
              loader={heroPosterLoader}
              sizes="100vw"
              fetchPriority={isFirstSlide ? 'high' : 'auto'}
              placeholder={slide.posterLqip ? 'blur' : 'empty'}
              blurDataURL={slide.posterLqip ?? undefined}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-25" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1
          className="text-center max-w-6xl font-festival-heading uppercase text-[var(--text-primary)] text-neon-yellow leading-[0.88]"
          style={{ fontSize: 'clamp(3.4rem, 11vw, 10rem)', letterSpacing: '0.01em' }}
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
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all"
              style={{ backgroundColor: i === idx ? 'rgba(23,133,211,0.14)' : 'rgba(245,245,245,0.06)' }}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === idx}
            >
              <span
                className="h-0.5 w-8"
                style={{ backgroundColor: i === idx ? 'var(--accent-cyan)' : 'rgba(245,245,245,0.3)' }}
              />
            </button>
          ))}
        </div>
      )}

      {banner?.text && (
        <div
          className="absolute bottom-0 inset-x-0 z-10 py-3 px-6 flex items-center justify-center gap-6"
          style={{ backgroundColor: 'var(--accent-led)' }}
        >
          <span className="font-festival-heading text-xl md:text-2xl tracking-wider italic text-black">{banner.text}</span>
          {banner.cta?.label && banner.cta?.link && (
            <Link
              href={banner.cta.link}
              className="inline-flex min-h-11 min-w-11 items-center rounded-md border border-black/50 px-4 font-mono text-[11px] uppercase tracking-wider text-black transition hover:bg-black hover:text-[var(--accent-led)]"
            >
              {banner.cta.label}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
