export const Q_HERO = `*[_type == "hero"][0]{
  slides[]{
    phrase, accentColor,
    "posterUrl": poster.asset->url,
    "videoUrl": video.asset->url
  },
  bannerAzul{ text, cta }
}`;

export const Q_HOMEPAGE = `{
  "homepage": *[_type == "homepage"][0]{
    intro,
    ctaLabel,
    "manualFeaturedEvents": featuredEvents[]->{
      title, subtitle, "slug": slug.current, dateStart, dateEnd,
      "category": category->{label, "slug": slug.current},
      "heroImage": heroImage.asset->{url, metadata{lqip}}
    }
  },
  "featuredByFlag": *[_type == "event" && featured == true] | order(coalesce(dateStart, _createdAt) desc)[0...6] {
    title, subtitle, "slug": slug.current, dateStart, dateEnd,
    "category": category->{label, "slug": slug.current},
    "heroImage": heroImage.asset->{url, metadata{lqip}}
  },
  "recentEvents": *[_type == "event"] | order(coalesce(dateStart, _createdAt) desc)[0...6] {
    title, subtitle, "slug": slug.current, dateStart, dateEnd,
    "category": category->{label, "slug": slug.current},
    "heroImage": heroImage.asset->{url, metadata{lqip}}
  }
}{
  "intro": homepage.intro,
  "ctaLabel": homepage.ctaLabel,
  "featuredEvents": select(
    count(homepage.manualFeaturedEvents[defined(slug)]) > 0 => homepage.manualFeaturedEvents,
    count(featuredByFlag[defined(slug)]) > 0 => featuredByFlag,
    recentEvents
  )
}`;

export const Q_SITE_SETTINGS = `*[_type == "siteSettings"][0]{
  logo, address, email, phone, schedule, socials, techContact,
  "serviciosHero":    serviciosHero.asset->url,
  "equipamientoHero": equipamientoHero.asset->url,
  "contactoHero":     contactoHero.asset->url
}`;

export const Q_EVENTS_LIST = (category?: string) => `*[_type == "event"${category ? ` && category->slug.current == "${category}"` : ''}] | order(dateStart desc) {
  title, subtitle, "slug": slug.current, dateStart, dateEnd,
  "category": category->{label, "slug": slug.current},
  "heroImage": heroImage.asset->{url, metadata{lqip}}
}`;

export const Q_EVENT_DETAIL = `*[_type == "event" && slug.current == $slug][0]{
  title, subtitle, dateStart, dateEnd, client, location,
  description, equipmentUsed, tagsTecnicos, video,
  "category": category->{label, "slug": slug.current},
  "heroImage": heroImage.asset->{url, metadata{lqip}},
  "gallery": gallery[].asset->{url, metadata{lqip}},
  seo
}`;

export const Q_EVENT_CATEGORIES = `*[_type == "eventCategory"] | order(order asc){ label, "slug": slug.current, icon }`;

export const Q_SERVICES = `*[_type == "service"] | order(order asc){
  name, icon, shortDesc, longDesc, techContact,
  "gallery": gallery[].asset->{url, metadata{lqip}},
  cta
}`;

export const Q_EQUIPMENT_CATEGORIES = `*[_type == "equipmentCategory"] | order(order asc){
  name, "slug": slug.current, description,
  "heroImage": heroImage.asset->url,
  "items": items[]->{
    name,
    "photo": photo.asset->{url, metadata{lqip}},
    "brand": brand->{name}
  }
}`;

export const Q_BRANDS = `*[_type == "brand"] | order(name asc){
  name, website,
  "logoUrl": logoBw.asset->url
}`;

export const Q_CONTACT_CATEGORIES = `*[_type == "contactCategory"] | order(order asc){ label }`;

export const Q_CLIENTS = `*[_type == "client"] | order(order asc){ name, website, "logoUrl": logo.asset->url }`;

export const Q_SEO_DEFAULTS = `*[_type == "seoDefaults"][0]`;
