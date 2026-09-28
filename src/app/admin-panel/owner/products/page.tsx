"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Power,
  PowerOff,
  Trash2,
  ExternalLink,
  Car,
  Layers,
  Sparkles,
  LayoutGrid,
  List,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  AdminFilterSelect,
  AdminPageHeader,
  formatCurrency,
  StatusBadge,
  DuplicateBadge,
} from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";

type Product = {
  id: string;
  modelName: string;
  slug: string;
  category: string;
  capacityAh: number;
  warrantyMonths?: number;
  mrp: number;
  priceWithExchange: number;
  priceWithoutExchange?: number;
  stockStatus?: string;
  active: boolean;
  images: string;
  brand: { name: string; slug: string };
  compatibilities?: { vehicleMake: string; vehicleModel: string }[];
};

const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "🌐" },
  { id: "car", label: "Car", icon: "🚗" },
  { id: "bike", label: "Bike / 2W", icon: "🏍️" },
  { id: "inverter", label: "Inverter", icon: "⚡" },
  { id: "truck", label: "Commercial", icon: "🚚" },
  { id: "ups", label: "Home UPS", icon: "🏠" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allBrands, setAllBrands] = useState<{ slug: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"compact" | "table">("compact");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    const url = brandFilter ? `/api/admin/products?brand=${brandFilter}` : "/api/admin/products";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, [brandFilter]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then((r) => r.json())
      .then((b: { slug: string; name: string }[]) => {
        if (Array.isArray(b)) {
          setAllBrands(b.map((x) => ({ slug: x.slug, name: x.name })));
        }
      })
      .catch((err) => console.error("Failed to load brands:", err));
  }, []);

  const brandOptions = useMemo(
    () => [{ value: "", label: "All brands" }, ...allBrands.map((b) => ({ value: b.slug, label: b.name }))],
    [allBrands]
  );

  const duplicates = useMemo(
    () => findDuplicateIds(products, (p) => `${p.brand.slug}:${p.modelName.toLowerCase()}`),
    [products]
  );

  const slugDupes = useMemo(() => findDuplicateIds(products, (p) => p.slug), [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
      if (!q) return true;
      const vehicleMatch = p.compatibilities?.some(
        (c) =>
          c.vehicleMake.toLowerCase().includes(q) || c.vehicleModel.toLowerCase().includes(q)
      );
      return (
        p.modelName.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.brand.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        Boolean(vehicleMatch)
      );
    });
  }, [products, search, categoryFilter]);

  async function toggleActive(id: string, active: boolean) {
    setToggling(id);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: updated.active } : p)));
    }
    setToggling(null);
  }

  async function deleteItem(id: string, name: string) {
    if (!confirm(`Delete product "${name}" permanently? This cannot be undone.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  function getImage(images: string) {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) && parsed[0] ? parsed[0] : "";
    } catch {
      return images && !images.startsWith("[") ? images : "";
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products Catalog"
        subtitle={
          loading
            ? "Loading products..."
            : `Showing ${filtered.length} of ${products.length} products with multi-vehicle compatibility`
        }
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/admin-panel/owner/products/new"
              className="btn-primary inline-flex items-center gap-1.5 text-xs font-semibold"
            >
              <Plus size={15} /> Add New Product
            </Link>
          </div>
        }
      />

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3.5 shadow-2xs">
          <div className="text-xs text-[hsl(var(--muted-foreground))]">Total Products</div>
          <div className="mt-1 text-2xl font-bold font-display text-[hsl(var(--foreground))]">
            {products.length}
          </div>
        </div>
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3.5 shadow-2xs">
          <div className="text-xs text-[hsl(var(--muted-foreground))]">Active Listings</div>
          <div className="mt-1 text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
            {products.filter((p) => p.active).length}
          </div>
        </div>
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3.5 shadow-2xs">
          <div className="text-xs text-[hsl(var(--muted-foreground))]">Linked With Vehicles</div>
          <div className="mt-1 text-2xl font-bold font-display text-brand-600">
            {products.filter((p) => (p.compatibilities?.length || 0) > 0).length}
          </div>
        </div>
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3.5 shadow-2xs">
          <div className="text-xs text-[hsl(var(--muted-foreground))]">Unique Brands</div>
          <div className="mt-1 text-2xl font-bold font-display text-amber-600">
            {allBrands.length}
          </div>
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[hsl(var(--border))] pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((c) => {
              const count =
                c.id === "all"
                  ? products.length
                  : products.filter((p) => p.category.toLowerCase() === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryFilter(c.id)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    categoryFilter === c.id
                      ? "bg-brand-600 text-white shadow-xs"
                      : "bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-brand-300"
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                  <span className="ml-1 rounded-full bg-black/10 dark:bg-white/10 px-1.5 py-0.2 text-[10px]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode("compact")}
              className={`rounded-lg p-1.5 transition ${
                viewMode === "compact"
                  ? "bg-brand-500/10 text-brand-600"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
              }`}
              title="Card View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded-lg p-1.5 transition ${
                viewMode === "table"
                  ? "bg-brand-500/10 text-brand-600"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
              }`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Search & Brand Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by battery name, brand, vehicle model (e.g. Swift, Activa, Flo)..."
              className="input-field pl-9 text-xs"
            />
          </div>
          <div className="w-full sm:w-56">
            <AdminFilterSelect
              label="Brand"
              value={brandFilter}
              onChange={setBrandFilter}
              options={brandOptions}
            />
          </div>
        </div>
      </div>

      {/* Loading & Empty State */}
      {loading ? (
        <div className="py-20 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-brand-600 mb-2" />
          Loading products...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] py-16 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p className="font-semibold">No products found matching the current filters.</p>
          <div className="mt-3 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setBrandFilter("");
                setCategoryFilter("all");
              }}
              className="btn-secondary text-xs"
            >
              Reset Filters
            </button>
            <Link href="/admin-panel/owner/products/new" className="btn-primary text-xs">
              + Add Product
            </Link>
          </div>
        </div>
      ) : viewMode === "compact" ? (
        /* Professional Compact Cards (Smaller Image Thumbnails) */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const img = getImage(p.images);
            const isDup = duplicates.has(p.id) || slugDupes.has(p.id);
            const compats = p.compatibilities || [];

            return (
              <div
                key={p.id}
                className={`group flex flex-col justify-between rounded-xl border bg-[hsl(var(--card))] p-4 shadow-2xs transition-all duration-200 hover:border-brand-300 hover:shadow-xs ${
                  isDup ? "border-amber-400 ring-1 ring-amber-400/40" : "border-[hsl(var(--border))]"
                }`}
              >
                <div>
                  {/* Top Bar: Brand, Category, Status & Small Image */}
                  <div className="flex items-start gap-3">
                    {/* Small Image Card (Compact, Professional Thumbnail) */}
                    <Link
                      href={`/admin-panel/owner/products/${p.id}`}
                      className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-white p-1 shadow-2xs transition group-hover:scale-105"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={p.modelName}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-[hsl(var(--muted-foreground))] font-semibold">
                          No Image
                        </div>
                      )}
                    </Link>

                    {/* Product Brand & Title */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="rounded-md bg-brand-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                          {p.brand.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {isDup && <DuplicateBadge />}
                          <StatusBadge active={p.active} />
                        </div>
                      </div>

                      <h3 className="mt-1 font-display font-semibold text-sm text-[hsl(var(--foreground))] line-clamp-1">
                        <Link
                          href={`/admin-panel/owner/products/${p.id}`}
                          className="hover:text-brand-600 transition"
                        >
                          {p.modelName}
                        </Link>
                      </h3>

                      <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                        <span className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.2 font-medium capitalize">
                          {p.category}
                        </span>
                        <span>·</span>
                        <span className="font-semibold text-[hsl(var(--foreground))]">
                          {p.capacityAh} Ah
                        </span>
                        {p.warrantyMonths ? (
                          <>
                            <span>·</span>
                            <span>{p.warrantyMonths}m warranty</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Comparison */}
                  <div className="mt-3.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 p-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[hsl(var(--muted-foreground))] text-[11px]">
                        With Exchange:
                      </span>
                      <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                        {formatCurrency(p.priceWithExchange)}
                      </span>
                    </div>
                    {p.priceWithoutExchange ? (
                      <div className="mt-0.5 flex items-center justify-between text-[11px]">
                        <span className="text-[hsl(var(--muted-foreground))]">Without Exchange:</span>
                        <span className="text-[hsl(var(--muted-foreground))] font-medium">
                          {formatCurrency(p.priceWithoutExchange)}
                        </span>
                      </div>
                    ) : null}
                    {p.mrp > 0 && (
                      <div className="mt-0.5 flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
                        <span>MRP:</span>
                        <span className="line-through">{formatCurrency(p.mrp)}</span>
                      </div>
                    )}
                  </div>

                  {/* Vehicle Compatibility Preview Badge */}
                  <div className="mt-3">
                    {compats.length > 0 ? (
                      <div className="rounded-lg bg-brand-500/10 px-2.5 py-1.5 text-[11px] text-brand-800 dark:text-brand-200">
                        <div className="flex items-center gap-1 font-semibold">
                          <Car size={12} className="text-brand-600" />
                          <span>Fits {compats.length} {compats.length === 1 ? "Vehicle" : "Vehicles"}:</span>
                        </div>
                        <p className="mt-0.5 truncate text-[10px] text-[hsl(var(--muted-foreground))]">
                          {compats.slice(0, 3).map((c) => `${c.vehicleMake} ${c.vehicleModel}`).join(", ")}
                          {compats.length > 3 ? ` +${compats.length - 3} more` : ""}
                        </p>
                      </div>
                    ) : (
                      <Link
                        href={`/admin-panel/owner/products/${p.id}`}
                        className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        <AlertTriangle size={12} />
                        <span>No vehicles linked — click to assign</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Card Actions Bottom Bar */}
                <div className="mt-4 flex items-center gap-1.5 border-t border-[hsl(var(--border))] pt-3 text-xs">
                  <Link
                    href={`/admin-panel/owner/products/${p.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 font-semibold text-white transition hover:bg-brand-500 shadow-2xs"
                  >
                    <Pencil size={13} /> Edit
                  </Link>

                  <Link
                    href={`/products/${p.slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] p-1.5 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))] hover:text-brand-600"
                    title="View live on website"
                  >
                    <ExternalLink size={14} />
                  </Link>

                  <button
                    type="button"
                    disabled={toggling === p.id}
                    onClick={() => toggleActive(p.id, p.active)}
                    className={`inline-flex items-center justify-center rounded-lg border p-1.5 transition ${
                      p.active
                        ? "border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-red-50 hover:text-red-600"
                        : "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                    }`}
                    title={p.active ? "Deactivate listing" : "Activate listing"}
                  >
                    {p.active ? <PowerOff size={14} /> : <Power size={14} />}
                  </button>

                  <button
                    type="button"
                    disabled={deleting === p.id}
                    onClick={() => deleteItem(p.id, p.modelName)}
                    className="inline-flex items-center justify-center rounded-lg border border-red-200 p-1.5 text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/20"
                    title="Delete product"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Professional Table View */
        <div className="overflow-x-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              <tr>
                <th className="py-3 pl-4 pr-2">Product</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Capacity</th>
                <th className="px-3 py-3">Exchange Price</th>
                <th className="px-3 py-3">Compatible Vehicles</th>
                <th className="px-3 py-3">Status</th>
                <th className="py-3 pl-2 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filtered.map((p) => {
                const img = getImage(p.images);
                const compats = p.compatibilities || [];
                return (
                  <tr key={p.id} className="hover:bg-[hsl(var(--muted))]/30 transition">
                    <td className="py-2.5 pl-4 pr-2">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-white p-0.5">
                          {img ? (
                            <img src={img} alt="" className="h-full w-full object-contain" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[9px] text-[hsl(var(--muted-foreground))]">
                              No Img
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[hsl(var(--foreground))] line-clamp-1">
                            {p.modelName}
                          </div>
                          <div className="text-[11px] text-brand-600 font-medium">
                            {p.brand.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 capitalize">{p.category}</td>
                    <td className="px-3 py-2.5 font-medium">{p.capacityAh} Ah</td>
                    <td className="px-3 py-2.5">
                      <div className="font-bold text-emerald-700 dark:text-emerald-400">
                        {formatCurrency(p.priceWithExchange)}
                      </div>
                      {p.priceWithoutExchange ? (
                        <div className="text-[10px] text-[hsl(var(--muted-foreground))]">
                          wo/ {formatCurrency(p.priceWithoutExchange)}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-2.5">
                      {compats.length > 0 ? (
                        <span className="rounded-md bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:text-brand-300">
                          {compats.length} {compats.length === 1 ? "Vehicle" : "Vehicles"}
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-600">None</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <StatusBadge active={p.active} />
                    </td>
                    <td className="py-2.5 pl-2 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin-panel/owner/products/${p.id}`}
                          className="rounded-md border p-1 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleActive(p.id, p.active)}
                          className="rounded-md border p-1 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                          title={p.active ? "Deactivate" : "Activate"}
                        >
                          {p.active ? <PowerOff size={13} /> : <Power size={13} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteItem(p.id, p.modelName)}
                          className="rounded-md border border-red-200 p-1 text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
