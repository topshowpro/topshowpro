import { createClient } from '@sanity/client';

async function checkBrands() {
  const client = createClient({
    projectId: 'e6k6jv3z',
    dataset: 'production',
    apiVersion: '2026-01-01',
    useCdn: false,
    token: 'skbZGvn5ZB5PEX5QOj45lWmTiEs6LPdV4uwK3cQ8PfSnKsdaKXabxQTuuGEKUhrLrBh6M9mTrhGTsgiCwG8G6MgOPRMW8a0kUbV0cY3yYJVGSM9wFWnpreu2G0hTFqEPz2zEo9Zn3g5fU0fA0zym5Fhtw5IKDwF8Qbwoa1PGuYYss7m3zbCA',
  });

  const brands = await client.fetch(`*[_type == "brand"]{ name, logoBw, logo }`);
  console.log('Total Brands:', brands.length);
  brands.forEach(b => {
    console.log(`- ${b.name}: logoBw=${!!b.logoBw}, logo=${!!b.logo}`);
  });
}

checkBrands();
