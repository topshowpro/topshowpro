import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoDefaults',
  title: '🔍 SEO Defaults',
  type: 'document',
  fields: [
    defineField({ name: 'titlePattern', type: 'string', initialValue: '{page} | Top Show Pro' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', type: 'image' }),
  ],
  preview: { prepare: () => ({ title: 'SEO Defaults' }) },
});
