"use client";

import { useMemo, useState } from "react";
import summaryData from "@/data/summary.json";
import projectsData from "@/data/projects.json";
import { Project, RiskTier, Summary } from "@/lib/types";
import { KpiStrip } from "@/components/kpi-strip";
import { FilterBar } from "@/components/filter-bar";
import { RiskStackChart } from "@/components/risk-stack-chart";
import { FeatureImportanceChart } from "@/components/feature-importance-chart";
import { ProjectsTable } from "@/components/projects-table";
import { ProjectDetailPanel } from "@/components/project-detail-panel";
import { Sidebar } from "@/components/sidebar";

const summary = summaryData as Summary;
const allProjects = projectsData as Project[];

export default function Page() {
  const [region, setRegion] = useState("");
  const [sector, setSector] = useState("");
  const [tiers, setTiers] = useState<RiskTier[]>(["High", "Medium", "Low"]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const regions = useMemo(
    () => Array.from(new Set(allProjects.map((p) => p.region_final))).sort(),
    []
  );
  const sectors = useMemo(
    () => Array.from(new Set(allProjects.map((p) => p.sector_extracted))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (region && p.region_final !== region) return false;
      if (sector && p.sector_extracted !== sector) return false;
      if (!tiers.includes(p.risk_tier)) return false;
      if (search && !p.project_id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [region, sector, tiers, search]);

  return (
    <div className="flex max-w-[1400px] mx-auto">
      <Sidebar />

      <main className="flex-1 min-w-0 px-5 sm:px-8 py-8">
        <header id="overview" className="hairline-b pb-6 mb-6">
          <div className="text-xs text-ink/50 dark:text-[#8A9086] mb-1">
            SIH PS 26017 — Infrastructure Governance & Public Administration
          </div>
          <h1 className="font-serif text-3xl font-semibold">Project Delay Risk Register</h1>
          <p className="text-sm text-ink/70 dark:text-[#B9BEB2] mt-2 max-w-[65ch]">
            Predictive analytics for early detection of land acquisition and
            infrastructure project delays. Model: LightGBM classifier ·
            Explainability: SHAP.
          </p>
        </header>

        <section className="mb-8">
          <KpiStrip summary={summary} />
        </section>

        <FilterBar
          regions={regions}
          sectors={sectors}
          region={region}
          sector={sector}
          tiers={tiers}
          search={search}
          onRegionChange={setRegion}
          onSectorChange={setSector}
          onTiersChange={setTiers}
          onSearchChange={setSearch}
        />

        <section id="trends" className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8 scroll-mt-6">
          <RiskStackChart title="Risk distribution by region" data={summary.by_region} categoryKey="region_final" />
          <RiskStackChart title="Risk distribution by sector" data={summary.by_sector} categoryKey="sector_extracted" />
        </section>

        <section id="drivers" className="mb-8 scroll-mt-6">
          <FeatureImportanceChart data={summary.top_features} />
        </section>

        <section id="register" className="scroll-mt-6">
          <h2 className="font-serif text-lg font-semibold mb-3">Project register</h2>
          <ProjectsTable projects={filtered} onSelect={setSelected} />
        </section>

        <footer className="mt-10 pt-4 hairline-t text-xs text-ink/50 dark:text-[#8A9086]">
          Risk tiers: Low &lt; 40%, Medium 40–70%, High &gt; 70% predicted delay probability.
        </footer>
      </main>

      <ProjectDetailPanel project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
