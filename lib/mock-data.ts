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
    client: 'Productora Tagliani',
    location: 'Calle Corrientes, Buenos Aires',
    category: { label: 'Teatro', slug: 'teatro' },
    heroImage: { url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Moviles 7R', 'Moviles 740', 'Par Z', 'Aura', 'Pantalla Led 6×4 mts – Pitch 3.9'],
    tagsTecnicos: ['Iluminación', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'A diez años de su debut en Calle Corrientes, Lizy Tagliani regresa con su music hall para todo público.' }] }],
    featured: true,
  },
  {
    title: 'Fuerza Bruta — Wayra',
    subtitle: 'Espectáculo inmersivo de teatro y acrobacia aérea',
    slug: 'fuerza-bruta-wayra',
    dateStart: '2025-04-01',
    dateEnd: '2025-07-31',
    client: 'Fuerza Bruta / Diqui James',
    location: 'Galpón Fuerza Bruta, Palermo',
    category: { label: 'Teatro', slug: 'teatro' },
    heroImage: { url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Claypaky B-EYE K20', 'Robe Robin 600E Wash', 'Pantalla flexible LED'],
    tagsTecnicos: ['Iluminación', 'LED', 'Sonido'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Espectáculo de teatro y acrobacia aérea con diseño de luz total.' }] }],
    featured: true,
  },
  {
    title: 'Night Fest Córdoba',
    subtitle: 'Festival electrónico outdoor',
    slug: 'night-fest-cordoba',
    dateStart: '2025-01-15',
    client: 'Club Alpha',
    location: 'Córdoba',
    category: { label: 'Discoteca', slug: 'discoteca' },
    heroImage: { url: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['L-Acoustics K2', 'Robe MegaPointe', 'Pantalla LED 8×5'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Festival electrónico outdoor con 5000 asistentes.' }] }],
    featured: true,
  },
  {
    title: 'Amnesia Buenos Aires',
    subtitle: 'Opening season residency — massive club show',
    slug: 'amnesia-buenos-aires',
    dateStart: '2025-11-08',
    client: 'Amnesia BA',
    location: 'Costanera Norte, Buenos Aires',
    category: { label: 'Discoteca', slug: 'discoteca' },
    heroImage: { url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Robe MegaPointe', 'Clay Paky Scenius', 'L-Acoustics K1', 'Pantalla LED 12×4'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Opening season de Amnesia BA con producción técnica integral.' }] }],
    featured: true,
  },
  {
    title: 'Creamfields Argentina 2025',
    subtitle: 'Festival multitudinario — 3 stages, 40.000 personas',
    slug: 'creamfields-argentina-2025',
    dateStart: '2025-11-29',
    client: 'Move Concerts',
    location: 'Parque de la Ciudad, Buenos Aires',
    category: { label: 'Discoteca', slug: 'discoteca' },
    heroImage: { url: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['L-Acoustics K2', 'Meyer Sound Leopard', 'GrandMA3', 'Pantalla LED 20×8'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Creamfields 2025 con tres escenarios y producción técnica de primer nivel.' }] }],
    featured: false,
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
  {
    title: 'MercadoLibre Tech Summit',
    subtitle: 'Lanzamiento de plataforma — auditorio para 1.200 personas',
    slug: 'mercadolibre-tech-summit',
    dateStart: '2025-09-18',
    client: 'MercadoLibre',
    location: 'Centro Metropolitano de Diseño, CABA',
    category: { label: 'Corporativo', slug: 'corporativo' },
    heroImage: { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Pantalla LED 14×4 Pitch 2.6', 'L-Acoustics ARCS', 'Consola Yamaha CL5'],
    tagsTecnicos: ['LED', 'Sonido', 'Iluminación'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Tech Summit de MercadoLibre con diseño audiovisual de alto impacto.' }] }],
    featured: true,
  },
  {
    title: 'Banco Galicia — 125 Años',
    subtitle: 'Gala corporativa con show musical en vivo',
    slug: 'banco-galicia-aniversario',
    dateStart: '2025-06-12',
    client: 'Banco Galicia',
    location: 'Hotel Alvear Palace, Buenos Aires',
    category: { label: 'Corporativo', slug: 'corporativo' },
    heroImage: { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Moviles Robe Spiider', 'L-Acoustics X8', 'Pantalla LED curva 8×3'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Gala de aniversario con show musical en vivo en el Alvear Palace.' }] }],
    featured: false,
  },
  {
    title: 'Casamiento Patagonia',
    subtitle: 'Ceremonia y recepción al aire libre — diseño de luz personalizado',
    slug: 'casamiento-patagonia',
    dateStart: '2025-02-22',
    client: 'Familia Rodríguez / García',
    location: 'Estancia La Pampa, Neuquén',
    category: { label: 'Privados', slug: 'privados' },
    heroImage: { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920', metadata: { lqip: '' } },
    gallery: [],
    equipmentUsed: ['Par LED RGBW', 'Uplighting perimetral', 'Consola Avolites', 'Sonido QL1'],
    tagsTecnicos: ['Iluminación', 'Sonido'],
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Casamiento al aire libre en la Patagonia con diseño de iluminación personalizado.' }] }],
    featured: false,
  },
];

export const MOCK_EVENT_CATEGORIES = [
  { label: 'Teatro', slug: 'teatro' },
  { label: 'Discoteca', slug: 'discoteca' },
  { label: 'Corporativo', slug: 'corporativo' },
  { label: 'Privados', slug: 'privados' },
];

const block = (text: string) => ({ _type: 'block', children: [{ _type: 'span', text }] });

export const MOCK_SERVICES = [
  {
    name: 'Técnica Teatral',
    icon: 'theater',
    shortDesc: 'Soluciones técnicas para producciones teatrales de alto nivel.',
    longDesc: [
      block('Diseñamos y ejecutamos soluciones técnicas para producciones teatrales de alto nivel. Trabajamos con equipos creativos para lograr puestas precisas en iluminación, sonido y estructura escénica, ofreciendo soporte profesional en cada función.'),
    ],
    gallery: [],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    name: 'Rental para Discotecas',
    icon: 'music',
    shortDesc: 'Tecnología de alto impacto para venues nocturnos.',
    longDesc: [
      block('Potenciamos la experiencia con tecnología de alto impacto. Brindamos equipamiento profesional —sonido, iluminación y pantallas LED— para discotecas y venues nocturnos, adaptándonos a la dinámica del lugar y garantizando funcionamiento continuo.'),
    ],
    gallery: [],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    name: 'Eventos Corporativos',
    icon: 'briefcase',
    shortDesc: 'Soluciones integrales para eventos empresariales de todo tipo.',
    longDesc: [
      block('Ofrecemos soluciones técnicas integrales para eventos empresariales: conferencias, lanzamientos, convenciones y shows en vivo. Nos aseguramos de que el mensaje se escuche, se vea y se perciba con claridad y profesionalismo.'),
    ],
    gallery: [],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    name: 'Venta de Equipamiento',
    icon: 'shopping-bag',
    shortDesc: 'Equipos profesionales con asesoría personalizada.',
    longDesc: [
      block('Asesoramos en la elección de equipos profesionales de sonido, iluminación y video. Trabajamos con marcas reconocidas y brindamos soluciones a medida para empresas y proyectos independientes.'),
    ],
    gallery: [],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    name: 'Servicio Técnico',
    icon: 'wrench',
    shortDesc: 'Mantenimiento, diagnóstico y reparación con respaldo profesional.',
    longDesc: [
      block('Realizamos mantenimiento, diagnóstico y reparación de equipos con respaldo profesional. Controles, reparaciones y puesta a punto para asegurar confiabilidad y prolongar la vida útil del equipamiento.'),
    ],
    gallery: [],
    techContact: { name: 'Juan Pérez', phone: '+54 11 8765-4321', email: 'tecnico@topshowpro.com' },
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
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

export const MOCK_CLIENTS = [
  { name: 'Teatro Colón',          logoUrl: null },
  { name: 'Movistar Arena',        logoUrl: null },
  { name: 'Luna Park',             logoUrl: null },
  { name: 'Lollapalooza Argentina',logoUrl: null },
  { name: 'Banco Galicia',         logoUrl: null },
  { name: 'Telecom Argentina',     logoUrl: null },
  { name: 'Hard Rock Cafe BA',     logoUrl: null },
  { name: 'BAFICI',                logoUrl: null },
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
    if (query.includes('"event"')) {
      const catMatch = query.match(/slug\.current == "([^"]+)"/);
      const filtered = catMatch
        ? MOCK_EVENTS.filter((e) => e.category.slug === catMatch[1])
        : MOCK_EVENTS;
      return Promise.resolve(filtered as T);
    }
    if (query.includes('"service"')) return Promise.resolve(MOCK_SERVICES as T);
    if (query.includes('"equipmentCategory"')) return Promise.resolve(MOCK_EQUIPMENT_CATEGORIES as T);
    if (query.includes('"brand"')) return Promise.resolve(MOCK_BRANDS as T);
    if (query.includes('"contactCategory"')) return Promise.resolve(MOCK_CONTACT_CATEGORIES as T);
    if (query.includes('"client"')) return Promise.resolve(MOCK_CLIENTS as T);
    if (query.includes('"seoDefaults"')) return Promise.resolve({ titlePattern: '{page} | Top Show Pro', description: 'Rental de tecnología para eventos y espectáculos' } as T);
    return Promise.resolve([] as T);
  },
};
