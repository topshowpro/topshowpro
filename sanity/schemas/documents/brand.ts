import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: '🎯 Marcas',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logoBw',
      title: '🏷️ Logo de marca (Vectorial / SVG)',
      type: 'image',
      options: { hotspot: true },
      description: 'Formatos: SVG (Recomendado para nitidez total) o PNG/WebP (Transparente, min 600px ancho).',
    }),
    defineField({ name: 'website', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logoBw' } },
});
