export function BeamSweep({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[rgba(0,191,255,0.2)] to-transparent opacity-0 transition-all duration-1000 group-hover:opacity-100 group-hover:translate-x-[200%]" />
    </div>
  );
}
