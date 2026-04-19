import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'message', type: 'text', rows: 5 }),
    defineField({ name: 'createdAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'read', type: 'boolean', initialValue: false, title: 'Leído' }),
  ],
  preview: { select: { title: 'name', subtitle: 'email' } },
  orderings: [{ title: 'Fecha desc', name: 'dateDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
});
