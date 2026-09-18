"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Car, Bike, Zap, Truck, CheckCircle } from "lucide-react";

type VehicleType = "car" | "bike" | "inverter" | "truck" | null;

const recommendations: Record<string, { title: string; desc: string; brands: string; href: string }> = {
  "car-city": {
    title: "Maintenance-Free 35Ah–45Ah Battery",
    desc: "Perfect for daily city commuting. Quick starts and reliable performance for short trips.",
    brands: "Exide, Amaron",
    href: "/marketplace?category=car",
  },
  "car-highway": {
    title: "High-Capacity 45Ah–65Ah Battery",
    desc: "Ideal for long highway drives with AC and electronics running. Higher reserve capacity.",
    brands: "Exide, Amaron, SF Sonic",
    href: "/marketplace?category=car",
  },
  "bike-commuter": {
    title: "VRLA 2.5Ah–5Ah Battery",
    desc: "Sealed maintenance-free, 18–24 months warranty for scooters and 100cc–125cc bikes.",
    brands: "Exide, Amaron",
    href: "/marketplace?category=bike",
  },
  "bike-premium": {
    title: "AGM 5Ah–9Ah Battery",
    desc: "High cranking power for 150cc+ engines with extra lights and accessories.",
    brands: "Amaron, SF Sonic",
    href: "/marketplace?category=bike",
  },
  "inverter-occasional": {
    title: "100Ah–135Ah Flat Plate Battery",
    desc: "Affordable option providing 1–3 hours backup for fans, lights, and TV.",
    brands: "Luminous, Exide",
    href: "/marketplace?category=inverter",
  },
  "inverter-frequent": {
    title: "150Ah+ Tall Tubular Battery",
    desc: "Deep-cycle tubular design providing 4–8+ hours backup. Best for heavy home loads.",
    brands: "Luminous, Okaya, Amaron",
    href: "/marketplace?category=inverter",
  },
  "truck-lcv": {
    title: "80Ah–110Ah Commercial Battery",
    desc: "Built for frequent starts and stops in city traffic for Light Commercial Vehicles.",
    brands: "Exide, SF Sonic",
    href: "/marketplace?category=truck",
  },
  "truck-hcv": {
    title: "130Ah–180Ah Heavy-Duty Battery",
    desc: "Maximum cranking amps and vibration resistance for long-haul trucks.",
    brands: "Exide, Amaron",
    href: "/marketplace?category=truck",
  },
};

export function FitmentWizard() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState<VehicleType>(null);
  const [subChoice, setSubChoice] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function restart() {
    setStep(1);
    setVehicle(null);
    setSubChoice("");
    setResult(null);
  }

  function selectVehicle(v: VehicleType) {
    setVehicle(v);
    setStep(2);
  }

  function selectSub(choice: string, resultKey: string) {
    setSubChoice(choice);
    setResult(resultKey);
    setStep(3);
  }

  const rec = result ? recommendations[result] : null;

  return (
    <div className="surface mx-auto max-w-2xl overflow-hidden">
      {step < 3 && (
        <div className="border-b border-[hsl(var(--border))] bg-brand-600 px-6 py-3 text-sm font-bold text-white">
          Step {step} of 2 — {step === 1 ? "What do you need a battery for?" : "Tell us more"}
        </div>
      )}

      <div className="p-6 sm:p-8">
        {step === 1 && (
          <>
            <h2 className="font-display text-xl font-bold">What do you need a battery for?</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { type: "car" as const, label: "Car / SUV", icon: Car },
                { type: "bike" as const, label: "Bike / Scooter", icon: Bike },
                { type: "inverter" as const, label: "Home Inverter", icon: Zap },
                { type: "truck" as const, label: "Commercial Truck", icon: Truck },
              ].map((v) => (
                <button
                  key={v.type}
                  type="button"
                  onClick={() => selectVehicle(v.type)}
                  className="flex flex-col items-center gap-2 rounded-xl border-2 border-[hsl(var(--border))] p-4 transition hover:border-brand-500 hover:bg-brand-500/5"
                >
                  <v.icon size={28} className="text-brand-600" />
                  <span className="text-xs font-bold text-center">{v.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && vehicle === "car" && (
          <>
            <button type="button" onClick={() => setStep(1)} className="mb-4 flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Back</button>
            <h2 className="font-display text-xl font-bold">What is your primary driving pattern?</h2>
            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => selectSub("city", "car-city")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">Daily City Commute</span>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Short trips, traffic, start-stop driving</p>
              </button>
              <button type="button" onClick={() => selectSub("highway", "car-highway")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">Long Drives / Highway</span>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">AC on, electronics, long distances</p>
              </button>
            </div>
          </>
        )}

        {step === 2 && vehicle === "bike" && (
          <>
            <button type="button" onClick={() => setStep(1)} className="mb-4 flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Back</button>
            <h2 className="font-display text-xl font-bold">What type of two-wheeler do you ride?</h2>
            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => selectSub("commuter", "bike-commuter")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">100–125cc Commuter / Scooter</span>
              </button>
              <button type="button" onClick={() => selectSub("premium", "bike-premium")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">150cc+ Premium Bike</span>
              </button>
            </div>
          </>
        )}

        {step === 2 && vehicle === "inverter" && (
          <>
            <button type="button" onClick={() => setStep(1)} className="mb-4 flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Back</button>
            <h2 className="font-display text-xl font-bold">How frequent are the power cuts?</h2>
            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => selectSub("occasional", "inverter-occasional")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">Occasional (1–2 Hours)</span>
              </button>
              <button type="button" onClick={() => selectSub("frequent", "inverter-frequent")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">Frequent / Long (4+ Hours)</span>
              </button>
            </div>
          </>
        )}

        {step === 2 && vehicle === "truck" && (
          <>
            <button type="button" onClick={() => setStep(1)} className="mb-4 flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Back</button>
            <h2 className="font-display text-xl font-bold">Vehicle load and travel type?</h2>
            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => selectSub("lcv", "truck-lcv")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">Local City Logistics (LCV)</span>
              </button>
              <button type="button" onClick={() => selectSub("hcv", "truck-hcv")} className="w-full rounded-xl border-2 border-[hsl(var(--border))] p-4 text-left transition hover:border-brand-500">
                <span className="font-bold">Long Haul Heavy (HCV)</span>
              </button>
            </div>
          </>
        )}

        {step === 3 && rec && (
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="mt-4 font-display text-xl font-bold">Recommended: {rec.title}</h2>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">{rec.desc}</p>
            <p className="mt-2 text-sm font-semibold text-brand-600">Top Brands: {rec.brands}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/contact-us" className="btn-primary">Get Price Quote</Link>
              <Link href={rec.href} className="btn-secondary">View Catalog <ArrowRight size={16} /></Link>
            </div>
            <button type="button" onClick={restart} className="mt-4 text-sm font-semibold text-brand-600 hover:underline">
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
