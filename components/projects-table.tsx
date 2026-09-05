"use client";

import { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import { RISK_COLORS, RISK_BG, formatPct } from "@/lib/format";
import { ChevronUp, ChevronDown } from "lucide-react";

type SortKey = keyof Pick<
  Project,
  "project_id" | "region_final" | "sector_extracted" | "predicted_delay_probability"
>;

const PAGE_SIZE = 15;

export function ProjectsTable({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("predicted_delay_probability");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    const arr = [...projects];
    arr.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [projects, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages - 1);
  const pageRows = sorted.slice(clampedPage * PAGE_SIZE, clampedPage * PAGE_SIZE + PAGE_SIZE);

  function sortBy(key: SortKey) {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(0);
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: "project_id", label: "Project ID" },
    { key: "region_final", label: "Region" },
    { key: "sector_extracted", label: "Sector" },
    { key: "predicted_delay_probability", label: "Delay probability" },
  ];

  return (
    <div className="hairline rounded bg-surface dark:bg-[#141D26] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[720px]">
          <thead>
            <tr className="hairline-b text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => sortBy(col.key)}
                  className="px-4 py-2.5 font-medium text-ink/70 dark:text-[#B9BEB2] cursor-pointer select-none whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />)}
                  </span>
                </th>
              ))}
              <th className="px-4 py-2.5 font-medium text-ink/70 dark:text-[#B9BEB2]">Risk tier</th>
              <th className="px-4 py-2.5 font-medium text-ink/70 dark:text-[#B9BEB2]">Top delay drivers</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((p) => (
              <tr
                key={`${p.project_id}-${p.quarter}`}
                onClick={() => onSelect(p)}
                className="hairline-b last:border-b-0 cursor-pointer hover:bg-teal/5 transition-colors"
              >
                <td className="px-4 py-2.5 font-medium whitespace-nowrap">{p.project_id}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">{p.region_final}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">{p.sector_extracted}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-line dark:bg-[#2A3742] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${p.predicted_delay_probability * 100}%`,
                          backgroundColor: RISK_COLORS[p.risk_tier],
                        }}
                      />
                    </div>
                    {formatPct(p.predicted_delay_probability)}
                  </div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      color: RISK_COLORS[p.risk_tier],
                      backgroundColor: RISK_BG[p.risk_tier],
                    }}
                  >
                    {p.risk_tier}
                  </span>
                </td>
                <td className="px-4 py-2.5 max-w-[280px] truncate" title={p.top_delay_drivers}>
                  {p.top_delay_drivers}
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/50 dark:text-[#8A9086]">
                  No projects match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between hairline-t px-4 py-2.5 text-xs text-ink/60 dark:text-[#B9BEB2]">
        <span>
          Showing {sorted.length === 0 ? 0 : clampedPage * PAGE_SIZE + 1}
          –{Math.min((clampedPage + 1) * PAGE_SIZE, sorted.length)} of {sorted.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={clampedPage === 0}
            className="px-2 py-1 hairline rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            Page {clampedPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={clampedPage >= totalPages - 1}
            className="px-2 py-1 hairline rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
