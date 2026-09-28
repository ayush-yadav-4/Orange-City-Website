import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Call this whenever an admin adds, edits, or deletes any product,
 * brand, gallery image, blog, or review so the frontend updates immediately.
 */
export function revalidateSiteContent() {
  try {
    revalidateTag("site-content");
    revalidatePath("/", "layout");
    revalidatePath("/products");
    revalidatePath("/gallery");
    revalidatePath("/brands");
    revalidatePath("/blog");
    revalidatePath("/categories");
    revalidatePath("/api/content");
  } catch (err) {
    console.error("Revalidation notice:", err);
  }
}
