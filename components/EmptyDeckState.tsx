"use client";

import React from "react";
import { Sparkles, RotateCcw, ShieldCheck } from "lucide-react";

export interface EmptyDeckStateProps {
  onReset: () => void;
  isResetting: boolean;
}

export const EmptyDeckState: React.FC<EmptyDeckStateProps> = ({ onReset, isResetting }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-auto select-none">
      
      <div className="w-18 h-18 rounded-3xl bg-coy-peach border-2 border-coy-dark flex items-center justify-center text-coy-pink mb-4 shadow-[2.5px_2.5px_0px_#15121D]">
        <Sparkles className="w-9 h-9" />
      </div>

      <h3 className="font-sans font-black text-2xl text-coy-dark mb-1 tracking-tight">
        You&apos;re all caught up!
      </h3>

      <p className="text-xs text-coy-muted max-w-xs mb-5 leading-relaxed font-medium">
        You have swiped through all profiles in the current Discover feed. No one will ever know who you passed or liked unless it is mutual.
      </p>

      
      <div className="bg-[#F4F2F8] px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs font-medium text-[#5B5568] mb-6">
        <ShieldCheck className="w-4 h-4 text-coy-pink flex-shrink-0" />
        <span>Zero like-leakage guaranteed</span>
      </div>

      
      <button
        onClick={onReset}
        disabled={isResetting}
        data-impeccable-ignore="hard-offset-shadow"
        className="btn-coy-primary text-white font-bold text-xs px-6 py-3.5 min-h-[44px] rounded-full flex items-center space-x-2 shadow-[2.5px_2.5px_0px_#15121D] active:scale-95 transition-transform disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
      >
        <RotateCcw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
        <span>{isResetting ? "Restoring Feed..." : "Reset Demo Deck"}</span>
      </button>

      <span className="text-xs text-coy-muted mt-2.5 font-medium">
        Restores the 32 seeded campus profiles & demo likes
      </span>
    </div>
  );
};
