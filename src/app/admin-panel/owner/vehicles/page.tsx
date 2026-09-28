"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AdminPageHeader,
  StatusBadge,
  DuplicateBadge,
} from "@/components/admin/admin-ui";
import { findDuplicateIds } from "@/lib/admin/duplicates";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Building2,
  FolderPlus,
  Sparkles,
  Edit2,
  Check,
  X,
  Search,
  RefreshCw,
} from "lucide-react";

type Vehicle = {
  id: string;
  category: string;
  make: string;
  model: string;
  active: boolean;
};

type CategoryMeta = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

const DEFAULT_CATEGORIES: CategoryMeta[] = [
  { id: "scooty", name: "Scooty (Scooters)", icon: "🛵", description: "Gearless scooters (Activa, Jupiter, Access, Dio, Pleasure...)" },
  { id: "bike", name: "Bike (Motorcycles)", icon: "🏍️", description: "Motorcycles & bikes (Splendor, Pulsar, Shine, Bullet, Apache...)" },
  { id: "car", name: "Car / SUV", icon: "🚗", description: "Passenger cars, hatchbacks, sedans, SUVs & MUVs" },
  { id: "truck", name: "Commercial & Truck", icon: "🚚", description: "Mini trucks, tempos, buses & heavy commercial haulers" },
  { id: "tractor", name: "Tractor & Agri", icon: "🚜", description: "Farm tractors, harvesters & agricultural equipment" },
  { id: "erickshaw", name: "E-Rickshaw & 3-Wheeler", icon: "🛺", description: "Electric rickshaws, auto rickshaws & 3-wheel loaders" },
];

