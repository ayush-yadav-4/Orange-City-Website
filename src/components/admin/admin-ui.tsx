"use client";

import Link from "next/link";
import { Search, Pencil, Power, PowerOff, Trash2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSearch({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-9"
      />
    </div>
  );
}

export function AdminToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  filter,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  filter?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <AdminSearch value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
      {filter}
    </div>
  );
}

export function AdminFilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="shrink-0 sm:w-48">
      <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="select-field">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function AdminPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        active ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-ink-500/15 text-ink-600"
      )}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export function DuplicateBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
      <Copy size={10} /> Duplicate
    </span>
  );
}

export function ClickableStatCard({
  label,
  value,
  sub,
  icon,
  accent,
  onClick,
  href,
  active,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}) {
  const className = cn(
    "block w-full rounded-xl border bg-[hsl(var(--card))] p-5 text-left transition hover:shadow-md",
    active ? "border-brand-500 ring-2 ring-brand-500/20" : "border-[hsl(var(--border))]"
  );
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold">{value}</p>
          {sub && <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{sub}</p>}
        </div>
        <div className={cn("rounded-lg p-2.5", accent ?? "bg-brand-500/10 text-brand-600")}>{icon}</div>
      </div>
      <p className="mt-2 text-xs font-semibold text-brand-600">Click for details →</p>
    </>
  );

  if (href) return <Link href={href} className={className}>{inner}</Link>;
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

export function AdminCard({
  title,
  subtitle,
  meta,
  image,
  imageHref,
  active = true,
  isDuplicate,
  editHref,
  onToggleActive,
  onDelete,
  toggling,
  deleting,
}: {
  title: string;
  subtitle?: string;
  meta?: string[];
  image?: string;
  imageHref?: string;
  active?: boolean;
  isDuplicate?: boolean;
  editHref: string;
  onToggleActive: () => void;
  onDelete?: () => void;
  toggling?: boolean;
  deleting?: boolean;
}) {
  const imgLink = imageHref ?? editHref;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-[hsl(var(--card))] shadow-sm transition hover:shadow-md",
        isDuplicate ? "border-amber-400 ring-1 ring-amber-400/40" : "border-[hsl(var(--border))]"
      )}
    >
      {image && (
        <Link href={imgLink} className="group relative block aspect-[16/9] bg-[hsl(var(--muted))]">
          <img src={image} alt={title} className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs font-bold text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
            Open →
          </span>
        </Link>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">{title}</h3>
            {subtitle && <p className="mt-0.5 line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <StatusBadge active={active} />
            {isDuplicate && <DuplicateBadge />}
          </div>
        </div>
        {meta && meta.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {meta.map((m) => (
              <span key={m} className="rounded-md bg-[hsl(var(--muted))] px-2 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
                {m}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-2 border-t border-[hsl(var(--border))] pt-3">
          <Link
            href={editHref}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            <Pencil size={14} /> Edit
          </Link>
          <button
            type="button"
            disabled={toggling}
            onClick={onToggleActive}
            className={cn(
              "inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold transition",
              active
                ? "border-ink-300 text-ink-700 hover:bg-ink-50 dark:hover:bg-ink-900"
                : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            )}
            title={active ? "Deactivate" : "Activate"}
          >
            {active ? <PowerOff size={14} /> : <Power size={14} />}
          </button>
          {onDelete && (
            <button
              type="button"
              disabled={deleting}
              onClick={onDelete}
              className="inline-flex items-center justify-center rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
              title="Delete permanently"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </div>
  );
}

export function AdminTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
        {label}
      </label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className="input-field min-h-[80px]" />
    </div>
  );
}

export function AdminSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
        {label}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="select-field">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function AdminSuccessNotice({
  message = "Saved successfully! Changes are live on the website.",
  onDismiss,
}: {
  message?: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-emerald-700 hover:text-emerald-900 dark:text-emerald-400"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export function AdminFormActions({
  saving,
  saved,
  saveText = "Save Changes",
  onCancel,
  cancelText = "Back to List",
}: {
  saving: boolean;
  saved?: boolean;
  saveText?: string;
  onCancel?: () => void;
  cancelText?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[hsl(var(--border))] pt-6">
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className={cn(
            "btn-primary px-6 py-2.5 transition",
            saved && "bg-emerald-600 hover:bg-emerald-500"
          )}
        >
          {saving ? "Saving..." : saved ? "✓ Saved Live!" : saveText}
        </button>
        {saved && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Updated instantly on frontend
          </span>
        )}
      </div>
      {onCancel && (
        <button type="button" onClick={onCancel} className="btn-secondary px-5 py-2.5">
          {cancelText}
        </button>
      )}
    </div>
  );
}

export function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function AdminDetailPanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-xl border border-brand-300 bg-[hsl(var(--card))] shadow-lg">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-4">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <button type="button" onClick={onClose} className="text-sm font-semibold text-[hsl(var(--muted-foreground))] hover:text-brand-600">
          Close ✕
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-5">{children}</div>
    </div>
  );
}
