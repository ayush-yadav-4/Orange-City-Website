"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { formatINR, discountPercent, parseImages, SITE } from "@/lib/utils";
import { Check, Minus, Phone, Plus, RefreshCw, ShoppingCart } from "lucide-react";

type Props = {
  product: {
    id: string;
    slug: string;
    modelName: string;
    mrp: number;
    priceWithExchange: number;
    priceWithoutExchange: number;
    images: string;
    stockStatus: string;
    brand: { name: string };
  };
};

const MIN_QTY = 1;
const MAX_QTY = 10;

export function AddToCartPanel({ product }: Props) {
  const [exchange, setExchange] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const router = useRouter();

  const price = exchange ? product.priceWithExchange : product.priceWithoutExchange;
  const off = discountPercent(product.mrp, price);
  const images = parseImages(product.images);
  const disabled = product.stockStatus === "out_of_stock";
  const lineTotal = price * quantity;

  function clampQty(n: number) {
    return Math.min(MAX_QTY, Math.max(MIN_QTY, n));
  }

  function handleAdd() {
    if (exchange) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.modelName,
      brand: product.brand.name,
      image: images[0] || "",
      exchange: false,
      quantity,
      priceWithExchange: product.priceWithExchange,
      priceWithoutExchange: product.priceWithoutExchange,
      mrp: product.mrp,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="surface space-y-4 p-4 sm:space-y-5 sm:p-6 lg:sticky lg:top-24">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">MRP</p>
        <p className="text-lg font-semibold text-[hsl(var(--muted-foreground))] line-through">
          {formatINR(product.mrp)}
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-600">Special price</p>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-3xl font-bold text-brand-700 dark:text-brand-300">{formatINR(price)}</span>
          {off > 0 && (
            <span className="rounded-md bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
              {off}% OFF
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Prices inclusive of all taxes</p>
        {quantity > 1 && (
          <p className="mt-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
            Total for {quantity} unit{quantity > 1 ? "s" : ""}: {formatINR(lineTotal)}
          </p>
        )}
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Select battery age</p>
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-[hsl(var(--muted))] p-1">
        <button
          type="button"
          onClick={() => setExchange(true)}
          className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
            exchange
              ? "bg-[hsl(var(--card))] text-brand-700 shadow-sm dark:text-brand-300"
              : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          With old battery
          <span className="mt-0.5 block text-xs font-normal">(Same Ah) {formatINR(product.priceWithExchange)}</span>
        </button>
        <button
          type="button"
          onClick={() => setExchange(false)}
          className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
            !exchange
              ? "bg-[hsl(var(--card))] text-brand-700 shadow-sm dark:text-brand-300"
              : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          Without old battery
          <span className="mt-0.5 block text-xs font-normal">{formatINR(product.priceWithoutExchange)}</span>
        </button>
      </div>

      {exchange && (
        <p className="flex items-start gap-2 text-xs text-[hsl(var(--muted-foreground))]">
          <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
          Old battery pickup scheduled with delivery. Call us to confirm exchange price and complete your order.
        </p>
      )}

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Quantity</p>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <button
              type="button"
              onClick={() => setQuantity((q) => clampQty(q - 1))}
              disabled={quantity <= MIN_QTY}
              className="flex h-11 w-11 items-center justify-center rounded-l-xl transition hover:bg-[hsl(var(--muted))] disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus size={18} />
            </button>
            <span className="min-w-[3rem] text-center text-lg font-bold tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => clampQty(q + 1))}
              disabled={quantity >= MAX_QTY}
              className="flex h-11 w-11 items-center justify-center rounded-r-xl transition hover:bg-[hsl(var(--muted))] disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={18} />
            </button>
          </div>
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Max {MAX_QTY} per order</span>
        </div>
      </div>

      {exchange ? (
        <div className="space-y-2">
          <a
            href={`tel:${SITE.phone}`}
            className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-base disabled:opacity-50"
          >
            <Phone size={20} strokeWidth={2.5} />
            Call now to complete purchase
          </a>
          <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
            Exchange orders are confirmed by phone — our team will verify old battery condition &amp; schedule delivery.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" disabled={disabled} onClick={handleAdd} className="btn-primary flex-1 disabled:opacity-50">
            {added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add to cart
              </>
            )}
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              handleAdd();
              router.push("/checkout");
            }}
            className="btn-secondary flex-1 disabled:opacity-50"
          >
            Buy now
          </button>
        </div>
      )}
    </div>
  );
}
