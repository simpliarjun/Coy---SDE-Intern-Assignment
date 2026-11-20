"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import { BottomNav, TabType } from "@/components/BottomNav";
import { DiscoverTab } from "@/components/DiscoverTab";
import { HomeTab } from "@/components/HomeTab";
import { MatchModal } from "@/components/MatchModal";
import { Profile } from "@/lib/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("discover");
  const [discoverSubView, setDiscoverSubView] = useState<"deck" | "matches">("deck");
  const [matches, setMatches] = useState<Profile[]>([]);
  const [celebrationMatch, setCelebrationMatch] = useState<Profile | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch("/api/matches");
      const data = await res.json();
      if (data.matches) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error("Failed to fetch matches:", err);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleMatchFound = (profile: Profile) => {
    setCelebrationMatch(profile);
    fetchMatches();
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === "discover") {
      setDiscoverSubView("deck");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="flex-1 flex flex-col justify-between h-full min-h-0 max-h-full overflow-hidden bg-white">
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === "home" && (
            <HomeTab
              onGoToDiscover={() => {
                setActiveTab("discover");
                setDiscoverSubView("deck");
              }}
            />
          )}

          {activeTab === "discover" && (
            <DiscoverTab
              matches={matches}
              currentSubView={discoverSubView}
              onSubViewChange={setDiscoverSubView}
              onMatchFound={handleMatchFound}
              onRefreshMatches={fetchMatches}
            />
          )}
        </div>

        
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

        
        <MatchModal
          matchedProfile={celebrationMatch}
          onClose={() => setCelebrationMatch(null)}
          onViewMatches={() => {
            setCelebrationMatch(null);
            setActiveTab("discover");
            setDiscoverSubView("matches");
          }}
        />
      </main>
    </MotionConfig>
  );
}
