import type { Product } from "@/lib/content/types";

export function parseProductFeatures(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string" && x.trim()) : [];
  } catch {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
}

export function parseProductSpecs(raw: string | undefined): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return Object.fromEntries(
        Object.entries(parsed).map(([k, v]) => [k, String(v)])
      );
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function stringifyProductFeatures(features: string[]): string {
  return JSON.stringify(features.filter(Boolean));
}

export function stringifyProductSpecs(specs: Record<string, string>): string {
  return JSON.stringify(specs);
}

export function getWarrantyDisplay(product: Pick<Product, "warrantyMonths" | "warrantyText">) {
  if (product.warrantyText?.trim()) return product.warrantyText.trim();
  const months = product.warrantyMonths;
  if (months >= 48) {
    const half = Math.floor(months / 2);
    return `${months} Months (${half} Months Full Replacement + ${months - half} Months Pro Rata)`;
  }
  return `${months} Months Warranty`;
}

export function getRecommendedVehicles(product: Product): string[] {
  if (product.recommendedFor?.trim()) {
    return product.recommendedFor
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return product.vehicles.map((v) => `${v.make} ${v.model}`);
}

export function buildDefaultSpecs(product: Product): Record<string, string> {
  const custom = parseProductSpecs(product.specifications);
  return {
    Model: product.partNumber || product.modelName,
    Capacity: `${product.capacityAh} AH`,
    Warranty: getWarrantyDisplay(product),
    Type: product.batteryType.toUpperCase(),
    ...(product.batteryLayout ? { Layout: product.batteryLayout } : {}),
    ...custom,
  };
}

export function featuresTextToJson(text: string): string {
  const items = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

export function featuresJsonToText(raw: string | undefined): string {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.join("\n");
  } catch {
    return raw;
  }
  return "";
}

export const TRUST_BADGES = [
  "Brand new & 100% genuine",
  "Free delivery & installation",
  "Cash on delivery",
  "UPI / card accepted",
  "EMI available",
] as const;
