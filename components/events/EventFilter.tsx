'use client';
import { cn } from '@/lib/utils';

export function EventFilter({
  categories,
  active,
  onSelect,
}: {
  categories: { label: string; slug: string }[];
  active: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-4 py-2 font-mono text-xs uppercase tracking-widest transition',
          active === null
            ? 'text-black'
            : 'text-[var(--text-muted)] hover:border-[var(--accent-cyan)]'
        )}
        style={active === null
          ? { backgroundColor: 'var(--accent-cyan)' }
          : { border: '1px solid rgba(255,255,255,0.2)' }
        }
      >
        Todos
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          onClick={() => onSelect(c.slug)}
          className={cn(
            'px-4 py-2 font-mono text-xs uppercase tracking-widest transition',
            active === c.slug
              ? 'text-black'
              : 'text-[var(--text-muted)] hover:border-[var(--accent-cyan)]'
          )}
          style={active === c.slug
            ? { backgroundColor: 'var(--accent-cyan)' }
            : { border: '1px solid rgba(255,255,255,0.2)' }
          }
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
