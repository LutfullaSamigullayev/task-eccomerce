"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const delta = 2;
    const pages: (number | "...")[] = [];
    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 pt-8">
      <PageBtn onClick={() => onPageChange(1)} disabled={page === 1} aria-label="Birinchi">
        <ChevronsLeft size={15} />
      </PageBtn>
      <PageBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Oldingi">
        <ChevronLeft size={15} />
      </PageBtn>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
            …
          </span>
        ) : (
          <PageBtn
            key={p}
            onClick={() => onPageChange(p as number)}
            active={p === page}
          >
            {p}
          </PageBtn>
        )
      )}

      <PageBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages} aria-label="Keyingi">
        <ChevronRight size={15} />
      </PageBtn>
      <PageBtn onClick={() => onPageChange(totalPages)} disabled={page === totalPages} aria-label="Oxirgi">
        <ChevronsRight size={15} />
      </PageBtn>
    </div>
  );
}

function PageBtn({
  children,
  onClick,
  disabled,
  active,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  "aria-label"?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {children}
    </button>
  );
}
