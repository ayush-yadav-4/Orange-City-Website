import { Metadata } from "next";
import Link from "next/link";
import { brandUrl } from "@/lib/marketplace-url";

export const metadata: Metadata = {
  title: "Brands | Orange City Batteries",
  description: "Shop batteries by top brands.",
};

const brands = [
  { name: "Exide", slug: "exide", description: "India's leading battery manufacturer." },
  { name: "Amaron", slug: "amaron", description: "Long-lasting batteries with advanced technology." },
  { name: "Luminous", slug: "luminous", description: "Reliable power backup solutions." },
  { name: "Microtek", slug: "microtek", description: "Premium inverter and UPS batteries." },
  { name: "SF Sonic", slug: "sf-sonic", description: "High-performance automotive batteries." },
];

export default function BrandsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-center font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
        Shop By Brand
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[hsl(var(--muted-foreground))]">
        Browse our extensive collection of batteries from the most trusted brands in the industry.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={brandUrl(brand.slug)}
            prefetch
            className="group flex flex-col items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center transition hover:border-brand-400 hover:shadow-soft"
          >
            <h3 className="font-display text-2xl font-semibold text-[hsl(var(--foreground))] group-hover:text-brand-600">
              {brand.name}
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              {brand.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
