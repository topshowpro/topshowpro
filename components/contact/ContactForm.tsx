'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useReducedMotion } from 'framer-motion';

const schema = z.object({
  category: z.string().min(1, 'Seleccioná una categoría'),
  name: z.string().min(2, 'Ingresá tu nombre'),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Contanos un poco más'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ categories }: { categories: { label: string }[] }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<FormData | null>(null);
  const shouldReduceMotion = useReducedMotion();

  async function submitPayload(data: FormData) {
    setNetworkError(null);
    clearErrors('root.serverError');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const responseBody = (await res.json().catch(() => null)) as { error?: string } | null;
        const message = responseBody?.error?.trim() || 'No pudimos enviar la consulta. Probá nuevamente.';
        setNetworkError(message);
        setError('root.serverError', { type: 'server', message });
        return;
      }

      setSent(true);
    } catch {
      const message = 'No hay conexión con el servidor. Verificá tu red e intentá otra vez.';
      setNetworkError(message);
      setError('root.serverError', { type: 'network', message });
    }
  }

  async function onSubmit(data: FormData) {
    setLastPayload(data);
    await submitPayload(data);
  }

  async function retrySubmit() {
    if (!lastPayload || isSubmitting) {
      return;
    }

    await submitPayload(lastPayload);
  }

  return (
    <div className="flex-1 flex flex-col" style={{ perspective: '1200px' }}>
      <p className="sr-only" aria-live="polite">
        {isSubmitting ? 'Enviando consulta…' : sent ? 'Consulta enviada correctamente.' : ''}
      </p>
      <motion.div
        className="relative flex-1"
        animate={shouldReduceMotion ? { opacity: sent ? 0 : 1 } : { rotateY: sent ? 180 : 0 }}
        transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── FRONT: form ── */}
        <div className="backface-hidden h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="category" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Categoría
              </label>
              <select
                id="category"
                autoComplete="off"
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? 'category-error' : undefined}
                {...register('category')}
                className="form-select"
              >
                <option value="" style={{ backgroundColor: 'var(--bg-elevated)' }}>Seleccioná una opción</option>
                {categories.map((c) => (
                  <option key={c.label} value={c.label} style={{ backgroundColor: 'var(--bg-elevated)' }}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p id="category-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                  Nombre / Empresa
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name')}
                  className="form-input"
                />
                {errors.name && <p id="name-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                  Teléfono
                </label>
                <input id="phone" type="tel" autoComplete="tel" {...register('phone')} inputMode="tel" className="form-input" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Email
              </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                className="form-input"
              />
              {errors.email && <p id="email-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Consulta
              </label>
              <textarea
                id="message"
                rows={5}
                autoComplete="off"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
                className="form-textarea"
              />
              {errors.message && <p id="message-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-simple w-full min-h-11 px-6 py-3 font-sans text-sm uppercase tracking-widest disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando…' : 'Enviar consulta'}
            </button>

            {networkError && (
              <div
                role="alert"
                className="mt-3 rounded-md border p-3"
                style={{
                  borderColor: 'color-mix(in srgb, var(--color-error) 52%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
                }}
              >
                <p className="font-sans text-sm" style={{ color: 'var(--text-primary)' }}>{networkError}</p>
                <button
                  type="button"
                  onClick={retrySubmit}
                  disabled={isSubmitting || !lastPayload}
                  className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md border px-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
                  style={{ borderColor: 'rgba(255,255,255,0.22)', color: 'var(--text-primary)' }}
                >
                  Reintentar envío
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ── BACK: success ── */}
        <div
          className="absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-8 p-10 text-center"
          style={{
            transform: 'rotateY(180deg)',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--accent-cyan)',
            boxShadow: '0 0 40px rgba(23,133,211,0.3), 0 0 80px rgba(23,133,211,0.1), inset 0 0 40px rgba(23,133,211,0.05)',
          }}
        >
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{
              border: '2px solid var(--accent-cyan)',
              boxShadow: '0 0 20px rgba(23,133,211,0.7)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="var(--accent-cyan)">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest mb-4 block" style={{ color: 'var(--text-faint)' }}>
              — Mensaje enviado
            </span>
            <h3
              className="font-display leading-none mb-3"
              style={{
                fontSize: 'clamp(3rem, 5vw, 5rem)',
                color: 'var(--accent-cyan)',
                textShadow: '0 0 30px rgba(23,133,211,0.9), 0 0 60px rgba(23,133,211,0.4)',
              }}
            >
              ¡Gracias!
            </h3>
            <p className="font-sans text-base" style={{ color: 'var(--text-muted)' }}>
              Respondemos dentro de las 24hs hábiles.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
