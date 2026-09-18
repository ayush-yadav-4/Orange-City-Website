import { Metadata } from "next";
import Link from "next/link";
import { categorySlugUrl } from "@/lib/marketplace-url";
import { Car, Zap, BatteryCharging, Truck, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Categories | Orange City Batteries",
  description: "Browse batteries by category.",
};

const categories = [
  { name: "Car Batteries", slug: "car-batteries", icon: Car },
  { name: "Inverter Batteries", slug: "inverter-batteries", icon: Zap },
  { name: "Inverter & Home UPS", slug: "inverter-home-ups", icon: ShieldAlert },
  { name: "Two Wheeler Battery", slug: "two-wheeler-battery", icon: BatteryCharging },
  { name: "Heavy Engine Batteries", slug: "heavy-engine-batteries", icon: Truck },
];

export default function CategoriesPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-center font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
        Shop By Category
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[hsl(var(--muted-foreground))]">
        Find the perfect battery for your specific vehicle or application.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              href={categorySlugUrl(category.slug)}
              prefetch
              className="group flex flex-col items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center transition hover:border-brand-400 hover:shadow-soft"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                <Icon size={32} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-[hsl(var(--foreground))] group-hover:text-brand-600">
                {category.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
