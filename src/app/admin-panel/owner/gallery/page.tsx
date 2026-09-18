"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminCard, AdminPageHeader, AdminSearch } from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";

type GalleryItem = { id: string; src: string; alt: string; caption: string; active: boolean; sortOrder: number };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/gallery").then((r) => r.json()).then(setItems);
  }, []);

  const duplicates = useMemo(() => findDuplicateIds(items, (g) => g.src), [items]);
  const captionDupes = useMemo(() => findDuplicateIds(items, (g) => g.caption), [items]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((g) => g.caption.toLowerCase().includes(q) || g.alt.toLowerCase().includes(q));
  }, [items, search]);

  async function toggleActive(id: string, active: boolean) {
    setToggling(id);
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((g) => (g.id === id ? { ...g, active: updated.active } : g)));
    }
    setToggling(null);
  }

  async function deleteItem(id: string, caption: string) {
    if (!confirm(`Delete gallery image "${caption || "Untitled"}"?`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((g) => g.id !== id));
    setDeleting(null);
  }

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        subtitle={`${filtered.length} images — shown on homepage`}
        action={
          <Link href="/admin-panel/owner/gallery/new" className="btn-primary inline-flex items-center gap-1.5 text-sm">
            <Plus size={16} /> Add Image
          </Link>
        }
      />
      <AdminSearch value={search} onChange={setSearch} placeholder="Search by caption or alt text..." />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((g) => (
          <AdminCard
            key={g.id}
            title={g.caption || "Untitled"}
            subtitle={g.alt}
            image={g.src}
            imageHref={`/admin-panel/owner/gallery/${g.id}`}
            active={g.active}
            isDuplicate={duplicates.has(g.id) || captionDupes.has(g.id)}
            meta={[`Order: ${g.sortOrder}`]}
            editHref={`/admin-panel/owner/gallery/${g.id}`}
            toggling={toggling === g.id}
            deleting={deleting === g.id}
            onToggleActive={() => toggleActive(g.id, g.active)}
            onDelete={() => deleteItem(g.id, g.caption)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]">No gallery images yet.</p>
      )}
    </div>
  );
}
