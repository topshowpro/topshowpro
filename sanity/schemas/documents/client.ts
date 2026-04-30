import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: '🏢 Clientes',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: '🏷️ Logo del cliente (Vectorial / SVG)',
      type: 'image',
      options: { hotspot: true },
      description: 'Formatos: SVG (Recomendado) o PNG/WebP (Transparente, min 600px ancho).',
    }),
    defineField({ name: 'website', type: 'url' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
  orderings: [{ title: 'Orden asc', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
