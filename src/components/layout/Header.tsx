"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Package, LogOut } from "lucide-react";
import { useAuthStore } from "@/features/auth/store";
import { useCartStore } from "@/features/cart/store";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const totalQuantity = useCartStore((s) => s.totalQuantity);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-extrabold">
            E
          </span>
          <span>EShop</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard/products"
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/dashboard/products"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <Package size={16} />
            Products
          </Link>

          <Link
            href="/dashboard/cart"
            className={cn(
              "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/dashboard/cart"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <span className="relative">
              <ShoppingCart size={16} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </span>
            Cart
          </Link>
        </nav>

        {/* User + Logout */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.image}
                alt={user.firstName}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:block">
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
