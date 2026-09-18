"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, UserCheck, ShoppingCart, IndianRupee, Package, Tag, FileText, Image,
  TrendingUp, Clock,
} from "lucide-react";
import { ClickableStatCard, formatCurrency } from "@/components/admin/admin-ui";
import { DashboardDetail, type DashboardPanel } from "@/components/admin/dashboard-detail";
import type { AdminStats } from "@/lib/db/stats";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState("");
  const [panel, setPanel] = useState<DashboardPanel>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setStats(data);
      })
      .catch(() => setError("Could not load dashboard stats."));
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-sm dark:bg-amber-950/30">
        <p className="font-semibold">Database not connected yet</p>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          Run <code className="rounded bg-[hsl(var(--muted))] px-1">npm run db:setup</code> after setting your Supabase credentials in .env
        </p>
      </div>
    );
  }

  if (!stats) {
    return <div className="py-20 text-center text-sm text-[hsl(var(--muted-foreground))]">Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Dashboard</h2>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Click any card for detailed breakdown</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ClickableStatCard
          label="Total Users"
          value={stats.totalUsers}
          sub={`${stats.activeUsers} active (30 days)`}
          icon={<Users size={20} />}
          onClick={() => setPanel("users")}
          active={panel === "users"}
        />
        <ClickableStatCard
          label="Active Users"
          value={stats.activeUsers}
          sub="Logged in recently"
          icon={<UserCheck size={20} />}
          accent="bg-emerald-500/10 text-emerald-600"
          onClick={() => setPanel("users")}
          active={panel === "users"}
        />
        <ClickableStatCard
          label="Total Sales"
          value={formatCurrency(stats.totalSales)}
          sub={`${stats.deliveredOrders} delivered`}
          icon={<IndianRupee size={20} />}
          accent="bg-yellow-500/10 text-yellow-700"
          onClick={() => setPanel("sales")}
          active={panel === "sales"}
        />
        <ClickableStatCard
          label="Total Orders"
          value={stats.totalOrders}
          sub={`${stats.pendingOrders} pending`}
          icon={<ShoppingCart size={20} />}
          onClick={() => setPanel("orders")}
          active={panel === "orders"}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ClickableStatCard
          label="Products"
          value={stats.activeProducts}
          sub={`${stats.totalProducts} total`}
          icon={<Package size={20} />}
          href="/admin-panel/owner/products"
        />
        <ClickableStatCard
          label="Brands"
          value={stats.activeBrands}
          sub={`${stats.totalBrands} total · click for sales`}
          icon={<Tag size={20} />}
          onClick={() => setPanel("brands")}
          active={panel === "brands"}
        />
        <ClickableStatCard
          label="Blog Posts"
          value={stats.publishedBlogs}
          sub={`${stats.totalBlogs} total`}
          icon={<FileText size={20} />}
          href="/admin-panel/owner/blogs"
        />
        <ClickableStatCard
          label="Gallery Images"
          value={stats.activeGallery}
          sub={`${stats.galleryImages} total`}
          icon={<Image size={20} />}
          href="/admin-panel/owner/gallery"
        />
      </div>

      <DashboardDetail panel={panel} onClose={() => setPanel(null)} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
          <div className="flex items-center gap-2 font-semibold">
            <TrendingUp size={18} className="text-brand-600" /> Quick Actions
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/admin-panel/owner/products/new" className="text-brand-600 hover:underline">+ Add new product</Link></li>
            <li><Link href="/admin-panel/owner/blogs/new" className="text-brand-600 hover:underline">+ Write a blog post</Link></li>
            <li><Link href="/admin-panel/owner/gallery/new" className="text-brand-600 hover:underline">+ Add gallery image</Link></li>
            <li><Link href="/admin-panel/owner/bulk" className="text-brand-600 hover:underline">↑ Bulk upload CSV</Link></li>
          </ul>
        </div>
        <div className="rounded-xl border border-brand-300 bg-brand-500/10 p-5 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Clock size={18} /> Tips
          </div>
          <ul className="mt-3 list-inside list-disc space-y-1 text-[hsl(var(--muted-foreground))]">
            <li>Yellow <strong>Duplicate</strong> badges flag repeated entries</li>
            <li>Use <strong>Delete</strong> (trash icon) to permanently remove items</li>
            <li>Click dashboard cards for users, sales, orders & brand reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
