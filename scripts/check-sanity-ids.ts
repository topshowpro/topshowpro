import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

async function check() {
  const clients = await client.fetch('*[_type == "client"]{_id, name}');
  console.log('Clients with IDs:', JSON.stringify(clients, null, 2));
}

check();
