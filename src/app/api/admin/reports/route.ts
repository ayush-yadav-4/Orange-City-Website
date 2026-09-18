import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBrandSalesReport, getOrdersReport, getSalesReport } from "@/lib/db/admin-reports";

export async function GET(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "sales") {
    const year = searchParams.get("year") ? Number(searchParams.get("year")) : undefined;
    const month = searchParams.get("month") ? Number(searchParams.get("month")) : undefined;
    const userId = searchParams.get("userId") || undefined;
    const data = await getSalesReport({ year, month, userId });
    return NextResponse.json(data);
  }

  if (type === "orders") {
    const userId = searchParams.get("userId") || undefined;
    const data = await getOrdersReport(userId);
    return NextResponse.json(data);
  }

  if (type === "brands") {
    const data = await getBrandSalesReport();
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Invalid type. Use sales, orders, or brands" }, { status: 400 });
}
