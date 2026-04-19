'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

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
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setSent(true);
  }

  return (
    <div className="flex-1 flex flex-col" style={{ perspective: '1200px' }}>
      <motion.div
        className="relative flex-1"
        animate={{ rotateY: sent ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── FRONT: form ── */}
        <div className="backface-hidden h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="category" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Categoría
              </label>
              <select id="category" {...register('category')} className="form-select">
                <option value="" style={{ backgroundColor: 'var(--bg-elevated)' }}>Seleccioná una opción</option>
                {categories.map((c) => (
                  <option key={c.label} value={c.label} style={{ backgroundColor: 'var(--bg-elevated)' }}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                  Nombre / Empresa
                </label>
                <input id="name" {...register('name')} className="form-input" />
                {errors.name && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                  Teléfono
                </label>
                <input id="phone" {...register('phone')} className="form-input" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Email
              </label>
              <input id="email" type="email" {...register('email')} className="form-input" />
              {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Consulta
              </label>
              <textarea id="message" {...register('message')} rows={5} className="form-textarea" />
              {errors.message && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 font-sans text-sm uppercase tracking-widest btn-neon btn-neon-cyan disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
            </button>
          </form>
        </div>

        {/* ── BACK: success ── */}
        <div
          className="absolute inset-0 backface-hidden flex flex-col items-center justify-center gap-8 p-10 text-center"
          style={{
            transform: 'rotateY(180deg)',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--accent-cyan)',
            boxShadow: '0 0 40px rgba(0,191,255,0.3), 0 0 80px rgba(0,191,255,0.1), inset 0 0 40px rgba(0,191,255,0.05)',
          }}
        >
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{
              border: '2px solid var(--accent-cyan)',
              boxShadow: '0 0 20px rgba(0,191,255,0.7)',
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
                textShadow: '0 0 30px rgba(0,191,255,0.9), 0 0 60px rgba(0,191,255,0.4)',
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
