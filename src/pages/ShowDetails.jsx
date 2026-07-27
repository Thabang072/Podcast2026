import { useState } from "react";

import podcasts from "../data/podcasts";

import SeasonCard from "../components/SeasonCard";
import EpisodeCard from "../components/EpisodeCard";

import "./ShowDetails.css";

function ShowDetails({
  setCurrentEpisode,
  favorites,
  handleFavorite,
}) {
  const show = podcasts[0];

  const [selectedSeason, setSelectedSeason] = useState(null);

  return (
    <main className="show-details">
      <img
        src={show.image}
        alt={show.title}
        className="show-image"
      />

      <h1>{show.title}</h1>

      <p>{show.description}</p>

      <h2>Seasons</h2>

      <div className="season-list">
        {show.seasons.map((season) => (
          <SeasonCard
            key={season.id}
            season={season}
            onSelectSeason={setSelectedSeason}
          />
        ))}
      </div>

      {selectedSeason && (
        <>
          <h2>{selectedSeason.title}</h2>

          <div className="episode-list">
            {selectedSeason.episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onPlay={setCurrentEpisode}
                onFavorite={handleFavorite}
                isFavorite={favorites.some(
                  (item) => item.id === episode.id
                )}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default ShowDetails;