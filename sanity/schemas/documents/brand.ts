import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: '🎯 Marcas',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logoBw',
      title: '🏷️ Logo de marca (360x112)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 360x112px. SVG o PNG/WebP (Transparente).',
    }),
    defineField({ name: 'website', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logoBw' } },
});
