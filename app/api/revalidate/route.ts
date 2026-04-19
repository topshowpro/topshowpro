import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const secret = req.headers.get('x-sanity-secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const tags = [body._type, `${body._type}:${body.slug?.current}`].filter(Boolean);
  tags.forEach((t) => revalidateTag(t, 'default'));
  return NextResponse.json({ revalidated: tags });
}
