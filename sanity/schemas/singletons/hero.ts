import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: '🎬 Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'video', type: 'file', options: { accept: 'video/*' } },
            {
              name: 'poster',
              type: 'image',
              title: 'Poster image (1920x1080)',
              options: { hotspot: true },
              description: 'Medidas recomendadas: 1920x1080px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
            },
            { name: 'phrase', type: 'string', validation: (r) => r.required() },
            {
              name: 'accentColor',
              type: 'string',
              options: { list: ['cyan', 'violet', 'mint'] },
              initialValue: 'cyan',
            },
          ],
          preview: { select: { title: 'phrase', media: 'poster' } },
        },
      ],
    }),
    defineField({
      name: 'bannerAzul',
      title: 'Banner azul (bottom)',
      type: 'object',
      fields: [
        { name: 'text', type: 'string' },
        { name: 'cta', type: 'ctaBlock' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero' }) },
});
