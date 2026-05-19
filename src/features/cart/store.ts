import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartProduct } from './types';

interface CartState {
  items: CartProduct[];
  totalPrice: number;
  totalQuantity: number;
  
  // Amallar (Actions)
  addItem: (product: Omit<CartProduct, 'total' | 'discountedTotal'>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Yordamchi funksiya: Umumiy hisobni yangilash
const calculateTotals = (items: CartProduct[]) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalPrice, totalQuantity };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,

      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        let newItems;
        if (existingItem) {
          // Agar mahsulot bor bo'lsa, sonini oshiramiz
          newItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity, total: (item.quantity + product.quantity) * item.price }
              : item
          );
        } else {
          // Yangi mahsulot qo'shamiz
          newItems = [...items, { ...product, total: product.price * product.quantity }];
        }

        set({ items: newItems, ...calculateTotals(newItems) });
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((item) => item.id !== productId);
        set({ items: newItems, ...calculateTotals(newItems) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = get().items.map((item) =>
          item.id === productId
            ? { ...item, quantity, total: quantity * item.price }
            : item
        );

        set({ items: newItems, ...calculateTotals(newItems) });
      },

      clearCart: () => {
        set({ items: [], totalPrice: 0, totalQuantity: 0 });
      },
    }),
    {
      name: 'cart-storage', // Ushbu nom bilan localStorage'da saqlanadi
    }
  )
);