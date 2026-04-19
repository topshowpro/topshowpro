/**
 * UPLOAD IMAGES — descarga imágenes placeholder de Unsplash y las sube a Sanity
 *
 * Secciones cubiertas:
 *  - Hero slides (poster de fondo)
 *  - Eventos: heroImage + gallery (3 fotos por evento)
 *  - Servicios: gallery (3 fotos por servicio)
 *
 * Correr: pnpm upload-images
 * Es idempotente: Sanity deduplica assets por hash de contenido.
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e6k6jv3z',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ─── CATÁLOGO DE IMÁGENES ────────────────────────────────────────────────────

const IMAGES = {
  // ── Hero slides ─────────────────────────────────────────
  heroSlide1: {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80',
    filename: 'hero-slide-1-concert.jpg',
  },
  heroSlide2: {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
    filename: 'hero-slide-2-stage.jpg',
  },

  // ── Evento: Lizy Tagliani (teatro) ────────────────────
  eventLizyHero: {
    url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920&q=80',
    filename: 'event-lizy-hero.jpg',
  },
  eventLizyGal1: {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
    filename: 'event-lizy-gal-1.jpg',
  },
  eventLizyGal2: {
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    filename: 'event-lizy-gal-2.jpg',
  },
  eventLizyGal3: {
    url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80',
    filename: 'event-lizy-gal-3.jpg',
  },

  // ── Evento: Night Fest Córdoba (festival electrónico) ──
  eventNightFestHero: {
    url: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1920&q=80',
    filename: 'event-nightfest-hero.jpg',
  },
  eventNightFestGal1: {
    url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=1200&q=80',
    filename: 'event-nightfest-gal-1.jpg',
  },
  eventNightFestGal2: {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    filename: 'event-nightfest-gal-2.jpg',
  },
  eventNightFestGal3: {
    url: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=1200&q=80',
    filename: 'event-nightfest-gal-3.jpg',
  },

  // ── Evento: Convención Corporativa (corporate) ─────────
  eventCorpHero: {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
    filename: 'event-corp-hero.jpg',
  },
  eventCorpGal1: {
    url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80',
    filename: 'event-corp-gal-1.jpg',
  },
  eventCorpGal2: {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
    filename: 'event-corp-gal-2.jpg',
  },
  eventCorpGal3: {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
    filename: 'event-corp-gal-3.jpg',
  },

  // ── Servicio: Técnica Teatral ──────────────────────────
  svcTeatralGal1: {
    url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&q=80',
    filename: 'svc-teatral-gal-1.jpg',
  },
  svcTeatralGal2: {
    url: 'https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=1200&q=80',
    filename: 'svc-teatral-gal-2.jpg',
  },
  svcTeatralGal3: {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
    filename: 'svc-teatral-gal-3.jpg',
  },

  // ── Servicio: Rental Discotecas ────────────────────────
  svcDiscoGal1: {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
    filename: 'svc-disco-gal-1.jpg',
  },
  svcDiscoGal2: {
    url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=1200&q=80',
    filename: 'svc-disco-gal-2.jpg',
  },
  svcDiscoGal3: {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    filename: 'svc-disco-gal-3.jpg',
  },

  // ── Servicio: Eventos Corporativos ─────────────────────
  svcCorpGal1: {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    filename: 'svc-corp-gal-1.jpg',
  },
  svcCorpGal2: {
    url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80',
    filename: 'svc-corp-gal-2.jpg',
  },
  svcCorpGal3: {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
    filename: 'svc-corp-gal-3.jpg',
  },

  // ── Servicio: Venta de Equipamiento ───────────────────
  svcVentaGal1: {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    filename: 'svc-venta-gal-1.jpg',
  },
  svcVentaGal2: {
    url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&q=80',
    filename: 'svc-venta-gal-2.jpg',
  },
  svcVentaGal3: {
    url: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1200&q=80',
    filename: 'svc-venta-gal-3.jpg',
  },

  // ── Evento: Amnesia BA (discoteca) ────────────────────────
  eventAmnesiaHero: {
    url: 'https://images.unsplash.com/photo-1571266028243-d220c6a0b1e4?w=1920&q=80',
    filename: 'event-amnesia-hero.jpg',
  },
  eventAmnesiaGal1: {
    url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=1200&q=80',
    filename: 'event-amnesia-gal-1.jpg',
  },
  eventAmnesiaGal2: {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    filename: 'event-amnesia-gal-2.jpg',
  },

  // ── Evento: Creamfields (discoteca) ───────────────────────
  eventCreamHero: {
    url: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1920&q=80',
    filename: 'event-cream-hero.jpg',
  },
  eventCreamGal1: {
    url: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=1200&q=80',
    filename: 'event-cream-gal-1.jpg',
  },

  // ── Evento: MercadoLibre Summit (corporativo) ─────────────
  eventMLHero: {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
    filename: 'event-ml-hero.jpg',
  },
  eventMLGal1: {
    url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80',
    filename: 'event-ml-gal-1.jpg',
  },
  eventMLGal2: {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
    filename: 'event-ml-gal-2.jpg',
  },

  // ── Evento: Banco Galicia (corporativo) ───────────────────
  eventGaliciaHero: {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
    filename: 'event-galicia-hero.jpg',
  },
  eventGaliciaGal1: {
    url: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=1200&q=80',
    filename: 'event-galicia-gal-1.jpg',
  },

  // ── Evento: Fuerza Bruta (teatro) ─────────────────────────
  eventFuerzaHero: {
    url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920&q=80',
    filename: 'event-fuerza-hero.jpg',
  },
  eventFuerzaGal1: {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
    filename: 'event-fuerza-gal-1.jpg',
  },
  eventFuerzaGal2: {
    url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80',
    filename: 'event-fuerza-gal-2.jpg',
  },

  // ── Evento: Casamiento Patagonia (privados) ───────────────
  eventCasamientoHero: {
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80',
    filename: 'event-casamiento-hero.jpg',
  },
  eventCasamientoGal1: {
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80',
    filename: 'event-casamiento-gal-1.jpg',
  },

  // ── Page headers ──────────────────────────────────────
  pageServiciosHero: {
    url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=1920&q=80',
    filename: 'page-servicios-hero.jpg',
  },
  pageEquipamientoHero: {
    url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1920&q=80',
    filename: 'page-equipamiento-hero.jpg',
  },
  pageContactoHero: {
    url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80',
    filename: 'page-contacto-hero.jpg',
  },

  // ── Equipment category images ─────────────────────────
  catIluminacion: {
    url: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=1920&q=80',
    filename: 'cat-iluminacion.jpg',
  },
  catSonido: {
    url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1920&q=80',
    filename: 'cat-sonido.jpg',
  },
  catStage: {
    url: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1920&q=80',
    filename: 'cat-stage.jpg',
  },
  catLed: {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80',
    filename: 'cat-led.jpg',
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadToSanity(buffer: Buffer, filename: string): Promise<string> {
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  });
  return asset._id;
}

async function upload(key: string): Promise<string | null> {
  const entry = IMAGES[key as keyof typeof IMAGES];
  try {
    process.stdout.write(`  ⬇  ${entry.filename} … `);
    const buffer = await downloadImage(entry.url);
    const id = await uploadToSanity(buffer, entry.filename);
    console.log(`✓ ${id}`);
    return id;
  } catch (err: any) {
    console.log(`✗ ${err.message}`);
    return null;
  }
}

function imageRef(assetId: string, key: string) {
  return {
    _key: key,
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: assetId },
  };
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function uploadImages() {
  console.log('📸 Subiendo imágenes a Sanity…\n');

  // ── 1. Hero slides ───────────────────────────────────────────────────────
  console.log('── Hero');
  const slide1 = await upload('heroSlide1');
  const slide2 = await upload('heroSlide2');

  if (slide1 || slide2) {
    try {
      await client.patch('hero').set({
        ...(slide1 && { 'slides[0].poster': { _type: 'image', asset: { _type: 'reference', _ref: slide1 } } }),
        ...(slide2 && { 'slides[1].poster': { _type: 'image', asset: { _type: 'reference', _ref: slide2 } } }),
      }).commit();
      console.log('  → Hero slides vinculados\n');
    } catch (e: any) { console.error('  ✗ Hero patch:', e.message, '\n'); }
  }

  // ── 2. Eventos ───────────────────────────────────────────────────────────
  const eventDefs = [
    {
      id: 'event-lizy-tagliani',
      label: 'Lizy Tagliani',
      heroKey: 'eventLizyHero',
      galKeys: ['eventLizyGal1', 'eventLizyGal2', 'eventLizyGal3'],
    },
    {
      id: 'event-night-fest',
      label: 'Night Fest',
      heroKey: 'eventNightFestHero',
      galKeys: ['eventNightFestGal1', 'eventNightFestGal2', 'eventNightFestGal3'],
    },
    {
      id: 'event-convencion-xyz',
      label: 'Convención XYZ',
      heroKey: 'eventCorpHero',
      galKeys: ['eventCorpGal1', 'eventCorpGal2', 'eventCorpGal3'],
    },
  ];

  for (const ev of eventDefs) {
    console.log(`── Evento: ${ev.label}`);
    const heroId = await upload(ev.heroKey);
    const galIds = await Promise.all(ev.galKeys.map(upload));

    try {
      const patch: Record<string, any> = {};
      if (heroId) patch.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: heroId } };
      const validGal = galIds.filter(Boolean) as string[];
      if (validGal.length) {
        patch.gallery = validGal.map((id, i) => imageRef(id, `gal${i}`));
      }
      await client.patch(ev.id).set(patch).commit();
      console.log(`  → ${ev.label} vinculado\n`);
    } catch (e: any) { console.error(`  ✗ ${ev.label} patch:`, e.message, '\n'); }
  }

  // ── 2b. Eventos adicionales ──────────────────────────────────────────────
  const extraEventDefs = [
    {
      id: 'event-amnesia-ba',
      label: 'Amnesia BA',
      heroKey: 'eventAmnesiaHero',
      galKeys: ['eventAmnesiaGal1', 'eventAmnesiaGal2'],
    },
    {
      id: 'event-creamfields-2025',
      label: 'Creamfields 2025',
      heroKey: 'eventCreamHero',
      galKeys: ['eventCreamGal1'],
    },
    {
      id: 'event-mercadolibre-summit',
      label: 'MercadoLibre Summit',
      heroKey: 'eventMLHero',
      galKeys: ['eventMLGal1', 'eventMLGal2'],
    },
    {
      id: 'event-banco-galicia-aniversario',
      label: 'Banco Galicia',
      heroKey: 'eventGaliciaHero',
      galKeys: ['eventGaliciaGal1'],
    },
    {
      id: 'event-fuerza-bruta',
      label: 'Fuerza Bruta',
      heroKey: 'eventFuerzaHero',
      galKeys: ['eventFuerzaGal1', 'eventFuerzaGal2'],
    },
    {
      id: 'event-casamiento-patagonia',
      label: 'Casamiento Patagonia',
      heroKey: 'eventCasamientoHero',
      galKeys: ['eventCasamientoGal1'],
    },
  ];

  for (const ev of extraEventDefs) {
    console.log(`── Evento: ${ev.label}`);
    const heroId = await upload(ev.heroKey);
    const galIds = await Promise.all(ev.galKeys.map(upload));

    try {
      const patch: Record<string, any> = {};
      if (heroId) patch.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: heroId } };
      const validGal = galIds.filter(Boolean) as string[];
      if (validGal.length) {
        patch.gallery = validGal.map((id, i) => imageRef(id, `gal${i}`));
      }
      await client.patch(ev.id).set(patch).commit();
      console.log(`  → ${ev.label} vinculado\n`);
    } catch (e: any) { console.error(`  ✗ ${ev.label} patch:`, e.message, '\n'); }
  }

  // ── 3. Servicios ─────────────────────────────────────────────────────────
  const serviceDefs = [
    {
      id: 'service-teatral',
      label: 'Técnica Teatral',
      galKeys: ['svcTeatralGal1', 'svcTeatralGal2', 'svcTeatralGal3'],
    },
    {
      id: 'service-discotecas',
      label: 'Rental Discotecas',
      galKeys: ['svcDiscoGal1', 'svcDiscoGal2', 'svcDiscoGal3'],
    },
    {
      id: 'service-corporativos',
      label: 'Eventos Corporativos',
      galKeys: ['svcCorpGal1', 'svcCorpGal2', 'svcCorpGal3'],
    },
    {
      id: 'service-venta',
      label: 'Venta Equipamiento',
      galKeys: ['svcVentaGal1', 'svcVentaGal2', 'svcVentaGal3'],
    },
  ];

  for (const svc of serviceDefs) {
    console.log(`── Servicio: ${svc.label}`);
    const galIds = await Promise.all(svc.galKeys.map(upload));
    const validGal = galIds.filter(Boolean) as string[];

    if (validGal.length) {
      try {
        await client.patch(svc.id).set({
          gallery: validGal.map((id, i) => imageRef(id, `gal${i}`)),
        }).commit();
        console.log(`  → ${svc.label} galería vinculada\n`);
      } catch (e: any) { console.error(`  ✗ ${svc.label} patch:`, e.message, '\n'); }
    }
  }

  // ── 4. Page heroes → siteSettings ───────────────────────────────────────
  console.log('── Page heroes');
  const [pgServicios, pgEquip, pgContacto] = await Promise.all([
    upload('pageServiciosHero'),
    upload('pageEquipamientoHero'),
    upload('pageContactoHero'),
  ]);

  if (pgServicios || pgEquip || pgContacto) {
    try {
      const patch: Record<string, any> = {};
      if (pgServicios) patch.serviciosHero    = { _type: 'image', asset: { _type: 'reference', _ref: pgServicios } };
      if (pgEquip)     patch.equipamientoHero = { _type: 'image', asset: { _type: 'reference', _ref: pgEquip } };
      if (pgContacto)  patch.contactoHero     = { _type: 'image', asset: { _type: 'reference', _ref: pgContacto } };
      await client.patch('siteSettings').set(patch).commit();
      console.log('  → siteSettings page heroes vinculados\n');
    } catch (e: any) { console.error('  ✗ siteSettings patch:', e.message, '\n'); }
  }

  // ── 5. Equipment category images ─────────────────────────────────────────
  const catDefs = [
    { id: 'cat-iluminacion', key: 'catIluminacion', label: 'Iluminación' },
    { id: 'cat-sonido',      key: 'catSonido',      label: 'Sonido' },
    { id: 'cat-stage',       key: 'catStage',       label: 'Stage' },
    { id: 'cat-led',         key: 'catLed',         label: 'Pantallas LED' },
  ];

  for (const cat of catDefs) {
    console.log(`── Cat: ${cat.label}`);
    const id = await upload(cat.key);
    if (id) {
      try {
        await client.patch(cat.id).set({ heroImage: { _type: 'image', asset: { _type: 'reference', _ref: id } } }).commit();
        console.log(`  → ${cat.label} vinculado\n`);
      } catch (e: any) { console.error(`  ✗ ${cat.label}:`, e.message, '\n'); }
    }
  }

  console.log('✅ Listo. Revisá el Studio: https://topshowpro.sanity.studio');
}

uploadImages().catch(console.error);
