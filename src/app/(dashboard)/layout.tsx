import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FlyingCartImage } from "@/components/layout/FlyingCartImage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
      <Footer />
      <FlyingCartImage />
    </div>
  );
}
