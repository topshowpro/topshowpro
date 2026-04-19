'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Service = {
  name: string;
  shortDesc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDesc: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gallery: any[];
  cta?: { label: string; link: string };
};

export function ServiceTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div>
      <div className="hidden md:flex mb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {services.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setActive(i)}
            className={cn(
              'px-6 py-4 font-display text-xl tracking-wide transition relative',
              active === i ? '' : 'hover:text-white'
            )}
            style={{ color: active === i ? 'var(--accent-cyan)' : 'var(--text-muted)' }}
          >
            {s.name}
            {active === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-x-0 -bottom-px h-[2px]"
                style={{ backgroundColor: 'var(--accent-cyan)' }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="hidden md:block min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-5xl text-white mb-4">{current?.name}</h3>
            <p className="font-sans text-lg max-w-3xl mb-8" style={{ color: 'var(--text-muted)' }}>{current?.shortDesc}</p>
            {current?.cta && (
              <a
                href={current.cta.link}
                className="inline-block px-6 py-3 font-sans text-sm uppercase tracking-widest transition hover:text-black"
                style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'black'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'; e.currentTarget.style.color = 'white'; }}
              >
                {current.cta.label}
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden space-y-2">
        {services.map((s) => (
          <details key={s.name} className="group" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <summary className="font-display text-2xl text-white py-4 cursor-pointer list-none flex items-center justify-between">
              {s.name}
              <span className="font-mono text-sm group-open:rotate-45 transition-transform inline-block">+</span>
            </summary>
            <div className="pb-6">
              <p className="font-sans text-base" style={{ color: 'var(--text-muted)' }}>{s.shortDesc}</p>
              {s.cta && (
                <a
                  href={s.cta.link}
                  className="inline-block mt-4 px-4 py-2 font-sans text-xs uppercase"
                  style={{ border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                >
                  {s.cta.label}
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
