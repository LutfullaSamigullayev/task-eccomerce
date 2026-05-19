export function ProductSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-10 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-5 w-14 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function ProductsGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
