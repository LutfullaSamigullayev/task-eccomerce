"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/features/products/types";
import { CartQuantityButton } from "./CartQuantityButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

  return (
    <Link
      href={`/dashboard/products/${product.id}`}
      data-card
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

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-base font-bold text-gray-900 dark:text-white shrink-0">
            ${product.price.toFixed(2)}
          </span>
          <CartQuantityButton
            productId={product.id}
            title={product.title}
            price={product.price}
            discountPercentage={product.discountPercentage}
            thumbnail={product.thumbnail}
            size="sm"
            onClick={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </Link>
  );
}
