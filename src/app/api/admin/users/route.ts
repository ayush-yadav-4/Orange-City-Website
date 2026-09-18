import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getUsersList } from "@/lib/db/admin-reports";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await getUsersList();
  return NextResponse.json(
    users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      active: u.active,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
      totalSpent: u.orders.reduce((s, o) => s + o.totalAmount, 0),
      orderCount: u.orders.length,
    }))
  );
}
