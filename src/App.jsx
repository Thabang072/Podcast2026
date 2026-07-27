import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";
import Favorites from "./pages/Favorites";

import "./App.css";

function App() {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  function handleFavorite(episode) {
    const exists = favorites.some(
      (item) => item.id === episode.id
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(
        (item) => item.id !== episode.id
      );
    } else {
      updatedFavorites = [...favorites, episode];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/show/:id"
          element={
            <ShowDetails
              setCurrentEpisode={setCurrentEpisode}
              favorites={favorites}
              handleFavorite={handleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              setCurrentEpisode={setCurrentEpisode}
              handleFavorite={handleFavorite}
            />
          }
        />
      </Routes>

      {currentEpisode && (
        <AudioPlayer currentEpisode={currentEpisode} />
      )}

      <Footer />
    </>
  );
}

export default App;