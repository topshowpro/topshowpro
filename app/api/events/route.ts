import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";
import { Q_EVENT_CATEGORIES, Q_EVENTS_LIST } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const headers = { "Cache-Control": "no-store" };

  if (url.searchParams.has("cats")) {
    const cats = await sanityFetch(Q_EVENT_CATEGORIES, undefined, { tag: "eventCategory", revalidate: 30 });
    return NextResponse.json(cats, { headers });
  }
  const category = url.searchParams.get("category") ?? null;
  const events = await sanityFetch(Q_EVENTS_LIST, { category }, { tag: "event", revalidate: 30 });
  return NextResponse.json(events, { headers });
}
