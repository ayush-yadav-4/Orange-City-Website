import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  exchange: boolean;
  priceWithExchange: number;
  priceWithoutExchange: number;
  mrp: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setExchange: (productId: string, exchange: boolean) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + (item.quantity ?? 1), exchange: item.exchange }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity: item.quantity ?? 1 }],
          });
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      updateQuantity: (productId, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((i) => i.productId !== productId)
              : get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        }),
      setExchange: (productId, exchange) =>
        set({
          items: get().items.map((i) => (i.productId === productId ? { ...i, exchange } : i)),
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => {
          const unit = i.exchange ? i.priceWithExchange : i.priceWithoutExchange;
          return sum + unit * i.quantity;
        }, 0),
    }),
    { name: "ocb-cart" }
  )
);
