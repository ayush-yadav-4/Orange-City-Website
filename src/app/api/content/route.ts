import { NextResponse } from "next/server";
import { getContent } from "@/lib/content/store";

export const revalidate = 120;

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
}
