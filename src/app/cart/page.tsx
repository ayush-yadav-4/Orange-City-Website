"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="section-spacing">
        <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--muted))]">
            <ShoppingCart className="h-10 w-10 text-[hsl(var(--muted-foreground))]" />
          </div>
          <h1 className="section-title">Your cart is empty</h1>
          <p className="section-sub mx-auto mt-2">Looks like you haven&apos;t added any batteries yet.</p>
          <Link href="/categories" className="btn-primary mt-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-spacing">
      <div className="container-page">
        <h1 className="section-title mb-8">Your Cart</h1>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="surface divide-y divide-[hsl(var(--border))]">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-white">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--foreground))]">{item.name}</h3>
                          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="shrink-0 text-[hsl(var(--muted-foreground))] transition hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] text-sm font-bold hover:bg-[hsl(var(--muted))]"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] text-sm font-bold hover:bg-[hsl(var(--muted))]"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="rounded-md bg-[hsl(var(--muted))] px-2.5 py-1 text-xs font-medium">
                          {item.exchange ? "With Old Battery" : "Without Old Battery"}
                        </span>
                        <p className="mt-1 font-display text-lg font-bold">
                          {formatINR(
                            (item.exchange ? item.priceWithExchange : item.priceWithoutExchange) * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="surface sticky top-28 p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                  <span>Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)</span>
                  <span>{formatINR(total)}</span>
                </div>
                <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                  <span>Delivery & Installation</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
                <div className="my-4 flex justify-between border-t border-[hsl(var(--border))] pt-4 text-lg font-bold text-[hsl(var(--foreground))]">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary mt-6 w-full py-3.5">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              <Link
                href="/categories"
                className="mt-3 block text-center text-sm font-medium text-brand-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
