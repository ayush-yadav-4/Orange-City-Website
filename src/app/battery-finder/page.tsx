import Link from "next/link";
import { BatteryFinder } from "@/components/battery-finder";
import { ProductCard } from "@/components/product-card";
import { featuredProducts } from "@/lib/home-data";
import { ArrowLeft } from "lucide-react";

type SearchParams = {
  q?: string;
  make?: string;
  model?: string;
  locality?: string;
  type?: string;
  capacity?: string;
  brand?: string;
};

export default function BatteryFinderPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const hasFilters = Object.keys(searchParams).length > 0;
  const filterLabel = [
    searchParams.make,
    searchParams.model,
    searchParams.capacity,
    searchParams.brand,
    searchParams.locality,
    searchParams.q,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-10 pb-20">
      <section className="bg-[hsl(var(--muted))]/40 py-10">
        <div className="container-page">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-brand-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="section-title">Battery Finder</h1>
          <p className="section-sub">
            Find the perfect battery for your car or inverter in Nagpur.
          </p>
        </div>
      </section>

      <BatteryFinder />

      {hasFilters && (
        <section className="container-page">
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
            Results for: <span className="text-brand-600">{filterLabel || "All batteries"}</span>
          </h2>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Showing matching batteries available in Nagpur with free doorstep delivery.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
