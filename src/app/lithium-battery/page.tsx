import { Metadata } from "next";
import Link from "next/link";
import { BatteryCharging } from "lucide-react";

export const metadata: Metadata = {
  title: "Lithium Batteries | Orange City Batteries",
  description: "Advanced lithium-ion batteries for superior performance.",
};

export default function LithiumBatteryPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
          <BatteryCharging size={32} />
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
          Lithium-ion Batteries
        </h1>
        <p className="mt-6 text-lg text-[hsl(var(--muted-foreground))]">
          Experience the future of energy storage with our high-performance lithium-ion batteries. 
          Lighter, faster charging, and longer-lasting than traditional lead-acid options.
        </p>
        
        <div className="mt-12 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Products coming soon!</h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            We are currently updating our inventory with the latest lithium technology. Please check back soon or contact us for inquiries.
          </p>
          <div className="mt-6">
            <Link href="/contact-us" className="btn-primary">
              Contact Us for Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
