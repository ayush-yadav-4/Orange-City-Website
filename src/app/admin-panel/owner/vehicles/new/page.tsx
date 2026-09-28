"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AdminPageHeader, AdminField, AdminSelect, AdminFormActions } from "@/components/admin/admin-ui";
import { Plus, Building2, FolderPlus, ArrowLeft, CheckCircle2, Layers } from "lucide-react";

type CategoryMeta = {
  id: string;
  name: string;
  icon: string;
};

const DEFAULT_CATEGORIES: CategoryMeta[] = [
  { id: "scooty", name: "Scooty (Scooters)", icon: "🛵" },
  { id: "bike", name: "Bike (Motorcycles)", icon: "🏍️" },
  { id: "car", name: "Car / SUV", icon: "🚗" },
  { id: "truck", name: "Commercial & Truck", icon: "🚚" },
  { id: "tractor", name: "Tractor & Agri", icon: "🚜" },
  { id: "erickshaw", name: "E-Rickshaw & 3-Wheeler", icon: "🛺" },
];

export default function NewVehiclePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "model" | "company" | "category" | "bulk") || "model";

  const [tab, setTab] = useState<"model" | "company" | "category" | "bulk">(initialTab);
  const [categories, setCategories] = useState<CategoryMeta[]>(DEFAULT_CATEGORIES);
  const [existingMakes, setExistingMakes] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form 1: Vehicle Model
  const [modelForm, setModelForm] = useState({
    category: "scooty",
    make: "",
    model: "",
    active: true,
  });

  // Form 2: Company / Brand
  const [companyForm, setCompanyForm] = useState({
    category: "scooty",
    make: "",
    firstModel: "",
  });

  // Form 3: Category
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    name: "",
    icon: "🚗",
    description: "",
  });

  // Form 4: Bulk Add
  const [bulkForm, setBulkForm] = useState({
    category: "scooty",
    make: "",
    modelsList: "",
  });

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((r) => r.json())
      .then((vehicles: { category: string; make: string }[]) => {
        if (Array.isArray(vehicles)) {
          const makesMap: Record<string, Set<string>> = {};
          const catIds = new Set(DEFAULT_CATEGORIES.map((c) => c.id));
          const extraCats: CategoryMeta[] = [];

          vehicles.forEach((v) => {
            if (!makesMap[v.category]) makesMap[v.category] = new Set();
            makesMap[v.category].add(v.make);

            if (v.category && !catIds.has(v.category)) {
              catIds.add(v.category);
              extraCats.push({
                id: v.category,
                name: v.category.charAt(0).toUpperCase() + v.category.slice(1),
                icon: "📁",
              });
            }
          });

          const finalMakes: Record<string, string[]> = {};
          Object.entries(makesMap).forEach(([cat, set]) => {
            finalMakes[cat] = Array.from(set).sort();
          });

          setExistingMakes(finalMakes);
          setCategories([...DEFAULT_CATEGORIES, ...extraCats]);
        }
      })
      .catch(console.error);
  }, []);

  function flashSuccess(msg: string) {
    setSavedMessage(msg);
    setError(null);
    setTimeout(() => setSavedMessage(null), 5000);
  }

  // Submit Model
  async function submitModel(e: React.FormEvent) {
    e.preventDefault();
    if (!modelForm.make.trim() || !modelForm.model.trim()) {
      setError("Please fill in company make and vehicle model name");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add vehicle model");

      flashSuccess(`✓ Added "${data.make} ${data.model}" under ${data.category}!`);
      setModelForm((prev) => ({ ...prev, model: "" }));
    } catch (err: any) {
      setError(err.message || "Error adding model");
    } finally {
      setSaving(false);
    }
  }

  // Submit Company
  async function submitCompany(e: React.FormEvent) {
    e.preventDefault();
    if (!companyForm.make.trim()) {
      setError("Please enter the company name");
      return;
    }
    setSaving(true);
    setError(null);

    const initialModel = companyForm.firstModel.trim() || "Standard Model";
    try {
      const res = await fetch("/api/admin/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: companyForm.category,
          make: companyForm.make.trim(),
          model: initialModel,
          active: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add company");

      flashSuccess(`✓ Created company "${data.make}" in ${data.category}!`);
      setCompanyForm((prev) => ({ ...prev, make: "", firstModel: "" }));
    } catch (err: any) {
      setError(err.message || "Error adding company");
    } finally {
      setSaving(false);
    }
  }

  // Submit Category
  async function submitCategory(e: React.FormEvent) {
    e.preventDefault();
    const id = categoryForm.id.trim().toLowerCase().replace(/\s+/g, "-");
    const name = categoryForm.name.trim();

    if (!id || !name) {
      setError("Category ID and Display Name are required");
      return;
    }

    const newCat = {
      id,
      name,
      icon: categoryForm.icon || "🚗",
    };

    setCategories((prev) => [...prev, newCat]);
    setModelForm((prev) => ({ ...prev, category: id }));
    flashSuccess(`✓ Category "${name}" created! You can now add companies and models to it.`);
    setCategoryForm({ id: "", name: "", icon: "🚗", description: "" });
    setTab("model");
  }

  // Submit Bulk Models
  async function submitBulk(e: React.FormEvent) {
    e.preventDefault();
    if (!bulkForm.make.trim() || !bulkForm.modelsList.trim()) {
      setError("Please specify company name and list of model names");
      return;
    }

    const models = bulkForm.modelsList
      .split(/[\n,]+/)
      .map((m) => m.trim())
      .filter(Boolean);

    if (models.length === 0) {
      setError("No valid model names found in input");
      return;
    }

    setSaving(true);
    setError(null);
    let added = 0;

    try {
      for (const m of models) {
        const res = await fetch("/api/admin/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: bulkForm.category,
            make: bulkForm.make.trim(),
            model: m,
            active: true,
          }),
        });
        if (res.ok) added++;
      }

      flashSuccess(`✓ Successfully added ${added} models for ${bulkForm.make}!`);
      setBulkForm((prev) => ({ ...prev, modelsList: "" }));
    } catch (err: any) {
      setError(err.message || "Error adding bulk models");
    } finally {
      setSaving(false);
    }
  }

  const currentCategoryMakes = existingMakes[modelForm.category] || [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Add to Vehicle Catalog"
        subtitle="Add models, companies/brands, or custom categories"
        action={
          <Link
            href="/admin-panel/owner/vehicles"
            className="btn-secondary inline-flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft size={14} /> Back to Vehicles List
          </Link>
        }
      />

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 rounded-xl bg-[hsl(var(--muted))]/50 p-1.5 border border-[hsl(var(--border))]">
        <button
          type="button"
          onClick={() => setTab("model")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === "model"
              ? "bg-[hsl(var(--card))] text-brand-600 shadow-sm"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          }`}
        >
          <Plus size={14} /> 1. Add Model
        </button>

        <button
          type="button"
          onClick={() => setTab("company")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === "company"
              ? "bg-[hsl(var(--card))] text-brand-600 shadow-sm"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          }`}
        >
          <Building2 size={14} /> 2. Add Company
        </button>

        <button
          type="button"
          onClick={() => setTab("category")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === "category"
              ? "bg-[hsl(var(--card))] text-brand-600 shadow-sm"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          }`}
        >
          <FolderPlus size={14} /> 3. Add Category
        </button>

        <button
          type="button"
          onClick={() => setTab("bulk")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
            tab === "bulk"
              ? "bg-[hsl(var(--card))] text-brand-600 shadow-sm"
              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          }`}
        >
          <Layers size={14} /> 4. Bulk Add
        </button>
      </div>

      {/* Notifications */}
      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          <span>{savedMessage}</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-semibold text-red-800 dark:text-red-300 animate-in fade-in">
          ✕ {error}
        </div>
      )}

      {/* TAB 1: ADD SINGLE VEHICLE MODEL */}
      {tab === "model" && (
        <form onSubmit={submitModel} className="space-y-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              1. Select Vehicle Category <span className="text-red-500">*</span>
            </label>
            <select
              value={modelForm.category}
              onChange={(e) => setModelForm({ ...modelForm, category: e.target.value, make: "" })}
              className="select-field"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
                2. Company / Make Name <span className="text-red-500">*</span>
              </label>
              {currentCategoryMakes.length > 0 && (
                <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                  {currentCategoryMakes.length} existing companies in {modelForm.category}
                </span>
              )}
            </div>
            <input
              list="existing-makes-datalist"
              value={modelForm.make}
              onChange={(e) => setModelForm({ ...modelForm, make: e.target.value })}
              placeholder="e.g. Honda, TVS, Hero, Maruti Suzuki, Tata Motors..."
              className="input-field"
              required
            />
            <datalist id="existing-makes-datalist">
              {currentCategoryMakes.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              3. Vehicle Model Name <span className="text-red-500">*</span>
            </label>
            <input
              value={modelForm.model}
              onChange={(e) => setModelForm({ ...modelForm, model: e.target.value })}
              placeholder="e.g. Activa 6G, Jupiter 125, Splendor+, Swift, Creta..."
              className="input-field"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm pt-2">
            <input
              type="checkbox"
              checked={modelForm.active}
              onChange={(e) => setModelForm({ ...modelForm, active: e.target.checked })}
            />
            <span>Active (available for battery matching & search)</span>
          </label>

          <AdminFormActions
            saving={saving}
            saveText="+ Add Vehicle Model"
            onCancel={() => router.push("/admin-panel/owner/vehicles")}
            cancelText="View Vehicles List"
          />
        </form>
      )}

      {/* TAB 2: ADD COMPANY / BRAND */}
      {tab === "company" && (
        <form onSubmit={submitCompany} className="space-y-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              1. Category for this Company <span className="text-red-500">*</span>
            </label>
            <select
              value={companyForm.category}
              onChange={(e) => setCompanyForm({ ...companyForm, category: e.target.value })}
              className="select-field"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              2. Company / Make Name <span className="text-red-500">*</span>
            </label>
            <input
              value={companyForm.make}
              onChange={(e) => setCompanyForm({ ...companyForm, make: e.target.value })}
              placeholder="e.g. Royal Enfield, Ather Energy, Mahindra, Toyota, Eicher..."
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              3. First Vehicle Model (Optional)
            </label>
            <input
              value={companyForm.firstModel}
              onChange={(e) => setCompanyForm({ ...companyForm, firstModel: e.target.value })}
              placeholder="e.g. Classic 350, 450X, Scorpio-N, Fortuner..."
              className="input-field"
            />
            <p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">
              If left blank, &quot;Standard Model&quot; will be created as the initial placeholder.
            </p>
          </div>

          <AdminFormActions
            saving={saving}
            saveText="+ Create Company / Make"
            onCancel={() => router.push("/admin-panel/owner/vehicles")}
            cancelText="View Vehicles List"
          />
        </form>
      )}

      {/* TAB 3: ADD CUSTOM CATEGORY */}
      {tab === "category" && (
        <form onSubmit={submitCategory} className="space-y-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              1. Category ID (Slug) <span className="text-red-500">*</span>
            </label>
            <input
              value={categoryForm.id}
              onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value })}
              placeholder="e.g. tractor, bus, ev-scooter, golfcart"
              className="input-field"
              required
            />
            <p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">
              Unique lowercase identifier without spaces.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              2. Display Name <span className="text-red-500">*</span>
            </label>
            <input
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              placeholder="e.g. Tractor & Agriculture, Electric Bus..."
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              3. Icon / Emoji
            </label>
            <input
              value={categoryForm.icon}
              onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
              placeholder="e.g. 🚜, 🚌, 🛺, ⚡"
              className="input-field"
            />
          </div>

          <AdminFormActions
            saving={saving}
            saveText="+ Save Category"
            onCancel={() => router.push("/admin-panel/owner/vehicles")}
            cancelText="View Vehicles List"
          />
        </form>
      )}

      {/* TAB 4: BULK ADD MODELS */}
      {tab === "bulk" && (
        <form onSubmit={submitBulk} className="space-y-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              1. Category <span className="text-red-500">*</span>
            </label>
            <select
              value={bulkForm.category}
              onChange={(e) => setBulkForm({ ...bulkForm, category: e.target.value })}
              className="select-field"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              2. Company / Make Name <span className="text-red-500">*</span>
            </label>
            <input
              value={bulkForm.make}
              onChange={(e) => setBulkForm({ ...bulkForm, make: e.target.value })}
              placeholder="e.g. Honda, Hero, TVS, Bajaj..."
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
              3. Model Names (One per line or comma-separated) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={bulkForm.modelsList}
              onChange={(e) => setBulkForm({ ...bulkForm, modelsList: e.target.value })}
              placeholder={`Activa 6G\nActiva 125\nDio\nGrazia\nAviator`}
              className="input-field min-h-[140px] font-mono text-xs"
              required
            />
            <p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">
              Paste a list of model names — each will be added as a separate vehicle model.
            </p>
          </div>

          <AdminFormActions
            saving={saving}
            saveText="+ Bulk Add All Models"
            onCancel={() => router.push("/admin-panel/owner/vehicles")}
            cancelText="View Vehicles List"
          />
        </form>
      )}
    </div>
  );
}
