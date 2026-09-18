"use client";

import { useEffect, useState } from "react";
import { AdminDetailPanel, formatCurrency } from "./admin-ui";

export type DashboardPanel = "users" | "sales" | "orders" | "brands" | null;

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  active: boolean;
  totalSpent: number;
  orderCount: number;
  lastLoginAt: string | null;
};

type SalesData = {
  total: number;
  count: number;
  monthly: Record<string, number>;
  byUser: { id: string; name: string; email: string; total: number; orders: number }[];
  orders: {
    id: string;
    date: string;
    customerName: string;
    totalAmount: number;
    items: { productName: string; brandName: string; quantity: number; unitPrice: number }[];
  }[];
};

type OrderRow = {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  user: { name: string; email: string } | null;
  items: { productName: string; brandName: string; quantity: number; unitPrice: number }[];
};

type BrandSale = { name: string; slug: string; revenue: number; units: number };

export function DashboardDetail({ panel, onClose }: { panel: DashboardPanel; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [sales, setSales] = useState<SalesData | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [brandSales, setBrandSales] = useState<BrandSale[]>([]);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!panel) return;
    setLoading(true);

    if (panel === "users") {
      fetch("/api/admin/users")
        .then((r) => r.json())
        .then(setUsers)
        .finally(() => setLoading(false));
      return;
    }

    if (panel === "sales") {
      const params = new URLSearchParams({ type: "sales", year });
      if (month) params.set("month", month);
      if (userId) params.set("userId", userId);
      fetch(`/api/admin/reports?${params}`)
        .then((r) => r.json())
        .then(setSales)
        .finally(() => setLoading(false));
      return;
    }

    if (panel === "orders") {
      const params = new URLSearchParams({ type: "orders" });
      if (userId) params.set("userId", userId);
      fetch(`/api/admin/reports?${params}`)
        .then((r) => r.json())
        .then(setOrders)
        .finally(() => setLoading(false));
      return;
    }

    if (panel === "brands") {
      fetch("/api/admin/reports?type=brands")
        .then((r) => r.json())
        .then(setBrandSales)
        .finally(() => setLoading(false));
    }
  }, [panel, year, month, userId]);

  if (!panel) return null;

  const titles: Record<Exclude<DashboardPanel, null>, string> = {
    users: "All Users",
    sales: "Sales Report",
    orders: "All Orders",
    brands: "Sales by Brand",
  };

  return (
    <AdminDetailPanel title={titles[panel]} onClose={onClose}>
      {loading && <p className="text-sm text-[hsl(var(--muted-foreground))]">Loading...</p>}

      {panel === "users" && !loading && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] text-left text-xs uppercase text-[hsl(var(--muted-foreground))]">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Phone</th>
                <th className="pb-2 pr-4">Orders</th>
                <th className="pb-2">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center text-[hsl(var(--muted-foreground))]">No users yet</td></tr>
              ) : users.map((u) => (
                <tr key={u.id} className="border-b border-[hsl(var(--border))]/50">
                  <td className="py-2.5 pr-4 font-medium">{u.name}</td>
                  <td className="py-2.5 pr-4">{u.email}</td>
                  <td className="py-2.5 pr-4">{u.phone ?? "—"}</td>
                  <td className="py-2.5 pr-4">{u.orderCount}</td>
                  <td className="py-2.5 font-semibold text-brand-600">{formatCurrency(u.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {panel === "sales" && !loading && sales && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase">Year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)} className="select-field">
                {[2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase">Month</label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="select-field">
                <option value="">All months</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{new Date(2000, i).toLocaleString("en", { month: "long" })}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase">User ID</label>
              <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Filter by user" className="input-field" />
            </div>
          </div>
          <p className="text-lg font-bold">Total: {formatCurrency(sales.total)} ({sales.count} orders)</p>
          {Object.keys(sales.monthly).length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold">By Month</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(sales.monthly).sort().map(([m, amt]) => (
                  <div key={m} className="rounded-lg bg-[hsl(var(--muted))]/50 px-3 py-2 text-sm">
                    <span className="font-medium">{m}</span> — {formatCurrency(amt)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {sales.byUser.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold">By Customer</p>
              {sales.byUser.map((u) => (
                <div key={u.id} className="mb-2 rounded-lg border border-[hsl(var(--border))] p-3 text-sm">
                  <p className="font-semibold">{u.name} <span className="text-[hsl(var(--muted-foreground))]">({u.email})</span></p>
                  <p className="text-brand-600">{formatCurrency(u.total)} · {u.orders} orders</p>
                </div>
              ))}
            </div>
          )}
          {sales.orders.slice(0, 10).map((o) => (
            <div key={o.id} className="rounded-lg border border-[hsl(var(--border))] p-3 text-sm">
              <p className="font-semibold">{o.customerName} — {formatCurrency(o.totalAmount)}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{new Date(o.date).toLocaleDateString()}</p>
              <ul className="mt-1 text-xs">
                {o.items.map((i, idx) => (
                  <li key={idx}>{i.brandName} {i.productName} ×{i.quantity} — {formatCurrency(i.unitPrice)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {panel === "orders" && !loading && (
        <div className="space-y-3">
          <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Filter by user ID" className="input-field max-w-xs" />
          {orders.length === 0 ? (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">No orders yet</p>
          ) : orders.map((o) => (
            <div key={o.id} className="rounded-lg border border-[hsl(var(--border))] p-4 text-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{o.customerName}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{o.phone} · {new Date(o.date).toLocaleString()}</p>
                  {o.user && <p className="text-xs">{o.user.name} ({o.user.email})</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-600">{formatCurrency(o.totalAmount)}</p>
                  <p className="text-xs capitalize">{o.status} · {o.paymentStatus}</p>
                </div>
              </div>
              <ul className="mt-2 space-y-0.5 border-t border-[hsl(var(--border))] pt-2 text-xs">
                {o.items.map((i, idx) => (
                  <li key={idx}>{i.brandName} {i.productName} ×{i.quantity} — {formatCurrency(i.unitPrice)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {panel === "brands" && !loading && (
        <div className="space-y-2">
          {brandSales.length === 0 ? (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">No sales data yet — orders will appear here after customers purchase.</p>
          ) : brandSales.map((b) => (
            <div key={b.slug} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] px-4 py-3">
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{b.units} units sold</p>
              </div>
              <p className="font-bold text-brand-600">{formatCurrency(b.revenue)}</p>
            </div>
          ))}
        </div>
      )}
    </AdminDetailPanel>
  );
}
