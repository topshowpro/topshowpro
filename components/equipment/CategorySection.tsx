'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type EquipmentItem = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: { url: string; metadata?: any } | null;
  brand?: { name: string } | null;
};

type Category = {
  name: string;
  slug: string;
  description?: string;
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
          <AccordionTrigger
            className="px-6 py-5 font-display text-2xl text-white hover:no-underline hover:text-[var(--accent-cyan)] transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {cat.name}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {cat.description && (
              <p className="font-sans text-base mb-6 mt-4" style={{ color: 'var(--text-muted)' }}>{cat.description}</p>
            )}
            {cat.items.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 font-mono text-sm"
                    style={{ backgroundColor: 'var(--bg-surface-hi)', color: 'var(--text-muted)' }}
                  >
                    {item.name}
                    {item.brand && (
                      <span className="block text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
                        {item.brand.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-sans text-sm" style={{ color: 'var(--text-faint)' }}>
                Catálogo disponible bajo solicitud.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
