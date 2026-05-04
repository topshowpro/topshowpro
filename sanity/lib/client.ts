import { createClient, type SanityClient, type QueryParams } from '@sanity/client';
import { draftMode } from 'next/headers';
import { apiVersion, dataset, hasSanity, projectId } from '../env';

type SanityReadMode = 'published' | 'draft';

type SanityFetchOptions = {
  tag?: string;
  mode?: SanityReadMode | 'auto';
  revalidate?: number;
};

const DEFAULT_REVALIDATE_SECONDS = 300;

export const publishedSanityClient: SanityClient | null = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

export const previewSanityClient: SanityClient | null = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'drafts',
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

export const sanityClient = publishedSanityClient;

function normalizeFetchOptions(tagOrOptions?: string | SanityFetchOptions): SanityFetchOptions {
  if (typeof tagOrOptions === 'string') {
    return { tag: tagOrOptions };
  }

  return tagOrOptions ?? {};
}

async function resolveReadMode(mode: SanityFetchOptions['mode'] = 'auto'): Promise<SanityReadMode> {
  if (mode && mode !== 'auto') return mode;

  try {
    const { isEnabled } = await draftMode();
    return isEnabled ? 'draft' : 'published';
  } catch {
    return 'published';
  }
}

function getReadClient(mode: SanityReadMode): SanityClient | null {
  return mode === 'draft' ? previewSanityClient : publishedSanityClient;
}

function buildFetchCacheOptions(mode: SanityReadMode, tag?: string, revalidate = DEFAULT_REVALIDATE_SECONDS) {
  if (mode === 'draft') {
    return { cache: 'no-store' as const };
  }

  const tags = tag ? [tag] : undefined;
  return {
    cache: 'force-cache' as const,
    next: {
      revalidate,
      tags,
    },
  };
}

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  tagOrOptions?: string | SanityFetchOptions,
): Promise<T> {
  const options = normalizeFetchOptions(tagOrOptions);
  const mode = await resolveReadMode(options.mode);
  const readClient = getReadClient(mode);

  if (!readClient) {
    console.warn(`[Sanity] Fetch called but no client available. Query: ${query.substring(0, 50)}...`);
    return null as T;
  }

  return readClient.fetch<T>(
    query,
    (params ?? {}) as QueryParams,
    buildFetchCacheOptions(mode, options.tag, options.revalidate),
  );
}
