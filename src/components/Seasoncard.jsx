function SeasonCard({ season, onSelectSeason }) {
  return (
    <div className="season-card">
      <h2>{season.title}</h2>

      <p>{season.episodes.length} Episodes</p>

      <button onClick={() => onSelectSeason(season)}>
        View Episodes
      </button>
    </div>
  );
}

export default SeasonCard;