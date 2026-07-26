import "./PodcastCard.css";

function PodcastCard({ show }) {
  return (
    <div className="podcast-card">
      <img
        src={show.image}
        alt={show.title}
      />

      <h3>{show.title}</h3>

      <p>{show.seasons} Seasons</p>
    </div>
  );
}

export default PodcastCard;