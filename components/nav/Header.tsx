'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const defaultLinks = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/equipamiento', label: 'Equipamiento' },
];

type SiteSettings = {
  logoUrl?: string;
  menuLinks?: { label: string; href: string }[];
};

export function Header({ settings }: { settings?: SiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef(false);

  const displayLinks = settings?.menuLinks?.length ? settings.menuLinks : defaultLinks;

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

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const firstFocusable = panel.querySelector<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open && wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'glass-island fixed inset-x-4 z-50 mx-auto max-w-7xl rounded-2xl transition-all duration-500 md:inset-x-6 lg:inset-x-10',
        scrolled ? 'top-[calc(0.5rem+env(safe-area-inset-top,0px))]' : 'top-[calc(0.75rem+env(safe-area-inset-top,0px))]'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        <Link href="/" className="flex items-center hover:opacity-85 transition">
          <Image
            src={settings?.logoUrl || '/logo.png'}
            alt="Top Show Pro"
            width={160}
            height={40}
            className="h-8 w-auto md:h-9"
            style={settings?.logoUrl ? undefined : { filter: 'invert(1) hue-rotate(180deg)' }}
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {displayLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link min-h-11 min-w-11 px-1 inline-flex items-center justify-center font-sans text-sm font-semibold uppercase tracking-widest transition"
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
          ref={menuButtonRef}
          onClick={() => setOpen((o) => !o)}
          className="min-h-11 min-w-11 rounded-md p-3 text-white md:hidden focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </nav>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          className="glass-panel-mobile mobile-nav-panel-open px-6 py-7 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación móvil"
        >
          <div className="flex flex-col gap-4">
            {displayLinks.map((l) => (
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
        </div>
      ) : null}
    </header>
  );
}
