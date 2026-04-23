import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: '🎯 Marcas',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logoBw',
      title: '🏷️ Logo de marca (360×112)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 360×112px (alto fijo). Mínimo: 280×88px. Usar PNG transparente con logo negro o blanco sobre fondo transparente.',
    }),
    defineField({ name: 'website', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logoBw' } },
});
