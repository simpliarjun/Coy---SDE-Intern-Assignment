"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Profile } from "@/lib/types";
import { Heart, MessageCircle, X } from "lucide-react";

interface MatchModalProps {
  matchedProfile: Profile | null;
  onClose: () => void;
  onViewMatches: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedProfile,
  onClose,
  onViewMatches,
}) => {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (matchedProfile) {
      window.addEventListener("keydown", handleKeyDown);
      const timer = setTimeout(() => {
        primaryButtonRef.current?.focus();
      }, 50);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [matchedProfile, handleKeyDown]);

  if (!matchedProfile) return null;

  const userInitial = "J";
  const matchInitial = matchedProfile.name.charAt(0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          data-impeccable-ignore="hard-offset-shadow"
          className="bg-white w-full max-w-sm rounded-3xl p-6 text-center border-2 border-coy-dark shadow-[4px_4px_0px_#15121D] flex flex-col items-center relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#F4F2F8] hover:bg-[#EAE6F2] text-coy-dark transition-colors focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none active:scale-95"
            aria-label="Close match modal"
          >
            <X className="w-4 h-4" />
          </button>

          
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-coy-peach/60 to-transparent pointer-events-none" />

          
          <div className="relative w-48 h-24 flex items-center justify-center mt-2 mb-2">
            
            <motion.div
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: -12, opacity: 1 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 280, damping: 20 }}
              className="w-18 h-18 rounded-full bg-coy-peach border-2 border-coy-dark shadow-[2px_2px_0px_#15121D] flex items-center justify-center text-coy-dark font-sans font-black text-xl z-10"
            >
              {userInitial}
            </motion.div>

            
            <motion.div
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 12, opacity: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 20 }}
              className="w-18 h-18 rounded-full bg-coy-lavender border-2 border-coy-dark shadow-[2px_2px_0px_#15121D] flex items-center justify-center text-coy-dark font-sans font-black text-xl z-10"
            >
              {matchInitial}
            </motion.div>

            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.22, type: "spring", stiffness: 450, damping: 14 }}
              className="absolute w-7 h-7 rounded-full bg-coy-pink border-2 border-coy-dark shadow-xs flex items-center justify-center text-white z-20"
            >
              <Heart className="w-3.5 h-3.5 fill-white translate-y-[-0.5px]" />
            </motion.div>
          </div>

          
          <h2
            id="match-modal-title"
            className="font-sans font-black text-3xl text-coy-dark tracking-tight mb-1"
          >
            It&apos;s a match!
          </h2>

          <p className="text-sm font-semibold text-coy-dark mb-1">
            You and {matchedProfile.name} added each other.
          </p>

          <p className="text-xs text-coy-muted mb-4 leading-relaxed font-medium">
            ...so it&apos;s a match. You both see it at the exact same moment.
          </p>

          
          <div className="w-full bg-[#F4F2F8] border-2 border-coy-dark p-3 rounded-2xl flex items-center space-x-3 mb-5 text-left shadow-[2px_2px_0px_#15121D]">
            
            <img
              src={matchedProfile.avatar}
              alt={matchedProfile.name}
              className="w-12 h-12 rounded-lg object-cover border-2 border-coy-dark flex-shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="font-sans font-extrabold text-sm text-coy-dark truncate">
                {matchedProfile.name}, {matchedProfile.age}
              </h4>
              <p className="text-xs text-coy-muted truncate">{matchedProfile.college}</p>
            </div>
          </div>

          
          <div className="w-full space-y-2.5">
            <button
              ref={primaryButtonRef}
              onClick={onViewMatches}
              className="w-full min-h-[44px] btn-coy-primary text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-[2.5px_2.5px_0px_#15121D] active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none"
            >
              <MessageCircle className="w-4 h-4" />
              <span>View in Matches</span>
            </button>

            <button
              onClick={onClose}
              className="w-full min-h-[44px] py-2.5 text-xs font-bold text-coy-muted hover:text-coy-dark transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:outline-none active:scale-95"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
