"use client";

import { useState } from "react";
import { Map, Bell } from "lucide-react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "trends", label: "Regional & sector trends" },
  { id: "drivers", label: "Delay drivers" },
  { id: "register", label: "Project register" },
];

export function Sidebar() {
  const [comingSoon, setComingSoon] = useState<null | "gis" | "alerts">(null);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 hairline-t border-r border-line dark:border-[#2A3742] py-6 pr-4 sticky top-0 h-screen">
      <nav className="flex flex-col gap-0.5">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => goTo(s.id)}
            className="text-left text-sm px-3 py-2 rounded hover:bg-teal/10 transition-colors"
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 pt-4 hairline-t flex flex-col gap-0.5">
        <button
          onClick={() => setComingSoon("gis")}
          className="flex items-center gap-2 text-left text-sm px-3 py-2 rounded text-ink/60 dark:text-[#B9BEB2] hover:bg-teal/10 transition-colors"
        >
          <Map size={15} /> GIS map view
        </button>
        <button
          onClick={() => setComingSoon("alerts")}
          className="flex items-center gap-2 text-left text-sm px-3 py-2 rounded text-ink/60 dark:text-[#B9BEB2] hover:bg-teal/10 transition-colors"
        >
          <Bell size={15} /> Alerts & notifications
        </button>
      </div>

      {comingSoon && (
        <div className="mt-3 mx-3 text-xs hairline rounded p-3 bg-surface dark:bg-[#141D26]">
          {comingSoon === "gis"
            ? "Not built yet. Needs project latitude/longitude to plot on a map."
            : "Not built yet. Needs a connected SMS or email service to notify on new high-risk projects."}
        </div>
      )}
    </aside>
  );
}
