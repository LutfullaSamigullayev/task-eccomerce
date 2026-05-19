export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} EShop. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Powered by{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">DummyJSON</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
