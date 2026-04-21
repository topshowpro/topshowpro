import { cn } from '@/lib/utils';

type NeonBackdropProps = {
  className?: string;
  variant?: 'base' | 'premium' | 'laser-cathedral' | 'aurora-ribbon';
};

function BaseNeonBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 90% at 50% 16%, color-mix(in srgb, var(--accent-cyan) 17%, transparent) 0%, transparent 68%)',
        }}
      />

      <div
        className="absolute -top-44 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[88px] animate-orb-a motion-reduce:animate-none"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--accent-cyan) 30%, transparent) 0%, color-mix(in srgb, var(--accent-cyan) 8%, transparent) 45%, transparent 74%)',
        }}
      />

      <div
        className="absolute -bottom-52 -left-10 h-[24rem] w-[24rem] rounded-full blur-[96px] opacity-70 animate-orb-b motion-reduce:animate-none"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--accent-cyan) 24%, transparent) 0%, color-mix(in srgb, var(--accent-cyan) 7%, transparent) 42%, transparent 72%)',
        }}
      />

      <div className="absolute inset-y-[-18%] -left-1/3 hidden w-1/2 bg-[linear-gradient(110deg,transparent_18%,color-mix(in_srgb,var(--accent-cyan)_17%,transparent)_45%,transparent_76%)] opacity-45 animate-[beam-sweep_12s_ease-in-out_infinite] motion-reduce:animate-none md:block" />
    </>
  );
}

function PremiumNeonBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 105% at 50% 12%, color-mix(in srgb, var(--accent-cyan) 20%, transparent) 0%, color-mix(in srgb, var(--accent-cyan) 8%, transparent) 36%, transparent 72%)',
        }}
      />

      <div
        className="absolute -top-36 left-1/2 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full blur-[72px] opacity-95 animate-orb-a motion-reduce:animate-none"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 33%, transparent) 0%, color-mix(in srgb, var(--accent-cyan) 12%, transparent) 42%, transparent 78%)',
        }}
      />

      <div
        className="absolute -bottom-40 -right-20 h-[22rem] w-[22rem] rounded-full blur-[96px] opacity-65 animate-orb-c motion-reduce:animate-none"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--accent-cyan) 22%, transparent) 0%, color-mix(in srgb, var(--accent-cyan) 7%, transparent) 46%, transparent 74%)',
        }}
      />

      <div className="absolute inset-0 opacity-85">
        <div className="absolute inset-[-36%] -rotate-[14deg]">
          <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(90deg,transparent_8%,color-mix(in_srgb,var(--accent-cyan)_14%,transparent)_48%,color-mix(in_srgb,var(--accent-cyan)_4%,transparent)_74%,transparent_100%)] animate-[beam-sweep_18s_cubic-bezier(0.22,1,0.36,1)_infinite] motion-reduce:animate-none" />
        </div>
      </div>

      <div className="absolute inset-[1px] rounded-[inherit] border border-white/14" />
      <div className="absolute inset-[1px] rounded-[inherit] bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.01)_24%,transparent_54%)]" />
      <div className="absolute inset-[1px] overflow-hidden rounded-[inherit]">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.08)_45%,transparent_100%)] opacity-70 animate-[beam-sweep_14s_ease-in-out_infinite] motion-reduce:animate-none" />
      </div>

      <span className="absolute left-[14%] top-[28%] h-1 w-1 rounded-full bg-white/75 shadow-[0_0_12px_rgba(23,133,211,0.55)] animate-[pulse_7s_ease-in-out_infinite] motion-reduce:animate-none" />
      <span className="absolute left-[27%] top-[64%] h-[3px] w-[3px] rounded-full bg-white/65 shadow-[0_0_10px_rgba(23,133,211,0.5)] animate-[pulse_9s_ease-in-out_infinite] [animation-delay:1.5s] motion-reduce:animate-none" />
      <span className="absolute right-[18%] top-[36%] h-[3px] w-[3px] rounded-full bg-white/70 shadow-[0_0_11px_rgba(23,133,211,0.5)] animate-[pulse_8s_ease-in-out_infinite] [animation-delay:2.4s] motion-reduce:animate-none" />
      <span className="absolute right-[28%] bottom-[22%] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_10px_rgba(23,133,211,0.45)] animate-[pulse_10s_ease-in-out_infinite] [animation-delay:0.8s] motion-reduce:animate-none" />
    </>
  );
}

function LaserCathedralBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(175deg, color-mix(in srgb, var(--bg-surface) 94%, transparent) 0%, color-mix(in srgb, var(--bg-base) 86%, transparent) 48%, color-mix(in srgb, var(--bg-base) 98%, transparent) 100%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 92% at 50% 6%, color-mix(in srgb, var(--accent-cyan) 12%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 9%, transparent) 24%, transparent 64%)',
        }}
      />

      <div
        className="absolute -left-[24%] top-[-34%] h-[176%] w-[66%] rotate-[15deg] opacity-95 blur-[5px] animate-[beam-sweep_22s_cubic-bezier(0.16,1,0.3,1)_infinite] [animation-delay:-2.2s] motion-reduce:animate-none motion-reduce:opacity-65"
        style={{
          background:
            'linear-gradient(96deg, transparent 12%, color-mix(in srgb, var(--accent-cyan) 34%, transparent) 48%, color-mix(in srgb, var(--accent-cyan) 11%, transparent) 61%, transparent 82%)',
        }}
      />

      <div
        className="absolute -right-[22%] top-[-22%] h-[152%] w-[52%] -rotate-[11deg] opacity-78 blur-[8px] animate-[beam-sweep_31s_cubic-bezier(0.33,1,0.68,1)_infinite] [animation-direction:reverse] [animation-delay:-8.5s] motion-reduce:animate-none motion-reduce:opacity-54"
        style={{
          background:
            'linear-gradient(100deg, transparent 18%, color-mix(in srgb, var(--accent-violet) 30%, transparent) 45%, color-mix(in srgb, var(--accent-violet) 10%, transparent) 60%, transparent 84%)',
        }}
      />

      <div
        className="absolute left-1/2 top-[-26%] h-[165%] w-[38%] -translate-x-1/2 rotate-[29deg] opacity-45 blur-[12px] animate-[beam-sweep_37s_ease-in-out_infinite] [animation-direction:reverse] [animation-delay:-13s] motion-reduce:animate-none motion-reduce:opacity-34"
        style={{
          background:
            'linear-gradient(103deg, transparent 28%, color-mix(in srgb, var(--accent-cyan) 16%, transparent) 49%, color-mix(in srgb, var(--accent-violet) 9%, transparent) 54%, transparent 72%)',
        }}
      />

      <div
        className="absolute left-1/2 top-[35%] h-[20rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-[90px] animate-orb-a motion-reduce:animate-none motion-reduce:opacity-58"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 22%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 11%, transparent) 40%, transparent 74%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 74% at 50% 112%, color-mix(in srgb, var(--bg-base) 98%, transparent) 10%, color-mix(in srgb, var(--bg-base) 84%, transparent) 46%, transparent 74%)',
        }}
      />
    </>
  );
}

function AuroraRibbonBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(178deg, color-mix(in srgb, var(--bg-surface) 95%, transparent) 0%, color-mix(in srgb, var(--bg-base) 89%, transparent) 52%, color-mix(in srgb, var(--bg-base) 99%, transparent) 100%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(96% 66% at 50% 45%, color-mix(in srgb, var(--accent-cyan) 12%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 10%, transparent) 38%, transparent 76%)',
        }}
      />

      <div
        className="absolute -left-[26%] top-[-24%] h-[150%] w-[74%] -rotate-[23deg] opacity-[0.46] blur-[14px] animate-[beam-sweep_44s_cubic-bezier(0.16,1,0.3,1)_infinite] motion-reduce:animate-none motion-reduce:opacity-30"
        style={{
          background:
            'linear-gradient(102deg, transparent 20%, color-mix(in srgb, var(--accent-cyan) 22%, transparent) 49%, color-mix(in srgb, var(--accent-violet) 17%, transparent) 61%, transparent 84%)',
        }}
      />

      <div
        className="absolute -right-[23%] top-[-18%] h-[144%] w-[67%] -rotate-[18deg] opacity-[0.39] blur-[15px] animate-[beam-sweep_56s_cubic-bezier(0.22,1,0.36,1)_infinite] [animation-direction:reverse] [animation-delay:-11s] motion-reduce:animate-none motion-reduce:opacity-26"
        style={{
          background:
            'linear-gradient(98deg, transparent 24%, color-mix(in srgb, var(--accent-violet) 24%, transparent) 47%, color-mix(in srgb, var(--accent-violet) 13%, transparent) 57%, color-mix(in srgb, var(--accent-cyan) 10%, transparent) 66%, transparent 86%)',
        }}
      />

      <div
        className="absolute left-1/2 top-[44%] h-[14.5rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.52] blur-[95px] animate-orb-a motion-reduce:animate-none motion-reduce:opacity-[0.36]"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 23%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 14%, transparent) 42%, transparent 76%)',
        }}
      />

      <span className="absolute left-[21%] top-[35%] h-[3px] w-[3px] rounded-full bg-white/60 shadow-[0_0_10px_rgba(23,133,211,0.42)] animate-[pulse_11s_ease-in-out_infinite] motion-reduce:animate-none" />
      <span className="absolute right-[26%] top-[59%] h-[3px] w-[3px] rounded-full bg-white/55 shadow-[0_0_9px_rgba(123,97,255,0.36)] animate-[pulse_13s_ease-in-out_infinite] [animation-delay:2.6s] motion-reduce:animate-none" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(108% 72% at 50% 112%, color-mix(in srgb, var(--bg-base) 98%, transparent) 14%, color-mix(in srgb, var(--bg-base) 84%, transparent) 47%, transparent 74%)',
        }}
      />
    </>
  );
}

export function NeonBackdrop({ className, variant = 'base' }: NeonBackdropProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {variant === 'premium' && <PremiumNeonBackdrop />}
      {variant === 'laser-cathedral' && <LaserCathedralBackdrop />}
      {variant === 'aurora-ribbon' && <AuroraRibbonBackdrop />}
      {variant === 'base' && <BaseNeonBackdrop />}
    </div>
  );
}
