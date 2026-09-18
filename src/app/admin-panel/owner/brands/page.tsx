"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminCard, AdminPageHeader, AdminSearch } from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";

type Brand = { id: string; name: string; slug: string; color: string; logoUrl: string | null; active: boolean };

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/brands").then((r) => r.json()).then(setBrands);
  }, []);

  const duplicates = useMemo(
    () => findDuplicateIds(brands, (b) => b.slug),
    [brands]
  );
  const nameDupes = useMemo(
    () => findDuplicateIds(brands, (b) => b.name),
    [brands]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return brands.filter((b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q));
  }, [brands, search]);

  async function toggleActive(id: string, active: boolean) {
    setToggling(id);
    const res = await fetch(`/api/admin/brands/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, active: updated.active } : b)));
    }
    setToggling(null);
  }

  async function deleteItem(id: string, name: string) {
    if (!confirm(`Delete brand "${name}"? Products linked to it may break.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    if (res.ok) setBrands((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  }

  return (
    <div>
      <AdminPageHeader
        title="Brands"
        subtitle={`${filtered.length} of ${brands.length} brands`}
        action={
          <Link href="/admin-panel/owner/brands/new" className="btn-primary inline-flex items-center gap-1.5 text-sm">
            <Plus size={16} /> Add Brand
          </Link>
        }
      />
      <AdminSearch value={search} onChange={setSearch} placeholder="Search brands..." />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b) => (
          <AdminCard
            key={b.id}
            title={b.name}
            subtitle={b.slug}
            image={b.logoUrl ?? undefined}
            imageHref={`/admin-panel/owner/brands/${b.id}`}
            active={b.active}
            isDuplicate={duplicates.has(b.id) || nameDupes.has(b.id)}
            meta={[b.color]}
            editHref={`/admin-panel/owner/brands/${b.id}`}
            toggling={toggling === b.id}
            deleting={deleting === b.id}
            onToggleActive={() => toggleActive(b.id, b.active)}
            onDelete={() => deleteItem(b.id, b.name)}
          />
        ))}
      </div>
    </div>
  );
}
