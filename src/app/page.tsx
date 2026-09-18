import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { brandUrl } from "@/lib/marketplace-url";
import {
  ArrowRight,
  Truck,
  Wrench,
  Tag,
  Wallet,
  CreditCard,
  Store,
  MapPin,
  BarChart3,
  RefreshCw,
  Star,
  Quote,
} from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";

const BatteryFinder = dynamic(() => import("@/components/battery-finder").then((m) => m.BatteryFinder), {
  loading: () => <div className="container-page h-48 animate-pulse rounded-2xl bg-[hsl(var(--muted))]" />,
});
const BrandMarquee = dynamic(() => import("@/components/brand-marquee").then((m) => m.BrandMarquee), {
  loading: () => <div className="h-24 animate-pulse rounded-xl bg-[hsl(var(--muted))]" />,
});
import { SITE } from "@/lib/utils";
import {
  categories,
  carManufacturers,
  whyChooseUs,
  googleReviews,
} from "@/lib/home-data";
import { getContent, productToCardData } from "@/lib/content/store";

export const revalidate = 120;

const iconMap: Record<string, React.ReactNode> = {
  truck: <Truck size={26} />,
  wrench: <Wrench size={26} />,
  tag: <Tag size={26} />,
  wallet: <Wallet size={26} />,
  "credit-card": <CreditCard size={26} />,
};

