import { NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EVENT_CATEGORIES, Q_EVENTS_LIST } from '@/sanity/lib/queries';

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.has('cats')) {
    const cats = await sanityFetch<any[]>(Q_EVENT_CATEGORIES, undefined, 'eventCategory');
    return NextResponse.json(cats);
  }
  const category = url.searchParams.get('category') ?? undefined;
  const events = await sanityFetch<any[]>(Q_EVENTS_LIST(category), undefined, 'event');
  return NextResponse.json(events);
}
