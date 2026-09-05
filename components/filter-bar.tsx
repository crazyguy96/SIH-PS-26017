"use client";

import { RiskTier } from "@/lib/types";

const TIERS: RiskTier[] = ["High", "Medium", "Low"];

export function FilterBar({
  regions,
  sectors,
  region,
  sector,
  tiers,
  search,
  onRegionChange,
  onSectorChange,
  onTiersChange,
  onSearchChange,
}: {
  regions: string[];
  sectors: string[];
  region: string;
  sector: string;
  tiers: RiskTier[];
  search: string;
  onRegionChange: (v: string) => void;
  onSectorChange: (v: string) => void;
  onTiersChange: (v: RiskTier[]) => void;
  onSearchChange: (v: string) => void;
}) {
  function toggleTier(t: RiskTier) {
    if (tiers.includes(t)) {
      onTiersChange(tiers.filter((x) => x !== t));
    } else {
      onTiersChange([...tiers, t]);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      <select
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
        className="hairline rounded bg-surface dark:bg-[#141D26] text-sm px-3 py-1.5"
      >
        <option value="">All regions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={sector}
        onChange={(e) => onSectorChange(e.target.value)}
        className="hairline rounded bg-surface dark:bg-[#141D26] text-sm px-3 py-1.5"
      >
        <option value="">All sectors</option>
        {sectors.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2 hairline rounded bg-surface dark:bg-[#141D26] px-3 py-1.5">
        {TIERS.map((t) => (
          <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={tiers.includes(t)}
              onChange={() => toggleTier(t)}
              className="accent-teal"
            />
            {t}
          </label>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search project ID…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="hairline rounded bg-surface dark:bg-[#141D26] text-sm px-3 py-1.5 flex-1 min-w-[180px]"
      />
    </div>
  );
}
