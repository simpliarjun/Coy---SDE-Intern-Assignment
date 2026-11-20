"use client";

import React, { useState } from "react";
import { Profile, PublicProfile } from "@/lib/types";
import { SwipeDeck } from "./SwipeDeck";
import { MatchesList } from "./MatchesList";
import { Heart, RotateCcw, Compass } from "lucide-react";

interface DiscoverTabProps {
  matches: PublicProfile[];
  currentSubView: "deck" | "matches";
  onSubViewChange: (view: "deck" | "matches") => void;
  onMatchFound: (profile: PublicProfile) => void;
  onRefreshMatches: () => void;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({
  matches,
  currentSubView,
  onSubViewChange,
  onMatchFound,
  onRefreshMatches,
}) => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = async () => {
    try {
      setIsResetting(true);
      await fetch("/api/reset", { method: "POST" });
      setResetKey((prev) => prev + 1);
      onRefreshMatches();
    } catch (err) {
      console.error("Failed to reset:", err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-4 relative overflow-hidden select-none bg-white">
      
      <div className="flex items-center justify-between px-1 pt-1 pb-3 z-30 flex-shrink-0">
        
        <div className="flex items-center space-x-1">
          <span className="font-sans font-black text-2xl text-coy-dark tracking-tighter">
            coy
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-coy-pink mt-1.5" />
        </div>

        
        <div className="inline-flex items-center bg-[#F4F2F8] p-1 rounded-full">
          <button
            onClick={() => onSubViewChange("deck")}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-transform flex items-center space-x-1.5 active:translate-x-[1px] active:translate-y-[1px] focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none ${
              currentSubView === "deck"
                ? "bg-white text-coy-dark shadow-[1.5px_1.5px_0px_#15121D] border border-coy-dark"
                : "text-[#5B5568] hover:text-coy-dark"
            }`}
            aria-label="Discover"
          >
            <Compass className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => onSubViewChange("matches")}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold transition-transform flex items-center space-x-1.5 relative active:translate-x-[1px] active:translate-y-[1px] focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none ${
              currentSubView === "matches"
                ? "bg-white text-coy-dark shadow-[1.5px_1.5px_0px_#15121D] border border-coy-dark"
                : "text-[#5B5568] hover:text-coy-dark"
            }`}
            aria-label="Matches"
          >
            <Heart
              className={`w-3.5 h-3.5 stroke-[2.2] ${
                currentSubView === "matches" ? "fill-coy-pink text-coy-pink" : ""
              }`}
            />
            <span>Matches</span>
            <span
              className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full tabular-nums ${
                matches.length > 0
                  ? "bg-coy-pink text-white font-black"
                  : "bg-white text-[#5B5568]"
              }`}
            >
              {matches.length}
            </span>
          </button>
        </div>

        
        <div className="flex items-center space-x-1">
          <button
            onClick={handleReset}
            disabled={isResetting}
            title="Reset Demo"
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-coy-muted hover:text-coy-pink hover:bg-pink-50 transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
            aria-label="Reset deck"
          >
            <RotateCcw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      
      {currentSubView === "matches" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <MatchesList
            matches={matches}
            onGoToDiscover={() => onSubViewChange("deck")}
          />
        </div>
      ) : (
        <SwipeDeck
          key={resetKey}
          onMatchFound={onMatchFound}
          onRefreshMatches={onRefreshMatches}
          isResetting={isResetting}
          onReset={handleReset}
        />
      )}
    </div>
  );
};
