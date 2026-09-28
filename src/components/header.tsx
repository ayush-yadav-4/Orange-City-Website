"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, ShoppingCart, X, BatteryCharging, Phone, ChevronDown, MessageCircle, MapPin, User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { HeaderSearch } from "./header-search";
import { SameDayDeliveryBar } from "./same-day-delivery-bar";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { cn, SITE } from "@/lib/utils";
import { mainNav } from "@/lib/nav-config";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const cartCount = useCart((s) => s.count);
  const user = useAuth((s) => s.user);

  useEffect(() => {
    setCount(cartCount());
  }, [cartCount, pathname]);

  useEffect(() => {
    const unsub = useCart.subscribe(() => setCount(useCart.getState().count()));
    return unsub;
  }, []);

  useEffect(() => {
    router.prefetch("/marketplace");
  }, [router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-brand-700 text-white">
        <div className="container-page flex h-11 items-center justify-between gap-2 sm:h-12 sm:gap-3">
          {/* Desktop: contact info */}
          <div className="hidden min-w-0 flex-1 items-center gap-3 sm:flex sm:gap-4">
            <a href={`tel:${SITE.phone}`} className="flex shrink-0 items-center gap-1.5 font-medium transition hover:text-brand-200">
              <Phone size={13} />
              <span>{SITE.phone}</span>
            </a>
            <span className="hidden h-3 w-px bg-white/30 md:block" />
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 items-center gap-1.5 transition hover:text-brand-200 md:flex">
              <MessageCircle size={13} /> WhatsApp
            </a>
            <span className="hidden h-3 w-px bg-white/30 lg:block" />
            <span className="hidden items-center gap-1.5 text-brand-100 lg:flex">
              <MapPin size={13} /> {SITE.city} · Free Delivery & Installation*
            </span>
          </div>

          {/* Mobile: search + Google rating (replaces call link) */}
          <HeaderSearch variant="mobile-top" className="sm:hidden" />

          {/* Desktop: search + rating */}
          <HeaderSearch variant="header" className="hidden sm:flex" />
        </div>
      </div>

      {/* Main navbar */}
      <div className="relative z-30 bg-[hsl(var(--background))]/95 backdrop-blur-xl border-b border-[hsl(var(--border))]/50">
        <div className="container-page flex h-14 items-stretch justify-between gap-2 sm:h-[4.5rem] sm:gap-3">
          <Link href="/" className="group flex min-w-0 max-w-[55%] flex-shrink items-center gap-2 self-center sm:max-w-none sm:gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md transition group-hover:shadow-lg sm:h-11 sm:w-11">
              <BatteryCharging className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-sm font-bold tracking-tight sm:text-lg">Orange City Batteries</span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400 sm:block">Nagpur Marketplace</span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 self-center xl:flex">
            {mainNav.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-0.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={13} className="opacity-60 transition-transform duration-200 group-hover:rotate-180" />}
                </Link>
                {item.dropdown && (
                  <div className="invisible absolute left-0 top-full z-[100] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="flex w-60 flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.href}
                          href={dropItem.href}
                          className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-brand-500/10 hover:text-brand-600 dark:hover:bg-brand-950/30"
                        >
                          <span>{dropItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 self-center sm:gap-2">
            <div className="hidden lg:flex"><ThemeToggle /></div>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-sm bg-brand-600 px-2.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-brand-500 sm:h-10 sm:gap-2 sm:px-4 sm:text-xs lg:px-5 lg:text-sm"
            >
              <Phone size={15} strokeWidth={2.5} className="sm:h-[18px] sm:w-[18px]" />
              <span className="hidden min-[380px]:inline">Call</span>
              <span className="hidden sm:inline"> Now</span>
            </a>
            <Link
              href="/cart"
              className="relative inline-flex h-9 w-10 items-center justify-center rounded-sm border-2 border-brand-500 bg-brand-500/10 text-brand-700 shadow-sm transition hover:bg-brand-500/20 dark:text-brand-300 sm:h-10 sm:w-12 lg:w-14"
              aria-label="Cart"
            >
              <ShoppingCart size={20} strokeWidth={2.25} className="sm:h-[22px] sm:w-[22px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-0.5 text-[9px] font-bold text-white ring-2 ring-[hsl(var(--background))] sm:-right-1.5 sm:h-5 sm:min-w-5 sm:text-[10px]">
                  {count}
                </span>
              )}
            </Link>
            <Link href={user ? "/profile" : "/login"} className="hidden h-9 w-10 items-center justify-center rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition hover:border-brand-400 min-[400px]:inline-flex sm:h-10 sm:w-11 lg:w-12" aria-label={user ? "Profile" : "Login"}>
              <User size={18} className="sm:h-5 sm:w-5" />
            </Link>
            <button type="button" className="inline-flex h-9 w-10 items-center justify-center rounded-sm border border-[hsl(var(--border))] sm:h-10 sm:w-11 xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <SameDayDeliveryBar />

      {open && (
        <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] xl:hidden">
          <nav className="container-page flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto py-3">
            <div className="mb-2 flex items-center gap-2 px-3">
              <ThemeToggle />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Theme</span>
            </div>
            {mainNav.map((item) => (
              <div key={item.href} className="flex flex-col">
                <Link
                  href={item.href}
                  onClick={() => !item.dropdown && setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-brand-500/10 active:bg-brand-500/15"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 flex flex-col border-l-2 border-[hsl(var(--border))] pl-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        href={dropItem.href}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-brand-600 active:text-brand-600"
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={`tel:${SITE.phone}`}
              className="mx-3 mt-2 flex items-center justify-center gap-2 rounded-sm bg-brand-600 py-3.5 text-sm font-bold text-white active:bg-brand-500"
            >
              <Phone size={16} /> Call Now — {SITE.phone}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 mt-2 flex items-center justify-center gap-2 rounded-sm border border-brand-500 py-3 text-sm font-bold text-brand-700 active:bg-brand-50 dark:text-brand-300"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
