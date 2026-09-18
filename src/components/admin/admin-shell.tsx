"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard, Package, Tag, FileText, Image, Car, Settings,
  Upload, LogOut, Loader2,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin-panel/owner", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin-panel/owner/products", label: "Products", icon: Package },
  { href: "/admin-panel/owner/brands", label: "Brands", icon: Tag },
  { href: "/admin-panel/owner/blogs", label: "Blogs", icon: FileText },
  { href: "/admin-panel/owner/gallery", label: "Gallery", icon: Image },
  { href: "/admin-panel/owner/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin-panel/owner/settings", label: "Settings", icon: Settings },
  { href: "/admin-panel/owner/bulk", label: "Bulk Upload", icon: Upload },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/stats");
    setAuthed(res.ok);
    setChecking(false);
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      router.refresh();
    } else {
      setLoginError("Wrong password. Try again.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    router.push("/admin-panel/owner");
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))] p-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-lg">
          <h1 className="font-display text-2xl font-bold">OCB Admin</h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Owner panel — enter password</p>
          {loginError && <p className="mt-3 text-sm text-red-600">{loginError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-4"
            placeholder="Admin password"
            autoFocus
          />
          <button type="submit" className="btn-primary mt-4 w-full py-3">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[hsl(var(--muted))]/30">
      <aside className="hidden w-56 shrink-0 border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] lg:block">
        <div className="border-b border-[hsl(var(--border))] p-4">
          <h1 className="font-display text-lg font-bold">OCB Admin</h1>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Orange City Batteries</p>
        </div>
        <nav className="p-2">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mb-0.5 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active ? "bg-brand-600 text-white" : "hover:bg-[hsl(var(--muted))]"
                )}
              >
                <item.icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3">
          <select
            className="select-field text-sm lg:hidden"
            value={NAV.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))?.href ?? ""}
            onChange={(e) => router.push(e.target.value)}
          >
            {NAV.map((n) => <option key={n.href} value={n.href}>{n.label}</option>)}
          </select>
          <p className="hidden text-sm font-semibold lg:block">Admin Panel</p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button type="button" onClick={logout} className="btn-secondary gap-1.5 px-3 py-2 text-sm">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
