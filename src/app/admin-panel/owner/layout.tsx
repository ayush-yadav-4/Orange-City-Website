import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin | Orange City Batteries",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