export default async function Home() {
  const content = await getContent();
  const featuredProducts = content.products.slice(0, 4).map((p) => productToCardData(p, content.brands));
  const brands = content.brands;
  const galleryImages = content.gallery;
  const trustedPartners = brands.map((b) => ({ slug: b.slug, name: b.name, color: b.color }));

  return (
    <div className="flex flex-col">
      <HomeHero />
      <BatteryFinder />

      {/* Shop by Category */}
      <section className="container-page section-gap">
        <div className="text-center">
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-sub mx-auto">
            Find the right battery for every need — car, bike, inverter, or heavy-duty.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-0 transition group-hover:opacity-100`} />
              <span className="relative text-4xl transition-transform group-hover:scale-110">{cat.icon}</span>
              <div className="relative">
                <span className="block text-sm font-bold text-[hsl(var(--foreground))]">{cat.name}</span>
                <span className="mt-0.5 block text-xs text-[hsl(var(--muted-foreground))]">{cat.desc}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/categories" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-gap bg-[hsl(var(--muted))]/40 py-14 sm:py-16">
        <div className="container-page">
          <div className="text-center">
            <h2 className="section-title">Why Choose Orange City Batteries?</h2>
            <p className="section-sub mx-auto">
              Making battery replacement simple, reliable, and hassle-free — better than any online call center.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  {iconMap[item.icon]}
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-[hsl(var(--foreground))]">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-medium text-[hsl(var(--muted-foreground))]">
            <span className="font-bold text-brand-600">{SITE.reviewCount}+</span> happy customers trust Orange City Batteries across Nagpur.
          </p>
        </div>
      </section>

      {/* Marketplace Feature — unique differentiator */}
      <section className="container-page section-gap">
        <div className="overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-xl sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Store size={14} />
                Nagpur Battery Marketplace
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                India&apos;s First Hyperlocal Battery Marketplace
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-100">
                Unlike generic online stores, Orange City Batteries is a real shop in Pardi with live stock,
                transparent pricing, and locality-based delivery ETAs. Compare brands, see exchange savings,
                and order — all in one place.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: <BarChart3 size={20} />, label: "Compare Prices", desc: "Side-by-side brand comparison" },
                  { icon: <MapPin size={20} />, label: "Locality ETA", desc: "Know delivery time for your area" },
                  { icon: <RefreshCw size={20} />, label: "Exchange Calculator", desc: "Instant old battery discount" },
                  { icon: <Store size={20} />, label: "Real Shop Stock", desc: "Not a warehouse call center" },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 text-brand-200">{f.icon}</div>
                    <p className="text-sm font-bold">{f.label}</p>
                    <p className="mt-0.5 text-xs text-brand-200">{f.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/marketplace"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow transition hover:bg-brand-50"
              >
                Explore Marketplace <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "500+", label: "Products Listed" },
                { stat: "6", label: "Top Brands" },
                { stat: "20+", label: "Nagpur Localities" },
                { stat: "2 Hr", label: "Avg. Delivery" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm"
                >
                  <p className="font-display text-3xl font-extrabold sm:text-4xl">{s.stat}</p>
                  <p className="mt-1 text-sm text-brand-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highest Selling Products */}
      <section className="container-page section-gap">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-title">Highest Selling Products</h2>
            <p className="section-sub">Top picks in Nagpur — genuine batteries at the best exchange prices.</p>
          </div>
          <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="section-gap bg-[hsl(var(--muted))]/40 py-14 sm:py-16">
        <div className="container-page">
          <div className="text-center">
            <h2 className="section-title">Trusted Brand Partners</h2>
            <p className="section-sub mx-auto">
              We stock and service India&apos;s leading battery brands — genuine products with manufacturer warranty support.
            </p>
          </div>
          <div className="mt-10">
            <BrandMarquee partners={trustedPartners} />
          </div>
        </div>
      </section>

      {/* Shop by Car Manufacturer */}
      <section className="container-page section-gap">
        <div className="text-center">
          <h2 className="section-title">Battery Shop by Car Manufacturer</h2>
          <p className="section-sub mx-auto">Find batteries compatible with your car brand</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {carManufacturers.map((mfr) => (
            <Link
              key={mfr.slug}
              href={`/battery-finder?make=${encodeURIComponent(mfr.name)}&type=car`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-3xl transition-transform group-hover:scale-110">{mfr.logo}</span>
              <span className="text-xs font-semibold leading-tight text-[hsl(var(--foreground))]">{mfr.name}</span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/battery-finder" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
            View All Manufacturers <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Find by Brand */}
      <section className="section-gap bg-[hsl(var(--muted))]/40 py-14 sm:py-16">
        <div className="container-page">
          <div className="text-center">
            <h2 className="section-title">Find Your Battery By Brand</h2>
            <p className="section-sub mx-auto">100% genuine products from India&apos;s leading battery brands</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={brandUrl(b.slug)}
                prefetch
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${b.color} text-sm font-bold text-white shadow-sm transition group-hover:scale-105`}>
                  {b.name.slice(0, 2)}
                </div>
                <span className="text-xs font-semibold text-[hsl(var(--foreground))]">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page section-gap">
        <div className="text-center">
          <h2 className="section-title">Our Work — Gallery</h2>
          <p className="section-sub mx-auto">
            Battery installations, workshop repairs, and doorstep service across Nagpur.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryImages.map((img) => (
            <div
              key={img.caption}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About / SEO content block */}
      <section className="section-gap bg-[hsl(var(--muted))]/40 py-14 sm:py-16">
        <div className="container-page">
          <div className="surface grid gap-8 p-8 sm:grid-cols-2 sm:p-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
              Online Battery Store — Car &amp; Inverter Batteries in Nagpur
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Orange City Batteries is Nagpur&apos;s leading hyperlocal battery marketplace for car batteries,
              inverter batteries, two-wheeler batteries, and more. Whether you need an Exide, Amaron, Luminous,
              or SF Sonic battery, we are your one-stop shop with 100% genuine products at unbeatable prices.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              With years of experience serving Nagpur from our real shop in Pardi, we understand what customers
              need — fast delivery, transparent pricing, free installation, and honest exchange valuations.
              Month and year of manufacture are mentioned on every battery, so genuineness is always confirmed.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Lowest Price Guaranteed", desc: "We beat any high-street quote in Nagpur." },
              { title: "Wide Range of Brands", desc: "All leading brands in one marketplace." },
              { title: "100% Genuine Products", desc: "Strict quality guidelines on every unit." },
              { title: "Easy Payment Options", desc: "COD, UPI, cards & net banking." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-4">
                <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">{item.title}</h3>
                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="container-page section-gap">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold">{SITE.rating}</span>
            <span className="text-sm text-[hsl(var(--muted-foreground))]">· Based on {SITE.reviewCount} Google Reviews</span>
          </div>
          <h2 className="section-title">Google Customer Reviews</h2>
          <p className="section-sub mx-auto">
            Real feedback from Nagpur customers about our batteries, installation, and doorstep service.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {googleReviews.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-brand-300" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[hsl(var(--border))] pt-4">
                <div>
                  <p className="text-sm font-bold text-[hsl(var(--foreground))]">{t.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Reviewed on {t.source}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
          >
            View all Google Reviews <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page section-gap pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-12 text-center text-white sm:px-16 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 to-transparent" />
          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold sm:text-4xl">
              Need Help Choosing the Right Battery?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-ink-300 sm:text-base">
              Our Nagpur experts are available 7 days a week. Call, WhatsApp, or request a callback — we&apos;ll find the perfect battery for your vehicle or home.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.phone}`} className="btn-primary px-8 py-3.5 text-base">
                Call {SITE.phone}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-ink-700 bg-ink-900 px-8 py-3.5 text-base text-white hover:border-brand-400 hover:text-brand-300"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
