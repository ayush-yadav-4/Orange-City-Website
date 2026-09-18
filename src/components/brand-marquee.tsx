"use client";

import Link from "next/link";
import { brandUrl } from "@/lib/marketplace-url";
import { BrandLogo } from "./brand-logo";

type Partner = { slug: string; name: string; color: string };

export function BrandMarquee({ partners }: { partners: Partner[] }) {
  const items = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[hsl(var(--muted))]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[hsl(var(--muted))]/40 to-transparent" />
      <div className="flex animate-marquee gap-6 py-2">
        {items.map((p, i) => (
          <Link
            key={`${p.slug}-${i}`}
            href={brandUrl(p.slug)}
            prefetch
            className="group flex shrink-0 flex-col items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-8 py-4 shadow-sm transition hover:border-brand-300 hover:shadow-md"
          >
            <div className="relative flex h-14 w-28 items-center justify-center">
              <BrandLogo slug={p.slug} name={p.name} color={p.color} />
            </div>
            <span className="text-xs font-semibold text-[hsl(var(--foreground))]">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
