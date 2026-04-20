type Client = { name: string; logoUrl?: string | null; website?: string | null };

export function ClientsMarquee({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;

  return (
    <section
      className="relative px-4 sm:px-6 py-14"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: 'var(--text-faint)' }}>
          Clientes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {clients.map((c) => (
            <div
              key={c.name}
              className="group flex min-h-[90px] items-center justify-center border transition-transform duration-300 hover:scale-[1.03]"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              {c.logoUrl ? (
                <img
                  src={c.logoUrl}
                  alt={c.name}
                  className="h-10 md:h-12 object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : (
                <span className="font-festival-heading text-2xl tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  {c.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
