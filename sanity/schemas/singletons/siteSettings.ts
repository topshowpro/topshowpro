import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Configuración',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: '🔶 Logo del sitio (160x40)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 160x40px. SVG o PNG/WebP (Transparente).',
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
      title: '🖼️ Hero: Servicios (1920x1080)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 1920x1080px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'equipamientoHero',
      title: '🖼️ Hero: Equipamiento (1920x1080)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 1920x1080px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'contactoHero',
      title: '🖼️ Hero: Contacto (1920x1080)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 1920x1080px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'eventosHero',
      title: '🖼️ Hero: Eventos (1920x1080)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas recomendadas: 1920x1080px (16:9). Formato: WebP o JPG (Calidad 80-85%).',
    }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Site Settings' }) },
});
