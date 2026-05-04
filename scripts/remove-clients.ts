import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function removeClients() {
  const idsToRemove = [
    'client-banco-galicia',
    'client-lollapalooza',
    'client-mercadolibre'
  ];

  console.log('Removing phantom clients from Sanity...');

  for (const id of idsToRemove) {
    try {
      await client.delete(id);
      console.log(`✓ Deleted ${id}`);
    } catch (err: any) {
      console.error(`✗ Error deleting ${id}:`, err.message);
    }
  }

  console.log('Done.');
}

removeClients();
