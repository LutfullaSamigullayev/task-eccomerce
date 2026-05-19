"use client";

import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/features/cart/store";

interface CartQuantityButtonProps {
  productId: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  disabled?: boolean;
  size?: "sm" | "lg";
  onClick?: (e: React.MouseEvent) => void;
}

export function CartQuantityButton({
  productId,
  title,
  price,
  discountPercentage,
  thumbnail,
  disabled = false,
  size = "sm",
  onClick,
}: CartQuantityButtonProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.id === productId);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    onClick?.(e);
    addItem({ id: productId, title, price, quantity: 1, discountPercentage, thumbnail });
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(productId, quantity + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(productId, quantity - 1);
  };

  if (disabled) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl font-semibold text-gray-400 bg-gray-200 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed ${
          size === "lg" ? "w-full py-3.5 text-base gap-2" : "px-3 py-1.5 text-xs gap-1.5 rounded-lg"
        }`}
      >
        Mahsulot tugagan
      </div>
    );
  }

  if (quantity > 0) {
    return (
      <div
        className={`flex items-center justify-between rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 ${
          size === "lg" ? "w-full px-2 py-1.5" : "rounded-lg"
        }`}
        onClick={(e) => e.preventDefault()}
      >
        <button
          onClick={handleDecrease}
          className={`flex items-center justify-center rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors ${
            size === "lg" ? "h-10 w-10" : "h-7 w-7"
          }`}
        >
          <Minus size={size === "lg" ? 16 : 12} />
        </button>
        <span
          className={`font-bold text-blue-700 dark:text-blue-300 ${
            size === "lg" ? "text-lg min-w-[2rem] text-center" : "text-sm min-w-[1.25rem] text-center"
          }`}
        >
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          className={`flex items-center justify-center rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors ${
            size === "lg" ? "h-10 w-10" : "h-7 w-7"
          }`}
        >
          <Plus size={size === "lg" ? 16 : 12} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center justify-center gap-1.5 font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
        size === "lg"
          ? "w-full rounded-xl py-3.5 text-base gap-2"
          : "rounded-lg px-3 py-1.5 text-xs"
      }`}
    >
      <ShoppingCart size={size === "lg" ? 18 : 13} />
      {size === "lg" ? "Savatga qo'shish" : "Add"}
    </button>
  );
}
