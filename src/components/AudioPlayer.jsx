import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

function AudioPlayer() {
  const audioRef = useRef(null);

  const audioSrc =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loadMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loadMetadata);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioSrc} />

      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <span>{formatTime(currentTime)}</span>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => {
          audioRef.current.currentTime = e.target.value;
          setCurrentTime(e.target.value);
        }}
      />

      <span>{formatTime(duration)}</span>
    </div>
  );
}

export default AudioPlayer;