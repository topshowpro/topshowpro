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
    defineField({ name: 'image', type: 'image', hidden: ({ parent }) => parent?.kind !== 'image' }),
    defineField({ name: 'videoUrl', type: 'url', hidden: ({ parent }) => parent?.kind !== 'videoUrl' }),
  ],
});
