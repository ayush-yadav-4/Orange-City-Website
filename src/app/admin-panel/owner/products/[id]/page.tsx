"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminPageHeader, AdminSelect } from "@/components/admin/admin-ui";
import { ProductDetailFields, type ProductDetailForm } from "@/components/admin/product-detail-fields";
import { featuresJsonToText } from "@/lib/product-details";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import { VehicleCompatibilitySelector, type VehicleSelection } from "@/components/admin/vehicle-compatibility-selector";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [brands, setBrands] = useState<{ slug: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<VehicleSelection[]>([]);
  const [form, setForm] = useState({
    modelName: "", slug: "", brandSlug: "", category: "car", batteryType: "flat",
    capacityAh: "35", warrantyMonths: "24", mrp: "0", priceWithExchange: "0",
    priceWithoutExchange: "0", stockStatus: "in_stock", images: "", description: "", active: true,
    partNumber: "", warrantyText: "", longDescription: "", batteryLayout: "",
    featuresText: "", specificationsText: "{}", recommendedFor: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/brands").then((r) => r.json()),
      fetch(`/api/admin/products/${params.id}`).then((r) => r.json()),
    ]).then(([b, p]) => {
      setBrands(b);
      let img = "";
      try { img = JSON.parse(p.images)[0] ?? ""; } catch { img = p.images; }
      if (Array.isArray(p.compatibilities)) {
        setVehicles(
          p.compatibilities.map((c: { vehicleMake: string; vehicleModel: string }) => ({
            make: c.vehicleMake,
            model: c.vehicleModel,
          }))
        );
      }
      setForm({
        modelName: p.modelName,
        slug: p.slug,
        brandSlug: p.brand.slug,
        category: p.category,
        batteryType: p.batteryType,
        capacityAh: String(p.capacityAh),
        warrantyMonths: String(p.warrantyMonths),
        mrp: String(p.mrp),
        priceWithExchange: String(p.priceWithExchange),
        priceWithoutExchange: String(p.priceWithoutExchange),
        stockStatus: p.stockStatus,
        images: img,
        description: p.description ?? "",
        active: p.active,
        partNumber: p.partNumber ?? "",
        warrantyText: p.warrantyText ?? "",
        longDescription: p.longDescription ?? "",
        batteryLayout: p.batteryLayout ?? "",
        featuresText: featuresJsonToText(p.features),
        specificationsText: p.specifications ?? "{}",
        recommendedFor: p.recommendedFor ?? "",
      });
      setLoading(false);
    });
  }, [params.id]);

  function set(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setDetail(k: keyof ProductDetailForm, v: string) {
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
      const images = form.images ? JSON.stringify([form.images]) : "[]";
      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images, vehicles }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Failed to update product");
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
    <div className="mx-auto max-w-2xl space-y-4">
      <AdminPageHeader
        title="Edit Product"
        subtitle={form.modelName}
        action={
          <button
            type="button"
            onClick={() => router.push("/admin-panel/owner/products")}
            className="btn-secondary text-xs"
          >
            ← Back to Products List
          </button>
        }
      />

      {saved && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          ✓ Product updated successfully! Live on website instantly without reloading.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-semibold text-red-800 dark:text-red-300">
          ✕ {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <AdminField label="Model Name" value={form.modelName} onChange={(v) => set("modelName", v)} required />
        <AdminField label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required />
        <AdminSelect label="Brand" value={form.brandSlug} onChange={(v) => set("brandSlug", v)} options={brands.map((b) => ({ value: b.slug, label: b.name }))} />
        <AdminSelect label="Category" value={form.category} onChange={(v) => set("category", v)} options={["car", "bike", "inverter", "truck", "ups"].map((c) => ({ value: c, label: c }))} />
        <AdminSelect label="Stock Status" value={form.stockStatus} onChange={(v) => set("stockStatus", v)} options={[
          { value: "in_stock", label: "In Stock" },
          { value: "low_stock", label: "Low Stock" },
          { value: "out_of_stock", label: "Out of Stock" },
        ]} />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Capacity (Ah)" value={form.capacityAh} onChange={(v) => set("capacityAh", v)} type="number" />
          <AdminField label="Warranty (months)" value={form.warrantyMonths} onChange={(v) => set("warrantyMonths", v)} type="number" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminField label="MRP (₹)" value={form.mrp} onChange={(v) => set("mrp", v)} type="number" />
          <AdminField label="With Exchange (₹)" value={form.priceWithExchange} onChange={(v) => set("priceWithExchange", v)} type="number" />
          <AdminField label="Without Exchange (₹)" value={form.priceWithoutExchange} onChange={(v) => set("priceWithoutExchange", v)} type="number" />
        </div>
        <CloudinaryUpload
          label="Product Image"
          value={form.images}
          onChange={(url) => set("images", url)}
          folder="products"
          helperText="Upload or change product image."
        />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Short summary</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="input-field min-h-[80px]" placeholder="One-line summary for cards and search..." />
        </div>

        {/* Vehicle Compatibility Multi-Select */}
        <VehicleCompatibilitySelector
          value={vehicles}
          onChange={setVehicles}
          defaultCategory={form.category}
        />

        <ProductDetailFields form={detailForm} set={setDetail} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active (visible on website)
        </label>
        <AdminFormActions
          saving={saving}
          saved={saved}
          saveText="Save & Update Product"
          onCancel={() => router.push("/admin-panel/owner/products")}
          cancelText="Back to Products"
        />
      </form>
    </div>
  );
}
