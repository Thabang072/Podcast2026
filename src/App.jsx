import { useState } from "react";
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
            />
          }
        />

        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <AudioPlayer currentEpisode={currentEpisode} />

      <Footer />
    </>
  );
}

export default App;