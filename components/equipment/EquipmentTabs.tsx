'use client';

import { useMemo, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Tag } from '@/components/ui/tag';

type PhotoMetadata = {
  lqip?: string | null;
};

type EquipmentItem = {
  name: string;
  photo?: { url: string; metadata?: PhotoMetadata | null } | null;
  brand?: { name: string } | null;
  datasheetUrl?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  specs?: any;
};

type Category = {
  name: string;
  slug: string;
  description?: string;
  heroImage?: string | null;
  items?: (EquipmentItem | null)[] | null;
};

type EquipmentTabsProps = {
  categories: Category[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getSpecsLines(item: EquipmentItem): string[] {
  if (!Array.isArray(item.specs)) return [];
  return item.specs
    .map((block: any) => {
      if (!Array.isArray(block?.children)) return '';
      return block.children
        .map((child: any) => child?.text?.trim() || '')
        .filter(Boolean)
        .join(' ')
        .trim();
    })
    .filter((line: string) => line.length > 0);
}

export function EquipmentTabs({ categories }: EquipmentTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeCategories = useMemo(
    () =>
      (categories ?? []).map((cat, index) => ({
        ...cat,
        value: cat.slug || `cat-${index}`,
      })),
    [categories]
  );

  const [active, setActive] = useState(safeCategories[0]?.value ?? '');
  const current = safeCategories.find((cat) => cat.value === active) ?? safeCategories[0];

  if (!safeCategories.length) {
    return (
      <div className="p-8 text-center border border-white/10 rounded-xl" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
          No hay equipamiento disponible en este momento.
        </p>
      </div>
    );
  }

  const items = (current?.items ?? []).filter((i): i is EquipmentItem => Boolean(i));

  return (
    <div className="space-y-12">
      <Tabs.Root value={active} onValueChange={setActive}>
        <Tabs.List
          aria-label="Categorías de equipamiento"
          className="ui-pill-tabs flex w-full justify-start overflow-x-auto px-1 pb-1 md:justify-center md:px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {safeCategories.map((cat) => (
            <Tabs.Trigger
              key={cat.value}
              value={cat.value}
              className="ui-pill-tab shrink-0"
            >
              {cat.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.value}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={shouldReduceMotion ? { duration: 0.14 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Category Intro */}
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 lg:aspect-square lg:max-h-[500px]">
              {current.heroImage ? (
                <Image
                  src={current.heroImage}
                  alt={current.name}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              ) : (
                <div className="absolute inset-0 grid-overlay opacity-20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Tag variant="accent">Top Show Pro Quality</Tag>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-cyan)' }}>
                Catálogo de Equipamiento
              </p>
              <h2 className="font-display text-4xl leading-none text-white md:text-7xl break-words">{current.name}</h2>
              {current.description && (
                <p className="mt-6 font-sans text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {current.description}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white">
                  {items.length} Equipos disponibles
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, idx) => {
              const specs = getSpecsLines(item);
              return (
                <motion.article
                  key={`${item.name}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] transition-all hover:border-white/20 hover:bg-[#111]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
                    {item.photo?.url ? (
                      <Image
                        src={item.photo.url}
                        alt={item.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">Sin Imagen</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    {item.brand && (
                      <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent-cyan)' }}>
                        {item.brand.name}
                      </span>
                    )}
                    <h3 className="font-display text-xl text-white line-clamp-1">{item.name}</h3>
                    
                    <div className="mt-4 space-y-1.5 flex-1">
                      {specs.slice(0, 3).map((spec, sIdx) => (
                        <p key={sIdx} className="font-sans text-[11px] leading-tight text-white/40 line-clamp-1">
                          • {spec}
                        </p>
                      ))}
                    </div>

                    {item.datasheetUrl && (
                        <a
                          href={item.datasheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
                        >
                        <span className="size-1 rounded-full bg-white/40" />
                        Ver Ficha Técnica
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
