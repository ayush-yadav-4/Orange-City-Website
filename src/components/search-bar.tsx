"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  variant?: "header" | "mobile";
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search batteries...",
  className,
  variant = "header",
}: SearchBarProps) {
  const isHeader = variant === "header";

  return (
    <form onSubmit={onSubmit} className={cn("relative flex", className)}>
      <Search
        size={isHeader ? 16 : 18}
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2",
          isHeader ? "text-brand-700" : "text-brand-600"
        )}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-l-md border-2 py-2.5 pl-10 pr-2 text-sm font-medium outline-none transition",
          isHeader
            ? "border-white/60 border-r-0 bg-white text-ink-900 shadow-md placeholder:text-ink-400 focus:border-white focus:ring-2 focus:ring-white/50"
            : "border-brand-300 border-r-0 bg-white shadow-sm ring-2 ring-brand-200/50 focus:border-brand-500 dark:border-brand-700 dark:bg-[hsl(var(--card))]"
        )}
      />
      <button
        type="submit"
        className="flex shrink-0 items-center gap-1.5 rounded-r-md border-2 border-l-0 border-yellow-400 bg-yellow-400 px-3 text-xs font-extrabold text-ink-900 shadow-md transition hover:bg-yellow-300 sm:px-4 sm:text-sm"
      >
        <Search size={14} className="sm:hidden" />
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden">Go</span>
      </button>
    </form>
  );
}
