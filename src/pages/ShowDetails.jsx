import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowURL } from "../services/api";
import "./ShowDetails.css";

function ShowDetails() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShow() {
      try {
        const response = await fetch(getShowURL(id));
        const data = await response.json();

        setShow(data);
      } catch (error) {
        console.error("Error fetching show:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShow();
  }, [id]);

  if (loading) {
    return <h2>Loading podcast...</h2>;
  }

  if (!show) {
    return <h2>Podcast not found.</h2>;
  }

  return (
    <main className="show-details">
      <img
        src={show.image}
        alt={show.title}
        width="300"
      />

      <h1>{show.title}</h1>

      <p>{show.description}</p>

      <p>
        <strong>Seasons:</strong> {show.seasons.length}
      </p>
    </main>
  );
}

export default ShowDetails;