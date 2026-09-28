"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader } from "@/components/admin/admin-ui";
import { parseBlogSections } from "@/lib/db/content";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", coverImage: "", published: true,
    sections: [{ heading: "", body: "" }],
  });

  useEffect(() => {
    fetch(`/api/admin/blogs/${params.id}`).then((r) => r.json()).then((b) => {
      setForm({
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        coverImage: b.coverImage ?? "",
        published: b.published,
        sections: parseBlogSections(b.content),
      });
      setLoading(false);
    });
  }, [params.id]);

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function updateSection(i: number, field: "heading" | "body", value: string) {
    setForm((f) => {
      const sections = [...f.sections];
      sections[i] = { ...sections[i], [field]: value };
      return { ...f, sections };
    });
  }

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to update blog post");
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
    <div className="mx-auto max-w-2xl space-y-4">
      <AdminPageHeader
        title="Edit Blog Post"
        subtitle={form.title}
        action={
          <button
            type="button"
            onClick={() => router.push("/admin-panel/owner/blogs")}
            className="btn-secondary text-xs"
          >
            ← Back to Blogs
          </button>
        }
      />

      {saved && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          ✓ Blog post updated! Changes are live on the website blog immediately.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-semibold text-red-800 dark:text-red-300">
          ✕ {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Title" value={form.title} onChange={(v) => set("title", v)} required />
        <AdminField label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required />
        <AdminField label="Excerpt" value={form.excerpt} onChange={(v) => set("excerpt", v)} />
        <CloudinaryUpload
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => set("coverImage", url)}
          folder="blogs"
          helperText="Upload or change blog cover image."
        />
        {form.sections.map((s, i) => (
          <div key={i} className="rounded-lg border border-[hsl(var(--border))] p-4">
            <AdminField label={`Section ${i + 1} Heading`} value={s.heading} onChange={(v) => updateSection(i, "heading", v)} />
            <div className="mt-2">
              <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Body</label>
              <textarea value={s.body} onChange={(e) => updateSection(i, "body", e.target.value)} className="input-field min-h-[80px]" />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm((f) => ({ ...f, sections: [...f.sections, { heading: "", body: "" }] }))}
          className="text-sm font-semibold text-brand-600"
        >
          + Add Section
        </button>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Published
        </label>
        <AdminFormActions
          saving={saving}
          saved={saved}
          saveText="Save & Update Blog"
          onCancel={() => router.push("/admin-panel/owner/blogs")}
          cancelText="Back to Blogs"
        />
      </form>
    </div>
  );
}
