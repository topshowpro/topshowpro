'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { cn } from '@/lib/utils';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';

type ServiceImage = { url: string; metadata?: { lqip?: string } | null };
type TechContact = { name: string; phone: string; email: string };
type Service = {
  name: string;
  shortDesc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDesc: any;
  gallery: ServiceImage[];
  techContact?: TechContact;
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
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Text */}
            <div>
              <h3 className="font-display text-3xl md:text-5xl text-white mb-4">{current?.name}</h3>
              <div className="font-sans text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
                {current?.longDesc?.length > 0
                  ? <PortableText value={current.longDesc} />
                  : <p>{current?.shortDesc}</p>
                }
              </div>
              {current?.techContact && (
                <div className="mb-8 p-4 font-mono text-sm" style={{ border: '1px solid rgba(0,191,255,0.2)', backgroundColor: 'rgba(0,191,255,0.04)' }}>
                  <p className="uppercase tracking-wider text-xs mb-3" style={{ color: 'var(--accent-cyan)' }}>— Contacto técnico</p>
                  <p className="text-white mb-1">{current.techContact.name}</p>
                  <p style={{ color: 'var(--text-muted)' }}>{current.techContact.phone}</p>
                  <p style={{ color: 'var(--text-muted)' }}>{current.techContact.email}</p>
                </div>
              )}
              {current?.cta && (
                <CtaOutlineLink href={current.cta.link} className="h-9 px-5 text-[11px]">
                  {current.cta.label}
                </CtaOutlineLink>
              )}
            </div>

            {/* Gallery grid */}
            {current?.gallery?.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {current.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative overflow-hidden',
                      i === 0 ? 'col-span-2 aspect-video' : 'aspect-square',
                    )}
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 1280px) 50vw, 600px"
                      placeholder={img.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={img.metadata?.lqip ?? undefined}
                    />
                    {/* Scanline overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,191,255,0.03) 2px, rgba(0,191,255,0.03) 4px)',
                      }}
                    />
                  </div>
                ))}
              </div>
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
              {s.gallery?.[0] && (
                <div className="relative aspect-video mb-4 overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <Image
                    src={s.gallery[0].url}
                    alt=""
                    fill
                    className="object-cover opacity-80"
                    sizes="100vw"
                  />
                </div>
              )}
              <div className="font-sans text-base" style={{ color: 'var(--text-muted)' }}>
                {s.longDesc?.length > 0
                  ? <PortableText value={s.longDesc} />
                  : <p>{s.shortDesc}</p>
                }
              </div>
              {s.techContact && (
                <div className="mt-4 p-3 font-mono text-xs" style={{ border: '1px solid rgba(0,191,255,0.2)', backgroundColor: 'rgba(0,191,255,0.04)' }}>
                  <p className="uppercase tracking-wider mb-2" style={{ color: 'var(--accent-cyan)' }}>— Contacto técnico</p>
                  <p className="text-white">{s.techContact.name}</p>
                  <p style={{ color: 'var(--text-muted)' }}>{s.techContact.phone}</p>
                  <p style={{ color: 'var(--text-muted)' }}>{s.techContact.email}</p>
                </div>
              )}
              {s.cta && (
                <CtaOutlineLink href={s.cta.link} className="mt-4 h-8 px-4 text-[11px]">
                  {s.cta.label}
                </CtaOutlineLink>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