const STARTER_POPULAR_VEHICLES = [
  // Scooties
  { category: "scooty", make: "Honda", model: "Activa 6G" },
  { category: "scooty", make: "Honda", model: "Activa 125" },
  { category: "scooty", make: "Honda", model: "Dio" },
  { category: "scooty", make: "Honda", model: "Grazia" },
  { category: "scooty", make: "TVS", model: "Jupiter 110" },
  { category: "scooty", make: "TVS", model: "Jupiter 125" },
  { category: "scooty", make: "TVS", model: "Ntorq 125" },
  { category: "scooty", make: "TVS", model: "Scooty Pep+" },
  { category: "scooty", make: "TVS", model: "Scooty Zest" },
  { category: "scooty", make: "Suzuki", model: "Access 125" },
  { category: "scooty", make: "Suzuki", model: "Burgman Street" },
  { category: "scooty", make: "Suzuki", model: "Avenis" },
  { category: "scooty", make: "Hero", model: "Pleasure Plus" },
  { category: "scooty", make: "Hero", model: "Destini 125" },
  { category: "scooty", make: "Hero", model: "Maestro Edge" },
  { category: "scooty", make: "Yamaha", model: "Fascino 125" },
  { category: "scooty", make: "Yamaha", model: "RayZR 125" },
  { category: "scooty", make: "Ather", model: "450X" },
  { category: "scooty", make: "Ola", model: "S1 Pro" },

  // Bikes
  { category: "bike", make: "Hero", model: "Splendor Plus" },
  { category: "bike", make: "Hero", model: "HF Deluxe" },
  { category: "bike", make: "Hero", model: "Passion Pro" },
  { category: "bike", make: "Hero", model: "Glamour" },
  { category: "bike", make: "Hero", model: "Xtreme 160R" },
  { category: "bike", make: "Honda", model: "Shine 125" },
  { category: "bike", make: "Honda", model: "SP 125" },
  { category: "bike", make: "Honda", model: "Unicorn 160" },
  { category: "bike", make: "Honda", model: "Hornet 2.0" },
  { category: "bike", make: "Honda", model: "H'ness CB350" },
  { category: "bike", make: "Bajaj", model: "Pulsar 150" },
  { category: "bike", make: "Bajaj", model: "Pulsar NS200" },
  { category: "bike", make: "Bajaj", model: "Platina 100" },
  { category: "bike", make: "Bajaj", model: "CT 110" },
  { category: "bike", make: "Bajaj", model: "Avenger 220" },
  { category: "bike", make: "TVS", model: "Apache RTR 160" },
  { category: "bike", make: "TVS", model: "Apache RTR 200" },
  { category: "bike", make: "TVS", model: "Raider 125" },
  { category: "bike", make: "TVS", model: "Sport" },
  { category: "bike", make: "TVS", model: "Radeon" },
  { category: "bike", make: "Royal Enfield", model: "Classic 350" },
  { category: "bike", make: "Royal Enfield", model: "Bullet 350" },
  { category: "bike", make: "Royal Enfield", model: "Hunter 350" },
  { category: "bike", make: "Royal Enfield", model: "Meteor 350" },
  { category: "bike", make: "Yamaha", model: "FZ-S V3" },
  { category: "bike", make: "Yamaha", model: "MT-15" },
  { category: "bike", make: "Yamaha", model: "R15 V4" },

  // Cars
  { category: "car", make: "Maruti Suzuki", model: "Swift" },
  { category: "car", make: "Maruti Suzuki", model: "Dzire" },
  { category: "car", make: "Maruti Suzuki", model: "Baleno" },
  { category: "car", make: "Maruti Suzuki", model: "Brezza" },
  { category: "car", make: "Maruti Suzuki", model: "Ertiga" },
  { category: "car", make: "Maruti Suzuki", model: "Wagon R" },
  { category: "car", make: "Hyundai", model: "Creta" },
  { category: "car", make: "Hyundai", model: "Venue" },
  { category: "car", make: "Hyundai", model: "i20" },
  { category: "car", make: "Hyundai", model: "Verna" },
  { category: "car", make: "Tata Motors", model: "Nexon" },
  { category: "car", make: "Tata Motors", model: "Punch" },
  { category: "car", make: "Tata Motors", model: "Harrier" },
  { category: "car", make: "Tata Motors", model: "Tiago" },
  { category: "car", make: "Mahindra", model: "Scorpio-N" },
  { category: "car", make: "Mahindra", model: "XUV700" },
  { category: "car", make: "Mahindra", model: "Thar" },
  { category: "car", make: "Mahindra", model: "Bolero" },
  { category: "car", make: "Toyota", model: "Innova Crysta" },
  { category: "car", make: "Toyota", model: "Fortuner" },
  { category: "car", make: "Kia", model: "Seltos" },
  { category: "car", make: "Kia", model: "Sonet" },
];

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all");

  // All dropdowns closed by default
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [expandedMakes, setExpandedMakes] = useState<Record<string, boolean>>({});

  // Editing state for a single vehicle model
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // Feedback toast banner
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/vehicles");
      if (res.ok) {
        const data = await res.json();
        setVehicles(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function showToast(text: string, type: "success" | "error" = "success") {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4500);
  }

  // All combined categories (default + discovered from db)
  const allCategories = useMemo(() => {
    const list = [...DEFAULT_CATEGORIES];
    const existingCatIds = new Set(list.map((c) => c.id));

    for (const v of vehicles) {
      if (v.category && !existingCatIds.has(v.category)) {
        existingCatIds.add(v.category);
        list.push({
          id: v.category,
          name: v.category.charAt(0).toUpperCase() + v.category.slice(1),
          icon: "📁",
          description: `Custom ${v.category} category`,
        });
      }
    }

    return list;
  }, [vehicles]);

  // Duplicates detection
  const duplicates = useMemo(
    () => findDuplicateIds(vehicles, (v) => `${v.category}:${v.make.toLowerCase()}:${v.model.toLowerCase()}`),
    [vehicles]
  );

  // Grouping: Category -> Make -> Vehicles[]
  const groupedTree = useMemo(() => {
    const tree: Record<string, Record<string, Vehicle[]>> = {};

    allCategories.forEach((cat) => {
      tree[cat.id] = {};
    });

    const q = search.trim().toLowerCase();

    for (const v of vehicles) {
      const catKey = v.category || "car";
      if (!tree[catKey]) tree[catKey] = {};

      const matchesSearch =
        !q ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);

      if (matchesSearch) {
        if (!tree[catKey][v.make]) tree[catKey][v.make] = [];
        tree[catKey][v.make].push(v);
      }
    }

    return tree;
  }, [vehicles, allCategories, search]);

  // Get distinct makes for a category
  function getMakesForCategory(catId: string): string[] {
    const set = new Set<string>();
    vehicles
      .filter((v) => v.category === catId)
      .forEach((v) => set.add(v.make));
    return Array.from(set).sort();
  }

  // Toggle company accordion
  function toggleMakeAccordion(catId: string, makeName: string) {
    const key = `${catId}:${makeName}`;
    setExpandedMakes((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Toggle category accordion
  function toggleCatAccordion(catId: string) {
    setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
  }

  // Expand all / Collapse all
  function setAllExpanded(expand: boolean) {
    const nextCats: Record<string, boolean> = {};
    const nextMakes: Record<string, boolean> = {};

    allCategories.forEach((cat) => {
      nextCats[cat.id] = expand;
      const makes = getMakesForCategory(cat.id);
      makes.forEach((m) => {
        nextMakes[`${cat.id}:${m}`] = expand;
      });
    });

    setExpandedCats(nextCats);
    setExpandedMakes(nextMakes);
  }

  // Save edited model name
  async function handleSaveEdit(id: string) {
    if (!editingName.trim()) return;
    try {
      const res = await fetch(`/api/admin/vehicles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: editingName.trim() }),
      });
      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
        setEditingId(null);
        showToast("✓ Model name updated successfully!");
      }
    } catch (err) {
      showToast("Failed to update model", "error");
    }
  }

  // Toggle active status
  async function toggleActive(id: string, active: boolean) {
    try {
      const res = await fetch(`/api/admin/vehicles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
      }
    } catch (err) {
      showToast("Error updating status", "error");
    }
  }

  // Delete vehicle model
  async function removeVehicle(id: string, name: string) {
    if (!confirm(`Delete vehicle model "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/vehicles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        showToast(`✓ Deleted "${name}"`);
      }
    } catch (err) {
      showToast("Failed to delete vehicle", "error");
    }
  }

  // Quick seed starter vehicles
  async function seedStarterCatalog() {
    if (
      !confirm(
        "Quick-Seed will populate popular Indian 2-wheeler scooties, bikes, cars & trucks (Activa, Jupiter, Splendor, Pulsar, Swift, Creta...) into your database. Existing models will not be duplicated. Proceed?"
      )
    )
      return;

    setIsSeeding(true);
    let addedCount = 0;
    try {
      for (const item of STARTER_POPULAR_VEHICLES) {
        const res = await fetch("/api/admin/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, active: true }),
        });
        if (res.ok) {
          const created = await res.json();
          setVehicles((prev) => [...prev, created]);
          addedCount++;
        }
      }
      showToast(`✓ Quick-Seed completed! Added ${addedCount} popular Indian vehicle models.`);
    } catch (err) {
      showToast("Error during quick-seed", "error");
    } finally {
      setIsSeeding(false);
    }
  }

  const totalMakesCount = useMemo(() => {
    const set = new Set(vehicles.map((v) => `${v.category}:${v.make}`));
    return set.size;
  }, [vehicles]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        title="Vehicle & Battery Compatibility Catalog"
        subtitle={`${vehicles.length} Models across ${totalMakesCount} Companies & ${allCategories.length} Categories`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin-panel/owner/vehicles/new?tab=model"
              className="btn-primary inline-flex items-center gap-1.5 text-xs font-semibold"
            >
              <Plus size={15} /> Add Vehicle Model
            </Link>
            <Link
              href="/admin-panel/owner/vehicles/new?tab=company"
              className="btn-secondary inline-flex items-center gap-1.5 text-xs font-semibold"
            >
              <Building2 size={15} /> Add Company
            </Link>
            <Link
              href="/admin-panel/owner/vehicles/new?tab=category"
              className="btn-secondary inline-flex items-center gap-1.5 text-xs font-semibold"
            >
              <FolderPlus size={15} /> Add Category
            </Link>
            <button
              type="button"
              onClick={seedStarterCatalog}
              disabled={isSeeding}
              className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
              title="Click to automatically load standard Indian vehicles (Activa, Jupiter, Splendor, Pulsar, Swift, Creta...)"
            >
              <Sparkles size={14} className="inline mr-1" /> {isSeeding ? "Seeding..." : "Quick-Seed Models"}
            </button>
          </div>
        }
      />

      {/* Toast Notice */}
      {notice && (
        <div
          className={`flex items-center justify-between rounded-xl border p-3.5 text-sm font-semibold transition animate-in fade-in ${
            notice.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-300"
          }`}
        >
          <span>{notice.text}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-xs opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Category Pills / Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--border))] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategoryTab("all")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategoryTab === "all"
                ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:border-brand-300"
            }`}
          >
            All Categories ({vehicles.length})
          </button>
          {allCategories.map((c) => {
            const count = vehicles.filter((v) => v.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategoryTab(c.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeCategoryTab === c.id
                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                    : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:border-brand-300"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
                <span className="ml-1 rounded-full bg-black/10 dark:bg-white/10 px-1.5 py-0.2 text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setAllExpanded(true)}
            className="text-brand-600 hover:underline font-semibold"
          >
            Expand All ▾
          </button>
          <span className="text-[hsl(var(--muted-foreground))]">|</span>
          <button
            type="button"
            onClick={() => setAllExpanded(false)}
            className="text-[hsl(var(--muted-foreground))] hover:text-brand-600 font-semibold"
          >
            Collapse All ▸
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by vehicle make, model name (e.g. Activa, Pulsar, Swift, Creta, Jupiter)..."
          className="input-field pl-10 text-sm"
        />
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-brand-600 mb-2" />
          Loading vehicle catalog...
        </div>
      ) : (
        /* Hierarchical Category & Company Listing */
        <div className="space-y-4">
          {allCategories
            .filter((cat) => activeCategoryTab === "all" || activeCategoryTab === cat.id)
            .map((cat) => {
              const makesMap = groupedTree[cat.id] || {};
              const makesList = Object.keys(makesMap).sort();
              const categoryTotalModels = makesList.reduce((sum, m) => sum + (makesMap[m]?.length || 0), 0);
              // Closed by default
              const isCatExpanded = expandedCats[cat.id] === true || (search.length > 0 && categoryTotalModels > 0);

              if (search && categoryTotalModels === 0) return null;

              return (
                <div
                  key={cat.id}
                  className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition"
                >
                  {/* Category Header (Dropdown Button 1) */}
                  <div
                    onClick={() => toggleCatAccordion(cat.id)}
                    className="flex cursor-pointer select-none flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-5 py-3.5 hover:bg-[hsl(var(--muted))]/50 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xl shadow-xs transition duration-200 group-hover:scale-105">
                        {cat.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-base text-[hsl(var(--foreground))]">
                            {cat.name}
                          </span>
                          <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
                            {categoryTotalModels} models · {makesList.length} companies
                          </span>
                        </div>
                        <p className="text-xs font-normal text-[hsl(var(--muted-foreground))]">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                        {isCatExpanded ? "Hide" : "Show"}
                      </span>
                      <div className="text-[hsl(var(--muted-foreground))]">
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ease-in-out ${
                            isCatExpanded ? "rotate-0 text-brand-600" : "-rotate-90 text-[hsl(var(--muted-foreground))]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Level 2: Company Dropdowns inside Category (Smooth CSS Grid Transition) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isCatExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 space-y-2.5">
                        {makesList.length === 0 ? (
                          <div className="py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
                            No vehicle models in this category yet.
                            <div className="mt-2">
                              <Link
                                href={`/admin-panel/owner/vehicles/new?tab=model`}
                                className="text-xs font-semibold text-brand-600 underline"
                              >
                                Add vehicle model to {cat.name} →
                              </Link>
                            </div>
                          </div>
                        ) : (
                          makesList.map((makeName) => {
                            const models = makesMap[makeName] || [];
                            const makeKey = `${cat.id}:${makeName}`;
                            const isMakeExpanded =
                              expandedMakes[makeKey] === true || (search.length > 0 && models.length > 0);

                            return (
                              <div
                                key={makeName}
                                className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xs transition-all duration-200 hover:border-brand-300"
                              >
                                {/* Company Header (Dropdown Button 2) */}
                                <div
                                  onClick={() => toggleMakeAccordion(cat.id, makeName)}
                                  className="flex cursor-pointer select-none flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-[hsl(var(--muted))]/30 transition duration-200"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div className="text-[hsl(var(--muted-foreground))]">
                                      <ChevronDown
                                        size={17}
                                        className={`transition-transform duration-300 ease-in-out ${
                                          isMakeExpanded
                                            ? "rotate-0 text-brand-600"
                                            : "-rotate-90 text-[hsl(var(--muted-foreground))]"
                                        }`}
                                      />
                                    </div>
                                    <Building2 size={16} className="text-brand-600" />
                                    <span className="font-semibold text-sm text-[hsl(var(--foreground))]">
                                      {makeName}
                                    </span>
                                    <span className="rounded-full bg-[hsl(var(--muted))] px-2.5 py-0.5 text-[11px] font-semibold text-[hsl(var(--muted-foreground))]">
                                      {models.length} {models.length === 1 ? "model" : "models"}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] font-medium">
                                    <span>{isMakeExpanded ? "Hide Models" : "View Models"}</span>
                                  </div>
                                </div>

                                {/* Level 3: Vehicle Models Listing (Smooth CSS Grid Transition) */}
                                <div
                                  className={`grid transition-all duration-300 ease-in-out ${
                                    isMakeExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/10 p-3.5">
                                      <div className="flex flex-wrap items-center gap-2">
                                        {models.map((v) => {
                                          const isDupe = duplicates.has(v.id);
                                          const isEditing = editingId === v.id;

                                          return (
                                            <div
                                              key={v.id}
                                              className={`group relative inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition duration-200 ${
                                                isDupe
                                                  ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                                                  : v.active
                                                  ? "border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xs hover:border-brand-400 hover:shadow-sm"
                                                  : "border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 opacity-60"
                                              }`}
                                            >
                                              {isEditing ? (
                                                <div className="flex items-center gap-1">
                                                  <input
                                                    type="text"
                                                    value={editingName}
                                                    onChange={(e) => setEditingName(e.target.value)}
                                                    className="input-field py-0.5 px-2 text-xs w-32"
                                                    autoFocus
                                                  />
                                                  <button
                                                    type="button"
                                                    onClick={() => handleSaveEdit(v.id)}
                                                    className="text-emerald-600 hover:text-emerald-700 p-1"
                                                    title="Save"
                                                  >
                                                    <Check size={14} />
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => setEditingId(null)}
                                                    className="text-gray-400 hover:text-gray-600 p-1"
                                                    title="Cancel"
                                                  >
                                                    <X size={14} />
                                                  </button>
                                                </div>
                                              ) : (
                                                <>
                                                  <span className="font-semibold text-[hsl(var(--foreground))]">
                                                    {v.model}
                                                  </span>
                                                  <StatusBadge active={v.active} />
                                                  {isDupe && <DuplicateBadge />}

                                                  {/* Action buttons */}
                                                  <div className="flex items-center gap-1 pl-1 border-l border-[hsl(var(--border))]">
                                                    <button
                                                      type="button"
                                                      onClick={() => toggleActive(v.id, v.active)}
                                                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition ${
                                                        v.active
                                                          ? "text-gray-500 hover:text-gray-700"
                                                          : "text-emerald-600 hover:text-emerald-700"
                                                      }`}
                                                      title={v.active ? "Deactivate" : "Activate"}
                                                    >
                                                      {v.active ? "Off" : "On"}
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        setEditingId(v.id);
                                                        setEditingName(v.model);
                                                      }}
                                                      className="p-1 text-gray-400 hover:text-brand-600 transition"
                                                      title="Edit model name"
                                                    >
                                                      <Edit2 size={12} />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() => removeVehicle(v.id, `${v.make} ${v.model}`)}
                                                      className="p-1 text-gray-400 hover:text-red-600 transition"
                                                      title="Delete model"
                                                    >
                                                      <Trash2 size={12} />
                                                    </button>
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
