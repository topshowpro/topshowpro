'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RevealText } from '@/components/motion/RevealText';
import { cn } from '@/lib/utils';

type Slide = {
  phrase: string;
  accentColor?: string;
  fontSize?: string;
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
    setAllowVideo(canAutoplayFirstSlide);
  }, []);

  useEffect(() => {
    if (!allowVideo) {
      setDeferVideo(true);
      return;
    }

    const enableVideo = () => setDeferVideo(false);

    const id = window.setTimeout(enableVideo, 2000);
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
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[idx];
  const firstSlidePosterUrl = slides[0]?.posterUrl ? heroPosterLoader({ src: slides[0].posterUrl, width: 1920 }) : null;

  const neonColorMap: Record<string, string> = {
    'cyan': 'text-neon-cyan',
    'yellow': 'text-neon-yellow',
    'violet': 'text-neon-violet',
    'fuchsia': 'text-neon-fuchsia',
    'mint': 'text-neon-mint',
    'white': 'text-white',
  };

  const fontSizeMap: Record<string, string> = {
    'compact': 'clamp(2.5rem, 7vw, 6rem)',
    'standard': 'clamp(3.4rem, 11vw, 10rem)',
    'large': 'clamp(4rem, 14vw, 13rem)',
    'huge': 'clamp(5rem, 18vw, 18rem)',
  };

  const activeNeonClass = neonColorMap[slide?.accentColor || 'cyan'];
  const activeFontSize = fontSizeMap[slide?.fontSize || 'standard'];

  return (
    <section className="relative min-h-screen h-[100svh] w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {firstSlidePosterUrl && <link rel="preload" as="image" href={firstSlidePosterUrl} fetchPriority="high" />}
      
      {slides.map((s, i) => {
        const isActive = i === idx;
        const isFirst = i === 0;
        const showVid = Boolean(s.videoUrl) && ((isFirst && allowFirstSlideVideo) || (allowVideo && !deferVideo));
        const showImg = Boolean(s.posterUrl) && !showVid;
        
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
              zIndex: isActive ? 1 : 0
            }}
          >
            {showVid ? (
              <video
                src={s.videoUrl!}
                autoPlay={isActive}
                muted
                loop
                playsInline
                preload={i <= 1 ? 'metadata' : 'none'}
                className="h-full w-full object-cover"
                poster={s.posterUrl ? heroPosterLoader({ src: s.posterUrl, width: 1920 }) : undefined}
                ref={(el) => {
                  if (el) {
                    if (isActive) {
                      el.play().catch(() => {});
                    } else {
                      el.pause();
                    }
                  }
                }}
              />
            ) : showImg ? (
              <Image
                src={s.posterUrl!}
                alt=""
                fill
                className="object-cover"
                loading={isFirst ? 'eager' : 'lazy'}
                loader={heroPosterLoader}
                sizes="100vw"
                fetchPriority={isFirst ? 'high' : 'auto'}
                placeholder={s.posterLqip ? 'blur' : 'empty'}
                blurDataURL={s.posterLqip ?? undefined}
              />
            ) : null}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-25" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1
          className={cn("text-center max-w-6xl font-festival-heading uppercase text-[var(--text-primary)] leading-[0.88]", activeNeonClass)}
          style={{ fontSize: activeFontSize, letterSpacing: '0.01em' }}
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
