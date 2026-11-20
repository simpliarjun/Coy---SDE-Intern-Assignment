"use client";

import React from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Profile } from "@/lib/types";
import { GraduationCap } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  isFront: boolean;
  onSwipe: (direction: "like" | "pass") => void;
  isSwiping?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isFront,
  onSwipe,
  isSwiping = false,
}) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const likeOpacity = useTransform(x, [15, 70], [0, 1]);
  const passOpacity = useTransform(x, [-15, -70], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isSwiping) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 375;
    const distanceThreshold = isMobile ? 85 : 100;
    const velocityThreshold = 350;

    if (info.offset.x > distanceThreshold || info.velocity.x > velocityThreshold) {
      onSwipe("like");
    } else if (info.offset.x < -distanceThreshold || info.velocity.x < -velocityThreshold) {
      onSwipe("pass");
    }
  };

  if (!isFront) {
    return (
      <div
        className="absolute inset-0 bg-white rounded-3xl border-2 border-coy-dark shadow-[3px_3px_0px_#15121D] overflow-hidden pointer-events-none select-none flex flex-col"
        data-impeccable-ignore="hard-offset-shadow"
        style={{
          transform: "scale(0.96) translateY(8px)",
          opacity: 0.92,
        }}
        aria-hidden="true"
      >
        
        <div className="relative w-full h-40 sm:h-44 bg-gradient-to-b from-coy-lavender/30 to-coy-peach/20 flex items-center justify-center border-b-2 border-coy-dark flex-shrink-0 overflow-hidden">
          
          <img
            src={profile.avatar}
            alt=""
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-2xl border-2 border-coy-dark shadow-[2px_2px_0px_#15121D]"
            draggable={false}
          />
        </div>

        
        <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
          <div className="space-y-2">
            <div className="h-6 bg-gray-100 rounded-md w-3/5" />
            <div className="h-4 bg-gray-50 rounded-md w-2/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 bg-white rounded-3xl border-2 border-coy-dark shadow-[3.5px_3.5px_0px_#15121D] overflow-hidden flex flex-col select-none touch-none cursor-grab active:cursor-grabbing z-20"
      data-impeccable-ignore="hard-offset-shadow"
      style={{ x, rotate }}
      drag={isSwiping ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      
      <motion.div
        style={{ opacity: likeOpacity }}
        data-impeccable-ignore="hard-offset-shadow"
        className="absolute top-5 left-5 z-30 pointer-events-none border-[3px] border-coy-mint-text text-coy-mint-text px-3.5 py-1 rounded-xl font-black text-xl tracking-widest uppercase rotate-[-12deg] bg-coy-mint/95 shadow-[2px_2px_0px_#15121D]"
      >
        LIKE
      </motion.div>

      
      <motion.div
        style={{ opacity: passOpacity }}
        data-impeccable-ignore="hard-offset-shadow"
        className="absolute top-5 right-5 z-30 pointer-events-none border-[3px] border-coy-dark text-coy-dark px-3.5 py-1 rounded-xl font-black text-xl tracking-widest uppercase rotate-[12deg] bg-white/95 shadow-[2px_2px_0px_#15121D]"
      >
        PASS
      </motion.div>

      
      <div className="relative w-full h-40 sm:h-44 bg-gradient-to-b from-coy-lavender/30 to-coy-peach/20 flex items-center justify-center border-b-2 border-coy-dark flex-shrink-0 overflow-hidden">
        
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-2xl border-2 border-coy-dark shadow-[2px_2px_0px_#15121D]"
          draggable={false}
        />
      </div>

      
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between overflow-hidden">
        <div>
          
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="font-sans text-2xl font-extrabold tracking-tight text-coy-dark leading-tight">
              {profile.name}
            </h2>
            <span className="text-xl font-medium text-[#6B657A] tabular-nums shrink-0">
              {profile.age}
            </span>
          </div>

          
          <div className="flex items-center gap-1.5 text-sm font-medium text-[#524C61] mb-1.5 truncate">
            <GraduationCap className="w-3.5 h-3.5 text-coy-pink shrink-0" />
            <span className="truncate">{profile.college}</span>
          </div>

          
          <div className="mb-2">
            <span className="inline-flex items-center max-w-full rounded-lg bg-[#F4F2F8] px-2.5 py-1 text-xs font-semibold text-[#3B3549] leading-snug truncate">
              {profile.major}
            </span>
          </div>

          
          <p className="text-xs text-coy-dark leading-relaxed font-normal mb-2.5 line-clamp-3">
            {profile.bio}
          </p>

          
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-[#F4F2F8] text-coy-dark px-2.5 py-0.5 rounded-lg"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        
        <div className="pt-2 text-center flex-shrink-0">
          <span className="text-xs text-coy-muted font-medium">
            Swipe right to like • 100% private until mutual
          </span>
        </div>
      </div>
    </motion.div>
  );
};
