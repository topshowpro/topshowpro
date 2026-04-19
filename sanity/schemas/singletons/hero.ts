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
            { name: 'poster', type: 'image', title: 'Poster image' },
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
