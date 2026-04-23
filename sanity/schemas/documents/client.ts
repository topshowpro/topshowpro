import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: '🏢 Clientes',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: '🏷️ Logo del cliente (280×112)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 280×112px (alto fijo). Mínimo: 180×72px. Usar PNG transparente con logo blanco o negro sobre fondo transparente.',
    }),
    defineField({ name: 'website', type: 'url' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
  orderings: [{ title: 'Orden asc', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
