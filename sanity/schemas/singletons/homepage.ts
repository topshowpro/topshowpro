import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: '🏠 Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'intro', type: 'array', of: [{ type: 'block' }], title: 'Intro (Hacemos que todo suceda)' }),
    defineField({
      name: 'featuredEvents',
      title: 'Eventos destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'ctaLabel', type: 'string', initialValue: 'Contactanos' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});
