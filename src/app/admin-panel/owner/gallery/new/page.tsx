"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";

export default function NewGalleryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ src: "", alt: "", caption: "", sortOrder: "0", active: true });

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) router.push("/admin-panel/owner/gallery");
  }

  return (
    <div className="mx-auto max-w-lg">
      <AdminPageHeader title="Add Gallery Image" subtitle="This image will appear on the homepage gallery" />
      {form.src && (
        <div className="mb-4 overflow-hidden rounded-xl border border-[hsl(var(--border))]">
          <img src={form.src} alt="Preview" className="aspect-video w-full object-cover" />
        </div>
      )}
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Image URL" value={form.src} onChange={(v) => set("src", v)} required />
        <AdminField label="Alt Text (for accessibility)" value={form.alt} onChange={(v) => set("alt", v)} required />
        <AdminField label="Caption (shown on hover)" value={form.caption} onChange={(v) => set("caption", v)} required />
        <AdminField label="Sort Order (lower = first)" value={form.sortOrder} onChange={(v) => set("sortOrder", v)} type="number" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active (show on website)
        </label>
        <AdminFormActions saving={saving} onCancel={() => router.back()} />
      </form>
    </div>
  );
}
