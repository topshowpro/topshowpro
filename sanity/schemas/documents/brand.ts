import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'brand',
  title: '🎯 Marcas',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logoBw', title: 'Logo B/N', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'website', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logoBw' } },
});
