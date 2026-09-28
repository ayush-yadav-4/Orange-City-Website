"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";

export default function NewGalleryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ src: "", alt: "", caption: "", sortOrder: "0", active: true });

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to create gallery item");
      }
      router.push("/admin-panel/owner/gallery");
    } catch (err: any) {
      setError(err.message || "An error occurred while creating gallery item.");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <AdminPageHeader
        title="Add Gallery Image"
        subtitle="This image will appear on the homepage gallery"
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
        <AdminField label="Alt Text (for accessibility)" value={form.alt} onChange={(v) => set("alt", v)} required />
        <AdminField label="Caption (shown on hover)" value={form.caption} onChange={(v) => set("caption", v)} required />
        <AdminField label="Sort Order (lower = first)" value={form.sortOrder} onChange={(v) => set("sortOrder", v)} type="number" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active (show on website)
        </label>
        <AdminFormActions
          saving={saving}
          saveText="Create Gallery Image"
          onCancel={() => router.push("/admin-panel/owner/gallery")}
          cancelText="Cancel"
        />
      </form>
    </div>
  );
}
