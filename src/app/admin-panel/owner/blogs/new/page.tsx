"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", coverImage: "", published: true,
    sectionHeading: "", sectionBody: "",
  });

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        coverImage: form.coverImage,
        published: form.published,
        sections: [{ heading: form.sectionHeading || "Overview", body: form.sectionBody }],
      }),
    });
    setSaving(false);
    if (res.ok) router.push("/admin-panel/owner/blogs");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add Blog Post" />
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Title" value={form.title} onChange={(v) => { set("title", v); set("slug", v.toLowerCase().replace(/[^a-z0-9]+/g, "-")); }} required />
        <AdminField label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required />
        <AdminField label="Excerpt" value={form.excerpt} onChange={(v) => set("excerpt", v)} />
        <CloudinaryUpload
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => set("coverImage", url)}
          folder="blogs"
          helperText="Upload blog cover image."
        />
        <AdminField label="Section Heading" value={form.sectionHeading} onChange={(v) => set("sectionHeading", v)} />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Section Body</label>
          <textarea value={form.sectionBody} onChange={(e) => set("sectionBody", e.target.value)} className="input-field min-h-[120px]" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Published (visible on website)
        </label>
        <AdminFormActions saving={saving} onCancel={() => router.back()} />
      </form>
    </div>
  );
}
