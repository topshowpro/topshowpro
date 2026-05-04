import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Use WRITE token for patching
});

async function sync() {
  console.log('Starting Sanity data sync...');

  const updates = [
    { id: 'client-banco-galicia', name: 'Banco Galicia' },
    { id: 'client-bafici', name: 'BAFICI' },
    { id: 'client-hard-rock', name: 'Hard Rock Cafe BA' },
    { id: 'client-luna-park', name: 'Luna Park' },
    { id: 'client-mercadolibre', name: 'MercadoLibre' },
  ];

  for (const update of updates) {
    try {
      await client
        .patch(update.id)
        .set({ name: update.name })
        .commit();
      console.log(`Updated ${update.id} to "${update.name}"`);
    } catch (err: any) {
      if (err.statusCode === 404) {
        console.warn(`Document ${update.id} not found, creating it...`);
        await client.createIfNotExists({
          _id: update.id,
          _type: 'client',
          name: update.name,
        });
      } else {
        console.error(`Error updating ${update.id}:`, err.message);
      }
    }
  }

  console.log('Sync completed.');
}

sync();
