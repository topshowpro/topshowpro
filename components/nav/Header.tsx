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
        'fixed inset-x-0 top-4 z-50 mx-auto max-w-7xl rounded-2xl transition-all duration-500',
        scrolled ? 'backdrop-blur-2xl shadow-2xl shadow-black/50 border border-white/5' : 'bg-transparent'
      )}
      style={scrolled ? { 
        backgroundColor: 'rgba(26,26,26,0.75)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)'
      } : {}}
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
          <Link
            href="/contacto"
            className="px-5 py-2.5 font-sans text-sm uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105
                   bg-[var(--accent-cyan)] text-black font-medium
                   hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]"
          >
            Contacto
          </Link>
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
