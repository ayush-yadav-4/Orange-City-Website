import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { getContent, productToCardData } from "@/lib/content/store";

export const revalidate = 30;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const content = await getContent();
  const product = content.products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const card = productToCardData(product, content.brands);
  const brand = content.brands.find((b) => b.slug === product.brandSlug);

  const similar = content.products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.brandSlug === product.brandSlug)
    )
    .slice(0, 4)
    .map((p) => {
      const c = productToCardData(p, content.brands);
      return {
        id: c.id,
        slug: c.slug,
        modelName: c.modelName,
        category: c.category,
        capacityAh: c.capacityAh,
        warrantyMonths: c.warrantyMonths,
        mrp: c.mrp,
        priceWithExchange: c.priceWithExchange,
        priceWithoutExchange: c.priceWithoutExchange,
        stockStatus: c.stockStatus,
        images: c.images,
        brand: c.brand,
      };
    });

  return (
    <ProductDetailView
      product={product}
      brandName={brand?.name ?? product.brandSlug}
      card={card}
      similar={similar}
    />
  );
}
