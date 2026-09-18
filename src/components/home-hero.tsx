import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Clock, BatteryCharging } from "lucide-react";
import { SITE } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-12">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-hero-light dark:bg-hero-dark" />
      <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative battery elements */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] hidden h-16 w-16 animate-float rounded-2xl bg-brand-500/10 backdrop-blur-sm lg:block" />
      <div className="pointer-events-none absolute right-[8%] top-[15%] hidden h-12 w-12 animate-float-delayed rounded-xl bg-brand-400/15 lg:block" />
      <div className="pointer-events-none absolute bottom-[25%] left-[12%] hidden h-10 w-10 animate-float rounded-lg bg-brand-600/10 lg:block" />

      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Nagpur&apos;s #1 Battery Marketplace
            </div>

            <h1
              className="animate-fade-up mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[hsl(var(--foreground))] sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Buy Genuine Batteries{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400">
                Online in Nagpur
              </span>
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg lg:mx-0"
              style={{ animationDelay: "160ms" }}
            >
              Car, bike, inverter &amp; truck batteries from Exide, Amaron, Luminous &amp; more.
              Free doorstep delivery, expert installation, and the best exchange prices in Nagpur.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "240ms" }}
            >
              <Link href="/categories" className="btn-primary px-7 py-3.5 text-base">
                Shop Marketplace <ArrowRight size={18} />
              </Link>
              <a href={`tel:${SITE.phone}`} className="btn-secondary px-7 py-3.5 text-base">
                Emergency Call — 6 AM Service
              </a>
            </div>

            {/* Trust pills */}
            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              style={{ animationDelay: "320ms" }}
            >
              <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{SITE.rating}/5</span>
                <span className="text-[hsl(var(--muted-foreground))]">Google</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold">100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))]/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm">
                <Clock className="h-4 w-4 text-brand-500" />
                <span className="font-semibold">2-Hr Delivery*</span>
              </div>
            </div>
          </div>

          {/* Right — hero visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none" style={{ animationDelay: "200ms" }}>
            <div className="animate-fade-up relative">
              {/* Main battery image */}
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-br from-brand-50 to-brand-100 shadow-2xl dark:from-brand-950/40 dark:to-ink-900">
                <Image
                  src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80"
                  alt="Genuine car battery — Orange City Batteries Nagpur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-4 top-8 animate-fade-up rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 p-4 shadow-lg backdrop-blur-sm sm:-left-8" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600">
                    <BatteryCharging size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[hsl(var(--foreground))]">500+</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Batteries in Stock</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-12 animate-fade-up rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 p-4 shadow-lg backdrop-blur-sm sm:-right-6" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[hsl(var(--foreground))]">40%</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Off with Exchange</p>
                  </div>
                </div>
              </div>

              {/* Secondary battery image */}
              <div className="absolute -bottom-6 -right-2 h-28 w-28 overflow-hidden rounded-2xl border-4 border-[hsl(var(--background))] shadow-xl sm:h-36 sm:w-36">
                <Image
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80"
                  alt="Inverter battery Nagpur"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
