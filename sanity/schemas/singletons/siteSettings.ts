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
      name: 'serviciosTitleColor',
      title: '✨ Hero: Servicios (Glow Título)',
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
    defineField({
      name: 'serviciosDesc',
      title: '📝 Hero: Servicios (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'serviciosFontSize',
      title: '📏 Hero: Servicios (Tamaño Fuente)',
      type: 'string',
      options: { list: [{ title: '14px', value: '14' }, { title: '16px', value: '16' }, { title: '18px', value: '18' }, { title: '24px', value: '24' }] },
      initialValue: '18',
    }),
    defineField({
      name: 'equipamientoHero',
      title: '🖼️ Hero: Equipamiento (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'equipamientoTitleColor',
      title: '✨ Hero: Equipamiento (Glow Título)',
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
    defineField({
      name: 'equipamientoDesc',
      title: '📝 Hero: Equipamiento (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'equipamientoFontSize',
      title: '📏 Hero: Equipamiento (Tamaño Fuente)',
      type: 'string',
      options: { list: [{ title: '14px', value: '14' }, { title: '16px', value: '16' }, { title: '18px', value: '18' }, { title: '24px', value: '24' }] },
      initialValue: '18',
    }),
    defineField({
      name: 'contactoHero',
      title: '🖼️ Hero: Contacto (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'contactoTitleColor',
      title: '✨ Hero: Contacto (Glow Título)',
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
    defineField({
      name: 'contactoDesc',
      title: '📝 Hero: Contacto (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactoFontSize',
      title: '📏 Hero: Contacto (Tamaño Fuente)',
      type: 'string',
      options: { list: [{ title: '14px', value: '14' }, { title: '16px', value: '16' }, { title: '18px', value: '18' }, { title: '24px', value: '24' }] },
      initialValue: '18',
    }),
    defineField({
      name: 'eventosHero',
      title: '🖼️ Hero: Eventos (Imagen)',
      type: 'image',
      options: { hotspot: true },
      description: 'Medidas: 1920x1080px (16:9). WebP o JPG (Calidad 80-85%).',
    }),
    defineField({
      name: 'eventosTitleColor',
      title: '✨ Hero: Eventos (Glow Título)',
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
    defineField({
      name: 'eventosDesc',
      title: '📝 Hero: Eventos (Descripción)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'eventosFontSize',
      title: '📏 Hero: Eventos (Tamaño Fuente)',
      type: 'string',
      options: { list: [{ title: '14px', value: '14' }, { title: '16px', value: '16' }, { title: '18px', value: '18' }, { title: '24px', value: '24' }] },
      initialValue: '18',
    }),
    defineField({
      name: 'menuLinks',
      title: '🔗 Menú de Navegación',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'href', type: 'string', title: 'Link (ej: /servicios)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: '© Copyright Texto',
      type: 'string',
      initialValue: 'Top Show Pro. Todos los derechos reservados.',
    }),
  ],
  preview: { select: { title: 'email' }, prepare: () => ({ title: 'Site Settings' }) },
});
