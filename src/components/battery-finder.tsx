"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Zap, Search, Battery, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { nagpurLocalities, inverterCapacities, brands } from "@/lib/home-data";

type Tab = "car" | "scooty" | "bike" | "inverter" | "truck";

const VEHICLE_CATALOG_PRESETS: Record<"car" | "scooty" | "bike" | "truck", Record<string, string[]>> = {
  scooty: {
    Honda: ["Activa 6G", "Activa 125", "Dio", "Grazia", "Aviator"],
    TVS: ["Jupiter 110", "Jupiter 125", "Ntorq 125", "Scooty Pep+", "Scooty Zest"],
    Suzuki: ["Access 125", "Burgman Street", "Avenis"],
    Hero: ["Pleasure Plus", "Destini 125", "Maestro Edge"],
    Yamaha: ["Fascino 125", "RayZR 125", "Aerox 155"],
    Ather: ["450X", "450S", "Rizta"],
    Ola: ["S1 Pro", "S1 Air", "S1 X"],
    Bajaj: ["Chetak EV"],
  },
  bike: {
    Hero: ["Splendor Plus", "HF Deluxe", "Passion Pro", "Glamour", "Xtreme 160R", "Xpulse 200"],
    Honda: ["Shine 125", "SP 125", "Unicorn 160", "Hornet 2.0", "H'ness CB350", "Livo"],
    Bajaj: ["Pulsar 150", "Pulsar NS200", "Pulsar N160", "Platina 100", "CT 110", "Avenger 220", "Dominar 400"],
    TVS: ["Apache RTR 160", "Apache RTR 200", "Raider 125", "Sport", "Radeon", "Star City Plus"],
    "Royal Enfield": ["Classic 350", "Bullet 350", "Hunter 350", "Meteor 350", "Himalayan 450", "Continental GT 650"],
    Yamaha: ["FZ-S V3", "MT-15", "R15 V4", "FZ-X"],
    KTM: ["Duke 200", "Duke 390", "RC 200", "Adventure 390"],
    Suzuki: ["Gixxer 155", "Gixxer SF 250"],
  },
  car: {
    "Maruti Suzuki": ["Swift", "Dzire", "Baleno", "Brezza", "Ertiga", "Wagon R", "Grand Vitara", "Alto K10"],
    Hyundai: ["Creta", "Venue", "i20", "Verna", "Grand i10 Nios", "Exter", "Alcazar"],
    "Tata Motors": ["Nexon", "Punch", "Harrier", "Tiago", "Safari", "Altroz", "Tigor"],
    Mahindra: ["Scorpio-N", "Scorpio Classic", "XUV700", "Thar", "Bolero", "XUV300"],
    Honda: ["City", "Amaze", "Elevate", "WR-V"],
    Toyota: ["Innova Crysta", "Innova Hycross", "Fortuner", "Glanza", "Urban Cruiser Hyryder"],
    Kia: ["Seltos", "Sonet", "Carens"],
    Volkswagen: ["Taigun", "Virtus", "Polo", "Vento"],
    Skoda: ["Kushaq", "Slavia"],
    Renault: ["Kwid", "Triber", "Kiger"],
  },
  truck: {
    "Tata Motors": ["Ace Gold (Chhota Hathi)", "Intra V30", "407 Gold", "Ultra T.7", "Prima 2830.K", "Signa 4825.TK"],
    "Ashok Leyland": ["Dost+", "Bada Dost", "Ecomet 1215", "Boss 1415", "AVTR 4220"],
    Eicher: ["Pro 2049", "Pro 2110", "Pro 3015", "Pro 6028"],
    Mahindra: ["Bolero Maxi Truck", "Bolero Camper", "Furio 7", "Blazo X 28"],
    BharatBenz: ["1217C", "1617R", "2823R", "3528C"],
  },
};

export function BatteryFinder() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("car");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [locality, setLocality] = useState("");
  const [capacity, setCapacity] = useState("");
  const [brand, setBrand] = useState("");

  const makesForTab = tab !== "inverter" ? Object.keys(VEHICLE_CATALOG_PRESETS[tab] || {}) : [];
  const modelsForMake = tab !== "inverter" && make ? (VEHICLE_CATALOG_PRESETS[tab]?.[make] || []) : [];

  function handleFind() {
    const params = new URLSearchParams();
    if (tab === "inverter") {
      if (capacity) params.set("capacity", capacity);
      if (brand) params.set("brand", brand);
      if (locality) params.set("locality", locality);
      params.set("type", "inverter");
    } else {
      if (make) params.set("make", make);
      if (model) params.set("model", model);
      if (locality) params.set("locality", locality);
      params.set("type", tab);
    }
    router.push(`/battery-finder?${params.toString()}`);
  }

  function handleTabChange(nextTab: Tab) {
    setTab(nextTab);
    setMake("");
    setModel("");
  }

  return (
    <section className="container-page -mt-8 relative z-10">
      <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl">
        {/* Tab headers */}
        <div className="flex flex-wrap border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
          <button
            type="button"
            onClick={() => handleTabChange("car")}
            className={cn(
              "flex flex-1 min-w-[120px] items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold transition",
              tab === "car"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <Car size={16} />
            Car Battery
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("scooty")}
            className={cn(
              "flex flex-1 min-w-[120px] items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold transition",
              tab === "scooty"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <span>🛵</span>
            Scooty Battery
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("bike")}
            className={cn(
              "flex flex-1 min-w-[120px] items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold transition",
              tab === "bike"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <span>🏍️</span>
            Bike Battery
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("inverter")}
            className={cn(
              "flex flex-1 min-w-[120px] items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold transition",
              tab === "inverter"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <Zap size={16} />
            Inverter Battery
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("truck")}
            className={cn(
              "flex flex-1 min-w-[120px] items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold transition",
              tab === "truck"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
            )}
          >
            <Truck size={16} />
            Commercial
          </button>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-6">
          {tab !== "inverter" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Select {tab === "scooty" ? "Scooty Brand" : tab === "bike" ? "Bike Brand" : tab === "truck" ? "Truck Make" : "Car Manufacturer"}
                </label>
                <select
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className="select-field"
                >
                  <option value="">All Brands / Makes</option>
                  {makesForTab.map((m) => (
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
                  {modelsForMake.map((m) => (
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
            <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+919325417265"}`} className="font-semibold text-brand-600 hover:underline">
              Call our Nagpur battery experts
            </a>{" "}
            — free fitment and doorstep battery testing within 45 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
