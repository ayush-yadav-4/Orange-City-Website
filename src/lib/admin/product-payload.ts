import { featuresTextToJson } from "@/lib/product-details";

export function buildProductPayload(body: Record<string, unknown>) {
  const featuresRaw = body.featuresText ?? body.features ?? "[]";
  const features =
    typeof featuresRaw === "string" && !featuresRaw.trim().startsWith("[")
      ? featuresTextToJson(featuresRaw)
      : String(featuresRaw || "[]");

  const specsRaw = body.specificationsText ?? body.specifications ?? "{}";

  return {
    modelName: String(body.modelName ?? ""),
    slug: String(body.slug ?? ""),
    brandSlug: String(body.brandSlug ?? ""),
    category: String(body.category ?? "car"),
    batteryType: String(body.batteryType ?? "flat"),
    capacityAh: Number(body.capacityAh),
    warrantyMonths: Number(body.warrantyMonths),
    mrp: Number(body.mrp),
    priceWithExchange: Number(body.priceWithExchange),
    priceWithoutExchange: Number(body.priceWithoutExchange),
    stockStatus: String(body.stockStatus ?? "in_stock"),
    images: String(body.images ?? "[]"),
    description: String(body.description ?? ""),
    partNumber: String(body.partNumber ?? ""),
    warrantyText: String(body.warrantyText ?? ""),
    longDescription: String(body.longDescription ?? ""),
    batteryLayout: String(body.batteryLayout ?? ""),
    specifications: String(specsRaw),
    features,
    recommendedFor: String(body.recommendedFor ?? ""),
    active: body.active !== false,
    featured: Boolean(body.featured),
    vehicles: (body.vehicles as { make: string; model: string }[]) ?? [],
  };
}
