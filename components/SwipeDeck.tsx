"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import { Profile } from "@/lib/types";
import { ProfileCard } from "./ProfileCard";
import { EmptyDeckState } from "./EmptyDeckState";
import { X, Heart, ShieldCheck, AlertCircle, RotateCcw } from "lucide-react";

interface SwipeDeckProps {
  onMatchFound: (profile: Profile) => void;
  onRefreshMatches: () => void;
  isResetting?: boolean;
  onReset?: () => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  onMatchFound,
  onRefreshMatches,
  isResetting = false,
  onReset,
}) => {
  const [deck, setDeck] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeError, setSwipeError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const fetchFeed = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      setSwipeError(null);
      const res = await fetch("/api/feed");
      if (!res.ok) throw new Error("Feed request failed");
      const data = await res.json();
      if (data.profiles) {
        setDeck(data.profiles);
      }
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleSwipe = useCallback(
    async (direction: "like" | "pass") => {
      if (deck.length === 0 || isSwiping) return;

      const currentCard = deck[0];
      setIsSwiping(true);
      setSwipeError(null);
      setDeck((prev) => prev.slice(1));

      setAnnouncement(
        direction === "like"
          ? `Liked ${currentCard.name}`
          : `Passed on ${currentCard.name}`
      );

      try {
        const res = await fetch("/api/swipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetId: currentCard.id,
            direction,
          }),
        });

        if (res.status === 409) {
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to record decision");
        }

        const data = await res.json();

        if (data.matched && data.match) {
          setAnnouncement(`It is a match with ${currentCard.name}!`);
          onMatchFound(data.match);
          onRefreshMatches();
        }
      } catch (err) {
        console.error("Failed to record swipe:", err);
        setDeck((prev) => [currentCard, ...prev]);
        setSwipeError("Connection dropped. Please retry.");
      } finally {
        setIsSwiping(false);
      }
    },
    [deck, isSwiping, onMatchFound, onRefreshMatches]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (deck.length === 0 || isLoading || isSwiping) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe("pass");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe("like");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deck, isLoading, isSwiping, handleSwipe]);

  const handleResetInternal = async () => {
    if (onReset) {
      onReset();
    } else {
      try {
        await fetch("/api/reset", { method: "POST" });
        await fetchFeed();
        onRefreshMatches();
      } catch (err) {
        console.error("Failed to reset:", err);
      }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none">
        
        <div className="flex-1 relative flex items-center justify-center my-1 w-full max-w-[390px] mx-auto min-h-0">
          {isLoading ? (
            
            <div className="w-full h-full max-h-[520px] bg-white rounded-3xl border-2 border-coy-dark shadow-[3px_3px_0px_#15121D] overflow-hidden flex flex-col animate-pulse">
              <div className="h-56 bg-gray-100 border-b-2 border-coy-dark flex items-center justify-center">
                <div className="w-36 h-36 rounded-2xl bg-gray-200" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded-md w-3/5" />
                  <div className="h-4 bg-gray-100 rounded-md w-2/5" />
                  <div className="h-12 bg-gray-100 rounded-lg w-full mt-2" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-100 rounded-lg w-16" />
                  <div className="h-6 bg-gray-100 rounded-lg w-20" />
                </div>
              </div>
            </div>
          ) : hasError ? (
            
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-coy-dark flex items-center justify-center text-red-500 shadow-[2px_2px_0px_#15121D]">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="font-sans font-black text-xl text-coy-dark">Unable to load feed</h3>
              <p className="text-xs text-coy-muted max-w-xs leading-relaxed">
                Could not connect to the campus deck. Please try again.
              </p>
              <button
                onClick={fetchFeed}
                className="btn-coy-primary text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center space-x-1.5 shadow-[2px_2px_0px_#15121D] active:scale-[0.96]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : deck.length === 0 ? (
            
            <EmptyDeckState onReset={handleResetInternal} isResetting={isResetting} />
          ) : (
            
            <div className="relative w-full h-full max-h-[460px] sm:max-h-[475px]">
              
              {deck.length > 1 && (
                <ProfileCard
                  key={deck[1].id}
                  profile={deck[1]}
                  isFront={false}
                  onSwipe={handleSwipe}
                  isSwiping={isSwiping}
                />
              )}

              
              <ProfileCard
                key={deck[0].id}
                profile={deck[0]}
                isFront={true}
                onSwipe={handleSwipe}
                isSwiping={isSwiping}
              />
            </div>
          )}
        </div>

        
        {swipeError && (
          <div className="mx-auto my-1 px-3 py-1 bg-red-50 border border-red-200 text-red-600 text-xs rounded-full flex items-center space-x-1.5 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{swipeError}</span>
          </div>
        )}

        
        {deck.length > 0 && !isLoading && !hasError && (
          <div className="flex flex-col items-center justify-center py-2 z-30 space-y-1 flex-shrink-0">
            <div className="flex items-center justify-center space-x-7 sm:space-x-8">
              
              <button
                onClick={() => handleSwipe("pass")}
                disabled={isSwiping}
                data-impeccable-ignore="hard-offset-shadow"
                className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-white border-2 border-coy-dark shadow-[2.5px_2.5px_0px_#15121D] active:scale-95 focus-visible:ring-2 focus-visible:ring-coy-dark focus-visible:outline-none flex items-center justify-center text-coy-dark hover:text-red-600 transition-all disabled:opacity-50"
                aria-label="Pass"
                title="Pass (Left Arrow)"
              >
                <X className="w-6 h-6 stroke-[3]" />
              </button>

              
              <div className="flex items-center space-x-1 text-xs text-coy-muted font-bold select-none">
                <ShieldCheck className="w-3.5 h-3.5 text-coy-pink" />
                <span>Private</span>
              </div>

              
              <button
                onClick={() => handleSwipe("like")}
                disabled={isSwiping}
                data-impeccable-ignore="hard-offset-shadow"
                className="w-16 h-16 min-w-[64px] min-h-[64px] rounded-full bg-coy-pink border-2 border-coy-dark shadow-[3px_3px_0px_#15121D] active:scale-95 focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none flex items-center justify-center text-white hover:bg-coy-pink-hover transition-all disabled:opacity-50"
                aria-label="Like"
                title="Like (Right Arrow)"
              >
                <Heart className="w-7 h-7 stroke-[2.5] fill-white translate-y-[-1px]" />
              </button>
            </div>

            
            <div
              className="hidden sm:flex items-center justify-center gap-2 text-xs font-semibold text-[#524C61] select-none pt-1 pb-0.5"
              aria-label="Keyboard shortcuts: Left arrow to pass, Right arrow to like"
            >
              <span className="inline-flex items-center gap-1">
                <kbd className="inline-flex items-center justify-center w-5 h-5 bg-[#F4F2F8] border border-coy-dark/30 rounded shadow-[1px_1px_0px_#15121D] text-[11px] font-black text-coy-dark">
                  ←
                </kbd>
                <span>Pass</span>
              </span>
              <span className="text-coy-muted/40 font-bold">•</span>
              <span className="inline-flex items-center gap-1">
                <span>Like</span>
                <kbd className="inline-flex items-center justify-center w-5 h-5 bg-[#F4F2F8] border border-coy-dark/30 rounded shadow-[1px_1px_0px_#15121D] text-[11px] font-black text-coy-dark">
                  →
                </kbd>
              </span>
            </div>
          </div>
        )}

        
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>
    </MotionConfig>
  );
};
