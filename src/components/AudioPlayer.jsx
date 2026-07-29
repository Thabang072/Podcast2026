import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

function AudioPlayer({ currentEpisode }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !currentEpisode) return;

    setCurrentTime(0);

    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error(err));
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

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  function rewind() {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0
    );

    setCurrentTime(audioRef.current.currentTime);
  }

  function forward() {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      duration
    );

    setCurrentTime(audioRef.current.currentTime);
  }

  function formatTime(time) {
    if (isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (!currentEpisode) {
    return (
      <div className="audio-player">
        <p>Select an episode to play.</p>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <h3>{currentEpisode.title}</h3>

      <audio ref={audioRef}>
        <source src={currentEpisode.audio} type="audio/mpeg" />
      </audio>

      <div className="controls">
        <button onClick={rewind}>⏪ 10s</button>

        <button onClick={togglePlay}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button onClick={forward}>10s ⏩</button>
      </div>

      <div className="progress">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            const time = Number(e.target.value);
            audioRef.current.currentTime = time;
            setCurrentTime(time);
          }}
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default AudioPlayer;