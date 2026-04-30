'use client';
import { useMemo, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { Tag } from '@/components/ui/tag';

type ServiceImage = { url: string; metadata?: { lqip?: string } | null };
type TechContact = { name?: string; phone?: string; email?: string };

type Service = {
  name?: string;
  icon?: string;
  shortDesc?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDesc?: any;
  gallery?: ServiceImage[];
  techContact?: TechContact;
  cta?: { label?: string; link?: string };
};

const serviceFallbackDescription = 'Servicio tecnico integral para eventos y experiencias en vivo.';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ServiceTabs({ services }: { services: Service[] }) {
  const shouldReduceMotion = useReducedMotion();
  const normalizedServices = useMemo(
    () =>
      (services ?? []).map((service, index) => {
        const fallbackName = `Servicio ${index + 1}`;
        const name = service.name?.trim() || fallbackName;
        return {
          ...service,
          name,
          value: `${slugify(name) || 'servicio'}-${index}`,
        };
      }),
    [services],
  );

  const [active, setActive] = useState(normalizedServices[0]?.value ?? '');
  const current = normalizedServices.find((service) => service.value === active) ?? normalizedServices[0];

  if (!current) {
    return (
      <div
        className="mx-auto max-w-7xl px-6 py-16 font-mono text-xs uppercase tracking-[0.2em] md:px-10"
        style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-faint)' }}
      >
        No hay servicios disponibles en este momento.
      </div>
    );
  }

  const hasLongDesc = Array.isArray(current.longDesc) && current.longDesc.length > 0;
  const cover = current.gallery?.[0];
  const sideImage = current.gallery?.[1];
  const hasTechContact = Boolean(current.techContact?.name || current.techContact?.phone || current.techContact?.email);
  const ctaLabel = current.cta?.label?.trim() || 'Solicitar asesoramiento';
  const ctaLink = current.cta?.link?.trim() || '/contacto';
  const compactDescription = current.shortDesc?.trim() || serviceFallbackDescription;

  return (
    <div className="space-y-10">
      <Tabs.Root value={active} onValueChange={setActive}>
        <Tabs.List
          aria-label="Seleccion de servicios"
          className="ui-pill-tabs flex w-full justify-start overflow-x-auto px-1 pb-1 md:justify-center md:px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {normalizedServices.map((service) => (
            <Tabs.Trigger
              key={service.value}
              value={service.value}
              className="ui-pill-tab shrink-0"
            >
              {service.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      <AnimatePresence mode="wait">
        <motion.article
          key={current.value}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={shouldReduceMotion ? { duration: 0.14 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface-shadow group relative overflow-hidden rounded-[var(--radius-card)] p-6 md:p-8"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(125deg, rgba(23,133,211,0.12) 0%, transparent 55%, rgba(23,133,211,0.06) 100%)',
            }}
          />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div>
              {current.icon && (
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-faint)' }}>
                  {current.icon}
                </p>
              )}
              <h2 className="font-display text-3xl leading-[0.95] text-white md:text-6xl break-words">{current.name}</h2>
              <p className="mt-5 font-sans text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-muted)' }}>
                {compactDescription}
              </p>

              {hasLongDesc && (
                <div className="mt-5 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent-cyan)' }}>
                    Detalle del servicio
                  </p>
                  <div className="font-sans text-sm leading-relaxed md:text-base" style={{ color: 'var(--text-muted)' }}>
                    <PortableText value={current.longDesc} />
                  </div>
                </div>
              )}

              {hasTechContact && (
                <div
                  className="mt-5 rounded-[var(--radius-card)] p-4 font-mono text-xs md:text-sm"
                  style={{ border: '1px solid rgba(23,133,211,0.3)', backgroundColor: 'rgba(23,133,211,0.08)' }}
                >
                  <p className="mb-2 uppercase tracking-[0.16em]" style={{ color: 'var(--accent-cyan)' }}>
                    Contacto tecnico
                  </p>
                  {current.techContact?.name && <p className="text-white">{current.techContact.name}</p>}
                  {current.techContact?.phone && <p className="break-words" style={{ color: 'var(--text-muted)' }}>{current.techContact.phone}</p>}
                  {current.techContact?.email && <p className="break-all" style={{ color: 'var(--text-muted)' }}>{current.techContact.email}</p>}
                </div>
              )}

              <CtaOutlineLink href={ctaLink} className="mt-7 min-h-11 px-6 text-[11px]">
                {ctaLabel}
              </CtaOutlineLink>
            </div>

            <div className="grid gap-3">
              {cover ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-white/10" style={{ backgroundColor: 'var(--bg-base)' }}>
                  <Image
                    src={cover.url}
                    alt={`Visual de ${current.name}`}
                    fill
                    loading="lazy"
                    className="object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    placeholder={cover.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={cover.metadata?.lqip ?? undefined}
                  />
                </div>
              ) : (
                <div
                  className="flex aspect-[4/3] items-end p-4"
                  style={{
                    background: 'linear-gradient(155deg, rgba(23,133,211,0.18) 0%, rgba(23,133,211,0.05) 55%, rgba(10,10,10,1) 100%)',
                  }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--text-faint)' }}>
                    Visual en produccion
                  </p>
                </div>
              )}

              {sideImage && (
                <div className="relative aspect-[16/7] overflow-hidden rounded-[var(--radius-card)] border border-white/10" style={{ backgroundColor: 'var(--bg-base)' }}>
                  <Image
                    src={sideImage.url}
                    alt={`Detalle de ${current.name}`}
                    fill
                    loading="lazy"
                    className="object-cover opacity-80 transition-opacity duration-300 hover:opacity-95"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    placeholder={sideImage.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={sideImage.metadata?.lqip ?? undefined}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
