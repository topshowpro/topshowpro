export const MOCK_HERO = {
  slides: [
    {
      phrase: 'Producción completa. Sin vueltas.',
      accentColor: 'cyan',
      posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920',
      videoUrl: null,
    },
    {
      phrase: 'Donde los grandes eventos empiezan.',
      accentColor: 'violet',
      posterUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920',
      videoUrl: null,
    },
  ],
  bannerAzul: { text: 'Menos proveedores. Más Top Show.', cta: { label: 'Contactanos', link: '/contacto', variant: 'primary' } },
};

export const MOCK_EVENTS = [
  {
    title: 'Lizy Tagliani',
    subtitle: 'Sí!!! Quiero…un music hall para todo público',
    slug: 'lizy-tagliani',
    dateStart: '2024-07-05',
    dateEnd: '2025-02-11',
    client: 'Productora Ejemplo',
    location: 'Calle Corrientes, Buenos Aires',
    category: { label: 'Teatro', slug: 'teatro' },
    heroImage: { url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Moviles 7R', 'Moviles 740', 'Par Z', 'Aura', 'Pantalla Led 6×4 mts – Pitch 3.9'],
    tagsTecnicos: ['Iluminación', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'A diez años de su debut en Calle Corrientes, Lizy Tagliani regresa con Sí!!! Quiero…un music hall para todo público.' }] }],
    featured: true,
  },
  {
    title: 'Night Fest Córdoba',
    subtitle: 'Festival electrónico',
    slug: 'night-fest-cordoba',
    dateStart: '2025-01-15',
    client: 'Club Alpha',
    location: 'Córdoba',
    category: { label: 'Discoteca', slug: 'discoteca' },
    heroImage: { url: 'https://images.unsplash.com/photo-1571266028243-381def1c16a2?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['L-Acoustics K2', 'Robe MegaPointe', 'Pantalla LED 8×5'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Festival electrónico outdoor con 5000 asistentes.' }] }],
    featured: true,
  },
  {
    title: 'Convención Corporativa XYZ',
    subtitle: 'Lanzamiento producto 2026',
    slug: 'convencion-xyz',
    dateStart: '2026-03-10',
    client: 'Empresa XYZ',
    location: 'Hilton Buenos Aires',
    category: { label: 'Corporativo', slug: 'corporativo' },
    heroImage: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Line array', 'Consola Yamaha', 'Pantalla LED 10×3 Pitch 2.6'],
    tagsTecnicos: ['Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Evento corporativo de lanzamiento.' }] }],
    featured: true,
  },
];

export const MOCK_EVENT_CATEGORIES = [
  { label: 'Teatro', slug: 'teatro' },
  { label: 'Discoteca', slug: 'discoteca' },
  { label: 'Corporativo', slug: 'corporativo' },
  { label: 'Privados', slug: 'privados' },
];

export const MOCK_SERVICES = [
  { name: 'Técnica Teatral', icon: 'theater', shortDesc: 'Soluciones técnicas para producciones teatrales de alto nivel.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
  { name: 'Rental Discotecas', icon: 'music', shortDesc: 'Tecnología de alto impacto para venues nocturnos.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
  { name: 'Eventos Corporativos', icon: 'briefcase', shortDesc: 'Soluciones integrales para eventos empresariales.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
  { name: 'Venta de Equipamiento', icon: 'shopping-bag', shortDesc: 'Tecnología profesional para quienes buscan calidad.', longDesc: [], gallery: [], cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' } },
];

export const MOCK_BRANDS = [
  { name: 'Claypaky', website: 'https://claypaky.it', logoUrl: null },
  { name: 'Robe', website: 'https://robe.cz', logoUrl: null },
  { name: 'L-Acoustics', website: 'https://l-acoustics.com', logoUrl: null },
  { name: 'Meyer Sound', website: 'https://meyersound.com', logoUrl: null },
  { name: 'Martin Professional', website: 'https://martin.com', logoUrl: null },
];

export const MOCK_EQUIPMENT_CATEGORIES = [
  { name: 'Iluminación', slug: 'iluminacion', description: 'Móviles, LED, efectos.', items: [] },
  { name: 'Sonido', slug: 'sonido', description: 'Line arrays, monitores, consolas.', items: [] },
  { name: 'Stage', slug: 'stage', description: 'Estructuras, truss, blackout.', items: [] },
  { name: 'Pantallas LED', slug: 'pantallas-led', description: 'Indoor/outdoor, varios pitches.', items: [] },
];

export const MOCK_SITE_SETTINGS = {
  logo: null,
  address: 'Av. Siempre Viva 123, CABA',
  email: 'hola@topshowpro.com',
  phone: '+54 11 1234-5678',
  schedule: 'Lunes a Viernes 9-18hs',
  socials: {
    instagram: 'https://instagram.com/topshowpro',
    facebook: null,
    linkedin: null,
    youtube: null,
  },
  techContact: { name: 'Juan Pérez', phone: '+54 11 8765-4321', email: 'tecnico@topshowpro.com' },
};

export const MOCK_CONTACT_CATEGORIES = [
  { label: 'Producción Teatral' },
  { label: 'Discoteca' },
  { label: 'Evento Corporativo' },
  { label: 'Fiesta Privada' },
  { label: 'Otro' },
];

/**
 * Mock resolver que mapea queries GROQ a fixtures. Suficiente para desarrollo local sin Sanity.
 */
export const mockSanity = {
  resolve<T>(query: string, params?: Record<string, unknown>): Promise<T> {
    if (query.includes('"hero"')) return Promise.resolve(MOCK_HERO as T);
    if (query.includes('"homepage"')) return Promise.resolve({ intro: [], ctaLabel: 'Contactanos', featuredEvents: MOCK_EVENTS.filter((e) => e.featured) } as T);
    if (query.includes('"siteSettings"')) return Promise.resolve(MOCK_SITE_SETTINGS as T);
    if (query.includes('"eventCategory"')) return Promise.resolve(MOCK_EVENT_CATEGORIES as T);
    if (query.includes('"event"') && query.includes('$slug')) {
      const slug = params?.slug as string;
      return Promise.resolve((MOCK_EVENTS.find((e) => e.slug === slug) ?? null) as T);
    }
    if (query.includes('"event"')) return Promise.resolve(MOCK_EVENTS as T);
    if (query.includes('"service"')) return Promise.resolve(MOCK_SERVICES as T);
    if (query.includes('"equipmentCategory"')) return Promise.resolve(MOCK_EQUIPMENT_CATEGORIES as T);
    if (query.includes('"brand"')) return Promise.resolve(MOCK_BRANDS as T);
    if (query.includes('"contactCategory"')) return Promise.resolve(MOCK_CONTACT_CATEGORIES as T);
    if (query.includes('"seoDefaults"')) return Promise.resolve({ titlePattern: '{page} | Top Show Pro', description: 'Rental de tecnología para eventos y espectáculos' } as T);
    return Promise.resolve([] as T);
  },
};
