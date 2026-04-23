import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Configuración',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo del sitio',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 160×40. PNG transparente o JPG.',
    }),
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
    defineField({
      name: 'serviciosHero',
      title: 'Hero imagen: Servicios',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920×1080 (16:9). Mín: 1280×720. WebP/JPG 80-85%.',
    }),
    defineField({
      name: 'equipamientoHero',
      title: 'Hero imagen: Equipamiento',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920×1080 (16:9). Mín: 1280×720. WebP/JPG 80-85%.',
    }),
    defineField({
      name: 'contactoHero',
      title: 'Hero imagen: Contacto',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920×1080 (16:9). Mín: 1280×720. WebP/JPG 80-85%.',
    }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Site Settings' }) },
});
