import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title override' }),
    defineField({ name: 'description', type: 'text', rows: 2, title: 'Description override', validation: (r) => r.max(160) }),
    defineField({ name: 'ogImage', type: 'image', title: 'OG Image (opcional)' }),
    defineField({ name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false }),
  ],
});
