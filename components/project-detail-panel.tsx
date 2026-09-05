"use client";

import { Project } from "@/lib/types";
import { RISK_COLORS, RISK_BG, formatPct, formatCrore } from "@/lib/format";
import { X } from "lucide-react";
import { useEffect } from "react";

export function ProjectDetailPanel({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = project !== null;
  const drivers = project?.top_delay_drivers.split(";").map((s) => s.trim()).filter(Boolean) ?? [];
  const actions = project?.recommended_actions.split(";").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <>
      <div
        className={`fixed inset-0 bg-ink/30 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface dark:bg-[#141D26] z-50 border-l border-line dark:border-[#2A3742] transition-transform duration-200 ease-out overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {project && (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs text-ink/50 dark:text-[#8A9086]">{project.quarter}</div>
                <h2 className="font-serif text-xl font-semibold">{project.project_id}</h2>
              </div>
              <button onClick={onClose} className="p-1.5 hairline rounded hover:bg-teal/10">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: `conic-gradient(${RISK_COLORS[project.risk_tier]} ${
                    project.predicted_delay_probability * 360
                  }deg, ${RISK_BG[project.risk_tier]} 0deg)`,
                }}
              >
                <div className="w-14 h-14 rounded-full bg-surface dark:bg-[#141D26] flex items-center justify-center text-sm font-semibold">
                  {formatPct(project.predicted_delay_probability)}
                </div>
              </div>
              <div>
                <span
                  className="text-xs px-2 py-1 rounded font-medium"
                  style={{
                    color: RISK_COLORS[project.risk_tier],
                    backgroundColor: RISK_BG[project.risk_tier],
                  }}
                >
                  {project.risk_tier} risk
                </span>
                <div className="text-sm mt-2 text-ink/70 dark:text-[#B9BEB2]">
                  Predicted probability of delay
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-4 text-sm mb-6 hairline-t hairline-b py-4">
              <div>
                <dt className="text-xs text-ink/50 dark:text-[#8A9086]">Region</dt>
                <dd>{project.region_final}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/50 dark:text-[#8A9086]">Sector</dt>
                <dd>{project.sector_extracted}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/50 dark:text-[#8A9086]">Original cost</dt>
                <dd>{formatCrore(project.original_cost_crore)}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/50 dark:text-[#8A9086]">Physical progress</dt>
                <dd>{project.physical_progress_pct?.toFixed(1)}%</dd>
              </div>
            </dl>

            <div className="mb-6">
              <h3 className="font-serif text-sm font-semibold mb-2">Top delay drivers</h3>
              <ul className="text-sm space-y-1.5">
                {drivers.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-sm font-semibold mb-2">Recommended actions</h3>
              <ul className="text-sm space-y-2">
                {actions.map((a, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <input type="checkbox" className="mt-1 accent-teal" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
