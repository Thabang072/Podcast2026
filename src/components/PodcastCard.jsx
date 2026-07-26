import { Link } from "react-router-dom";
import "./PodcastCard.css";

function PodcastCard({ show }) {
  return (
    <Link
      to={`/show/${show.id}`}
      className="podcast-link"
    >
      <div className="podcast-card">
        <img src={show.image} alt={show.title} />

        <h3>{show.title}</h3>

        <p>{show.seasons} Seasons</p>
      </div>
    </Link>
  );
}

export default PodcastCard;