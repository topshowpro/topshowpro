import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'schedule', type: 'string', title: 'Horario atención' }),
    defineField({
      name: 'socials',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'facebook', type: 'url' },
        { name: 'linkedin', type: 'url' },
        { name: 'youtube', type: 'url' },
      ],
    }),
    defineField({
      name: 'techContact',
      title: 'Contacto Técnico',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
      ],
    }),
    defineField({ name: 'serviciosHero',    title: 'Hero imagen: Servicios',    type: 'image', options: { hotspot: true } }),
    defineField({ name: 'equipamientoHero', title: 'Hero imagen: Equipamiento', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'contactoHero',     title: 'Hero imagen: Contacto',     type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Site Settings' }) },
});
