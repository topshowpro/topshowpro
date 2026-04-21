'use client';
import { useEffect } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const startLenis = async () => {
      const { default: Lenis } = await import('lenis');

      if (cancelled) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
      });

      let raf = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };

    const hasIdleCallback =
      typeof (window as Window & { requestIdleCallback?: typeof window.requestIdleCallback }).requestIdleCallback ===
      'function';

    const idle = hasIdleCallback
      ? window.requestIdleCallback(() => {
          void startLenis();
        }, { timeout: 1200 })
      : window.setTimeout(() => {
          void startLenis();
        }, 1200);

    return () => {
      cancelled = true;

      if (hasIdleCallback) {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }

      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
