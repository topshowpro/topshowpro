import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: '🎯 Marcas',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logoBw',
      title: 'Logo B/N',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 360×112 (alto fijo). Mín: 280×88. PNG transparente con logo negro o blanco.',
    }),
    defineField({ name: 'website', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logoBw' } },
});
