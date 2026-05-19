"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
  Package,
  Tag,
  Layers,
  AlertCircle,
} from "lucide-react";
import { useProduct } from "@/features/products/hooks";
import { useCartStore } from "@/features/cart/store";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading, isError } = useProduct(Number(id));
  const addItem = useCartStore((s) => s.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="mb-6 h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col gap-4">
            <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-20 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-32 text-center">
        <AlertCircle size={40} className="text-red-400" />
        <p className="font-semibold text-gray-700 dark:text-gray-300">
          Mahsulot topilmadi
        </p>
        <button
          onClick={() => router.back()}
          className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Orqaga
        </button>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Orqaga
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="aspect-square w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === i
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Category & Brand */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 dark:bg-blue-950 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 capitalize">
              {product.category}
            </span>
            {product.brand && (
              <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                {product.brand}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="rounded-md bg-red-100 dark:bg-red-950 px-2 py-0.5 text-sm font-semibold text-red-600 dark:text-red-400">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border bg-gray-50 dark:bg-gray-900 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Package size={15} className="text-gray-400" />
              <span>
                Stock:{" "}
                <span
                  className={`font-semibold ${
                    product.stock > 10
                      ? "text-green-600 dark:text-green-400"
                      : product.stock > 0
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {product.stock > 0 ? product.stock : "Tugagan"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Tag size={15} className="text-gray-400" />
              <span>
                Chegirma:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {product.discountPercentage.toFixed(1)}%
                </span>
              </span>
            </div>
            {product.brand && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Layers size={15} className="text-gray-400" />
                <span>
                  Brand:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {product.brand}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-colors ${
              product.stock === 0
                ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                : added
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {added ? (
              <>
                <Check size={18} /> Savatga qo'shildi!
              </>
            ) : product.stock === 0 ? (
              "Mahsulot tugagan"
            ) : (
              <>
                <ShoppingCart size={18} /> Savatga qo'shish
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}