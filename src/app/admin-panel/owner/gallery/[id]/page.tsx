"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";

export default function EditGalleryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ src: "", alt: "", caption: "", sortOrder: "0", active: true });

  useEffect(() => {
    fetch(`/api/admin/gallery/${params.id}`).then((r) => r.json()).then((g) => {
      setForm({ src: g.src, alt: g.alt, caption: g.caption, sortOrder: String(g.sortOrder), active: g.active });
      setLoading(false);
    });
  }, [params.id]);

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/gallery/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) router.push("/admin-panel/owner/gallery");
  }

  if (loading) return <div className="py-20 text-center text-sm">Loading...</div>;

  return (
    <div className="mx-auto max-w-lg">
      <AdminPageHeader title="Edit Gallery Image" subtitle={form.caption} />
      {form.src && (
        <div className="mb-4 overflow-hidden rounded-xl border border-[hsl(var(--border))]">
          <img src={form.src} alt="Preview" className="aspect-video w-full object-cover" />
        </div>
      )}
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Image URL" value={form.src} onChange={(v) => set("src", v)} required />
        <AdminField label="Alt Text" value={form.alt} onChange={(v) => set("alt", v)} required />
        <AdminField label="Caption" value={form.caption} onChange={(v) => set("caption", v)} required />
        <AdminField label="Sort Order" value={form.sortOrder} onChange={(v) => set("sortOrder", v)} type="number" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <AdminFormActions saving={saving} onCancel={() => router.back()} />
      </form>
    </div>
  );
}
