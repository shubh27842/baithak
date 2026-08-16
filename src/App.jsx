import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { AudioPlayer } from "./components/AudioPlayer";
import { Tagline } from "./components/Tagline";

export default function App() {
  const bgImage = new URL("./assets/background.webp", import.meta.url).href;
  return (
    <div className="relative w-screen h-dvh overflow-hidden font-sans select-none hero-bg">
      {/* <img
        src={bgImage}
        alt="Background"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover filter brightness-95 saturate-105 pointer-events-none z-0"
      /> */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-amber-950/30 to-black/40 backdrop-brightness-90"></div>
      <div className="relative z-10 flex flex-col justify-between h-full">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center px-4">
          <div className="space-y-2 animate-fade-in ">
            <h1 className="mb-10 text-5xl md:text-8xl font-hindi text-amber-400 tracking-wider drop-shadow-[0_5px_15px_rgba(245,158,11,0.4)]">
              बैठक
            </h1>

            <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-amber-200/90 drop-shadow-md">
              <span className="text-amber-500">•</span> Playlist{" "}
              <span className="text-amber-500">•</span>
            </p>
          </div>
        </div>
        <div className="p-6">
          <Tagline />
          <AudioPlayer />
        </div>
      </div>
      <Analytics />
    </div>
  );
}
