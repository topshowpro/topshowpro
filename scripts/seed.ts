/**
 * SEED SCRIPT — carga contenido inicial en Sanity
 *
 * Cómo funciona:
 *  1. Crea un cliente Sanity con el token Editor (permisos de escritura)
 *  2. Por cada documento, llama a client.createOrReplace({ _id, _type, ...campos })
 *  3. Sanity guarda el documento en su nube — no necesitás Vercel ni Next.js corriendo
 *
 * Correr: pnpm seed
 *
 * Para cargar contenido nuevo en el futuro podés:
 *  A) Editarlo acá y volver a correr el script (idempotente: usa createOrReplace)
 *  B) Entrar al Studio (https://topshowpro.sanity.studio) y cargarlo a mano
 *  C) Usar la API de Sanity directamente (igual que hace este script)
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Carga las variables de .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e6k6jv3z',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // token Editor
  useCdn: false,
});

// ─── DATOS A CARGAR ───────────────────────────────────────────────────────────
// Cada objeto tiene _id fijo para que createOrReplace sea idempotente
// (podés correr el script varias veces sin duplicar documentos)

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  address: 'Av. Corrientes 1234, CABA',
  email: 'hola@topshowpro.com.ar',
  phone: '+54 11 1234-5678',
  schedule: 'Lunes a Viernes 9–18hs',
  socials: {
    instagram: 'https://instagram.com/topshowpro',
    facebook: null,
    linkedin: null,
    youtube: null,
  },
  techContact: {
    name: 'Juan Pérez',
    phone: '+54 11 8765-4321',
    email: 'tecnico@topshowpro.com.ar',
  },
};

const hero = {
  _id: 'hero',
  _type: 'hero',
  slides: [
    {
      _key: 'slide1',
      phrase: 'Producción completa. Sin vueltas.',
      accentColor: 'cyan',
    },
    {
      _key: 'slide2',
      phrase: 'Donde los grandes eventos empiezan.',
      accentColor: 'violet',
    },
  ],
  bannerAzul: {
    text: 'Menos proveedores. Más Top Show.',
    cta: { label: 'Contactanos', link: '/contacto', variant: 'primary' },
  },
};

const homepage = {
  _id: 'homepage',
  _type: 'homepage',
  intro: [
    {
      _key: 'intro1',
      _type: 'block',
      children: [{ _key: 'span1', _type: 'span', text: 'Somos tu aliado integral en soluciones técnicas para espectáculos y eventos. Iluminación, sonido, pantallas LED, estructuras.' }],
    },
  ],
  ctaLabel: 'Contactanos',
};

const seoDefaults = {
  _id: 'seoDefaults',
  _type: 'seoDefaults',
  titlePattern: '{page} | Top Show Pro',
  description: 'Rental de tecnología para eventos y espectáculos en Argentina.',
};

// Categorías de eventos
const eventCategories = [
  { _id: 'cat-teatro',      _type: 'eventCategory', label: 'Teatro',      slug: { _type: 'slug', current: 'teatro' },      order: 1 },
  { _id: 'cat-discoteca',   _type: 'eventCategory', label: 'Discoteca',   slug: { _type: 'slug', current: 'discoteca' },   order: 2 },
  { _id: 'cat-corporativo', _type: 'eventCategory', label: 'Corporativo', slug: { _type: 'slug', current: 'corporativo' }, order: 3 },
  { _id: 'cat-privados',    _type: 'eventCategory', label: 'Privados',    slug: { _type: 'slug', current: 'privados' },    order: 4 },
];

const block = (key: string, text: string) => ({
  _key: key, _type: 'block',
  children: [{ _key: `${key}s1`, _type: 'span', text }],
});

// Servicios
const services = [
  {
    _id: 'service-teatral',
    _type: 'service',
    name: 'Técnica Teatral',
    icon: 'theater',
    order: 1,
    shortDesc: 'Soluciones técnicas para producciones teatrales de alto nivel.',
    longDesc: [
      block('b1', 'Diseñamos y ejecutamos soluciones técnicas para producciones teatrales de alto nivel. Trabajamos con equipos creativos para lograr puestas precisas en iluminación, sonido y estructura escénica, ofreciendo soporte profesional en cada función.'),
    ],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    _id: 'service-discotecas',
    _type: 'service',
    name: 'Rental para Discotecas',
    icon: 'music',
    order: 2,
    shortDesc: 'Tecnología de alto impacto para venues nocturnos.',
    longDesc: [
      block('b1', 'Potenciamos la experiencia con tecnología de alto impacto. Brindamos equipamiento profesional —sonido, iluminación y pantallas LED— para discotecas y venues nocturnos, adaptándonos a la dinámica del lugar y garantizando funcionamiento continuo.'),
    ],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    _id: 'service-corporativos',
    _type: 'service',
    name: 'Eventos Corporativos',
    icon: 'briefcase',
    order: 3,
    shortDesc: 'Soluciones integrales para eventos empresariales de todo tipo.',
    longDesc: [
      block('b1', 'Ofrecemos soluciones técnicas integrales para eventos empresariales: conferencias, lanzamientos, convenciones y shows en vivo. Nos aseguramos de que el mensaje se escuche, se vea y se perciba con claridad y profesionalismo.'),
    ],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    _id: 'service-venta',
    _type: 'service',
    name: 'Venta de Equipamiento',
    icon: 'shopping-bag',
    order: 4,
    shortDesc: 'Equipos profesionales con asesoría personalizada.',
    longDesc: [
      block('b1', 'Asesoramos en la elección de equipos profesionales de sonido, iluminación y video. Trabajamos con marcas reconocidas y brindamos soluciones a medida para empresas y proyectos independientes.'),
    ],
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
  {
    _id: 'service-tecnico',
    _type: 'service',
    name: 'Servicio Técnico',
    icon: 'wrench',
    order: 5,
    shortDesc: 'Mantenimiento, diagnóstico y reparación con respaldo profesional.',
    longDesc: [
      block('b1', 'Realizamos mantenimiento, diagnóstico y reparación de equipos con respaldo profesional. Controles, reparaciones y puesta a punto para asegurar confiabilidad y prolongar la vida útil del equipamiento.'),
    ],
    techContact: { name: 'Juan Pérez', phone: '+54 11 8765-4321', email: 'tecnico@topshowpro.com.ar' },
    cta: { label: 'Consultanos', link: '/contacto', variant: 'primary' },
  },
];

// Categorías de equipamiento
const equipmentCategories = [
  {
    _id: 'cat-iluminacion',
    _type: 'equipmentCategory',
    name: 'Iluminación',
    slug: { _type: 'slug', current: 'iluminacion' },
    description: 'Luminarias robotizadas, seguridores, efectos y control. Claypaky, Robe, Martin y más.',
    order: 1,
  },
  {
    _id: 'cat-sonido',
    _type: 'equipmentCategory',
    name: 'Sonido',
    slug: { _type: 'slug', current: 'sonido' },
    description: 'Line arrays, subwoofers, monitores y consolas digitales. L-Acoustics, Meyer Sound, Yamaha.',
    order: 2,
  },
  {
    _id: 'cat-stage',
    _type: 'equipmentCategory',
    name: 'Stage & Estructuras',
    slug: { _type: 'slug', current: 'stage' },
    description: 'Escenarios, tarimas, estructuras de iluminación, gradas y equipo de rigging.',
    order: 3,
  },
  {
    _id: 'cat-led',
    _type: 'equipmentCategory',
    name: 'Pantallas LED',
    slug: { _type: 'slug', current: 'led' },
    description: 'Paredes de video LED indoor y outdoor en múltiples pitches. Alquiler y venta.',
    order: 4,
  },
];

// Marcas
const brands = [
  { _id: 'brand-claypaky',  _type: 'brand', name: 'Claypaky',         website: 'https://claypaky.it' },
  { _id: 'brand-robe',      _type: 'brand', name: 'Robe',             website: 'https://robe.cz' },
  { _id: 'brand-lacoustics',_type: 'brand', name: 'L-Acoustics',      website: 'https://l-acoustics.com' },
  { _id: 'brand-meyer',     _type: 'brand', name: 'Meyer Sound',      website: 'https://meyersound.com' },
  { _id: 'brand-martin',    _type: 'brand', name: 'Martin Professional', website: 'https://martin.com' },
];

// Categorías de contacto
const contactCategories = [
  { _id: 'cc-teatro',       _type: 'contactCategory', label: 'Producción Teatral',  order: 1 },
  { _id: 'cc-discoteca',    _type: 'contactCategory', label: 'Discoteca',           order: 2 },
  { _id: 'cc-corporativo',  _type: 'contactCategory', label: 'Evento Corporativo',  order: 3 },
  { _id: 'cc-privado',      _type: 'contactCategory', label: 'Fiesta Privada',      order: 4 },
  { _id: 'cc-otro',         _type: 'contactCategory', label: 'Otro',                order: 5 },
];

// Eventos (usan referencias a categorías por _id)
const events = [
  {
    _id: 'event-lizy-tagliani',
    _type: 'event',
    title: 'Lizy Tagliani',
    subtitle: 'Sí!!! Quiero…un music hall para todo público',
    slug: { _type: 'slug', current: 'lizy-tagliani' },
    category: { _type: 'reference', _ref: 'cat-teatro' },
    dateStart: '2024-07-05',
    dateEnd: '2025-02-11',
    client: 'Productora Tagliani',
    location: 'Calle Corrientes, Buenos Aires',
    equipmentUsed: ['Moviles 7R', 'Moviles 740', 'Par Z', 'Aura', 'Pantalla Led 6×4 mts – Pitch 3.9'],
    tagsTecnicos: ['Iluminación', 'LED'],
    featured: true,
  },
  {
    _id: 'event-night-fest',
    _type: 'event',
    title: 'Night Fest Córdoba',
    subtitle: 'Festival electrónico outdoor',
    slug: { _type: 'slug', current: 'night-fest-cordoba' },
    category: { _type: 'reference', _ref: 'cat-discoteca' },
    dateStart: '2025-01-15',
    client: 'Club Alpha',
    location: 'Córdoba',
    equipmentUsed: ['L-Acoustics K2', 'Robe MegaPointe', 'Pantalla LED 8×5'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    featured: true,
  },
  {
    _id: 'event-convencion-xyz',
    _type: 'event',
    title: 'Convención Corporativa XYZ',
    subtitle: 'Lanzamiento producto 2026',
    slug: { _type: 'slug', current: 'convencion-xyz' },
    category: { _type: 'reference', _ref: 'cat-corporativo' },
    dateStart: '2026-03-10',
    client: 'Empresa XYZ',
    location: 'Hilton Buenos Aires',
    equipmentUsed: ['Line array', 'Consola Yamaha', 'Pantalla LED 10×3 Pitch 2.6'],
    tagsTecnicos: ['Sonido', 'LED'],
    featured: true,
  },
];

// Eventos adicionales
const extraEvents = [
  // ── Discoteca ──────────────────────────────────────────────────────────────
  {
    _id: 'event-amnesia-ba',
    _type: 'event',
    title: 'Amnesia Buenos Aires',
    subtitle: 'Opening season residency — massive club show',
    slug: { _type: 'slug', current: 'amnesia-buenos-aires' },
    category: { _type: 'reference', _ref: 'cat-discoteca' },
    dateStart: '2025-11-08',
    client: 'Amnesia BA',
    location: 'Costanera Norte, Buenos Aires',
    equipmentUsed: ['Robe MegaPointe', 'Clay Paky Scenius', 'L-Acoustics K1', 'Pantalla LED 12×4 Pitch 3.9'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    featured: true,
  },
  {
    _id: 'event-creamfields-2025',
    _type: 'event',
    title: 'Creamfields Argentina 2025',
    subtitle: 'Festival multitudinario — 3 stages, 40.000 personas',
    slug: { _type: 'slug', current: 'creamfields-argentina-2025' },
    category: { _type: 'reference', _ref: 'cat-discoteca' },
    dateStart: '2025-11-29',
    client: 'Move Concerts',
    location: 'Parque de la Ciudad, Buenos Aires',
    equipmentUsed: ['L-Acoustics K2', 'Meyer Sound Leopard', 'GrandMA3', 'Pantalla LED 20×8'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    featured: false,
  },
  // ── Corporativo ────────────────────────────────────────────────────────────
  {
    _id: 'event-mercadolibre-summit',
    _type: 'event',
    title: 'MercadoLibre Tech Summit',
    subtitle: 'Lanzamiento de plataforma — auditorio para 1.200 personas',
    slug: { _type: 'slug', current: 'mercadolibre-tech-summit' },
    category: { _type: 'reference', _ref: 'cat-corporativo' },
    dateStart: '2025-09-18',
    client: 'MercadoLibre',
    location: 'Centro Metropolitano de Diseño, CABA',
    equipmentUsed: ['Pantalla LED 14×4 Pitch 2.6', 'L-Acoustics ARCS', 'Consola Yamaha CL5', 'GrandMA2'],
    tagsTecnicos: ['LED', 'Sonido', 'Iluminación'],
    featured: true,
  },
  {
    _id: 'event-banco-galicia-aniversario',
    _type: 'event',
    title: 'Banco Galicia — 125 Años',
    subtitle: 'Gala corporativa con show musical en vivo',
    slug: { _type: 'slug', current: 'banco-galicia-aniversario' },
    category: { _type: 'reference', _ref: 'cat-corporativo' },
    dateStart: '2025-06-12',
    client: 'Banco Galicia',
    location: 'Hotel Alvear Palace, Buenos Aires',
    equipmentUsed: ['Moviles Robe Spiider', 'L-Acoustics X8', 'Pantalla LED curva 8×3'],
    tagsTecnicos: ['Iluminación', 'Sonido', 'LED'],
    featured: false,
  },
  // ── Teatro ─────────────────────────────────────────────────────────────────
  {
    _id: 'event-fuerza-bruta',
    _type: 'event',
    title: 'Fuerza Bruta — Wayra',
    subtitle: 'Espectáculo inmersivo de teatro y acrobacia aérea',
    slug: { _type: 'slug', current: 'fuerza-bruta-wayra' },
    category: { _type: 'reference', _ref: 'cat-teatro' },
    dateStart: '2025-04-01',
    dateEnd: '2025-07-31',
    client: 'Fuerza Bruta / Diqui James',
    location: 'Galpón Fuerza Bruta, Palermo',
    equipmentUsed: ['Claypaky B-EYE K20', 'Robe Robin 600E Wash', 'Pantalla flexible LED', 'Line array L-Acoustics'],
    tagsTecnicos: ['Iluminación', 'LED', 'Sonido'],
    featured: true,
  },
  // ── Privados ───────────────────────────────────────────────────────────────
  {
    _id: 'event-casamiento-patagonia',
    _type: 'event',
    title: 'Casamiento Patagonia',
    subtitle: 'Ceremonia y recepción al aire libre — diseño de luz personalizado',
    slug: { _type: 'slug', current: 'casamiento-patagonia' },
    category: { _type: 'reference', _ref: 'cat-privados' },
    dateStart: '2025-02-22',
    client: 'Familia Rodríguez / García',
    location: 'Estancia La Pampa, Neuquén',
    equipmentUsed: ['Par LED RGBW', 'Uplighting perimetral', 'Consola Avolites', 'Sonido QL1'],
    tagsTecnicos: ['Iluminación', 'Sonido'],
    featured: false,
  },
];

// ─── FUNCIÓN PRINCIPAL ────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Iniciando seed en Sanity...\n');

  // createOrReplace — sobrescribe todo (singletons y config)
  const replace = [
    { label: 'Site Settings',        doc: siteSettings },
    { label: 'Hero',                  doc: hero },
    { label: 'Homepage',              doc: homepage },
    { label: 'SEO Defaults',          doc: seoDefaults },
    ...eventCategories.map((d) =>      ({ label: `Cat. Evento: ${d.label}`,  doc: d })),
    ...equipmentCategories.map((d) => ({ label: `Cat. Equipo: ${d.name}`,   doc: d })),
    ...services.map((d) =>            ({ label: `Servicio: ${d.name}`,       doc: d })),
    ...brands.map((d) =>              ({ label: `Marca: ${d.name}`,          doc: d })),
    ...contactCategories.map((d) =>   ({ label: `Contacto: ${d.label}`,      doc: d })),
  ];

  // createIfNotExists — NO sobrescribe; preserva imágenes cargadas por upload-images
  const createOnly = [
    ...events.map((d) =>      ({ label: `Evento: ${d.title}`,  doc: d })),
    ...extraEvents.map((d) => ({ label: `Evento+: ${d.title}`, doc: d })),
  ];

  for (const { label, doc } of replace) {
    try {
      await client.createOrReplace(doc as any);
      console.log(`  ✓ ${label}`);
    } catch (err: any) {
      console.error(`  ✗ ${label}: ${err.message}`);
    }
  }

  for (const { label, doc } of createOnly) {
    try {
      await client.createIfNotExists(doc as any);
      console.log(`  ✓ ${label}`);
    } catch (err: any) {
      console.error(`  ✗ ${label}: ${err.message}`);
    }
  }

  console.log('\n✅ Seed completo. Abrí el Studio para ver el contenido.');
  console.log('   https://topshowpro.sanity.studio\n');
  console.log('💡 Nota: las imágenes (hero, eventos) hay que subirlas manualmente');
  console.log('   desde el Studio — los archivos de imagen no se pueden seedear por URL.');
}

seed().catch(console.error);
