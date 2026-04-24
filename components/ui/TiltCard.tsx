'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
};

export function TiltCard({ children, className, tiltIntensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const canTiltRef = useRef(false);

  const detectCapability = () => {
    if (typeof window === 'undefined') {
      canTiltRef.current = false;
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const smallViewport = window.matchMedia('(max-width: 1024px)').matches;

    canTiltRef.current = !reducedMotion && !coarsePointer && !smallViewport;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTiltRef.current || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    const rotateX = -mouseY * tiltIntensity;
    const rotateY = -mouseX * tiltIntensity;

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }

    frame.current = requestAnimationFrame(() => {
      if (!ref.current) {
        return;
      }

      ref.current.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) {
      return;
    }

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }

    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseEnter={detectCapability}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative transition-transform duration-200', className)}
    >
      <div style={{ transform: 'translateZ(0)' }}>{children}</div>
    </div>
  );
}
