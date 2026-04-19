'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
        scrolled ? 'backdrop-blur-xl' : 'bg-transparent'
      )}
      style={scrolled ? { backgroundColor: 'rgba(10,10,10,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl tracking-wider text-white hover:opacity-80 transition"
        >
          TOP SHOW PRO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-sm uppercase tracking-widest transition"
              style={{ color: 'var(--text-muted)' }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden px-6 py-8 space-y-4"
          style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block font-display text-3xl text-white hover:opacity-70 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
