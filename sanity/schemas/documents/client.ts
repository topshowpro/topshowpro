import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: '🏢 Clientes',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 280×112 (alto fijo). Mín: 180×72. PNG transparente con logo blanco o negro.',
    }),
    defineField({ name: 'website', type: 'url' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
  orderings: [{ title: 'Orden asc', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
