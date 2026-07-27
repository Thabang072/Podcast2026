import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

function AudioPlayer({ currentEpisode }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.load();

      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error(err));
    }
  }, [currentEpisode]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }

  function formatTime(time) {
    if (isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="audio-player">
      <h3 className="audio-title">
        {currentEpisode.title}
      </h3>

      <audio ref={audioRef}>
        <source src={currentEpisode.audio} type="audio/mpeg" />
      </audio>

      <div className="controls">
        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      <div className="progress">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          readOnly
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default AudioPlayer;