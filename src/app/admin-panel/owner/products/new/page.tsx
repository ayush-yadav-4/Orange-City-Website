"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader, AdminSelect } from "@/components/admin/admin-ui";
import { ProductDetailFields, type ProductDetailForm } from "@/components/admin/product-detail-fields";

export default function NewProductPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<{ slug: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    modelName: "", slug: "", brandSlug: "", category: "car", batteryType: "flat",
    capacityAh: "35", warrantyMonths: "24", mrp: "0", priceWithExchange: "0",
    priceWithoutExchange: "0", stockStatus: "in_stock", images: "", description: "", active: true,
    partNumber: "", warrantyText: "", longDescription: "", batteryLayout: "",
    featuresText: "", specificationsText: "{}", recommendedFor: "",
  });

  useEffect(() => {
    fetch("/api/admin/brands").then((r) => r.json()).then((b) => {
      setBrands(b);
      if (b[0]) setForm((f) => ({ ...f, brandSlug: b[0].slug }));
    });
  }, []);

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setDetail(k: keyof ProductDetailForm, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const images = form.images ? JSON.stringify([form.images]) : "[]";
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images, vehicles: [] }),
    });
    setSaving(false);
    if (res.ok) router.push("/admin-panel/owner/products");
  }

  const detailForm: ProductDetailForm = {
    partNumber: form.partNumber,
    warrantyText: form.warrantyText,
    longDescription: form.longDescription,
    batteryLayout: form.batteryLayout,
    featuresText: form.featuresText,
    specificationsText: form.specificationsText,
    recommendedFor: form.recommendedFor,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add Product" subtitle="Create a new marketplace listing" />
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Model Name" value={form.modelName} onChange={(v) => { set("modelName", v); set("slug", v.toLowerCase().replace(/\s+/g, "-")); }} required />
        <AdminField label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required />
        <AdminSelect label="Brand" value={form.brandSlug} onChange={(v) => set("brandSlug", v)} options={brands.map((b) => ({ value: b.slug, label: b.name }))} />
        <AdminSelect label="Category" value={form.category} onChange={(v) => set("category", v)} options={["car", "bike", "inverter", "truck", "ups"].map((c) => ({ value: c, label: c }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Capacity (Ah)" value={form.capacityAh} onChange={(v) => set("capacityAh", v)} type="number" />
          <AdminField label="Warranty (months)" value={form.warrantyMonths} onChange={(v) => set("warrantyMonths", v)} type="number" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminField label="MRP (₹)" value={form.mrp} onChange={(v) => set("mrp", v)} type="number" />
          <AdminField label="With Exchange (₹)" value={form.priceWithExchange} onChange={(v) => set("priceWithExchange", v)} type="number" />
          <AdminField label="Without Exchange (₹)" value={form.priceWithoutExchange} onChange={(v) => set("priceWithoutExchange", v)} type="number" />
        </div>
        <AdminField label="Image URL" value={form.images} onChange={(v) => set("images", v)} />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Short summary</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="input-field min-h-[80px]" />
        </div>

        <ProductDetailFields form={detailForm} set={setDetail} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active (visible on website)
        </label>
        <AdminFormActions saving={saving} onCancel={() => router.back()} />
      </form>
    </div>
  );
}
