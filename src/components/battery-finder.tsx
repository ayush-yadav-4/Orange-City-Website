"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Zap, Search, Battery } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  carMakes,
  carModels,
  nagpurLocalities,
  inverterCapacities,
  brands,
} from "@/lib/home-data";

type Tab = "car" | "inverter";

export function BatteryFinder() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("car");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [locality, setLocality] = useState("");
  const [capacity, setCapacity] = useState("");
  const [brand, setBrand] = useState("");

  const models = make ? (carModels[make] ?? []) : [];

  function handleFind() {
    const params = new URLSearchParams();
    if (tab === "car") {
      if (make) params.set("make", make);
      if (model) params.set("model", model);
      if (locality) params.set("locality", locality);
      params.set("type", "car");
    } else {
      if (capacity) params.set("capacity", capacity);
      if (brand) params.set("brand", brand);
      if (locality) params.set("locality", locality);
      params.set("type", "inverter");
    }
    router.push(`/battery-finder?${params.toString()}`);
  }

  return (
    <section className="container-page -mt-8 relative z-10">
      <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl">
        {/* Tab headers */}
        <div className="flex border-b border-[hsl(var(--border))]">
          <button
            type="button"
            onClick={() => setTab("car")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-bold transition sm:text-base",
              tab === "car"
                ? "bg-brand-600 text-white"
                : "bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <Car size={18} />
            Car Battery
          </button>
          <button
            type="button"
            onClick={() => setTab("inverter")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-bold transition sm:text-base",
              tab === "inverter"
                ? "bg-brand-600 text-white"
                : "bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <Zap size={18} />
            Inverter Battery
          </button>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-6">
          {tab === "car" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Select Manufacturer
                </label>
                <select
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className="select-field"
                >
                  <option value="">All Manufacturers</option>
                  {carMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Select Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="select-field disabled:opacity-50"
                >
                  <option value="">All Models</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Select Locality
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="select-field"
                >
                  <option value="">All Nagpur</option>
                  {nagpurLocalities.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleFind}
                  className="btn-primary w-full py-3 text-base"
                >
                  <Search size={18} />
                  Find Battery
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Select Capacity
                </label>
                <select
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="select-field"
                >
                  <option value="">All Capacity</option>
                  {inverterCapacities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  All Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="select-field"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Select Locality
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="select-field"
                >
                  <option value="">All Nagpur</option>
                  {nagpurLocalities.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleFind}
                  className="btn-primary w-full py-3 text-base"
                >
                  <Battery size={18} />
                  Find Battery
                </button>
              </div>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
            Not sure which battery fits?{" "}
            <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+919876543210"}`} className="font-semibold text-brand-600 hover:underline">
              Call our experts
            </a>{" "}
            — we&apos;ll find the right match in minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
