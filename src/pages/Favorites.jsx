import EpisodeCard from "../components/EpisodeCard";

function Favorites({
  favorites,
  setCurrentEpisode,
  handleFavorite,
}) {
  return (
    <main className="favorites-page">
      <h1>My Favorite Episodes</h1>

      {favorites.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        favorites.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            onPlay={setCurrentEpisode}
            onFavorite={handleFavorite}
            isFavorite={true}
          />
        ))
      )}
    </main>
  );
}

export default Favorites;