import { notFound, redirect } from "next/navigation";
import { categoryMeta } from "@/lib/marketplace-data";
import { categoryFilterUrl } from "@/lib/marketplace-url";

type Props = { params: { slug: string } };

/** Fast redirect — single marketplace page handles all filters client-side */
export default function CategoryPage({ params }: Props) {
  const meta = categoryMeta[params.slug];
  if (!meta) notFound();
  redirect(categoryFilterUrl(meta.category));
}
