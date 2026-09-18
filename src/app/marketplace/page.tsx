import { Suspense } from "react";
import { Metadata } from "next";
import { MarketplaceCatalog } from "@/components/marketplace-catalog";
import { CatalogSkeleton } from "@/components/catalog-skeleton";
import { getContent, productToCardData } from "@/lib/content/store";

export const metadata: Metadata = {
  title: "Battery Marketplace | Orange City Batteries — Nagpur",
  description: "Shop car, bike, inverter & truck batteries online in Nagpur. Filter by brand, vehicle make & model.",
};

export const revalidate = 120;

export default async function MarketplacePage() {
  const content = await getContent();
  const products = content.products.map((p) => productToCardData(p, content.brands));

  return (
    <div className="section-spacing">
      <div className="container-page">
        <Suspense fallback={<CatalogSkeleton />}>
          <MarketplaceCatalog products={products} vehicleModels={content.vehicleModels} />
        </Suspense>
      </div>
    </div>
  );
}
