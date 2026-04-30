import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: '🎭 Eventos',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'eventCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'dateStart', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'dateEnd', type: 'date', title: 'Fecha fin (opcional, temporadas)' }),
    defineField({ name: 'client', type: 'string', title: 'Cliente/Productora' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'equipmentUsed',
      title: 'Equipos utilizados',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'heroImage',
      title: '📐 Imagen principal (Full HD / 4K)',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
      description: 'Mínimo: 1920x1080px (16:9). Se recomienda 2K o 4K para máxima nitidez.',
    }),
    defineField({
      name: 'gallery',
      title: '🖼️ Galeria (High Resolution)',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: { hotspot: true },
        description: 'Recomendado: 1600x1200px (4:3) o superior. Sanity optimiza el peso final.'
      }],
      description: 'Carga fotos de alta calidad de los eventos.',
    }),
    defineField({ name: 'video', type: 'url', title: 'URL video (YouTube/Vimeo/Mux)' }),
    defineField({
      name: 'tagsTecnicos',
      title: 'Tags técnicos',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Iluminación', 'Sonido', 'LED', 'Stage', 'Backline'] },
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Destacar en home', initialValue: false }),
    defineField({ name: 'seo', type: 'seoFields' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'heroImage' },
  },
  orderings: [
    { title: 'Fecha desc', name: 'dateDesc', by: [{ field: 'dateStart', direction: 'desc' }] },
  ],
});
