'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const links = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/equipamiento', label: 'Equipamiento' },
];

type SiteSettings = {
  logoUrl?: string;
};

export function Header({ settings }: { settings?: SiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevTouchAction = body.style.touchAction;
    const prevOverscrollBehavior = body.style.overscrollBehavior;

    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    body.style.overscrollBehavior = 'contain';

    return () => {
      body.style.overflow = prevOverflow;
      body.style.touchAction = prevTouchAction;
      body.style.overscrollBehavior = prevOverscrollBehavior;
    };
  }, [open]);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'glass-island fixed inset-x-4 z-50 mx-auto max-w-7xl rounded-2xl transition-all duration-500 md:inset-x-6 lg:inset-x-10',
        scrolled ? 'top-3' : 'top-4'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        <Link href="/" className="flex items-center hover:opacity-85 transition">
          <Image
            src={settings?.logoUrl || '/Top-show-pro_logo.png'}
            alt="Top Show Pro"
            width={160}
            height={40}
            className="h-8 w-auto md:h-9"
            style={settings?.logoUrl ? undefined : { filter: 'invert(1) hue-rotate(180deg)' }}
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link font-sans text-sm uppercase tracking-widest transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="navbar-contact-glass inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
          >
            Contacto
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="min-h-11 min-w-11 p-3 text-white md:hidden"
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            className="glass-panel-mobile px-6 py-7 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-display text-xl text-white transition hover:opacity-70"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="navbar-contact-glass mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg px-4 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
            >
              Contacto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
