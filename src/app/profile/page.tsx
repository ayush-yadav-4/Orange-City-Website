"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Heart, ShoppingBag, LogOut, Package, Phone, Mail } from "lucide-react";
import { useAuth, useAuthHydrated } from "@/store/auth";
import { EMPTY_SAVED, useSavedProducts } from "@/store/saved-products";
import { useCart } from "@/store/cart";
import { formatINR, SITE } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const saved = useSavedProducts((s) => (user ? s.byUser[user.id] : undefined)) ?? EMPTY_SAVED;
  const cartItems = useCart((s) => s.items);

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="section-spacing">
        <div className="container-page py-20 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Loading your profile...
        </div>
      </div>
    );
  }

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="section-spacing">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-600">
              <User size={32} />
            </div>
            <div>
              <h1 className="section-title">{user.name}</h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary gap-2 self-start">
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="surface p-6">
            <h2 className="mb-4 font-display text-lg font-bold">Account Details</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-brand-500" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-brand-500" />
                <span>{user.phone || "—"}</span>
              </div>
            </dl>
            <div className="mt-6 rounded-xl bg-[hsl(var(--muted))]/50 p-4 text-xs text-[hsl(var(--muted-foreground))]">
              Need help? Call us at{" "}
              <a href={`tel:${SITE.phone}`} className="font-semibold text-brand-600">{SITE.phone}</a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="surface p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                  <Heart size={20} className="text-brand-500" />
                  Saved Products ({saved.length})
                </h2>
                <Link href="/categories" className="text-sm font-semibold text-brand-600 hover:underline">
                  Browse more
                </Link>
              </div>

              {saved.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[hsl(var(--border))] py-12 text-center">
                  <Heart className="mx-auto h-10 w-10 text-[hsl(var(--muted-foreground))]" />
                  <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                    No saved products yet. Browse the marketplace and save batteries you like.
                  </p>
                  <Link href="/categories" className="btn-primary mt-4 inline-flex">
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {saved.map((product) => (
                    <div
                      key={product.productId}
                      className="flex gap-4 rounded-xl border border-[hsl(var(--border))] p-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">No img</div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-xs font-semibold uppercase text-brand-600">{product.brand}</p>
                        <Link href={`/products/${product.slug}`} className="font-semibold hover:text-brand-600">
                          {product.name}
                        </Link>
                        <p className="mt-auto text-sm font-bold">{formatINR(product.priceWithExchange)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="surface mt-6 p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
                <ShoppingBag size={20} className="text-brand-500" />
                Current Cart ({cartItems.length} items)
              </h2>
              {cartItems.length === 0 ? (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Your cart is empty.</p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-semibold">
                        {formatINR(item.exchange ? item.priceWithExchange : item.priceWithoutExchange)}
                      </span>
                    </div>
                  ))}
                  <Link href="/cart" className="btn-primary mt-4 inline-flex w-full justify-center">
                    View Cart & Checkout
                  </Link>
                </div>
              )}
            </div>

            <div className="surface mt-6 p-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
                <Package size={20} className="text-brand-500" />
                Order History
              </h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Your past orders will appear here once you place your first order. We&apos;ll send updates via SMS and WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
