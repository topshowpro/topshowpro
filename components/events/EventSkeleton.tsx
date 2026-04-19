export function EventSkeleton() {
  return (
    <div className="relative block overflow-hidden aspect-[4/5] animate-pulse" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="absolute inset-x-0 bottom-0 p-5 space-y-3">
        <div className="h-3 w-16" style={{ backgroundColor: 'var(--bg-surface-hi)' }} />
        <div className="h-8 w-3/4" style={{ backgroundColor: 'var(--bg-surface-hi)' }} />
        <div className="h-3 w-1/2" style={{ backgroundColor: 'var(--bg-surface-hi)' }} />
      </div>
    </div>
  );
}
