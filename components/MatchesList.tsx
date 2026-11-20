"use client";

import React from "react";
import { Profile } from "@/lib/types";
import { MessageCircle, Heart, GraduationCap, Sparkles, Compass } from "lucide-react";

interface MatchesListProps {
  matches: Profile[];
  onGoToDiscover: () => void;
}

export const MatchesList: React.FC<MatchesListProps> = ({ matches, onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-5 overflow-y-auto no-scrollbar bg-white select-none">
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <button
            onClick={onGoToDiscover}
            className="inline-flex items-center space-x-1 text-xs font-bold text-coy-pink hover:text-coy-pink-hover mb-1 transition-colors active:scale-95 py-2 px-1 rounded-lg focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none min-h-[44px]"
            aria-label="Back to Discover Deck"
          >
            <span>← Back to Discover</span>
          </button>
          <h1 className="font-sans font-black text-2xl sm:text-3xl text-coy-dark tracking-tight">
            Matches
          </h1>
          <p className="text-xs text-coy-muted mt-0.5 font-medium">
            Mutual connections who like you back
          </p>
        </div>
        <span className="bg-[#F4F2F8] text-[#5B5568] text-xs font-semibold px-2.5 py-1 rounded-full tabular-nums tracking-tight">
          {matches.length} {matches.length === 1 ? "match" : "matches"}
        </span>
      </div>

      
      {matches.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
          <div className="w-16 h-16 rounded-full bg-coy-peach border-2 border-coy-dark shadow-[2px_2px_0px_#15121D] flex items-center justify-center text-coy-pink mb-4">
            <Heart className="w-7 h-7 fill-coy-pink" />
          </div>
          <h3 className="font-sans font-black text-xl text-coy-dark mb-1">
            No matches yet
          </h3>
          <p className="text-xs text-coy-muted max-w-xs mb-6 leading-relaxed font-medium">
            When you and someone both like each other, your mutual match appears here. No one ever knows unless it is mutual.
          </p>
          <button
            onClick={onGoToDiscover}
            className="btn-coy-primary text-white font-bold text-xs px-5 py-3.5 rounded-full flex items-center space-x-2 shadow-[2.5px_2.5px_0px_#15121D] active:scale-95 transition-transform min-h-[44px] focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
            data-impeccable-ignore="hard-offset-shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Profiles</span>
          </button>
        </div>
      ) : (
        
        <div className="space-y-3 pb-4">
          <div className="space-y-2.5">
            {matches.map((profile) => (
              <div
                key={profile.id}
                className="bg-white border-2 border-coy-dark shadow-[2.5px_2.5px_0px_#15121D] rounded-2xl p-3 flex items-center space-x-3 transition-transform"
              >
                
                
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-coy-dark flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-1.5">
                    <h4 className="font-sans font-black text-sm sm:text-base text-coy-dark truncate">
                      {profile.name}
                    </h4>
                    <span className="text-xs font-semibold text-coy-muted">
                      {profile.age}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-coy-muted mt-0.5 truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-coy-pink flex-shrink-0" />
                    <span className="truncate">{profile.college}</span>
                  </div>

                  <p className="text-xs text-coy-dark truncate mt-1 italic font-medium">
                    &ldquo;{profile.bio}&rdquo;
                  </p>
                </div>

                
                <div className="flex flex-col items-end space-y-1.5 flex-shrink-0">
                  <span className="bg-coy-pink text-white font-black text-xs px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-xs">
                    <span>Match</span>
                    <span>🎉</span>
                  </span>

                  <button
                    onClick={() => alert(`Starting conversation with ${profile.name}! Contact shared mutually.`)}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#F4F2F8] hover:bg-coy-pink hover:text-white text-coy-dark transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
                    aria-label={`Chat with ${profile.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <div className="pt-4 flex flex-col items-center space-y-3">
            <button
              onClick={onGoToDiscover}
              className="btn-coy-primary text-white font-bold text-xs px-5 py-3 rounded-full flex items-center space-x-1.5 shadow-[2px_2px_0px_#15121D] active:scale-95 transition-transform min-h-[44px] focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
              data-impeccable-ignore="hard-offset-shadow"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Back to Discover Deck</span>
            </button>

            <div className="bg-[#F4F2F8] text-[#5B5568] px-3.5 py-1.5 rounded-full text-xs font-medium text-center">
              <span>🤫 Non-matches never find out. Mutual likes only.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
