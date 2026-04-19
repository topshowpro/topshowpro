'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="relative" style={{ perspective: '1000px' }}>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
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
              className="w-full px-6 py-3 font-sans text-sm uppercase tracking-widest transition hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent-cyan)', color: 'black' }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="text-center py-16"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-5xl mb-4" style={{ color: 'var(--accent-cyan)' }}>
              ¡Gracias!
            </h3>
            <p className="font-sans text-lg" style={{ color: 'var(--text-muted)' }}>
              Respondemos dentro de las 24hs hábiles.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
