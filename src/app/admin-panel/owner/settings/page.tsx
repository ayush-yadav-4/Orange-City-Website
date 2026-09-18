"use client";

import { useEffect, useState } from "react";
import { AdminField, AdminFormActions, AdminPageHeader, AdminTextarea } from "@/components/admin/admin-ui";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    siteName: "", phone: "", whatsapp: "", email: "", address: "",
    rating: "4.9", reviewCount: "500", hours: "", emergencyHours: "",
    mapsUrl: "", heroTitle: "", heroSubtitle: "",
    tagline: "", metaDescription: "", announcement: "", deliveryNote: "",
    instagramUrl: "", facebookUrl: "", youtubeUrl: "",
    codEnabled: true,
  });

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((s) => {
      if (s) {
        setForm({
          siteName: s.siteName ?? "",
          phone: s.phone ?? "",
          whatsapp: s.whatsapp ?? "",
          email: s.email ?? "",
          address: s.address ?? "",
          rating: String(s.rating ?? 4.9),
          reviewCount: String(s.reviewCount ?? 500),
          hours: s.hours ?? "",
          emergencyHours: s.emergencyHours ?? "",
          mapsUrl: s.mapsUrl ?? "",
          heroTitle: s.heroTitle ?? "",
          heroSubtitle: s.heroSubtitle ?? "",
          tagline: s.tagline ?? "",
          metaDescription: s.metaDescription ?? "",
          announcement: s.announcement ?? "",
          deliveryNote: s.deliveryNote ?? "",
          instagramUrl: s.instagramUrl ?? "",
          facebookUrl: s.facebookUrl ?? "",
          youtubeUrl: s.youtubeUrl ?? "",
          codEnabled: s.codEnabled ?? true,
        });
      }
    });
  }, []);

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setMsg(res.ok ? "Settings saved!" : "Save failed.");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Site Settings" subtitle="Contact, SEO, social links, and homepage content" />
      {msg && <p className="mb-4 text-sm font-medium text-emerald-600">{msg}</p>}
      <form onSubmit={submit} className="space-y-6">
        <section className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h3 className="font-semibold">Business Info</h3>
          <AdminField label="Site Name" value={form.siteName} onChange={(v) => set("siteName", v)} />
          <AdminField label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />
          <AdminField label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
          <AdminField label="WhatsApp" value={form.whatsapp} onChange={(v) => set("whatsapp", v)} />
          <AdminField label="Email" value={form.email} onChange={(v) => set("email", v)} />
          <AdminTextarea label="Address" value={form.address} onChange={(v) => set("address", v)} />
          <AdminField label="Business Hours" value={form.hours} onChange={(v) => set("hours", v)} />
          <AdminField label="Emergency Hours" value={form.emergencyHours} onChange={(v) => set("emergencyHours", v)} />
          <AdminTextarea label="Delivery Note" value={form.deliveryNote} onChange={(v) => set("deliveryNote", v)} />
        </section>

        <section className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h3 className="font-semibold">Homepage & SEO</h3>
          <AdminField label="Hero Title" value={form.heroTitle} onChange={(v) => set("heroTitle", v)} />
          <AdminField label="Hero Subtitle" value={form.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} />
          <AdminTextarea label="Meta Description (SEO)" value={form.metaDescription} onChange={(v) => set("metaDescription", v)} />
          <AdminTextarea label="Announcement Banner" value={form.announcement} onChange={(v) => set("announcement", v)} />
          <AdminField label="Google Maps URL" value={form.mapsUrl} onChange={(v) => set("mapsUrl", v)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Google Rating" value={form.rating} onChange={(v) => set("rating", v)} type="number" />
            <AdminField label="Review Count" value={form.reviewCount} onChange={(v) => set("reviewCount", v)} type="number" />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h3 className="font-semibold">Social Media</h3>
          <AdminField label="Instagram URL" value={form.instagramUrl} onChange={(v) => set("instagramUrl", v)} />
          <AdminField label="Facebook URL" value={form.facebookUrl} onChange={(v) => set("facebookUrl", v)} />
          <AdminField label="YouTube URL" value={form.youtubeUrl} onChange={(v) => set("youtubeUrl", v)} />
        </section>

        <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={form.codEnabled}
              onChange={(e) => set("codEnabled", e.target.checked)}
            />
            Enable Cash on Delivery (COD) at checkout
          </label>
        </section>

        <AdminFormActions saving={saving} onCancel={() => window.history.back()} />
      </form>
    </div>
  );
}
