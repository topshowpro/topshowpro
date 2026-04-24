import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'mediaPicker',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      options: { list: ['image', 'videoUrl', 'muxAsset'] },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Imagen (1600×900 recomendado)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.kind !== 'image',
      description: 'Medidas recomendadas: 1600x900px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
    }),
    defineField({ name: 'videoUrl', type: 'url', hidden: ({ parent }) => parent?.kind !== 'videoUrl' }),
  ],
});
