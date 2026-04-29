import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: '🏠 Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'introTitle', type: 'string', title: 'Título Intro', initialValue: 'Hacemos que todo suceda' }),
    defineField({ name: 'intro', type: 'array', of: [{ type: 'block' }], title: 'Contenido Intro' }),
    defineField({
      name: 'featuredEvents',
      title: 'Eventos destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'footerTitle', type: 'string', title: 'Título Cierre (CTA)', initialValue: '¿Tu próximo evento?' }),
    defineField({ name: 'footerSubtitle', type: 'string', title: 'Subtítulo Cierre (CTA)', initialValue: 'Contanos qué tenés en mente y te armamos una propuesta a medida.' }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'Etiqueta Botón CTA', initialValue: 'Contactanos' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});
