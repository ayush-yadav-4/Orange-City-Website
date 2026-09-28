import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, productToCardData } from "@/lib/content/store";
import { categoryMeta } from "@/lib/marketplace-data";
import { CategoryVehicleBrowser } from "@/components/category-vehicle-browser";
import { CatalogSkeleton } from "@/components/catalog-skeleton";

type Props = { params: { slug: string } };

export const revalidate = 120;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = categoryMeta[params.slug];
  if (!meta) {
    return { title: "Category Not Found | Orange City Batteries" };
  }
  return {
    title: `${meta.title} in Nagpur — Doorstep Fitment | Orange City Batteries`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const meta = categoryMeta[params.slug];
  if (!meta) notFound();

  const content = await getContent();
  const products = content.products.map((p) => productToCardData(p, content.brands));

  return (
    <div className="container-page py-8 sm:py-12">
      <Suspense fallback={<CatalogSkeleton />}>
        <CategoryVehicleBrowser
          initialCategory={meta.category}
          products={products}
          vehicleModels={content.vehicleModels}
        />
      </Suspense>
    </div>
  );
}
