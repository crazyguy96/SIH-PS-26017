export type RiskTier = "High" | "Medium" | "Low";

export interface Project {
  project_id: string;
  quarter: string;
  region_final: string;
  sector_extracted: string;
  original_cost_crore: number;
  physical_progress_pct: number;
  predicted_delay_probability: number;
  risk_tier: RiskTier;
  top_delay_drivers: string;
  recommended_actions: string;
}

export interface RegionSectorCount {
  region_final?: string;
  sector_extracted?: string;
  risk_tier: RiskTier;
  count: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface Summary {
  total_projects: number;
  high_risk: number;
  medium_risk: number;
  low_risk: number;
  by_region: RegionSectorCount[];
  by_sector: RegionSectorCount[];
  top_features: FeatureImportance[];
}
