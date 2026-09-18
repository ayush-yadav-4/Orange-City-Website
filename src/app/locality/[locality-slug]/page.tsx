import Link from "next/link";
import { MapPin, ArrowRight, Clock } from "lucide-react";
import { SITE } from "@/lib/utils";

export default function LocalityPage({ params }: { params: { "locality-slug": string } }) {
  const localityName = params["locality-slug"].split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="flex flex-col gap-16 pb-20 sm:gap-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-hero-light dark:bg-hero-dark opacity-60" />
        <div className="container-page flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-1.5 text-sm font-medium">
            <MapPin size={16} className="text-brand-500" />
            Hyperlocal Delivery in {localityName}
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl lg:text-6xl">
            Battery Price in {localityName}, Nagpur
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[hsl(var(--muted-foreground))] sm:text-xl">
            Get your car, bike, or inverter battery delivered and installed in {localityName} usually within 2 hours.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <Clock className="h-6 w-6 text-brand-600" />
              <span className="text-sm font-semibold">Fast ETA</span>
            </div>
            <div className="h-8 w-px bg-[hsl(var(--border))]"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Free Install</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page">
         <div className="surface p-8 text-center sm:p-12">
            <h2 className="section-title mb-4">Need a Battery in {localityName}?</h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-8">
              We stock Exide, Amaron, Luminous, and more. Use our battery finder to get exact pricing with exchange offers applied.
            </p>
            <Link href="/battery-finder" className="btn-primary">
              Use Battery Finder <ArrowRight size={18} />
            </Link>
         </div>
      </section>
    </div>
  );
}
