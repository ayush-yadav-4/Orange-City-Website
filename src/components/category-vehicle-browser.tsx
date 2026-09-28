"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Car,
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Phone,
  MessageCircle,
  ShoppingCart,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Building2,
  Check,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { SITE, formatINR, parseImages } from "@/lib/utils";
import type { MarketplaceProduct } from "@/lib/marketplace-data";
import type { VehicleModels } from "@/lib/content/types";

export type CategoryMetaItem = {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
};

export const CATEGORIES_CONFIG: CategoryMetaItem[] = [
  {
    id: "car",
    name: "Car & SUV",
    icon: "🚗",
    tagline: "Passenger Cars, Sedans, Hatchbacks & SUVs",
    description: "Guaranteed 100% fit batteries for Maruti, Hyundai, Tata, Mahindra, Toyota, Kia & more in Nagpur.",
  },
  {
    id: "scooty",
    name: "Scooty & Scooter",
    icon: "🛵",
    tagline: "Gearless Scooters & Electric Scooters",
    description: "Activa, Jupiter, Access, Dio, Pleasure, Ola, Ather & all scooter batteries with free doorstep installation.",
  },
  {
    id: "bike",
    name: "Motorcycle & Bike",
    icon: "🏍️",
    tagline: "Motorcycles, Commuters, Sports & Cruisers",
    description: "Splendor, Pulsar, Shine, Bullet, Classic 350, Apache & all motorcycle batteries with doorstep fitment.",
  },
  {
    id: "truck",
    name: "Commercial & Truck",
    icon: "🚚",
    tagline: "Mini Trucks, Pickups, Tempos, Buses & Haulers",
    description: "Heavy cranking batteries for Tata Ace, Bolero Pickup, Dost, Eicher, Ashok Leyland & BharatBenz.",
  },
  {
    id: "tractor",
    name: "Tractor & Agriculture",
    icon: "🚜",
    tagline: "Farm Tractors & Agricultural Machinery",
    description: "Heavy-duty farm batteries for Mahindra, Swaraj, Sonalika, John Deere, Massey Ferguson & Kubota.",
  },
  {
    id: "erickshaw",
    name: "E-Rickshaw & 3-Wheeler",
    icon: "🛺",
    tagline: "Electric Rickshaws, Auto Rickshaws & Loaders",
    description: "High-cycle deep charge batteries for Bajaj Auto, Piaggio, Mahindra Electric, Atul & Mayuri.",
  },
  {
    id: "inverter",
    name: "Inverter & Home UPS",
    icon: "⚡",
    tagline: "Tubular Home Inverters & Power Backup",
    description: "High backup tubular batteries & inverters for uninterrupted power during outages in Nagpur.",
  },
];

type Props = {
  initialCategory?: string;
  initialMake?: string;
  initialModel?: string;
  products: MarketplaceProduct[];
  vehicleModels: VehicleModels;
};

