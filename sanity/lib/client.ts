import { createClient, type SanityClient, type QueryParams } from '@sanity/client';
import { apiVersion, dataset, hasSanity, projectId } from '../env';
import { mockSanity } from '@/lib/mock-data';

export const sanityClient: SanityClient | null = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>, tag?: string): Promise<T> {
  if (!sanityClient) return mockSanity.resolve<T>(query, params);
  return sanityClient.fetch<T>(query, (params ?? {}) as QueryParams, {
    next: { tags: tag ? [tag] : undefined, revalidate: 3600 },
  });
}
