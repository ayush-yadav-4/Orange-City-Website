"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./product-card";
import {
  filterProducts,
  getModelsForMake,
  getUniqueMakes,
  type MarketplaceProduct,
} from "@/lib/marketplace-data";
import { carMakes, carModels, inverterCapacities } from "@/lib/home-data";
import { categoryFilterUrl } from "@/lib/marketplace-url";

type Props = {
  products: MarketplaceProduct[];
  vehicleModels?: Record<string, Record<string, string[]>>;
  defaultCategory?: string;
  title?: string;
  description?: string;
  showVehicleFilters?: boolean;
};

const CATEGORY_TABS = [
  { value: "", label: "All" },
  { value: "car", label: "Car" },
  { value: "scooty", label: "Scooty" },
  { value: "bike", label: "Bike" },
  { value: "truck", label: "Commercial" },
  { value: "tractor", label: "Tractor" },
  { value: "erickshaw", label: "E-Rickshaw" },
  { value: "inverter", label: "Inverter" },
] as const;

export function MarketplaceCatalog({
  products: allProducts,
  vehicleModels = {},
  defaultCategory,
  title = "Battery Marketplace",
  description = "Browse genuine batteries with transparent pricing — filter by brand, vehicle, or capacity.",
  showVehicleFilters = true,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState(defaultCategory || "");
  const [showFilters, setShowFilters] = useState(false);

  // Sync filters when URL changes (nav from header/home)
  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setBrand(searchParams.get("brand") || "");
    setMake(searchParams.get("make") || "");
    setModel(searchParams.get("model") || "");
    setCapacity(searchParams.get("capacity") || "");
    const urlCategory = searchParams.get("category");
    setCategory(urlCategory || defaultCategory || "");
  }, [searchParams, defaultCategory]);

  const updateUrl = useCallback(
    (patch: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      startTransition(() => {
        router.replace(`/marketplace?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams, startTransition]
  );

  const categoryProducts = useMemo(() => {
    if (!category) return allProducts;
    return allProducts.filter((p) => p.category === category);
  }, [allProducts, category]);

  const filtered = useMemo(
    () =>
      filterProducts(categoryProducts, {
        category: category || undefined,
        brand: brand || undefined,
        make: make || undefined,
        model: model || undefined,
        capacity: capacity || undefined,
        search: search || undefined,
      }),
    [categoryProducts, brand, make, model, capacity, search, category]
  );

  const brands = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.brand.slug));
    return Array.from(set).map((slug) => {
      const p = categoryProducts.find((x) => x.brand.slug === slug)!;
      return { slug, name: p.brand.name };
    });
  }, [categoryProducts]);

  const makes = useMemo(() => {
    const fromAdmin = vehicleModels[category] ? Object.keys(vehicleModels[category]) : [];
    if (fromAdmin.length) return fromAdmin;
    if (category === "bike") return ["Honda", "Hero", "TVS", "Bajaj", "Suzuki", "Yamaha"];
    if (category === "car" || category === "truck")
      return getUniqueMakes(categoryProducts).length ? getUniqueMakes(categoryProducts) : carMakes;
    return [];
  }, [categoryProducts, category, vehicleModels]);

  const models = useMemo(() => {
    if (!make) return [];
    const fromAdmin = vehicleModels[category]?.[make];
    if (fromAdmin?.length) return fromAdmin;
    const fromProducts = getModelsForMake(categoryProducts, make);
    return fromProducts.length ? fromProducts : carModels[make] || [];
  }, [categoryProducts, make, category, vehicleModels]);

  const isVehicleCategory =
    category === "car" ||
    category === "scooty" ||
    category === "bike" ||
    category === "truck" ||
    category === "tractor" ||
    category === "erickshaw";

  function applySearch() {
    updateUrl({ q: search, brand, make, model, capacity, category });
  }

  function clearFilters() {
    setSearch("");
    setBrand("");
    setMake("");
    setModel("");
    setCapacity("");
    setCategory(defaultCategory || "");
    startTransition(() => {
      router.replace(defaultCategory ? `/marketplace?category=${defaultCategory}` : "/marketplace", { scroll: false });
    });
  }

  const activeFilterCount = [brand, make, model, capacity, category !== defaultCategory ? category : ""].filter(Boolean).length;

  return (
    <div className={`pb-4 transition-opacity duration-150 ${isPending ? "opacity-70" : "opacity-100"}`}>
      <div className="mb-6 rounded-xl border-2 border-brand-300 bg-[hsl(var(--card))] p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-600" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applySearch()}
              placeholder="Search by brand, model, vehicle or capacity..."
              className="w-full rounded-md border-2 border-[hsl(var(--border))] bg-white py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:bg-[hsl(var(--background))]"
            />
          </div>

          {showVehicleFilters && isVehicleCategory && (
            <>
              <select
                value={make}
                onChange={(e) => {
                  const v = e.target.value;
                  setMake(v);
                  setModel("");
                  updateUrl({ make: v, model: "", brand, capacity, category, q: search });
                }}
                className="select-field lg:w-48"
              >
                <option value="">Select {category === "bike" ? "Brand" : "Manufacturer"}</option>
                {makes.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select
                value={model}
                onChange={(e) => {
                  const v = e.target.value;
                  setModel(v);
                  updateUrl({ model: v, make, brand, capacity, category, q: search });
                }}
                disabled={!make}
                className="select-field lg:w-44 disabled:opacity-50"
              >
                <option value="">Select Model</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </>
          )}

          {(category === "inverter" || !category) && (
            <select
              value={capacity}
              onChange={(e) => {
                const v = e.target.value;
                setCapacity(v);
                updateUrl({ capacity: v, brand, make, model, category, q: search });
              }}
              className="select-field lg:w-36"
            >
              <option value="">Capacity</option>
              {inverterCapacities.map((c) => <option key={c} value={c.replace(" AH", "")}>{c}</option>)}
            </select>
          )}

          <button type="button" onClick={applySearch} className="btn-primary shrink-0 px-8 py-3">
            <Search size={16} />
            Find Battery
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
          <p className="mt-1 text-xs font-semibold text-brand-600">{filtered.length} products found</p>
        </div>
        <button type="button" onClick={() => setShowFilters(!showFilters)} className="btn-secondary gap-2 lg:hidden">
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {!defaultCategory && (
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value ? categoryFilterUrl(tab.value) : "/marketplace"}
              prefetch
              className={`rounded-sm px-4 py-2 text-sm font-bold transition ${
                category === tab.value
                  ? "bg-brand-600 text-white"
                  : "border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-brand-400"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="surface sticky top-28 space-y-5 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Filters</h3>
              {activeFilterCount > 0 && (
                <button type="button" onClick={clearFilters} className="flex items-center gap-1 text-xs font-semibold text-brand-600">
                  <X size={14} /> Clear all
                </button>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Brand</label>
              <div className="space-y-1.5">
                {brands.map((b) => (
                  <label key={b.slug} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === b.slug}
                      onChange={() => {
                        setBrand(b.slug);
                        updateUrl({ brand: b.slug, make, model, capacity, category, q: search });
                      }}
                      className="accent-brand-600"
                    />
                    {b.name}
                  </label>
                ))}
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="brand"
                    checked={!brand}
                    onChange={() => {
                      setBrand("");
                      updateUrl({ brand: "", make, model, capacity, category, q: search });
                    }}
                    className="accent-brand-600"
                  />
                  All Brands
                </label>
              </div>
            </div>

            {isVehicleCategory && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                    {category === "bike" ? "Bike Brand" : "Manufacturer"}
                  </label>
                  <select
                    value={make}
                    onChange={(e) => {
                      const v = e.target.value;
                      setMake(v);
                      setModel("");
                      updateUrl({ make: v, model: "", brand, capacity, category, q: search });
                    }}
                    className="select-field"
                  >
                    <option value="">All</option>
                    {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Model</label>
                  <select
                    value={model}
                    onChange={(e) => {
                      const v = e.target.value;
                      setModel(v);
                      updateUrl({ model: v, make, brand, capacity, category, q: search });
                    }}
                    disabled={!make}
                    className="select-field disabled:opacity-50"
                  >
                    <option value="">All Models</option>
                    {models.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </>
            )}

            {(category === "inverter" || !category) && (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Capacity (Ah)</label>
                <select
                  value={capacity}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCapacity(v);
                    updateUrl({ capacity: v, brand, make, model, category, q: search });
                  }}
                  className="select-field"
                >
                  <option value="">All</option>
                  {[5, 35, 60, 65, 100, 150, 200].map((c) => (
                    <option key={c} value={String(c)}>{c} Ah</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </aside>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="surface flex flex-col items-center py-16 text-center">
              <p className="text-lg font-semibold">No products match your filters</p>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Try adjusting filters or call us — we likely have it in stock.</p>
              <button type="button" onClick={clearFilters} className="btn-secondary mt-4">Clear Filters</button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
