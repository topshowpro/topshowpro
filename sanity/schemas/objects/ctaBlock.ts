import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'link', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'variant',
      type: 'string',
      options: { list: ['primary', 'ghost'] },
      initialValue: 'primary',
    }),
  ],
});
