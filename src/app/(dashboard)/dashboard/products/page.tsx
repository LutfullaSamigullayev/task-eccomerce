"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, AlertCircle, PackageSearch, Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "use-debounce";
import { useCategories } from "@/features/products/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "@/features/products/api";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductsGridSkeleton } from "@/components/products/ProductSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { Input } from "@/components/ui/input";

const LIMIT = 12;

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const urlCategory = searchParams.get("category") ?? "";
  const urlPage = Number(searchParams.get("page") ?? "1");

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [debouncedSearch, { isPending, flush }] = useDebounce(searchInput, 1000);
  const [category, setCategory] = useState(urlCategory);
  const [page, setPage] = useState(urlPage);

  const updateUrl = useCallback(
    (search: string, cat: string, p: number) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (cat) params.set("category", cat);
      if (p > 1) params.set("page", String(p));
      router.replace(
        `/dashboard/products${params.toString() ? `?${params}` : ""}`,
        { scroll: false }
      );
    },
    [router]
  );

  useEffect(() => {
    updateUrl(debouncedSearch, category, page);
  }, [debouncedSearch, category, page, updateUrl]);

  const { data: categories } = useCategories();

  const skip = (page - 1) * LIMIT;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-page", debouncedSearch, category, page],
    queryFn: () => {
      if (debouncedSearch)
        return searchProducts({ q: debouncedSearch, limit: LIMIT, skip });
      if (category)
        return getProductsByCategory(category, { limit: LIMIT, skip });
      return getProducts({ limit: LIMIT, skip });
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearchInput("");
    flush();
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Products</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            type="text"
            placeholder="Mahsulot qidirish..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-10"
          />
          {isPending() ? (
            <Loader2
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400"
            />
          ) : searchInput ? (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>

        <Select
          value={category || "all"}
          onValueChange={(v) => handleCategoryChange(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Barcha kategoriyalar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha kategoriyalar</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      </div>


      {/* Count */}
      {!isLoading && !isError && total > 0 && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Jami {total} ta mahsulot &mdash; {page}/{totalPages} bet
        </p>
      )}

      {/* Loading */}
      {isLoading && <ProductsGridSkeleton count={LIMIT} />}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <AlertCircle size={40} className="text-red-400" />
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            Mahsulotlarni yuklashda xatolik yuz berdi
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Internet aloqangizni tekshirib, qayta urinib ko'ring.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <PackageSearch size={40} className="text-gray-300 dark:text-gray-600" />
          <p className="font-semibold text-gray-700 dark:text-gray-300">Mahsulot topilmadi</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Boshqa kalit so`z yoki kategoriya bilan qidiring.
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsGridSkeleton count={12} />}>
      <ProductsContent />
    </Suspense>
  );
}