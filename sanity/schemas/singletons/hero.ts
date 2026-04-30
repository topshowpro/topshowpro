import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: '🎬 Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'video', type: 'file', options: { accept: 'video/*' } },
            {
              name: 'poster',
              type: 'image',
              title: 'Poster image (1920x1080)',
              options: { hotspot: true },
              description: 'Medidas recomendadas: 1920x1080px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
            },
            { name: 'phrase', type: 'string', validation: (r) => r.required() },
            {
              name: 'accentColor',
              title: 'Efecto Glow (Neón)',
              type: 'string',
              options: { list: [
                { title: 'Celeste (Marca)', value: 'cyan' },
                { title: 'Amarillo', value: 'yellow' },
                { title: 'Violeta', value: 'violet' },
                { title: 'Fucsia', value: 'fuchsia' },
                { title: 'Menta', value: 'mint' },
                { title: 'Blanco (Sin glow)', value: 'white' }
              ] },
              initialValue: 'cyan',
            },
            {
              name: 'fontSize',
              title: 'Tamaño del texto (Impacto)',
              type: 'string',
              options: { list: [
                { title: 'Compacto', value: 'compact' },
                { title: 'Estándar', value: 'standard' },
                { title: 'Grande', value: 'large' },
                { title: 'Monumental', value: 'huge' }
              ] },
              initialValue: 'standard',
            },
          ],
          preview: { select: { title: 'phrase', media: 'poster' } },
        },
      ],
    }),
    defineField({
      name: 'bannerAzul',
      title: 'Barra de contacto (Bottom)',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Texto' },
        { 
          name: 'backgroundColor', 
          type: 'string', 
          title: 'Color de fondo',
          options: {
            list: [
              { title: 'Celeste (Marca)', value: 'cyan' },
              { title: 'Amarillo', value: 'yellow' },
              { title: 'Violeta', value: 'violet' },
              { title: 'Fucsia', value: 'fuchsia' },
              { title: 'Menta', value: 'mint' },
              { title: 'Negro', value: 'black' },
            ]
          },
          initialValue: 'cyan'
        },
        { name: 'showCta', type: 'boolean', title: 'Mostrar botón de contacto', initialValue: true },
        { name: 'cta', type: 'ctaBlock', title: 'Botón CTA' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero' }) },
});
