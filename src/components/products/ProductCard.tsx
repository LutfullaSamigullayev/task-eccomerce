"use client";

import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/features/products/types";
import { useCartStore } from "@/features/cart/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/dashboard/products/${product.id}`}
      className="group flex flex-col rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 rounded-md bg-red-500 px-1.5 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
          {product.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white leading-snug">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={13} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              added
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {added ? (
              <>
                <Check size={13} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={13} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
