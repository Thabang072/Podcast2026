import { useEffect, useState } from "react";

import PodcastCard from "../components/PodcastCard";
import SearchBar from "../components/SearchBar";

import { SHOWS_URL } from "../services/api";

import "./Home.css";

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(SHOWS_URL);
        const data = await response.json();

        setShows(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <h2>Loading podcasts...</h2>;
  }

  return (
    <main className="home">
      <section className="hero">
        <h1>Discover Your Next Favorite Podcast</h1>

        <p>
          Browse thousands of podcasts and start listening today.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </section>

      <section className="podcast-grid">
        {filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <PodcastCard key={show.id} show={show} />
          ))
        ) : (
          <h2>No podcasts found.</h2>
        )}
      </section>
    </main>
  );
}

export default Home;