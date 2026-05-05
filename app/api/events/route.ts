import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";
import { Q_EVENT_CATEGORIES, Q_EVENTS_LIST } from "@/sanity/lib/queries";

export async function GET(req: Request) {
  const url = new URL(req.url);

  if (url.searchParams.has("cats")) {
    const cats = await sanityFetch(Q_EVENT_CATEGORIES, undefined, { tag: "eventCategory", revalidate: 60 });
    return NextResponse.json(cats);
  }
  const category = url.searchParams.get("category") ?? null;
  const events = await sanityFetch(Q_EVENTS_LIST, { category }, { tag: "event", revalidate: 60 });
  return NextResponse.json(events);
}
