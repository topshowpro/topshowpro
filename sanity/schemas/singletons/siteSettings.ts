import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Configuración (V2)',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: '🔶 Logo del sitio (160x40)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 160x40px (4:1). SVG o PNG (Transparente). Menor a 50KB.',
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
      title: '🖼️ Hero: Servicios (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'serviciosDesc',
      title: '📝 Hero: Servicios (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'equipamientoHero',
      title: '🖼️ Hero: Equipamiento (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'equipamientoDesc',
      title: '📝 Hero: Equipamiento (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactoHero',
      title: '🖼️ Hero: Contacto (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'contactoDesc',
      title: '📝 Hero: Contacto (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'eventosHero',
      title: '🖼️ Hero: Eventos (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'eventosDesc',
      title: '📝 Hero: Eventos (Descripción)',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Site Settings' }) },
});
