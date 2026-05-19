"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, PackageSearch } from "lucide-react";
import { useCartStore } from "@/features/cart/store";

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <ShoppingCart size={36} className="text-gray-400 dark:text-gray-600" />
        </div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Savat bo'sh
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mahsulotlarni qo'shish uchun katalogga o'ting.
        </p>
        <Link
          href="/dashboard/products"
          className="mt-2 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <PackageSearch size={16} />
          Mahsulotlarga o'tish
        </Link>
      </div>
    );
  }

  const discount = items.reduce(
    (sum, item) => sum + item.price * item.quantity * (item.discountPercentage / 100),
    0
  );
  const finalPrice = totalPrice - discount;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Savat{" "}
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            ({items.length} mahsulot)
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
        >
          <Trash2 size={15} />
          Tozalash
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="flex flex-col gap-3 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4 shadow-sm"
            >
              {/* Image */}
              <Link href={`/dashboard/products/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                />
              </Link>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <Link
                  href={`/dashboard/products/${item.id}`}
                  className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </Link>

                {item.discountPercentage > 0 && (
                  <span className="w-fit rounded-md bg-red-100 dark:bg-red-950 px-1.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
                    -{Math.round(item.discountPercentage)}% chegirma
                  </span>
                )}

                <div className="mt-auto flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex items-center gap-1 rounded-lg border dark:border-gray-700 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Price + remove */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity * (1 - item.discountPercentage / 100)).toFixed(2)}
                      </p>
                      {item.discountPercentage > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/dashboard/products"
            className="flex w-fit items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft size={15} />
            Xaridni davom ettirish
          </Link>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
            Buyurtma xulosasi
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Jami narx</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Chegirma</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Yetkazib berish</span>
              <span className="text-green-600 dark:text-green-400 font-medium">Bepul</span>
            </div>
            <div className="my-1 border-t dark:border-gray-700" />
            <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
              <span>To'lov summasi</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Buyurtma berish
          </button>
          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
            Demo rejim — to'lov amalga oshirilmaydi
          </p>
        </div>
      </div>
    </div>
  );
}