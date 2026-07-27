function EpisodeCard({ episode, onPlay }) {
  return (
    <div className="episode-card">
      <h3>{episode.title}</h3>

      <p>{episode.description}</p>

      <button onClick={() => onPlay(episode)}>
        ▶ Play Episode
      </button>
    </div>
  );
}

export default EpisodeCard;