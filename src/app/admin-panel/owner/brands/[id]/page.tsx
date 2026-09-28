"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";

export default function EditBrandPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", slug: "", color: "bg-brand-600", logoUrl: "", active: true });

  useEffect(() => {
    fetch(`/api/admin/brands/${params.id}`).then((r) => r.json()).then((b) => {
      setForm({ name: b.name, slug: b.slug, color: b.color, logoUrl: b.logoUrl ?? "", active: b.active });
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
      const res = await fetch(`/api/admin/brands/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to update brand");
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
        title="Edit Brand"
        subtitle={form.name}
        action={
          <button
            type="button"
            onClick={() => router.push("/admin-panel/owner/brands")}
            className="btn-secondary text-xs"
          >
            ← Back to Brands
          </button>
        }
      />

      {saved && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          ✓ Brand updated! Updated on website frontend instantly.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-semibold text-red-800 dark:text-red-300">
          ✕ {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Brand Name" value={form.name} onChange={(v) => set("name", v)} required />
        <AdminField label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required />
        <CloudinaryUpload
          label="Brand Logo"
          value={form.logoUrl}
          onChange={(url) => set("logoUrl", url)}
          folder="brands"
          helperText="Upload or change brand logo."
        />
        <AdminField label="Color Class" value={form.color} onChange={(v) => set("color", v)} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <AdminFormActions
          saving={saving}
          saved={saved}
          saveText="Save & Update Brand"
          onCancel={() => router.push("/admin-panel/owner/brands")}
          cancelText="Back to Brands"
        />
      </form>
    </div>
  );
}
