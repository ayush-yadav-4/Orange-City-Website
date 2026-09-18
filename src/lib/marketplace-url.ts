/** Fast marketplace URLs — avoids redirect hops through /brands or /categories pages */

export function brandUrl(slug: string) {
  return `/marketplace?brand=${encodeURIComponent(slug)}`;
}

export function categoryFilterUrl(category: string) {
  return `/marketplace?category=${encodeURIComponent(category)}`;
}

export const categorySlugToFilter: Record<string, string> = {
  "car-batteries": "car",
  "two-wheeler-battery": "bike",
  "inverter-batteries": "inverter",
  "heavy-engine-batteries": "truck",
  "inverter-home-ups": "inverter",
};

export function categorySlugUrl(slug: string) {
  const category = categorySlugToFilter[slug];
  return category ? categoryFilterUrl(category) : "/marketplace";
}
