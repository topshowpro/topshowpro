import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: '🏢 Clientes',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: '🏷️ Logo del cliente (280x112)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Medidas recomendadas: 280x112px (alto fijo). Minimo: 180x72px. Preferentemente logo blanco en PNG/SVG con fondo transparente. Evitar fondos solidos y sombras.',
    }),
    defineField({ name: 'website', type: 'url' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
  orderings: [{ title: 'Orden asc', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
