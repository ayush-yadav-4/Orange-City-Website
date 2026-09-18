"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Battery, Search } from "lucide-react";
import { GoogleRatingBadge } from "@/components/google-rating-badge";
import { getSearchSuggestions, type SearchProduct, type SearchSuggestion } from "@/lib/search-suggestions";
import { cn, SITE } from "@/lib/utils";

type HeaderSearchProps = {
  variant?: "header" | "mobile-top";
  className?: string;
};

export function HeaderSearch({ variant = "header", className }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobileTop = variant === "mobile-top";

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        const brands = new Map((data.brands ?? []).map((b: { slug: string; name: string }) => [b.slug, b.name]));
        const list: SearchProduct[] = (data.products ?? [])
          .filter((p: { active?: boolean }) => p.active !== false)
          .map((p: { id: string; slug: string; modelName: string; category: string; brandSlug: string }) => ({
            id: p.id,
            slug: p.slug,
            modelName: p.modelName,
            category: p.category,
            brandSlug: p.brandSlug,
            brandName: brands.get(p.brandSlug) ?? p.brandSlug,
          }));
        setProducts(list);
      })
      .catch(() => {});
  }, []);

  const { categories, products: productSuggestions } = useMemo(
    () => getSearchSuggestions(query, products),
    [query, products]
  );

  const allSuggestions = useMemo(
    () => [...categories, ...productSuggestions],
    [categories, productSuggestions]
  );

  const showDropdown = open && query.trim().length > 0 && allSuggestions.length > 0;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      setActiveIndex(-1);
      router.push(href);
    },
    [router]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    if (activeIndex >= 0 && allSuggestions[activeIndex]) {
      navigate(allSuggestions[activeIndex].href);
      return;
    }
    navigate(`/marketplace?q=${encodeURIComponent(q)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % allSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? allSuggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  function renderSuggestion(item: SearchSuggestion, index: number) {
    const active = index === activeIndex;
    return (
      <button
        key={`${item.type}-${item.id}`}
        type="button"
        onMouseEnter={() => setActiveIndex(index)}
        onClick={() => navigate(item.href)}
        className={cn(
          "flex w-full items-center gap-3 px-3 py-2.5 text-left transition",
          active ? "bg-brand-50 dark:bg-brand-950/40" : "hover:bg-[hsl(var(--muted))]/60"
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm dark:bg-brand-900/50">
          {item.type === "category" ? item.icon ?? "🔋" : <Battery size={16} className="text-brand-600" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-[hsl(var(--foreground))]">{item.label}</span>
          {item.sublabel && (
            <span className="block truncate text-xs text-[hsl(var(--muted-foreground))]">{item.sublabel}</span>
          )}
        </span>
        {item.type === "category" && (
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-brand-600">Browse</span>
        )}
      </button>
    );
  }

  const searchForm = (
    <div ref={wrapRef} className={cn("relative min-w-0", isMobileTop ? "flex-1" : className)}>
      <form onSubmit={handleSubmit} className="relative flex">
        <Search
          size={isMobileTop ? 14 : 16}
          className={cn(
            "absolute left-2.5 top-1/2 z-10 -translate-y-1/2 sm:left-3",
            isMobileTop ? "text-brand-700" : "text-brand-700"
          )}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMobileTop ? "Search batteries..." : "Search batteries, car, bike..."}
          autoComplete="off"
          aria-expanded={showDropdown}
          className={cn(
            "w-full rounded-l-md border-2 py-2 pl-8 pr-1 text-sm font-medium outline-none transition sm:py-2.5 sm:pl-10 sm:pr-2",
            isMobileTop
              ? "border-white/60 border-r-0 bg-white text-ink-900 text-xs placeholder:text-ink-400 focus:border-white focus:ring-2 focus:ring-white/50"
              : "border-white/60 border-r-0 bg-white text-ink-900 shadow-md placeholder:text-ink-400 focus:border-white focus:ring-2 focus:ring-white/50"
          )}
        />
        <button
          type="submit"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-r-md border-2 border-l-0 border-yellow-400 bg-yellow-400 font-extrabold text-ink-900 shadow-md transition hover:bg-yellow-300",
            isMobileTop ? "px-2.5 text-[10px]" : "gap-1.5 px-3 text-xs sm:px-4 sm:text-sm"
          )}
        >
          {isMobileTop ? <Search size={14} /> : (
            <>
              <Search size={14} className="sm:hidden" />
              <span className="hidden sm:inline">Search</span>
              <span className="sm:hidden">Go</span>
            </>
          )}
        </button>
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-[min(60vh,320px)] overflow-hidden overflow-y-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl">
          {categories.length > 0 && (
            <div className="border-b border-[hsl(var(--border))]">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Battery categories
              </p>
              {categories.map((item, i) => renderSuggestion(item, i))}
            </div>
          )}
          {productSuggestions.length > 0 && (
            <div>
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Batteries by name
              </p>
              {productSuggestions.map((item, i) => renderSuggestion(item, categories.length + i))}
            </div>
          )}
          <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-3 py-2 text-center">
            <button
              type="button"
              onClick={() => navigate(`/marketplace?q=${encodeURIComponent(query.trim())}`)}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              View all results for &quot;{query.trim()}&quot;
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobileTop) {
    return (
      <div className={cn("flex min-w-0 flex-1 items-center gap-1.5", className)}>
        {searchForm}
        <GoogleRatingBadge compact />
      </div>
    );
  }

  return (
    <div className={cn("flex shrink-0 items-center gap-1", className)}>
      <div className="w-48 md:w-60 lg:w-72">{searchForm}</div>
      <GoogleRatingBadge />
      <span className="hidden whitespace-nowrap pl-0.5 text-[11px] font-semibold text-brand-100 md:inline">
        {SITE.reviewCount}+ Reviews
      </span>
    </div>
  );
}
