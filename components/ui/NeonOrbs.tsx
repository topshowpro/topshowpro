type OrbColor = 'cyan' | 'violet' | 'mint';
type OrbDrift = 'a' | 'b' | 'c';

export type OrbConfig = {
  color: OrbColor;
  drift: OrbDrift;
  size: string;       // e.g. "500px"
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  opacity?: number;   // 0–1, default 1
};

export function NeonOrbs({ orbs }: { orbs: OrbConfig[] }) {
  return (
    <div className="hidden lg:block" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`neon-orb neon-orb-${orb.color} neon-orb-${orb.drift}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            opacity: orb.opacity ?? 1,
          }}
        />
      ))}
    </div>
  );
}