export function CategoryVehicleBrowser({
  initialCategory = "car",
  initialMake = "",
  initialModel = "",
  products = [],
  vehicleModels = {},
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addItem = useCart((s) => s.addItem);

  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get("category") || initialCategory || "car"
  );
  const [selectedMake, setSelectedMake] = useState<string>(
    searchParams.get("make") || initialMake || ""
  );
  const [selectedModel, setSelectedModel] = useState<string>(
    searchParams.get("model") || initialModel || ""
  );
  const [modelSearch, setModelSearch] = useState<string>("");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Sync state if URL searchParams change
  useEffect(() => {
    const urlCat = searchParams.get("category");
    const urlMake = searchParams.get("make");
    const urlModel = searchParams.get("model");
    if (urlCat) setActiveCategory(urlCat);
    if (urlMake !== null) setSelectedMake(urlMake || "");
    if (urlModel !== null) setSelectedModel(urlModel || "");
  }, [searchParams]);

  // Current category metadata
  const currentCategoryMeta = useMemo(() => {
    return (
      CATEGORIES_CONFIG.find((c) => c.id === activeCategory) || CATEGORIES_CONFIG[0]
    );
  }, [activeCategory]);

  // Companies / Makes for current category from DB
  const makesForCategory = useMemo(() => {
    const makesMap = vehicleModels[activeCategory];
    if (!makesMap) return [];
    return Object.keys(makesMap).sort();
  }, [vehicleModels, activeCategory]);

  // Models for selected company from DB
  const modelsForMake = useMemo(() => {
    if (!selectedMake) return [];
    const makesMap = vehicleModels[activeCategory];
    const list = makesMap?.[selectedMake] || [];
    if (!modelSearch.trim()) return list;
    const q = modelSearch.toLowerCase();
    return list.filter((m) => m.toLowerCase().includes(q));
  }, [vehicleModels, activeCategory, selectedMake, modelSearch]);

  // Total models count in this category
  const totalModelsInCategory = useMemo(() => {
    const makesMap = vehicleModels[activeCategory];
    if (!makesMap) return 0;
    return Object.values(makesMap).reduce((acc, m) => acc + m.length, 0);
  }, [vehicleModels, activeCategory]);

  // Filter products:
  // 1. If model is selected: products that explicitly match this vehicle make & model (or fall back to category)
  // 2. If make is selected: products that match this make
  // 3. Otherwise: all products in this category
  const { matchedProducts, isExactMatch } = useMemo(() => {
    if (activeCategory === "inverter") {
      const invProducts = products.filter((p) => p.category === "inverter" || p.category === "ups");
      return { matchedProducts: invProducts, isExactMatch: false };
    }

    if (selectedModel && selectedMake) {
      // Find exact vehicle compatibility match
      const exact = products.filter((p) =>
        p.vehicles.some(
          (v) =>
            v.make.toLowerCase() === selectedMake.toLowerCase() &&
            v.model.toLowerCase() === selectedModel.toLowerCase()
        )
      );

      if (exact.length > 0) {
        return { matchedProducts: exact, isExactMatch: true };
      }

      // If no exact match yet, show category-compatible batteries
      const catProducts = products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
      return { matchedProducts: catProducts, isExactMatch: false };
    }

    if (selectedMake) {
      const makeProducts = products.filter((p) =>
        p.vehicles.some((v) => v.make.toLowerCase() === selectedMake.toLowerCase())
      );
      if (makeProducts.length > 0) {
        return { matchedProducts: makeProducts, isExactMatch: true };
      }
    }

    // Default: all products in active category
    const catProducts = products.filter(
      (p) =>
        p.category.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === "scooty" && p.category === "bike") // fallback for scooty if stored under bike
    );
    return { matchedProducts: catProducts, isExactMatch: false };
  }, [products, activeCategory, selectedMake, selectedModel]);

  const selectCategory = (catId: string) => {
    setActiveCategory(catId);
    setSelectedMake("");
    setSelectedModel("");
    setModelSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", catId);
    params.delete("make");
    params.delete("model");
    router.replace(`/categories/${catId}`, { scroll: false });
  };

  const handleSelectMake = (makeName: string) => {
    if (selectedMake === makeName) {
      // Deselect make
      setSelectedMake("");
      setSelectedModel("");
    } else {
      setSelectedMake(makeName);
      setSelectedModel("");
      setModelSearch("");
    }
  };

  const handleSelectModel = (modelName: string) => {
    setSelectedModel(modelName);
    // Smooth scroll down to the battery listings
    const target = document.getElementById("battery-results-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const clearVehicleSelection = () => {
    setSelectedMake("");
    setSelectedModel("");
    setModelSearch("");
  };

  const handleAddToCart = (product: MarketplaceProduct) => {
    const images = parseImages(product.images);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: `${product.brand.name} ${product.modelName}`,
      brand: product.brand.name,
      image: images[0] || "",
      priceWithExchange: product.priceWithExchange,
      priceWithoutExchange: product.priceWithoutExchange,
      mrp: product.mrp,
      exchange: true,
      quantity: 1,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Top Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <span>{currentCategoryMeta.icon}</span>
            <span>Nagpur Official Battery Marketplace</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300">4-Hour Free Doorstep Fitment</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {currentCategoryMeta.name} Batteries in Nagpur
          </h1>
          <p className="text-sm sm:text-base text-brand-100/90 leading-relaxed">
            {currentCategoryMeta.description} Select your vehicle brand & model below to view guaranteed compatible batteries with old-battery scrap exchange discount.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm font-medium text-brand-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" /> 100% Genuine with Brand Warranty
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" /> Free Alternator & Charging Check
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" /> Cash / UPI on Delivery
            </span>
          </div>
        </div>

        {/* Decorative blur rings */}
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 right-40 h-56 w-56 rounded-full bg-amber-500/10 blur-2xl" />
      </section>

      {/* Step 1: Category Selector Pills / Tabs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              1
            </span>
            <h2 className="font-display text-lg sm:text-xl font-bold text-[hsl(var(--foreground))]">
              Select Vehicle Category
            </h2>
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {CATEGORIES_CONFIG.length} Categories Available
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES_CONFIG.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={`group flex flex-col items-center justify-center rounded-2xl border p-3.5 text-center transition-all duration-200 ${
                  isCurrent
                    ? "border-brand-600 bg-brand-50/70 text-brand-900 shadow-md ring-2 ring-brand-500/30 dark:bg-brand-950/40 dark:text-brand-200"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-brand-300 hover:shadow-xs"
                }`}
              >
                <span className="text-2xl transition group-hover:scale-110 mb-1">
                  {cat.icon}
                </span>
                <span className="font-semibold text-xs leading-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Companies / Brands under Selected Category (from DB) */}
      {activeCategory !== "inverter" && (
        <section className="space-y-4 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[hsl(var(--border))] pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                2
              </span>
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-[hsl(var(--foreground))]">
                  Select {currentCategoryMeta.name} Brand / Company
                </h2>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Choose manufacturer to reveal all vehicle models ({makesForCategory.length} brands · {totalModelsInCategory} models in database)
                </p>
              </div>
            </div>

            {selectedMake && (
              <button
                type="button"
                onClick={clearVehicleSelection}
                className="inline-flex items-center gap-1 rounded-lg border border-[hsl(var(--border))] px-3 py-1 text-xs font-semibold text-[hsl(var(--muted-foreground))] hover:border-red-300 hover:text-red-600 transition"
              >
                <RotateCcw size={12} /> Clear Selection
              </button>
            )}
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {makesForCategory.map((makeName) => {
              const isSelected = selectedMake.toLowerCase() === makeName.toLowerCase();
              const count = vehicleModels[activeCategory]?.[makeName]?.length || 0;
              return (
                <button
                  key={makeName}
                  type="button"
                  onClick={() => handleSelectMake(makeName)}
                  className={`group flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:border-brand-400 hover:shadow-xs"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-xs truncate group-hover:text-brand-600 transition">
                      <span className={isSelected ? "text-white" : ""}>{makeName}</span>
                    </div>
                    <div
                      className={`text-[10px] ${
                        isSelected ? "text-brand-100" : "text-[hsl(var(--muted-foreground))]"
                      }`}
                    >
                      {count} {count === 1 ? "model" : "models"}
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-transform ${
                      isSelected ? "rotate-90 text-white" : "text-[hsl(var(--muted-foreground))] group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Step 3: Models under Selected Company (Cards WITHOUT Image as requested) */}
          {selectedMake && (
            <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/40 p-4 sm:p-5 dark:border-brand-900/40 dark:bg-brand-950/20 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    3
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-[hsl(var(--foreground))]">
                      Select {selectedMake} Model
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      Click your model to instantly view all compatible batteries
                    </p>
                  </div>
                </div>

                {/* Model Search Filter */}
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  <input
                    type="text"
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    placeholder={`Filter ${selectedMake} models...`}
                    className="input-field pl-8 text-xs bg-white dark:bg-[hsl(var(--card))]"
                  />
                </div>
              </div>

              {/* Models Grid (Cards Without Image) */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {modelsForMake.map((modelName) => {
                  const isModelActive =
                    selectedModel.toLowerCase() === modelName.toLowerCase();
                  return (
                    <button
                      key={modelName}
                      type="button"
                      onClick={() => handleSelectModel(modelName)}
                      className={`group flex flex-col justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                        isModelActive
                          ? "border-brand-600 bg-brand-600 text-white shadow-md ring-2 ring-brand-500/30"
                          : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-brand-400 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span
                          className={`font-semibold text-xs leading-snug line-clamp-1 ${
                            isModelActive ? "text-white" : "group-hover:text-brand-600"
                          }`}
                        >
                          {modelName}
                        </span>
                        {isModelActive ? (
                          <Check size={14} className="text-white shrink-0" />
                        ) : (
                          <ArrowRight
                            size={12}
                            className="text-[hsl(var(--muted-foreground))] opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5"
                          />
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span
                          className={`rounded px-1.5 py-0.2 uppercase font-medium ${
                            isModelActive
                              ? "bg-white/20 text-white"
                              : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                          }`}
                        >
                          {currentCategoryMeta.name}
                        </span>
                        <span
                          className={
                            isModelActive
                              ? "text-brand-100 font-semibold"
                              : "text-brand-600 font-semibold group-hover:underline"
                          }
                        >
                          View →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {modelsForMake.length === 0 && (
                <div className="py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
                  No model found matching &quot;{modelSearch}&quot;.
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Step 4: Battery Products Section (BatteryBoss Inspired, Modern & Professional) */}
      <section id="battery-results-section" className="space-y-6 scroll-mt-24">
        {/* Active Selection Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-300 bg-brand-50/50 p-4 dark:border-brand-900 dark:bg-brand-950/20">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              {selectedModel && selectedMake ? "Vehicle Fitment Confirmed" : "Browsing Batteries"}
            </div>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-2 font-display text-lg sm:text-xl font-bold text-[hsl(var(--foreground))]">
              {selectedModel && selectedMake ? (
                <>
                  <span>
                    Batteries for {selectedMake} {selectedModel}
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    100% Fit Guaranteed
                  </span>
                </>
              ) : selectedMake ? (
                <span>Batteries for {selectedMake} ({currentCategoryMeta.name})</span>
              ) : (
                <span>All {currentCategoryMeta.name} Batteries in Nagpur</span>
              )}
            </div>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Doorstep installation available across all localities in Nagpur within 4 hours.
            </p>
          </div>

          {(selectedMake || selectedModel) && (
            <button
              type="button"
              onClick={clearVehicleSelection}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3.5 py-2 text-xs font-semibold text-[hsl(var(--foreground))] hover:border-brand-300 hover:text-brand-600 transition shadow-2xs"
            >
              <RotateCcw size={13} /> Change Vehicle
            </button>
          )}
        </div>

        {/* Battery Products Grid (Modern BatteryBoss Style Cards) */}
        {matchedProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedProducts.map((product) => {
              const images = parseImages(product.images);
              const isAdded = addedIds[product.id];
              const exchangeSaving = product.priceWithoutExchange - product.priceWithExchange;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition-all duration-300 hover:border-brand-400 hover:shadow-lg"
                >
                  {/* Top Badge: Warranty Ribbon */}
                  <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
                    <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-xs">
                      {product.warrantyMonths} Months Warranty
                    </span>
                    {exchangeSaving > 0 && (
                      <span className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        Save ₹{exchangeSaving} on Exchange
                      </span>
                    )}
                  </div>

                  <div>
                    {/* Battery Image Section */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative block h-52 w-full overflow-hidden bg-[hsl(var(--muted))]/20 p-6 text-center"
                    >
                      {images[0] ? (
                        <img
                          src={images[0]}
                          alt={`${product.brand.name} ${product.modelName}`}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">
                          Battery Image
                        </div>
                      )}
                    </Link>

                    {/* Product Details Body */}
                    <div className="p-5 space-y-3.5">
                      {/* Brand Logo / Name & Title */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                          {product.brand.name}
                        </div>
                        <h3 className="mt-0.5 font-display font-bold text-base text-[hsl(var(--foreground))] group-hover:text-brand-600 transition">
                          <Link href={`/products/${product.slug}`}>
                            {product.modelName}
                          </Link>
                        </h3>
                        {selectedModel && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 size={13} /> Fits {selectedMake} {selectedModel}
                          </div>
                        )}
                      </div>

                      {/* Technical Specs Pills */}
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        <span className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-2 py-1 font-semibold text-[hsl(var(--foreground))]">
                          ⚡ {product.capacityAh} Ah Capacity
                        </span>
                        <span className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-2 py-1 text-[hsl(var(--muted-foreground))]">
                          🛡️ {product.warrantyMonths}m Warranty
                        </span>
                        <span className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-2 py-1 text-[hsl(var(--muted-foreground))] capitalize">
                          {product.batteryType || "Maintenance Free"}
                        </span>
                      </div>

                      {/* Dual Pricing Box (BatteryBoss Inspired) */}
                      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/70 p-3 text-xs space-y-1.5">
                        <div className="flex items-baseline justify-between">
                          <span className="font-semibold text-[hsl(var(--foreground))] text-xs">
                            With Old Battery:
                          </span>
                          <span className="font-extrabold text-lg text-emerald-700 dark:text-emerald-400">
                            {formatINR(product.priceWithExchange)}
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between text-[11px] text-[hsl(var(--muted-foreground))]">
                          <span>Without Old Battery:</span>
                          <span className="font-medium text-[hsl(var(--foreground))]">
                            {formatINR(product.priceWithoutExchange)}
                          </span>
                        </div>

                        {product.mrp > product.priceWithExchange && (
                          <div className="flex items-baseline justify-between text-[10px] text-[hsl(var(--muted-foreground))] border-t border-[hsl(var(--border))]/60 pt-1">
                            <span>MRP:</span>
                            <span className="line-through">{formatINR(product.mrp)}</span>
                          </div>
                        )}
                      </div>

                      {/* Doorstep Service Perks */}
                      <div className="space-y-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Free 4-Hour Doorstep Delivery in Nagpur</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Free Professional Fitment & Health Test</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition shadow-xs ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-brand-600 text-white hover:bg-brand-500"
                      }`}
                    >
                      <ShoppingCart size={14} />
                      {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                    </button>

                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                        `Hi Orange City Batteries, I want to order ${product.brand.name} ${product.modelName} ${
                          selectedModel ? `for my ${selectedMake} ${selectedModel}` : ""
                        } in Nagpur.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] py-2.5 text-xs font-bold text-[hsl(var(--foreground))] hover:border-emerald-500 hover:text-emerald-600 transition"
                    >
                      <MessageCircle size={14} className="text-emerald-600" />
                      Order on WA
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty / On-Demand Assistance Card */
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 text-2xl">
              🔋
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-display font-bold text-lg text-[hsl(var(--foreground))]">
                Looking for a battery for {selectedMake} {selectedModel || ""}?
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                We have genuine Amaron, Exide, Bosch and SF Sonic batteries in stock for all {selectedMake} variants at our Nagpur warehouse with free same-day fitment.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${SITE.phone}`}
                className="btn-primary inline-flex items-center gap-2 text-xs font-bold"
              >
                <Phone size={14} /> Call Battery Expert ({SITE.phone})
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  `Hi Orange City Batteries, I need a battery for ${selectedMake} ${selectedModel || ""}. Please share price & availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--foreground))] hover:border-emerald-500 hover:text-emerald-600"
              >
                <MessageCircle size={14} className="text-emerald-600" /> WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
