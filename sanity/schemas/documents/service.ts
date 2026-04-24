import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: '🔧 Servicios',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'icon', type: 'string', description: 'Lucide icon name' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'shortDesc', type: 'text', rows: 2 }),
    defineField({ name: 'longDesc', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'gallery',
      title: '🖼️ Galeria de imagenes (800x600)',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: { hotspot: true },
        description: 'Medidas recomendadas: 800x600px (4:3). Formato: WebP o JPG (Calidad 80-85%).'
      }],
      description: 'Medidas recomendadas: 800x600px (4:3). Formato: WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'techContact',
      title: 'Contacto técnico',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string', title: 'Nombre' }),
        defineField({ name: 'phone', type: 'string', title: 'Teléfono' }),
        defineField({ name: 'email', type: 'string', title: 'Email' }),
      ],
    }),
    defineField({ name: 'cta', type: 'ctaBlock' }),
  ],
  preview: { select: { title: 'name', subtitle: 'shortDesc' } },
  orderings: [{ title: 'Orden asc', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
