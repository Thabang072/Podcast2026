import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

function AudioPlayer() {
  const audioRef = useRef(null);

  // Temporary sample audio
  const audioSrc =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const loadMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loadMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loadMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioSrc} />

      <h3 className="audio-title">🎵 Sample Podcast Episode</h3>

      <div className="controls">
        <button
          onClick={() => {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
          }}
        >
          ⏮
        </button>

        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={() => {
            audioRef.current.currentTime = Math.min(
              audioRef.current.currentTime + 10,
              duration
            );
          }}
        >
          ⏭
        </button>
      </div>

      <div className="progress">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            const value = Number(e.target.value);
            audioRef.current.currentTime = value;
            setCurrentTime(value);
          }}
        />

        <span>{formatTime(duration)}</span>
      </div>

      <div className="volume-container">
        <span>🔊</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => {
            const newVolume = Number(e.target.value);
            setVolume(newVolume);
            audioRef.current.volume = newVolume;
          }}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;