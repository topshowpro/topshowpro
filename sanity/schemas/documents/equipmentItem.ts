import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'equipmentItem',
  title: '🔩 Ítems de Equipamiento',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'brand', type: 'reference', to: [{ type: 'brand' }] }),
    defineField({ name: 'specs', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'photo',
      title: '📷 Foto del equipo (600x400)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 600x400px (3:2). Minimo: 400x267px. Fondo neutro u oscuro recomendado. Formato: WebP o JPG con calidad 80-85%.',
    }),
    defineField({ name: 'datasheet', type: 'file', options: { accept: 'application/pdf' } }),
  ],
  preview: { select: { title: 'name', subtitle: 'brand.name', media: 'photo' } },
});
