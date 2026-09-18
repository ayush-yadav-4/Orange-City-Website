"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BatteryCharging, Eye, EyeOff } from "lucide-react";
import { useAuth, useAuthHydrated } from "@/store/auth";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useAuthHydrated();
  const user = useAuth((s) => s.user);
  const setUser = useAuth((s) => s.setUser);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "", password: "" });

  useEffect(() => {
    const mode = searchParams.get("tab") ?? searchParams.get("mode");
    if (mode === "signup") setTab("signup");
    if (mode === "login") setTab("login");
  }, [searchParams]);

  useEffect(() => {
    if (hydrated && user) router.replace("/profile");
  }, [hydrated, user, router]);

  function switchTab(next: "login" | "signup") {
    setTab(next);
    setError("");
  }

  if (!hydrated) {
    return (
      <div className="section-spacing">
        <div className="container-page py-20 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Loading...
        </div>
      </div>
    );
  }

  if (user) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone ?? "",
        });
        router.push("/profile");
      } else {
        setError(data.error ?? "Login failed.");
      }
    } catch {
      setError("Could not connect. Please try again.");
    }
    setLoading(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone ?? "",
        });
        router.push("/profile");
      } else {
        setError(data.error ?? "Signup failed.");
      }
    } catch {
      setError("Could not connect. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="section-spacing">
      <div className="container-page">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <BatteryCharging size={28} />
            </div>
            <h1 className="section-title">Welcome to OCB Nagpur</h1>
            <p className="section-sub mx-auto mt-2">
              Sign in to save products, track orders, and manage your battery purchases.
            </p>
          </div>

          <div className="surface overflow-hidden">
            <div className="flex border-b border-[hsl(var(--border))]">
              <button
                type="button"
                onClick={() => switchTab("login")}
                className={`flex-1 py-3.5 text-sm font-bold transition ${tab === "login" ? "bg-brand-600 text-white" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchTab("signup")}
                className={`flex-1 py-3.5 text-sm font-bold transition ${tab === "signup" ? "bg-brand-600 text-white" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"}`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                  {error}
                </div>
              )}

              {tab === "login" ? (
                <>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="input-field"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className="input-field pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                  </form>
                  <p className="mt-5 text-center text-sm text-[hsl(var(--muted-foreground))]">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchTab("signup")}
                      className="font-semibold text-brand-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        required
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        required
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        className="input-field"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Phone</label>
                      <input
                        type="tel"
                        required
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        className="input-field"
                        placeholder="+91 93254 17265"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={6}
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          className="input-field pr-10"
                          placeholder="Min. 6 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
                      {loading ? "Creating account..." : "Create Account"}
                    </button>
                  </form>
                  <p className="mt-5 text-center text-sm text-[hsl(var(--muted-foreground))]">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchTab("login")}
                      className="font-semibold text-brand-600 hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/" className="font-medium text-brand-600 hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="section-spacing">
        <div className="container-page py-20 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Loading...
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
