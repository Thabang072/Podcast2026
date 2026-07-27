import "./EpisodeCard.css";

function EpisodeCard({
  episode,
  onPlay,
  onFavorite,
  isFavorite,
}) {
  return (
    <div className="episode-card">
      <div className="episode-info">
        <h3>{episode.title}</h3>

        <p>{episode.description}</p>
      </div>

      <div className="episode-actions">
        <button
          className="play-btn"
          onClick={() => onPlay(episode)}
        >
          ▶ Play
        </button>

        <button
          className="favorite-btn"
          onClick={() => onFavorite(episode)}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default EpisodeCard;