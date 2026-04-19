import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'eventCategory',
  title: '🏷️ Categorías de Eventos',
  type: 'document',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'label' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'icon', type: 'string', description: 'Ícono opcional (Lucide/Material)' }),
  ],
  preview: { select: { title: 'label' } },
});
