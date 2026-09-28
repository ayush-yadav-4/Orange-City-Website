import { NextResponse } from "next/server";
import { getContent } from "@/lib/content/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
    },
  });
}
