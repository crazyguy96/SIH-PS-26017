import { RiskTier } from "./types";

const FEATURE_LABELS: Record<string, string> = {
  project_age_months_at_report: "Project age (months)",
  physical_progress_pct: "Physical progress %",
  original_cost_crore: "Original cost (₹ crore)",
  state_freq_encoded: "State-level delay history",
  anticipated_cost_crore_extracted: "Anticipated cost (₹ crore)",
  narrative_char_length: "Narrative length (characters)",
  narrative_word_count: "Narrative length (words)",
  cost_overrun_pct_calc_clean: "Cost overrun %",
  extracted_scheduled_date_was_missing: "Missing scheduled date",
  original_completion_date_was_missing: "Missing completion date",
  num_issue_flags_v2: "Number of flagged issues",
  has_land_component_v2: "Has land acquisition component",
  land_acquisition_progress_ratio: "Land acquisition progress ratio",
  land_gap_ha_calc: "Land acquisition gap (ha)",
};

export function formatFeatureName(raw: string): string {
  if (FEATURE_LABELS[raw]) return FEATURE_LABELS[raw];
  if (raw.startsWith("sector_extracted_")) {
    return `Sector: ${titleCase(raw.replace("sector_extracted_", ""))}`;
  }
  if (raw.startsWith("region_final_")) {
    return `Region: ${titleCase(raw.replace("region_final_", ""))}`;
  }
  if (raw.startsWith("kw_")) {
    return `Narrative mentions: ${titleCase(raw.replace("kw_", "").replace(/_/g, " "))}`;
  }
  return titleCase(raw.replace(/_/g, " "));
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export const RISK_COLORS: Record<RiskTier, string> = {
  High: "#B3261E",
  Medium: "#8A6A12",
  Low: "#2F6B3A",
};

export const RISK_BG: Record<RiskTier, string> = {
  High: "#F6E4E2",
  Medium: "#F3EAD2",
  Low: "#E4EFE6",
};

export function formatPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export function formatCrore(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 1 })} Cr`;
}
