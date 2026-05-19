"use client";

import { useAuthStore } from "@/features/auth/store";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      {user && (
        <div className="mb-8 flex items-center gap-4 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <img
            src={user.image}
            alt={user.firstName}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">@{user.username}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/products"
          className="flex items-center gap-4 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm hover:border-blue-500 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Products</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Barcha mahsulotlarni ko'rish</p>
          </div>
        </Link>

        <Link
          href="/dashboard/cart"
          className="flex items-center gap-4 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm hover:border-blue-500 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950 text-green-600">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Cart</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Savatchangizni ko'rish</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
