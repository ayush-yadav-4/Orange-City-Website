import { Suspense } from "react";
import { Metadata } from "next";
import { getContent, productToCardData } from "@/lib/content/store";
import { CategoryVehicleBrowser } from "@/components/category-vehicle-browser";
import { CatalogSkeleton } from "@/components/catalog-skeleton";

export const metadata: Metadata = {
  title: "Shop Batteries by Category & Vehicle | Orange City Batteries",
  description:
    "Find car, scooty, bike, truck, tractor & inverter batteries in Nagpur. Select your vehicle company and model to view guaranteed fit batteries.",
};

export const revalidate = 120;

export default async function CategoriesPage() {
  const content = await getContent();
  const products = content.products.map((p) => productToCardData(p, content.brands));

  return (
    <div className="container-page py-8 sm:py-12">
      <Suspense fallback={<CatalogSkeleton />}>
        <CategoryVehicleBrowser
          initialCategory="car"
          products={products}
          vehicleModels={content.vehicleModels}
        />
      </Suspense>
    </div>
  );
}
