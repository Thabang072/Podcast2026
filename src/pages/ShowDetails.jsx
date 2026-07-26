import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowURL } from "../services/api";
import "./ShowDetails.css";

function ShowDetails() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(getShowURL(id));

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Podcast Data:", data);

        setShow(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) {
    return <h2>Loading podcast...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!show) {
    return <h2>Podcast not found.</h2>;
  }

  return (
    <main className="show-details">
      <img
        src={show.image}
        alt={show.title}
        className="show-image"
      />

      <div className="show-info">
        <h1>{show.title}</h1>

        <p>{show.description}</p>

        <p>
          <strong>Seasons:</strong>{" "}
          {show.seasons ? show.seasons.length : 0}
        </p>

        <h2>Seasons</h2>

        {show.seasons?.map((season, index) => (
          <div key={index} className="season-card">
            <img
              src={season.image}
              alt={season.title}
              className="season-image"
            />

            <h3>{season.title}</h3>

            <p>Episodes: {season.episodes.length}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ShowDetails;