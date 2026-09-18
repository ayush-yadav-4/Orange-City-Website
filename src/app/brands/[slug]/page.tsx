import { redirect } from "next/navigation";
import { brandUrl } from "@/lib/marketplace-url";

type Props = { params: { slug: string } };

export default function BrandPage({ params }: Props) {
  redirect(brandUrl(params.slug));
}
