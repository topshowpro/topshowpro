'use client';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type EquipmentItem = {
  name: string;
  photo?: { url: string; metadata?: any } | null;
  brand?: { name: string } | null;
};

type Category = {
  name: string;
  slug: string;
  description?: string;
  heroImage?: string | null;
  items: EquipmentItem[];
};

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <Accordion className="space-y-2">
      {categories.map((cat, i) => (
        <AccordionItem
          key={cat.slug}
          value={cat.slug}
          className="overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:text-[var(--accent-cyan)] transition-colors group">
            <div className="flex items-center gap-4 w-full">
              <span className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--accent-cyan)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-2xl text-white group-hover:text-[var(--accent-cyan)] transition-colors">
                {cat.name}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent
            className="px-0 pb-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Category hero image */}
            {cat.heroImage && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={cat.heroImage}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,191,255,0.03) 2px, rgba(0,191,255,0.03) 4px)',
                  }}
                />
              </div>
            )}

            <div className="px-6 pb-6 pt-4">
              {cat.description && (
                <p className="font-sans text-base mb-6" style={{ color: 'var(--text-muted)' }}>{cat.description}</p>
              )}

              {(cat.items ?? []).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(cat.items ?? []).map((item) => (
                    <div
                      key={item.name}
                      className="relative overflow-hidden group"
                      style={{ backgroundColor: 'var(--bg-surface-hi)' }}
                    >
                      {item.photo?.url && (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={item.photo.url}
                            alt={item.name}
                            fill
                            className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                            sizes="200px"
                            placeholder={item.photo.metadata?.lqip ? 'blur' : 'empty'}
                            blurDataURL={item.photo.metadata?.lqip ?? undefined}
                          />
                        </div>
                      )}
                      <div className="p-4 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                        {item.name}
                        {item.brand && (
                          <span className="block text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
                            {item.brand.name}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-sans text-sm" style={{ color: 'var(--text-faint)' }}>
                  Catálogo disponible bajo solicitud.
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
