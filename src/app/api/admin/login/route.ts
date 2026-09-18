import { NextResponse } from "next/server";
import { setAdminSession, verifyPassword } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
