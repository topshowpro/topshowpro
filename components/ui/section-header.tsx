import Link from 'next/link';
import { cn } from '@/lib/utils';

type HeadingTag = 'h1' | 'h2' | 'h3';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  titleTag?: HeadingTag;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  titleTag = 'h2',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const Title = titleTag;

  return (
    <div className={cn('mb-12', className)}>
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-cyan)' }}>
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
        </div>
      )}

      <div className="flex items-end justify-between gap-4">
        <div className="max-w-3xl">
          <Title
            className={cn(
              'font-display leading-none text-white',
              titleTag === 'h1' ? 'text-[clamp(3rem,8vw,8rem)]' : 'text-[clamp(2.5rem,6vw,6rem)]',
              titleClassName,
            )}
          >
            {title}
          </Title>
          {description && (
            <p className={cn('mt-5 font-sans text-base md:text-lg', descriptionClassName)} style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>
          )}
        </div>

        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="hidden font-mono text-xs uppercase tracking-[0.14em] transition hover:text-white md:block"
            style={{ color: 'var(--accent-cyan)' }}
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
