import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PodcastCard from "../components/PodcastCard";
import { SHOWS_URL } from "../services/api";
import "./Home.css";

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(SHOWS_URL);
        const data = await response.json();

        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  if (loading) {
    return <h2>Loading podcasts...</h2>;
  }

  return (
    <main className="home">
      <section className="hero">
        <h1>Discover Your Next Favorite Podcast</h1>
        <p>
          Browse thousands of podcasts from different genres and start
          listening today.
        </p>

        <SearchBar />
      </section>

      <section className="podcast-grid">
        {shows.map((show) => (
          <PodcastCard key={show.id} show={show} />
        ))}
      </section>
    </main>
  );
}

export default Home;