"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { useSavedProducts } from "@/store/saved-products";
import { parseImages } from "@/lib/utils";
import type { ProductCardData } from "./product-card";
import { cn } from "@/lib/utils";

export function SaveProductButton({ product }: { product: ProductCardData }) {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const { add, remove, isSaved } = useSavedProducts();
  const images = parseImages(product.images);
  const saved = user ? isSaved(user.id, product.id) : false;

  function toggle() {
    if (!user) {
      router.push("/login");
      return;
    }
    if (saved) {
      remove(user.id, product.id);
    } else {
      add(user.id, {
        productId: product.id,
        slug: product.slug,
        name: product.modelName,
        brand: product.brand.name,
        image: images[0] ?? "",
        priceWithExchange: product.priceWithExchange,
        priceWithoutExchange: product.priceWithoutExchange,
        mrp: product.mrp,
      });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border bg-[hsl(var(--card))]/90 shadow-sm backdrop-blur-sm transition",
        saved
          ? "border-brand-500 text-brand-600"
          : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-brand-400 hover:text-brand-600"
      )}
      aria-label={saved ? "Remove from saved" : "Save product"}
    >
      <Heart size={16} className={saved ? "fill-brand-500" : ""} />
    </button>
  );
}
