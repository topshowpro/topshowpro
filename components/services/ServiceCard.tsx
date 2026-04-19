type ServiceCardProps = {
  name: string;
  shortDesc: string;
  icon?: string;
};

export function ServiceCard({ name, shortDesc }: ServiceCardProps) {
  return (
    <div className="relative l-bracket p-8 aspect-[4/5] flex flex-col justify-end group overflow-hidden shadow-optic"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <span className="l-bracket-bl" />
      <span className="l-bracket-br" />

      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(0,191,255,0.05) 0%, transparent 70%)' }}
      />

      <h3 className="font-display text-2xl text-white mb-3 relative z-10">{name}</h3>
      <p className="font-sans text-sm relative z-10" style={{ color: 'var(--text-muted)' }}>{shortDesc}</p>
    </div>
  );
}
