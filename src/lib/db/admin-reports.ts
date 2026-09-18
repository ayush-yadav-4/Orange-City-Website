import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const PAID_FILTER: Prisma.OrderWhereInput = {
  OR: [{ paymentStatus: "paid" }, { status: "delivered" }],
};

export async function getUsersList() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      active: true,
      lastLoginAt: true,
      createdAt: true,
      orders: {
        where: PAID_FILTER,
        select: { totalAmount: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSalesReport(opts: { year?: number; month?: number; userId?: string }) {
  const where: Prisma.OrderWhereInput = { ...PAID_FILTER };

  if (opts.userId) where.userId = opts.userId;

  if (opts.year) {
    const start = new Date(opts.year, opts.month ? opts.month - 1 : 0, 1);
    const end = opts.month
      ? new Date(opts.year, opts.month, 0, 23, 59, 59, 999)
      : new Date(opts.year, 11, 31, 23, 59, 59, 999);
    where.createdAt = { gte: start, lte: end };
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      items: {
        include: {
          product: {
            select: { modelName: true, brand: { select: { name: true } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const monthly: Record<string, number> = {};
  for (const o of orders) {
    const d = o.createdAt;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthly[key] = (monthly[key] ?? 0) + o.totalAmount;
  }

  const byUser: Record<string, { name: string; email: string; total: number; orders: number }> = {};
  for (const o of orders) {
    const uid = o.userId ?? o.phone;
    const label = o.user?.name ?? o.customerName;
    const email = o.user?.email ?? o.email ?? "—";
    if (!byUser[uid]) byUser[uid] = { name: label, email, total: 0, orders: 0 };
    byUser[uid].total += o.totalAmount;
    byUser[uid].orders += 1;
  }

  return {
    total: orders.reduce((s, o) => s + o.totalAmount, 0),
    count: orders.length,
    monthly,
    byUser: Object.entries(byUser).map(([id, v]) => ({ id, ...v })),
    orders: orders.map((o) => ({
      id: o.id,
      date: o.createdAt,
      customerName: o.customerName,
      phone: o.phone,
      email: o.email,
      user: o.user,
      totalAmount: o.totalAmount,
      status: o.status,
      items: o.items.map((i) => ({
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        productName: i.product.modelName,
        brandName: i.product.brand.name,
      })),
    })),
  };
}

export async function getOrdersReport(userId?: string) {
  const where: Prisma.OrderWhereInput = userId ? { userId } : {};
  const orders = await prisma.order.findMany({
    where,
    include: {
      user: { select: { name: true, email: true, phone: true } },
      items: {
        include: { product: { select: { modelName: true, brand: { select: { name: true } } } } },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return orders.map((o) => ({
    id: o.id,
    date: o.createdAt,
    customerName: o.customerName,
    phone: o.phone,
    user: o.user,
    totalAmount: o.totalAmount,
    status: o.status,
    paymentStatus: o.paymentStatus,
    items: o.items.map((i) => ({
      productName: i.product.modelName,
      brandName: i.product.brand.name,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
  }));
}

export async function getBrandSalesReport() {
  const items = await prisma.orderItem.findMany({
    where: { order: PAID_FILTER },
    include: {
      product: { include: { brand: { select: { id: true, name: true, slug: true } } } },
      order: { select: { totalAmount: true } },
    },
  });

  const map: Record<string, { name: string; slug: string; revenue: number; units: number }> = {};
  for (const item of items) {
    const b = item.product.brand;
    if (!map[b.id]) map[b.id] = { name: b.name, slug: b.slug, revenue: 0, units: 0 };
    map[b.id].revenue += item.unitPrice * item.quantity;
    map[b.id].units += item.quantity;
  }

  return Object.values(map).sort((a, b) => b.revenue - a.revenue);
}
