import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'equipmentCategory',
  title: '📦 Categorías de Equipamiento',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'heroImage',
      title: 'Imagen de categoria (1600x900)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Medidas recomendadas: 1600x900px (16:9). Minimo: 1200x675px. Formato: WebP o JPG. Calidad recomendada: 80-85%.',
    }),
    defineField({ name: 'items', type: 'array', of: [{ type: 'reference', to: [{ type: 'equipmentItem' }] }] }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name' } },
});
