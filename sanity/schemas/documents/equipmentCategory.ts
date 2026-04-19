import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'equipmentCategory',
  title: 'Equipment Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'items', type: 'array', of: [{ type: 'reference', to: [{ type: 'equipmentItem' }] }] }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name' } },
});
