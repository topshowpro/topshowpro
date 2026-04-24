import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoDefaults',
  title: '🔍 SEO Defaults',
  type: 'document',
  fields: [
    defineField({ name: 'titlePattern', type: 'string', initialValue: '{page} | Top Show Pro' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'OG Image (1200x630)',
      description: 'Medidas recomendadas: 1200x630px. Formato: JPG o PNG (Max 1MB).',
    }),
  ],
  preview: { prepare: () => ({ title: 'SEO Defaults' }) },
});
