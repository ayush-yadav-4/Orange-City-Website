import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryLabel, discountPercent, formatINR, parseImages, stockLabel } from "@/lib/utils";
import { brandUrl } from "@/lib/marketplace-url";
import { SaveProductButton } from "./save-product-button";

export type ProductCardData = {
  id: string;
  slug: string;
  modelName: string;
  category: string;
  capacityAh: number;
  warrantyMonths: number;
  mrp: number;
  priceWithExchange: number;
  priceWithoutExchange: number;
  stockStatus: string;
  images: string;
  brand: { name: string; slug: string };
};

export const ProductCard = memo(function ProductCard({ product }: { product: ProductCardData }) {
  const images = parseImages(product.images);
  const off = discountPercent(product.mrp, product.priceWithExchange);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition hover:border-brand-400/60 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-ink-100 dark:bg-ink-900">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={`${product.brand.name} ${product.modelName} battery in Nagpur`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
            No image
          </div>
        )}
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-brand-600 px-2 py-1 text-xs font-bold text-white">
            {off}% OFF
          </span>
        )}
        <SaveProductButton product={product} />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link
            href={brandUrl(product.brand.slug)}
            prefetch
            className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400"
          >
            {product.brand.name}
          </Link>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
            <Link href={`/products/${product.slug}`} className="hover:text-brand-700 dark:hover:text-brand-300">
              {product.modelName}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            {categoryLabel(product.category)} · {product.capacityAh}Ah · {product.warrantyMonths} mo warranty
          </p>
        </div>

        <div className="mt-auto space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[hsl(var(--foreground))]">
              {formatINR(product.priceWithExchange)}
            </span>
            <span className="text-sm text-[hsl(var(--muted-foreground))] line-through">
              {formatINR(product.mrp)}
            </span>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            With exchange · Without: {formatINR(product.priceWithoutExchange)}
          </p>
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {stockLabel(product.stockStatus)}
          </p>
        </div>

        <Link href={`/products/${product.slug}`} className="btn-primary w-full text-center">
          View price & buy
        </Link>
      </div>
    </article>
  );
});
