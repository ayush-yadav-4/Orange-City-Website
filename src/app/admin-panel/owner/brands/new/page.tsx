"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";

export default function NewBrandPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", color: "bg-brand-600", logoUrl: "", active: true });

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) router.push("/admin-panel/owner/brands");
  }

  return (
    <div className="mx-auto max-w-lg">
      <AdminPageHeader title="Add Brand" />
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Brand Name" value={form.name} onChange={(v) => { set("name", v); set("slug", v.toLowerCase().replace(/\s+/g, "-")); }} required />
        <AdminField label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required />
        <AdminField label="Logo URL" value={form.logoUrl} onChange={(v) => set("logoUrl", v)} />
        <AdminField label="Color Class (Tailwind)" value={form.color} onChange={(v) => set("color", v)} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active
        </label>
        <AdminFormActions saving={saving} onCancel={() => router.back()} />
      </form>
    </div>
  );
}
