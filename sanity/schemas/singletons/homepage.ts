import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: '🏠 Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'introTitle', type: 'string', title: 'Título Intro', initialValue: 'Hacemos que todo suceda' }),
    defineField({
      name: 'introTitleColor',
      title: 'Efecto Glow (Título Intro)',
      type: 'string',
      options: { list: [
        { title: 'Celeste (Marca)', value: 'cyan' },
        { title: 'Amarillo', value: 'yellow' },
        { title: 'Violeta', value: 'violet' },
        { title: 'Menta', value: 'mint' },
        { title: 'Blanco (Sin glow)', value: 'white' }
      ] },
      initialValue: 'cyan',
    }),
    defineField({ name: 'intro', type: 'array', of: [{ type: 'block' }], title: 'Contenido Intro' }),
    defineField({
      name: 'introFontSize',
      title: 'Tamaño de fuente (Intro)',
      type: 'string',
      options: { list: [{ title: '14px', value: '14' }, { title: '16px', value: '16' }, { title: '18px (Recomendado)', value: '18' }, { title: '24px', value: '24' }] },
      initialValue: '18',
    }),
    defineField({
      name: 'featuredEvents',
      title: 'Eventos destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'footerTitle', type: 'string', title: 'Título Cierre (CTA)', initialValue: '¿Tu próximo evento?' }),
    defineField({
      name: 'footerTitleColor',
      title: 'Efecto Glow (Título Cierre)',
      type: 'string',
      options: { list: [
        { title: 'Celeste (Marca)', value: 'cyan' },
        { title: 'Amarillo', value: 'yellow' },
        { title: 'Violeta', value: 'violet' },
        { title: 'Menta', value: 'mint' },
        { title: 'Blanco (Sin glow)', value: 'white' }
      ] },
      initialValue: 'yellow',
    }),
    defineField({ name: 'footerSubtitle', type: 'string', title: 'Subtítulo Cierre (CTA)', initialValue: 'Contanos qué tenés en mente y te armamos una propuesta a medida.' }),
    defineField({
      name: 'footerFontSize',
      title: 'Tamaño de fuente (Cierre)',
      type: 'string',
      options: { list: [{ title: '14px', value: '14' }, { title: '16px', value: '16' }, { title: '18px (Recomendado)', value: '18' }, { title: '24px', value: '24' }] },
      initialValue: '18',
    }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'Etiqueta Botón CTA', initialValue: 'Contactanos' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});
