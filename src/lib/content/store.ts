import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getContentFromDb } from "@/lib/db/content";
import { getDefaultContent } from "./default-content";
import type { SiteContent } from "./types";

const fetchContent = unstable_cache(
  async (): Promise<SiteContent> => {
    try {
      return await getContentFromDb();
    } catch (err) {
      console.error("DB content fetch failed, using defaults:", err);
      return getDefaultContent();
    }
  },
  ["site-content"],
  { revalidate: 120, tags: ["site-content"] }
);

/** Request-deduped + 2min ISR cache — fast repeat navigations */
export const getContent = cache(async (): Promise<SiteContent> => fetchContent());

export function productToCardData(
  product: SiteContent["products"][0],
  brands: SiteContent["brands"]
) {
  const brand = brands.find((b) => b.slug === product.brandSlug);
  return {
    id: product.id,
    slug: product.slug,
    modelName: product.modelName,
    category: product.category,
    capacityAh: product.capacityAh,
    warrantyMonths: product.warrantyMonths,
    mrp: product.mrp,
    priceWithExchange: product.priceWithExchange,
    priceWithoutExchange: product.priceWithoutExchange,
    stockStatus: product.stockStatus,
    images: product.images,
    brand: { name: brand?.name ?? product.brandSlug, slug: product.brandSlug },
    batteryType: product.batteryType,
    vehicles: product.vehicles,
  };
}
