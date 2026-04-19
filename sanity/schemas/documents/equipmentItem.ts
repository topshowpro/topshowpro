import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'equipmentItem',
  title: '🔩 Ítems de Equipamiento',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'brand', type: 'reference', to: [{ type: 'brand' }] }),
    defineField({ name: 'specs', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'datasheet', type: 'file', options: { accept: 'application/pdf' } }),
  ],
  preview: { select: { title: 'name', subtitle: 'brand.name', media: 'photo' } },
});
