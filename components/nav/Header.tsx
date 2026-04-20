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
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all',
        scrolled ? 'backdrop-blur-xl shadow-2xl -translate-y-0.5' : 'bg-transparent'
      )}
      style={scrolled ? { backgroundColor: 'rgba(10,10,10,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-85 transition">
          <Image
            src="/Top-show-pro_logo.png"
            alt="Top Show Pro"
            width={160}
            height={40}
            className="h-9 w-auto"
            style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-sm uppercase tracking-widest transition nav-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white p-3"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden px-6 py-8 space-y-4"
            style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-display text-xl md:text-3xl text-white hover:opacity-70 transition"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
