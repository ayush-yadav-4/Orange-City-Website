"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  AdminCard, AdminFilterSelect, AdminPageHeader, AdminToolbar, formatCurrency,
} from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";

type Product = {
  id: string;
  modelName: string;
  slug: string;
  category: string;
  capacityAh: number;
  mrp: number;
  priceWithExchange: number;
  active: boolean;
  images: string;
  brand: { name: string; slug: string };
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allBrands, setAllBrands] = useState<{ slug: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    const url = brandFilter ? `/api/admin/products?brand=${brandFilter}` : "/api/admin/products";
    fetch(url)
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [brandFilter]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch("/api/admin/brands").then((r) => r.json()).then((b: { slug: string; name: string }[]) =>
      setAllBrands(b.map((x) => ({ slug: x.slug, name: x.name })))
    );
  }, []);

  const brandOptions = useMemo(
    () => [{ value: "", label: "All brands" }, ...allBrands.map((b) => ({ value: b.slug, label: b.name }))],
    [allBrands]
  );

  const duplicates = useMemo(
    () => findDuplicateIds(products, (p) => `${p.brand.slug}:${p.modelName.toLowerCase()}`),
    [products]
  );

  const slugDupes = useMemo(
    () => findDuplicateIds(products, (p) => p.slug),
    [products]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.modelName.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.brand.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

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
    if (!confirm(`Delete "${name}" permanently?`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  function getImage(images: string) {
    try {
      return JSON.parse(images)[0] ?? "";
    } catch {
      return images;
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Products"
        subtitle={loading ? "Loading..." : `${filtered.length} of ${products.length} products`}
        action={
          <Link href="/admin-panel/owner/products/new" className="btn-primary inline-flex items-center gap-1.5 text-sm">
            <Plus size={16} /> Add Product
          </Link>
        }
      />
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, brand, category..."
        filter={
          <AdminFilterSelect label="Brand" value={brandFilter} onChange={setBrandFilter} options={brandOptions} />
        }
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <AdminCard
            key={p.id}
            title={p.modelName}
            subtitle={p.brand.name}
            image={getImage(p.images)}
            imageHref={`/admin-panel/owner/products/${p.id}`}
            active={p.active}
            isDuplicate={duplicates.has(p.id) || slugDupes.has(p.id)}
            meta={[p.category, `${p.capacityAh}Ah`, formatCurrency(p.priceWithExchange)]}
            editHref={`/admin-panel/owner/products/${p.id}`}
            toggling={toggling === p.id}
            deleting={deleting === p.id}
            onToggleActive={() => toggleActive(p.id, p.active)}
            onDelete={() => deleteItem(p.id, p.modelName)}
          />
        ))}
      </div>
      {!loading && filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]">No products found.</p>
      )}
    </div>
  );
}
