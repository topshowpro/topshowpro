'use client';

import { useEffect, useRef, useState } from 'react';

export function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: '-10% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`${className} fade-in-section ${visible ? 'is-visible' : ''}`.trim()}
      style={{ transitionDelay: `${Math.max(0, delay)}s` }}
    >
      {children}
    </div>
  );
}
