"use client";

import React from "react";
import { Compass, Settings } from "lucide-react";

interface HomeTabProps {
  onGoToDiscover: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-white select-none overflow-hidden">
      
      <div className="flex items-center justify-between px-2 pt-1 pb-3">
        <div className="flex items-center space-x-1">
          <span className="font-sans font-black text-2xl text-coy-dark tracking-tighter">
            coy
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-coy-pink mt-1.5" />
        </div>

        <button
          className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-coy-dark hover:text-coy-pink transition-colors focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none active:scale-95"
          aria-label="Settings"
          title="Settings"
        >
          <Settings className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-coy-peach border-2 border-coy-dark shadow-[2.5px_2.5px_0px_#15121D] flex items-center justify-center text-coy-pink mb-4">
          <Compass className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h2 className="font-sans font-black text-2xl text-coy-dark tracking-tight mb-2">
          Home
        </h2>

        <p className="text-xs text-coy-muted leading-relaxed mb-6 font-medium">
          This is a blank Home tab as required by the assignment specification. All mutual matching, profile discovery, and swipe mechanics are built in the Discover tab.
        </p>

        <button
          onClick={onGoToDiscover}
          data-impeccable-ignore="hard-offset-shadow"
          className="btn-coy-primary text-white font-bold text-xs px-5 py-3 min-h-[44px] rounded-full flex items-center space-x-2 shadow-[2.5px_2.5px_0px_#15121D] active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
        >
          <Compass className="w-4 h-4" />
          <span>Open Discover Deck</span>
        </button>
      </div>

      
      <div className="h-4" />
    </div>
  );
};
