import { Summary } from "@/lib/types";

export function KpiStrip({ summary }: { summary: Summary }) {
  const items = [
    { label: "Projects scored", value: summary.total_projects.toLocaleString("en-IN"), accent: "#16202B" },
    { label: "High risk", value: summary.high_risk.toLocaleString("en-IN"), accent: "#B3261E" },
    { label: "Medium risk", value: summary.medium_risk.toLocaleString("en-IN"), accent: "#8A6A12" },
    { label: "Low risk", value: summary.low_risk.toLocaleString("en-IN"), accent: "#2F6B3A" },
  ];

  return (
    <div className="hairline rounded bg-surface dark:bg-[#141D26] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-line dark:divide-[#2A3742]">
      {items.map((item) => (
        <div key={item.label} className="flex-1 px-6 py-5">
          <div
            className="font-serif text-3xl font-semibold leading-none"
            style={{ color: item.accent }}
          >
            {item.value}
          </div>
          <div className="text-xs text-ink/60 dark:text-[#B9BEB2] mt-2">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
