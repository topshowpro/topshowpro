import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactCategory',
  title: 'Contact Category',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'label' } },
});
