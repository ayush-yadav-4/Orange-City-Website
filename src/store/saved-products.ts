import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedProduct = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  priceWithExchange: number;
  priceWithoutExchange: number;
  mrp: number;
  savedAt: string;
};

export const EMPTY_SAVED: SavedProduct[] = [];

type SavedState = {
  byUser: Record<string, SavedProduct[]>;
  add: (userId: string, product: Omit<SavedProduct, "savedAt">) => void;
  remove: (userId: string, productId: string) => void;
  isSaved: (userId: string, productId: string) => boolean;
  getAll: (userId: string) => SavedProduct[];
};

export const useSavedProducts = create<SavedState>()(
  persist(
    (set, get) => ({
      byUser: {},
      add: (userId, product) => {
        const list = get().byUser[userId] ?? [];
        if (list.some((p) => p.productId === product.productId)) return;
        set({
          byUser: {
            ...get().byUser,
            [userId]: [...list, { ...product, savedAt: new Date().toISOString() }],
          },
        });
      },
      remove: (userId, productId) => {
        const list = get().byUser[userId] ?? [];
        set({
          byUser: {
            ...get().byUser,
            [userId]: list.filter((p) => p.productId !== productId),
          },
        });
      },
      isSaved: (userId, productId) => {
        const list = get().byUser[userId] ?? [];
        return list.some((p) => p.productId === productId);
      },
      getAll: (userId) => get().byUser[userId] ?? EMPTY_SAVED,
    }),
    { name: "ocb-saved" }
  )
);
