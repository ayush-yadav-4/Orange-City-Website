"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminCard, AdminPageHeader, AdminSearch } from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";

type Blog = { id: string; title: string; slug: string; excerpt: string; coverImage: string | null; published: boolean };

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/blogs").then((r) => r.json()).then(setBlogs);
  }, []);

  const duplicates = useMemo(() => findDuplicateIds(blogs, (b) => b.slug), [blogs]);
  const titleDupes = useMemo(() => findDuplicateIds(blogs, (b) => b.title), [blogs]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return blogs.filter((b) => b.title.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q));
  }, [blogs, search]);

  async function togglePublished(id: string, published: boolean) {
    setToggling(id);
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, published: updated.published } : b)));
    }
    setToggling(null);
  }

  async function deleteItem(id: string, title: string) {
    if (!confirm(`Delete blog "${title}" permanently?`)) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    if (res.ok) setBlogs((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  }

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        subtitle={`${filtered.length} of ${blogs.length} posts`}
        action={
          <Link href="/admin-panel/owner/blogs/new" className="btn-primary inline-flex items-center gap-1.5 text-sm">
            <Plus size={16} /> Add Blog
          </Link>
        }
      />
      <AdminSearch value={search} onChange={setSearch} placeholder="Search blogs..." />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b) => (
          <AdminCard
            key={b.id}
            title={b.title}
            subtitle={b.excerpt}
            image={b.coverImage ?? undefined}
            imageHref={`/admin-panel/owner/blogs/${b.id}`}
            active={b.published}
            isDuplicate={duplicates.has(b.id) || titleDupes.has(b.id)}
            meta={[b.slug]}
            editHref={`/admin-panel/owner/blogs/${b.id}`}
            toggling={toggling === b.id}
            deleting={deleting === b.id}
            onToggleActive={() => togglePublished(b.id, b.published)}
            onDelete={() => deleteItem(b.id, b.title)}
          />
        ))}
      </div>
    </div>
  );
}
