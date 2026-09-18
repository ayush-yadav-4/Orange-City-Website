import { categorySlugUrl } from "@/lib/marketplace-url";

export type SearchSuggestion =
  | {
      type: "category";
      id: string;
      label: string;
      sublabel?: string;
      href: string;
      icon?: string;
    }
  | {
      type: "product";
      id: string;
      label: string;
      sublabel?: string;
      href: string;
    };

export type SearchProduct = {
  id: string;
  slug: string;
  modelName: string;
  category: string;
  brandName: string;
  brandSlug: string;
};

const CATEGORY_MATCHES: {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  icon: string;
  keywords: string[];
}[] = [
  {
    id: "car",
    label: "Car Batteries",
    sublabel: "Sedan, SUV & hatchback",
    href: categorySlugUrl("car-batteries"),
    icon: "🚗",
    keywords: ["car", "cars", "suv", "sedan", "hatchback", "automobile", "vehicle", "swift", "i20", "creta", "wagonr"],
  },
  {
    id: "bike",
    label: "Bike / Scooter Batteries",
    sublabel: "Two-wheeler batteries",
    href: categorySlugUrl("two-wheeler-battery"),
    icon: "🏍️",
    keywords: ["bike", "bikes", "scooter", "scooters", "two wheeler", "motorcycle", "activa", "splendor", "pulsar", "honda", "hero"],
  },
  {
    id: "truck",
    label: "Truck Batteries",
    sublabel: "Heavy commercial vehicles",
    href: categorySlugUrl("heavy-engine-batteries"),
    icon: "🚚",
    keywords: ["truck", "trucks", "tempo", "commercial", "heavy", "bus", "lorry", "tata ace", "bolero pickup"],
  },
  {
    id: "inverter",
    label: "Inverter Batteries",
    sublabel: "Home & shop backup",
    href: categorySlugUrl("inverter-batteries"),
    icon: "⚡",
    keywords: ["inverter", "ups", "home backup", "tubular", "solar"],
  },
];

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function matchesQuery(text: string, query: string) {
  const n = normalize(text);
  const q = normalize(query);
  return n.includes(q) || q.split(/\s+/).every((word) => word.length > 1 && n.includes(word));
}

export function getCategorySuggestions(query: string): SearchSuggestion[] {
  const q = normalize(query);
  if (!q) return [];

  return CATEGORY_MATCHES
    .filter((cat) =>
      cat.keywords.some((kw) => kw.includes(q) || q.includes(kw) || matchesQuery(kw, q))
    )
    .map((cat) => ({
      type: "category" as const,
      id: cat.id,
      label: cat.label,
      sublabel: cat.sublabel,
      href: cat.href,
      icon: cat.icon,
    }));
}

export function getProductSuggestions(query: string, products: SearchProduct[], limit = 6): SearchSuggestion[] {
  const q = normalize(query);
  if (!q || q.length < 2) return [];

  const scored = products
    .map((p) => {
      const haystack = `${p.modelName} ${p.brandName} ${p.category} ${p.slug}`.toLowerCase();
      let score = 0;
      if (p.modelName.toLowerCase().startsWith(q)) score += 10;
      if (p.modelName.toLowerCase().includes(q)) score += 6;
      if (p.brandName.toLowerCase().includes(q)) score += 4;
      if (haystack.includes(q)) score += 2;
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ p }) => ({
    type: "product" as const,
    id: p.id,
    label: p.modelName,
    sublabel: p.brandName,
    href: `/products/${p.slug}`,
  }));
}

export function getSearchSuggestions(
  query: string,
  products: SearchProduct[],
  opts?: { productLimit?: number }
): { categories: SearchSuggestion[]; products: SearchSuggestion[] } {
  const categories = getCategorySuggestions(query);
  const productItems = getProductSuggestions(query, products, opts?.productLimit ?? 6);
  return { categories, products: productItems };
}
