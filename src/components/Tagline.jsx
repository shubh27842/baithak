import React, { useState } from "react";
import { RotateCw, Sparkles } from "lucide-react";

const taglines = [
  {
    hindi: "चाय, gupshup & Retro Lofi",
    english: "Wahi purane dost • Endless playlist",
  },
  {
    hindi: "रात के 2 बजे, chai, aur purane geet...",
    english: "Wahi purane dost • Endless 2000s Vibe",
  },
  {
    hindi: "AUX kiske paas hai?",
    english: "Late-night tunes & endless chatter",
  },
  {
    hindi: "Raat gehri, geet purane, aur yaaron ka pehra",
    english: "Deep night, old songs, and good company",
  },
  {
    hindi: "Kamre ki roshni halki, aur playlist on",
    english: "Soft room lighting, and background music running",
  },
  {
    hindi: "Jahan har gaane ke saath ek purani yaad judi ho",
    english: "Where every song carries an old memory",
  },
  {
    hindi: "Wahi kamra, wahi dost, wahi purana sukoon",
    english: "Same room, same friends, same old peace",
  },
  {
    hindi: "Bina kisi agenda ke, bas doston ki mehfil",
    english: "No agenda, just a cozy gathering of friends",
  },
];

export const Tagline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleNextTagline = () => {
    setIsRotating(true);
    // Pick a random tagline index different from the current one
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * taglines.length);
    } while (nextIndex === currentIndex && taglines.length > 1);

    setCurrentIndex(nextIndex);

    // Reset rotation animation state after 400ms
    setTimeout(() => {
      setIsRotating(false);
    }, 400);
  };

  const current = taglines[currentIndex];

  return (
    <div className="flex flex-col items-center ">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-300">
        {/* <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span> */}

        <p className="text-sm md:text-base font-light text-amber-200 flex items-center gap-1.5 flex-wrap justify-center">
          <span className="font-hindi text-lg">{current.hindi}</span>
        </p>

        {/* Reload / Next Quote Button */}
        <button
          onClick={handleNextTagline}
          title="Change vibe / tagline"
          className="ml-2 p-1.5 rounded-xl bg-amber-900/60 hover:bg-amber-700/80 text-amber-300 hover:text-white transition shadow-inner cursor-pointer">
          <RotateCw
            size={14}
            className={`transition-transform duration-500 ${isRotating ? "rotate-180 scale-110" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};
