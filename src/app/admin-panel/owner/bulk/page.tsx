"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-ui";

export default function AdminBulkPage() {
  const [type, setType] = useState("products");
  const [result, setResult] = useState("");

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("type", type);
    const res = await fetch("/api/admin/bulk", { method: "POST", body: fd });
    const data = await res.json();
    setResult(res.ok ? `Imported ${data.imported} rows successfully.` : data.error);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Bulk CSV Upload" subtitle="Import multiple products or brands at once" />
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">Upload type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="select-field">
            <option value="products">Products</option>
            <option value="brands">Brands</option>
          </select>
        </div>
        {type === "products" && (
          <p className="mt-4 rounded-lg bg-[hsl(var(--muted))]/50 p-3 text-xs leading-relaxed">
            <strong>Required columns:</strong> slug, brandSlug, modelName, category, capacityAh, mrp, priceWithExchange, priceWithoutExchange<br />
            <strong>Optional:</strong> batteryType, warrantyMonths, stockStatus, images, description
          </p>
        )}
        {type === "brands" && (
          <p className="mt-4 rounded-lg bg-[hsl(var(--muted))]/50 p-3 text-xs leading-relaxed">
            <strong>Required columns:</strong> name, slug<br />
            <strong>Optional:</strong> color, logoUrl
          </p>
        )}
        <form onSubmit={upload} className="mt-4 space-y-3">
          <input type="file" name="file" accept=".csv" required className="text-sm" />
          <button type="submit" className="btn-primary">Upload CSV</button>
        </form>
        {result && <p className="mt-3 text-sm font-medium text-brand-600">{result}</p>}
      </div>
    </div>
  );
}
