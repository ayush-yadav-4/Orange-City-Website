"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";

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

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to update gallery image");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 5000);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="py-20 text-center text-sm">Loading...</div>;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <AdminPageHeader
        title="Edit Gallery Image"
        subtitle={form.caption}
        action={
          <button
            type="button"
            onClick={() => router.push("/admin-panel/owner/gallery")}
            className="btn-secondary text-xs"
          >
            ← Back to Gallery
          </button>
        }
      />

      {saved && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          ✓ Gallery item updated! Changes are live on the website homepage immediately.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-semibold text-red-800 dark:text-red-300">
          ✕ {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <CloudinaryUpload
          label="Gallery Image"
          value={form.src}
          onChange={(url) => set("src", url)}
          folder="gallery"
          required
        />
        <AdminField label="Alt Text" value={form.alt} onChange={(v) => set("alt", v)} required />
        <AdminField label="Caption" value={form.caption} onChange={(v) => set("caption", v)} required />
        <AdminField label="Sort Order" value={form.sortOrder} onChange={(v) => set("sortOrder", v)} type="number" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <AdminFormActions
          saving={saving}
          saved={saved}
          saveText="Save & Update Image"
          onCancel={() => router.push("/admin-panel/owner/gallery")}
          cancelText="Back to Gallery"
        />
      </form>
    </div>
  );
}
