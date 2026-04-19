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

const inputStyle = {
  backgroundColor: 'var(--bg-elevated)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  width: '100%',
  padding: '12px 16px',
  fontFamily: 'inherit',
  outline: 'none',
  fontSize: '15px',
};

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
              <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Categoría
              </label>
              <select {...register('category')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="" style={{ backgroundColor: '#1a1a1a' }}>Seleccioná una opción</option>
                {categories.map((c) => (
                  <option key={c.label} value={c.label} style={{ backgroundColor: '#1a1a1a' }}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                  Nombre / Empresa
                </label>
                <input {...register('name')} style={inputStyle} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                  Teléfono
                </label>
                <input {...register('phone')} style={inputStyle} />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Email
              </label>
              <input type="email" {...register('email')} style={inputStyle} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-faint)' }}>
                Consulta
              </label>
              <textarea {...register('message')} rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
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
