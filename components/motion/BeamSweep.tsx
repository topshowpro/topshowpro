export function BeamSweep({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-y-0 -left-1/2 w-1/2 opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:translate-x-[200%]"
        style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent-cyan) 20%, transparent), transparent)' }}
      />
    </div>
  );
}
