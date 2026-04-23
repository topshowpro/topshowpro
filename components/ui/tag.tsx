import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type TagVariant = 'neutral' | 'accent' | 'soft';

const variantStyles: Record<TagVariant, CSSProperties> = {
  neutral: {
    color: 'var(--text-muted)',
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  accent: {
    color: 'var(--accent-cyan)',
    borderColor: 'rgba(23,133,211,0.36)',
    backgroundColor: 'rgba(23,133,211,0.12)',
  },
  soft: {
    color: 'var(--text-faint)',
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
};

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: TagVariant;
};

export function Tag({ className, variant = 'neutral', style, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-200',
        className,
      )}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    />
  );
}
