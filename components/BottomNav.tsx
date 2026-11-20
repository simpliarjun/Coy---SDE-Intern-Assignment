"use client";

import React from "react";
import { Compass, Flame } from "lucide-react";

export type TabType = "home" | "discover";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="bg-white border-t-2 border-coy-dark flex items-center justify-around px-8 z-40 select-none flex-shrink-0 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      
      <button
        onClick={() => onTabChange("home")}
        className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none ${
          activeTab === "home" ? "text-coy-pink" : "text-coy-muted hover:text-coy-dark"
        }`}
        aria-label="Home"
      >
        <Flame className={`w-5 h-5 stroke-[2.2] ${activeTab === "home" ? "fill-coy-pink/20" : ""}`} />
        <span className="text-xs font-bold mt-0.5">Home</span>
      </button>

      
      <button
        onClick={() => onTabChange("discover")}
        className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none ${
          activeTab === "discover" ? "text-coy-pink" : "text-coy-muted hover:text-coy-dark"
        }`}
        aria-label="Discover"
      >
        <Compass className={`w-5 h-5 stroke-[2.2] ${activeTab === "discover" ? "fill-coy-pink/20" : ""}`} />
        <span className="text-xs font-bold mt-0.5">Discover</span>
      </button>
    </nav>
  );
};
