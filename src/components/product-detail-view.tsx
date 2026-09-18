"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  CreditCard,
  Phone,
  RefreshCw,
  Shield,
  Truck,
  Zap,
} from "lucide-react";
import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard, type ProductCardData } from "@/components/product-card";
import type { Product } from "@/lib/content/types";
import {
  buildDefaultSpecs,
  getRecommendedVehicles,
  getWarrantyDisplay,
  parseProductFeatures,
  TRUST_BADGES,
} from "@/lib/product-details";
import { brandUrl } from "@/lib/marketplace-url";
import { categoryLabel, discountPercent, parseImages, SITE, stockLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "description" | "specifications" | "recommended" | "features";

type Props = {
  product: Product;
  brandName: string;
  card: ProductCardData & { batteryType: string; vehicles: { make: string; model: string }[] };
  similar: ProductCardData[];
};

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "recommended", label: "Recommended for" },
  { id: "features", label: "Features" },
];

export function ProductDetailView({ product, brandName, card, similar }: Props) {
  const [tab, setTab] = useState<Tab>("description");
  const images = parseImages(card.images);
  const off = discountPercent(card.mrp, card.priceWithExchange);
  const warranty = getWarrantyDisplay(product);
  const specs = buildDefaultSpecs(product);
  const features = parseProductFeatures(product.features);
  const recommended = getRecommendedVehicles(product);
  const longDesc = product.longDescription?.trim() || product.description?.trim() || "";

  return (
    <div className="section-spacing">
      <div className="container-page">
        <Breadcrumbs
          items={[
            { name: brandName, href: brandUrl(product.brandSlug) },
            { name: card.modelName },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <div className="surface relative aspect-square overflow-hidden bg-white">
              {off > 0 && (
                <span className="absolute left-4 top-4 z-10 rounded-lg bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                  {off}% OFF
                </span>
              )}
              {card.stockStatus === "in_stock" && (
                <span className="absolute right-4 top-4 z-10 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow">
                  In Stock
                </span>
              )}
              {images[0] ? (
                <Image
                  src={images[0]}
                  alt={`${brandName} ${card.modelName}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[hsl(var(--muted-foreground))]">
                  No image
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-white">
                    <Image src={src} alt="" fill className="object-contain p-2" sizes="80px" />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-xl border border-brand-200/60 bg-brand-50/80 px-3 py-2.5 text-xs font-semibold text-brand-800 dark:border-brand-800/40 dark:bg-brand-950/30 dark:text-brand-200"
                >
                  <Check size={14} className="shrink-0 text-brand-600" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-7">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Link
                href={brandUrl(product.brandSlug)}
                className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-900/50 dark:text-brand-300"
              >
                {brandName}
              </Link>
              <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs font-semibold uppercase">
                {categoryLabel(card.category)}
              </span>
              {product.partNumber && (
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  Part no. {product.partNumber}
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {card.modelName}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2.5">
                <Shield size={18} className="text-brand-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Warranty</p>
                  <p className="text-sm font-semibold">{warranty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2.5">
                <Zap size={18} className="text-brand-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Capacity</p>
                  <p className="text-sm font-semibold">{card.capacityAh} AH</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-2.5">
                <BadgeCheck size={18} className="text-brand-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Status</p>
                  <p className="text-sm font-semibold">{stockLabel(card.stockStatus)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <AddToCartPanel product={card} />
              </div>
              <div className="flex flex-col gap-2 lg:col-span-2">
                <a
                  href={`tel:${SITE.phone}`}
                  className="btn-primary flex items-center justify-center gap-2 py-3"
                >
                  <Phone size={18} />
                  Request callback
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I need a quote for ${brandName} ${card.modelName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2 py-3"
                >
                  Ask for quotation
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-brand-600" /> Free Nagpur delivery
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw size={14} className="text-brand-600" /> Old battery pickup
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard size={14} className="text-brand-600" /> COD &amp; UPI
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="-mx-1 flex gap-1 overflow-x-auto border-b border-[hsl(var(--border))] pb-px scrollbar-none">
            {TAB_LABELS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "shrink-0 px-3 py-2.5 text-xs font-bold transition sm:px-4 sm:py-3 sm:text-sm",
                  tab === t.id
                    ? "border-b-2 border-brand-600 text-brand-600"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="surface mt-0 rounded-t-none p-6 sm:p-8">
            {tab === "description" && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2 className="font-display text-xl font-bold">{card.modelName} Description</h2>
                {longDesc ? (
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {longDesc.split("\n\n").map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-[hsl(var(--muted-foreground))]">
                    Genuine {brandName} battery with transparent Nagpur pricing, free doorstep delivery, and professional installation.
                  </p>
                )}
              </div>
            )}

            {tab === "specifications" && (
              <div>
                <h2 className="font-display text-xl font-bold">Specifications</h2>
                <dl className="mt-5 divide-y divide-[hsl(var(--border))] rounded-xl border border-[hsl(var(--border))]">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="grid gap-2 px-4 py-3.5 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-semibold text-[hsl(var(--muted-foreground))]">{key}</dt>
                      <dd className="text-sm font-medium sm:col-span-2">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {tab === "recommended" && (
              <div>
                <h2 className="font-display text-xl font-bold">Recommended for</h2>
                {recommended.length === 0 ? (
                  <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
                    Contact us with your vehicle make &amp; model — we&apos;ll confirm fitment before delivery.
                  </p>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {recommended.map((vehicle) => (
                      <span
                        key={vehicle}
                        className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-3 py-1.5 text-sm font-medium"
                      >
                        {vehicle}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "features" && (
              <div>
                <h2 className="font-display text-xl font-bold">Key features</h2>
                {features.length === 0 ? (
                  <ul className="mt-5 space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-brand-600" /> High cranking power</li>
                    <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-brand-600" /> Maintenance-free design</li>
                    <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-brand-600" /> Heat &amp; vibration resistant</li>
                    <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-brand-600" /> Factory charged — ready to use</li>
                  </ul>
                ) : (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 rounded-xl border border-[hsl(var(--border))] px-4 py-3 text-sm font-medium"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold">Similar products</h2>
              <Link href={brandUrl(product.brandSlug)} className="text-sm font-semibold text-brand-600 hover:underline">
                View all {brandName}
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
