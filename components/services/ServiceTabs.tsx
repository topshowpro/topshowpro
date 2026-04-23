'use client';
import { useMemo, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { ChevronDown } from 'lucide-react';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { Tag } from '@/components/ui/tag';

type ServiceImage = { url: string; metadata?: { lqip?: string } | null };
type TechContact = { name?: string; phone?: string; email?: string };

type Service = {
  name?: string;
  shortDesc?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDesc?: any;
  gallery?: ServiceImage[];
  techContact?: TechContact;
  cta?: { label?: string; link?: string };
};

type IncludeItem = {
  title: string;
  description: string;
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

export function ServiceTabs({ services, includes = [] }: { services: Service[]; includes?: IncludeItem[] }) {
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
          className="ui-pill-tabs flex max-w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {normalizedServices.map((service) => (
            <Tabs.Trigger
              key={service.value}
              value={service.value}
              className="ui-pill-tab"
            >
              {service.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      <AnimatePresence mode="wait">
        <motion.article
          key={current.value}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden l-bracket p-6 md:p-8"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span className="l-bracket-bl" />
          <span className="l-bracket-br" />

          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(125deg, rgba(23,133,211,0.12) 0%, transparent 55%, rgba(23,133,211,0.06) 100%)',
            }}
          />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div>
              <Tag variant="accent" className="mb-4">Servicio activo</Tag>
              <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">{current.name}</h2>
              <p className="mt-5 font-sans text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-muted)' }}>
                {compactDescription}
              </p>

              {hasLongDesc && (
                <Accordion.Root type="single" collapsible className="mt-5">
                  <Accordion.Item value="detalle" className="rounded-lg border" style={{ borderColor: 'rgba(255,255,255,0.16)' }}>
                    <Accordion.Header>
                      <Accordion.Trigger
                        className="group flex w-full items-center justify-between px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.14em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
                        style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                      >
                        Ver detalle completo
                        <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-4 pb-4 pt-2 font-sans text-sm leading-relaxed md:text-base" style={{ color: 'var(--text-muted)' }}>
                        <PortableText value={current.longDesc} />
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              )}

              {hasTechContact && (
                <div
                  className="mt-5 rounded-lg p-4 font-mono text-xs md:text-sm"
                  style={{ border: '1px solid rgba(23,133,211,0.3)', backgroundColor: 'rgba(23,133,211,0.08)' }}
                >
                  <p className="mb-2 uppercase tracking-[0.16em]" style={{ color: 'var(--accent-cyan)' }}>
                    Contacto tecnico
                  </p>
                  {current.techContact?.name && <p className="text-white">{current.techContact.name}</p>}
                  {current.techContact?.phone && <p style={{ color: 'var(--text-muted)' }}>{current.techContact.phone}</p>}
                  {current.techContact?.email && <p style={{ color: 'var(--text-muted)' }}>{current.techContact.email}</p>}
                </div>
              )}

              <CtaOutlineLink href={ctaLink} className="mt-7 h-10 px-6 text-[11px]">
                {ctaLabel}
              </CtaOutlineLink>
            </div>

            <div className="grid gap-3">
              {cover ? (
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10" style={{ backgroundColor: 'var(--bg-base)' }}>
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
                <div className="relative aspect-[16/7] overflow-hidden border border-white/10" style={{ backgroundColor: 'var(--bg-base)' }}>
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

      {includes.length > 0 && (
        <div
          className="rounded-lg p-5 md:p-7"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--accent-cyan)' }}>
            Incluye siempre
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {includes.map((item) => (
              <div key={item.title} className="rounded-md p-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-display text-2xl leading-tight text-white md:text-3xl">{item.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed md:text-base" style={{ color: 'var(--text-muted)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
