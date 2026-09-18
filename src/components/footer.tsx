import Link from "next/link";
import { BatteryCharging, MapPin, Phone, Mail } from "lucide-react";
import { SITE } from "@/lib/utils";
import { footerShop, footerResources } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-[hsl(var(--border))] bg-ink-950 text-ink-100", className)}>
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <BatteryCharging className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold text-white">Orange City Batteries</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink-300">
            Nagpur&apos;s hyperlocal battery marketplace — transparent prices, exchange offers, and doorstep installation from our real shop in Pardi.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-300">
            ★ {SITE.rating} · {SITE.reviewCount} Google reviews
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
          <ul className="space-y-2.5">
            {footerShop.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="text-sm text-ink-300 transition hover:text-brand-300">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Resources</h3>
          <ul className="space-y-2.5">
            {footerResources.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="text-sm text-ink-300 transition hover:text-brand-300">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Visit / Call</h3>
          <ul className="space-y-3 text-sm text-ink-300">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />{SITE.address}</li>
            <li><a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-brand-300"><Phone className="h-4 w-4 text-brand-400" />{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-brand-300"><Mail className="h-4 w-4 text-brand-400" />{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Orange City Batteries — Nagpur. All prices GST-inclusive.</p>
          <p>COD available · UPI / Card via Razorpay · 6 AM emergency service</p>
        </div>
      </div>
    </footer>
  );
}
