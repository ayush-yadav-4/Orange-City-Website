"use client";

import { AdminField, AdminTextarea } from "@/components/admin/admin-ui";

export type ProductDetailForm = {
  partNumber: string;
  warrantyText: string;
  longDescription: string;
  batteryLayout: string;
  featuresText: string;
  specificationsText: string;
  recommendedFor: string;
};

export function ProductDetailFields({
  form,
  set,
}: {
  form: ProductDetailForm;
  set: (k: keyof ProductDetailForm, v: string) => void;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-dashed border-brand-300/50 bg-brand-50/30 p-4 dark:border-brand-800/40 dark:bg-brand-950/20">
      <p className="text-sm font-bold text-brand-700 dark:text-brand-300">Product page details</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Part / model number" value={form.partNumber} onChange={(v) => set("partNumber", v)} />
        <AdminField label="Battery layout" value={form.batteryLayout} onChange={(v) => set("batteryLayout", v)} />
      </div>
      <AdminField
        label="Warranty text (shown on product page)"
        value={form.warrantyText}
        onChange={(v) => set("warrantyText", v)}
      />
      <AdminTextarea
        label="Full description (paragraphs separated by blank lines)"
        value={form.longDescription}
        onChange={(v) => set("longDescription", v)}
      />
      <AdminTextarea
        label="Features (one per line)"
        value={form.featuresText}
        onChange={(v) => set("featuresText", v)}
      />
      <AdminTextarea
        label="Specifications (JSON)"
        value={form.specificationsText}
        onChange={(v) => set("specificationsText", v)}
      />
      <AdminTextarea
        label="Recommended vehicles (comma-separated)"
        value={form.recommendedFor}
        onChange={(v) => set("recommendedFor", v)}
      />
    </div>
  );
}
