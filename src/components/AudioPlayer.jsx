import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [playerReady, setPlayerReady] = useState(false);
  const [currentTrackTitle, setCurrentTrackTitle] = useState(
    "Baithak Beats Loaded",
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);
  const progressInterval = useRef(null);
  const PLAYLIST_ID = process.env.PLAYLIST_ID;

  useEffect(() => {
    let isMounted = true;

    // Function to initialize player immediately if YT is ready
    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player("youtube-audio-player", {
          height: "0",
          width: "0",
          playerVars: {
            listType: "playlist",
            list: PLAYLIST_ID,
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event) => {
              if (isMounted) {
                setPlayerReady(true);
                event.target.setVolume(volume);
                updateTrackInfo(event.target);
                event.target.playVideo();
                startProgressTimer();
              }
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                updateTrackInfo(playerRef.current);
                startProgressTimer();
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                stopProgressTimer();
              }
            },
          },
        });
      }
    };
    // Defer YouTube script loading slightly so the browser paints text first (improves FCP)
    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = initPlayer;
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const startProgressTimer = () => {
    stopProgressTimer();
    progressInterval.current = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.getCurrentTime === "function"
      ) {
        setCurrentTime(playerRef.current.getCurrentTime() || 0);
        setDuration(playerRef.current.getDuration() || 0);
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const updateTrackInfo = (player) => {
    if (player && typeof player.getVideoData === "function") {
      const data = player.getVideoData();
      if (data && data.title) {
        setCurrentTrackTitle(data.title);
      }
      setDuration(player.getDuration() || 0);
    }
  };

  const togglePlay = () => {
    if (!playerReady || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (playerReady && playerRef.current) {
      playerRef.current.nextVideo();
      setTimeout(() => updateTrackInfo(playerRef.current), 400);
    }
  };

  const handlePrev = () => {
    if (playerReady && playerRef.current) {
      playerRef.current.previousVideo();
      setTimeout(() => updateTrackInfo(playerRef.current), 400);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = e.target.value;
    setVolume(newVol);
    if (playerReady && playerRef.current) {
      playerRef.current.setVolume(newVol);
    }
  };

  const handleSeek = (e) => {
    const seekToTime = parseFloat(e.target.value);
    setCurrentTime(seekToTime);
    if (playerReady && playerRef.current) {
      playerRef.current.seekTo(seekToTime, true);
    }
  };

  // Format seconds into MM:SS format
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="backdrop-blur-md bg-transparent border border-amber-700/30 rounded-2xl p-4 shadow-2xl text-amber-100 w-full max-w-md mx-auto flex flex-col gap-3">
      {/* Hidden YouTube IFrame Target */}
      <div id="youtube-audio-player" className="hidden"></div>

      <div className="flex items-center justify-between">
        <div className="overflow-hidden pr-2">
          <p className="text-sm font-semibold text-amber-200 truncate">
            {currentTrackTitle}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            aria-label="Play Pause Button"
            onClick={togglePlay}
            disabled={!playerReady}
            className="p-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 rounded-full transition text-white shadow-lg cursor-pointer">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
      </div>
      {/* // removed progress bar */}
      {/* <div className="flex flex-col gap-1 w-full">
        <input 
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          disabled={!playerReady}
          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-amber-900/80 rounded-lg disabled:opacity-50"
        />
        <div className="flex justify-between text-[10px] text-amber-300/70 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div> */}

      <div className="flex items-center justify-between  text-amber-300">
        <div className="flex items-center gap-4">
          <button
            aria-label="previous"
            onClick={handlePrev}
            className="hover:text-white transition cursor-pointer"
            title="Previous Track">
            <SkipBack size={18} />
          </button>
          <button
            aria-label="next"
            onClick={handleNext}
            className="hover:text-white transition cursor-pointer"
            title="Next Track">
            <SkipForward size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-amber-400" />
          <input
            aria-label="volume bar"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-amber-500 cursor-pointer h-1 bg-amber-900 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
