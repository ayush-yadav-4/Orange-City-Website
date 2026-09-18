import { cookies } from "next/headers";

const COOKIE = "ocb-admin-session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "ocb-admin-2026";
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE)?.value === "authenticated";
}

export function verifyPassword(password: string) {
  return password === getAdminPassword();
}
