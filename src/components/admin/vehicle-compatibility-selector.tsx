"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Check, X, Car, ChevronDown, Filter, Trash2 } from "lucide-react";

export type VehicleSelection = {
  make: string;
  model: string;
};

type VehicleCatalogItem = {
  id: string;
  category: string;
  make: string;
  model: string;
  active: boolean;
};

const CATEGORY_TABS = [
  { id: "all", label: "All Categories", icon: "🌐" },
  { id: "car", label: "Car / SUV", icon: "🚗" },
  { id: "scooty", label: "Scooty", icon: "🛵" },
  { id: "bike", label: "Bike", icon: "🏍️" },
  { id: "truck", label: "Commercial / Truck", icon: "🚚" },
  { id: "tractor", label: "Tractor & Agri", icon: "🚜" },
  { id: "erickshaw", label: "E-Rickshaw", icon: "🛺" },
];

type Props = {
  value: VehicleSelection[];
  onChange: (vehicles: VehicleSelection[]) => void;
  defaultCategory?: string;
};

export function VehicleCompatibilitySelector({
  value = [],
  onChange,
  defaultCategory,
}: Props) {
  const [catalog, setCatalog] = useState<VehicleCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(defaultCategory || "all");
  const [search, setSearch] = useState("");
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [expandedMakes, setExpandedMakes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((r) => r.json())
      .then((items: VehicleCatalogItem[]) => {
        if (Array.isArray(items)) {
          setCatalog(items.filter((i) => i.active));
        }
      })
      .catch((err) => console.error("Failed to load vehicle catalog:", err))
      .finally(() => setLoading(false));
  }, []);

  // Set lookup for selected vehicles: "make:model" -> true
  const selectedSet = useMemo(() => {
    const s = new Set<string>();
    value.forEach((v) => {
      s.add(`${v.make.toLowerCase()}:${v.model.toLowerCase()}`);
    });
    return s;
  }, [value]);

  const isSelected = (make: string, model: string) =>
    selectedSet.has(`${make.toLowerCase()}:${model.toLowerCase()}`);

  const toggleModel = (make: string, model: string) => {
    if (isSelected(make, model)) {
      onChange(
        value.filter(
          (v) =>
            !(
              v.make.toLowerCase() === make.toLowerCase() &&
              v.model.toLowerCase() === model.toLowerCase()
            )
        )
      );
    } else {
      onChange([...value, { make, model }]);
    }
  };

  const removeVehicle = (make: string, model: string) => {
    onChange(
      value.filter(
        (v) =>
          !(
            v.make.toLowerCase() === make.toLowerCase() &&
            v.model.toLowerCase() === model.toLowerCase()
          )
      )
    );
  };

  const clearAll = () => {
    onChange([]);
  };

  // Filter catalog based on active category tab & search query
  const filteredCatalog = useMemo(() => {
    let list = catalog;
    if (activeTab !== "all") {
      list = list.filter((i) => i.category === activeTab);
    }
    if (selectedMake !== "all") {
      list = list.filter((i) => i.make.toLowerCase() === selectedMake.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.make.toLowerCase().includes(q) ||
          i.model.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [catalog, activeTab, selectedMake, search]);

  // Group filtered catalog by category -> make -> models[]
  const grouped = useMemo(() => {
    const map: Record<string, Record<string, string[]>> = {};
    filteredCatalog.forEach((item) => {
      if (!map[item.category]) map[item.category] = {};
      if (!map[item.category][item.make]) map[item.category][item.make] = [];
      if (!map[item.category][item.make].includes(item.model)) {
        map[item.category][item.make].push(item.model);
      }
    });
    return map;
  }, [filteredCatalog]);

  // Unique makes in current filtered category for the make dropdown
  const availableMakes = useMemo(() => {
    let list = catalog;
    if (activeTab !== "all") {
      list = list.filter((i) => i.category === activeTab);
    }
    const set = new Set<string>();
    list.forEach((i) => set.add(i.make));
    return Array.from(set).sort();
  }, [catalog, activeTab]);

  const selectAllInMake = (make: string, models: string[]) => {
    const toAdd: VehicleSelection[] = [];
    models.forEach((m) => {
      if (!isSelected(make, m)) {
        toAdd.push({ make, model: m });
      }
    });
    if (toAdd.length > 0) {
      onChange([...value, ...toAdd]);
    }
  };

  const deselectAllInMake = (make: string, models: string[]) => {
    const modelSet = new Set(models.map((m) => m.toLowerCase()));
    onChange(
      value.filter(
        (v) =>
          !(
            v.make.toLowerCase() === make.toLowerCase() &&
            modelSet.has(v.model.toLowerCase())
          )
      )
    );
  };

  const toggleMakeAccordion = (key: string) => {
    setExpandedMakes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[hsl(var(--border))] pb-3">
        <div>
          <h3 className="font-display font-semibold text-base text-[hsl(var(--foreground))]">
            Vehicle Compatibility (Multi-Select)
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Select all vehicle models compatible with this battery. Customers searching for any of these vehicles will see this product.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-bold text-brand-700 dark:text-brand-300">
            {value.length} {value.length === 1 ? "Vehicle" : "Vehicles"} Selected
          </span>
          {value.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 size={12} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Selected Vehicles Tags Preview */}
      {value.length > 0 && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-3 dark:border-brand-900/50 dark:bg-brand-950/20">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Currently Linked Vehicles ({value.length}):
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {value.map((v) => (
              <span
                key={`${v.make}:${v.model}`}
                className="inline-flex items-center gap-1 rounded-lg bg-[hsl(var(--card))] border border-brand-300 px-2 py-0.5 text-xs font-medium text-[hsl(var(--foreground))] shadow-2xs dark:border-brand-800"
              >
                <span className="font-semibold text-brand-700 dark:text-brand-400">{v.make}</span> {v.model}
                <button
                  type="button"
                  onClick={() => removeVehicle(v.make, v.model)}
                  className="ml-0.5 text-[hsl(var(--muted-foreground))] hover:text-red-600"
                  title="Remove"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedMake("all");
            }}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === tab.id
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-[hsl(var(--muted))]/60 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Filters: Search & Make Filter */}
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search model or brand (e.g. Swift, Activa, Splendor)..."
            className="input-field pl-8 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[hsl(var(--muted-foreground))]" />
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="select-field text-xs flex-1"
          >
            <option value="all">All Brands / Makes ({availableMakes.length})</option>
            {availableMakes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicles Grid / Accordions */}
      {loading ? (
        <div className="py-8 text-center text-xs text-[hsl(var(--muted-foreground))]">
          Loading vehicle catalog...
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="rounded-lg border border-dashed border-[hsl(var(--border))] py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
          No matching vehicle models found for the current search/category.
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {Object.entries(grouped).map(([category, makesMap]) => (
            <div key={category} className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                {CATEGORY_TABS.find((t) => t.id === category)?.icon}{" "}
                {CATEGORY_TABS.find((t) => t.id === category)?.label || category}
              </div>

              {Object.entries(makesMap).map(([make, models]) => {
                const makeKey = `${category}:${make}`;
                const isExpanded =
                  expandedMakes[makeKey] ?? (selectedMake !== "all" || search.length > 0);
                const selectedInMakeCount = models.filter((m) => isSelected(make, m)).length;
                const allSelected = models.length > 0 && selectedInMakeCount === models.length;

                return (
                  <div
                    key={makeKey}
                    className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[hsl(var(--muted))]/30 text-xs">
                      <button
                        type="button"
                        onClick={() => toggleMakeAccordion(makeKey)}
                        className="flex items-center gap-1.5 font-semibold text-[hsl(var(--foreground))] hover:text-brand-600"
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isExpanded ? "rotate-0 text-brand-600" : "-rotate-90"}`}
                        />
                        <span>{make}</span>
                        <span className="rounded-full bg-[hsl(var(--muted))] px-2 py-0.2 text-[10px] text-[hsl(var(--muted-foreground))]">
                          {selectedInMakeCount}/{models.length}
                        </span>
                      </button>

                      <div className="flex items-center gap-2">
                        {allSelected ? (
                          <button
                            type="button"
                            onClick={() => deselectAllInMake(make, models)}
                            className="text-[11px] font-semibold text-red-600 hover:underline"
                          >
                            Deselect all {models.length}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => selectAllInMake(make, models)}
                            className="text-[11px] font-semibold text-brand-600 hover:underline"
                          >
                            Select all {models.length}
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))]">
                        {models.map((model) => {
                          const checked = isSelected(make, model);
                          return (
                            <label
                              key={model}
                              onClick={() => toggleModel(make, model)}
                              className={`flex cursor-pointer select-none items-center gap-2 rounded-md border p-2 text-xs transition ${
                                checked
                                  ? "border-brand-500 bg-brand-50/70 text-brand-900 font-semibold dark:bg-brand-950/30 dark:text-brand-200"
                                  : "border-[hsl(var(--border))] hover:border-brand-300 text-[hsl(var(--foreground))]"
                              }`}
                            >
                              <div
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                  checked
                                    ? "border-brand-600 bg-brand-600 text-white"
                                    : "border-[hsl(var(--border))] bg-white dark:bg-black/20"
                                }`}
                              >
                                {checked && <Check size={11} strokeWidth={3} />}
                              </div>
                              <span className="truncate">{model}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
