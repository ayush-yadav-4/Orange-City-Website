/** Fast marketplace URLs — avoids redirect hops through /brands or /categories pages */

export function brandUrl(slug: string) {
  return `/marketplace?brand=${encodeURIComponent(slug)}`;
}

export function categoryFilterUrl(category: string) {
  return `/marketplace?category=${encodeURIComponent(category)}`;
}

export const categorySlugToFilter: Record<string, string> = {
  "car-batteries": "car",
  "car": "car",
  "scooty-batteries": "scooty",
  "scooty": "scooty",
  "two-wheeler-battery": "bike",
  "bike-batteries": "bike",
  "bike": "bike",
  "inverter-batteries": "inverter",
  "inverter": "inverter",
  "heavy-engine-batteries": "truck",
  "commercial-truck": "truck",
  "truck": "truck",
  "tractor-agri": "tractor",
  "tractor": "tractor",
  "erickshaw": "erickshaw",
  "inverter-home-ups": "inverter",
};

export function categorySlugUrl(slug: string) {
  return `/categories/${encodeURIComponent(slug)}`;
}
