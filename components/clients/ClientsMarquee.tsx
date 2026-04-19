type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  const loop = [...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden py-8"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Label — desktop */}
      <p
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 font-mono text-[10px] uppercase tracking-widest hidden lg:block"
        style={{ color: 'var(--text-faint)' }}
      >
        Clientes
      </p>
      {/* Label — mobile */}
      <p
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 font-mono text-[9px] uppercase tracking-widest lg:hidden"
        style={{ color: 'var(--text-faint)' }}
      >
        Clientes
      </p>

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }}
      />

      {/* Marquee */}
      <div className="flex gap-6 md:gap-12 animate-[marquee_35s_linear_infinite] whitespace-nowrap">
        {loop.map((c, i) => (
          <div key={i} className="flex items-center justify-center min-w-[160px]">
            {c.logoUrl ? (
              <img
                src={c.logoUrl}
                alt={c.name}
                className="h-8 object-contain grayscale opacity-50 hover:opacity-90 hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span
                className="font-display text-xl tracking-wide transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--text-faint)' }}
              >
                {c.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
