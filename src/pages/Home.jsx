import { useEffect, useMemo, useState } from "react";

import PodcastCard from "../components/PodcastCard";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";

import { SHOWS_URL } from "../services/api";

import "./Home.css";

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("az");

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(SHOWS_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }

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

  const filteredAndSortedShows = useMemo(() => {
    const filtered = shows.filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "az":
          return a.title.localeCompare(b.title);

        case "za":
          return b.title.localeCompare(a.title);

        case "newest":
          return new Date(b.updated) - new Date(a.updated);

        case "oldest":
          return new Date(a.updated) - new Date(b.updated);

        default:
          return 0;
      }
    });
  }, [shows, searchTerm, sortOption]);

  if (loading) {
    return <h2>Loading Podcasts...</h2>;
  }

  return (
    <main className="home">
      <section className="hero">
        <h1>Discover Your Next Favorite Podcast</h1>

        <p>
          Browse thousands of podcasts from different genres and start
          listening today.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <SortDropdown
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </section>

      <section className="podcast-grid">
        {filteredAndSortedShows.length > 0 ? (
          filteredAndSortedShows.map((show) => (
            <PodcastCard
              key={show.id}
              show={show}
            />
          ))
        ) : (
          <h2>No podcasts found.</h2>
        )}
      </section>
    </main>
  );
}

export default Home;