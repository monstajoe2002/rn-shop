import { create } from "zustand";

type CartItem = {
  id: number;
  title: string;
  heroImage: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};
type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  getTotalPrice: () => string;
  getItemCount: () => number;
  resetCart: () => void;
};

const initialCartItems: CartItem[] = [];

export const useCartStore = create<CartState>((set, get) => ({
  items: initialCartItems,
  addItem: (item: CartItem) => {
    const existingItem = get().items.find((i) => i.id === item.id);
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: Math.min(i.quantity + item.quantity, i.maxQuantity),
              }
            : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...item }] }));
    }
  },
  removeItem: (id: number) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  incrementItem: (id: number) =>
    set((state) => {
      return {
        items: state.items.map((item) =>
          item.id === id && item.quantity < item.maxQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }),
  decrementItem: (id: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  getTotalPrice: () => {
    const { items } = get();
    return items
      .reduce((total, { price, quantity }) => total + price * quantity, 0)
      .toFixed(2);
  },
  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
  resetCart: () => set({ items: initialCartItems }),
}));
