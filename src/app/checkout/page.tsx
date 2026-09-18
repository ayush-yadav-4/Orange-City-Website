"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const total = subtotal();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      router.replace("/cart");
    }
  }, [items.length, isSuccess, router]);

  if (items.length === 0 && !isSuccess) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      clear();
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
        <h1 className="font-display text-4xl font-bold">Order Confirmed!</h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Thank you for choosing Orange City Batteries. We will contact you shortly to confirm the delivery and installation time.
        </p>
        <button onClick={() => router.push("/")} className="btn-primary mt-8 px-8 py-3.5">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="section-spacing container-page">
      <h1 className="section-title mb-8">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold mb-6">Delivery Details</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <input required type="text" id="firstName" className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <input required type="text" id="lastName" className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input required type="tel" id="phone" className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="address" className="text-sm font-medium">Full Address (Nagpur only)</label>
                <textarea required id="address" rows={3} className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium">Payment Method</label>
                <div className="rounded-xl border border-brand-500 bg-brand-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="cod" name="payment" value="cod" defaultChecked className="h-4 w-4 accent-brand-600" />
                    <label htmlFor="cod" className="font-medium text-brand-700 dark:text-brand-300">Cash on Delivery (COD)</label>
                  </div>
                  <p className="mt-1 ml-7 text-xs text-[hsl(var(--muted-foreground))]">Pay via cash or UPI after installation.</p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>
           <div className="surface sticky top-24 p-6">
            <h2 className="font-display text-xl font-bold mb-4">Summary</h2>
            <div className="space-y-3 text-sm divide-y divide-[hsl(var(--border))]">
              {items.map((item, i) => (
                <div key={i} className="py-2 flex justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.exchange ? "With Old Battery" : "Without Old Battery"}</span>
                  </div>
                  <span>{formatINR(item.exchange ? item.priceWithExchange : item.priceWithoutExchange)}</span>
                </div>
              ))}
              <div className="py-4 flex justify-between font-bold text-[hsl(var(--foreground))] text-lg">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting} 
              className="btn-primary mt-6 w-full py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
