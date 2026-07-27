import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <AudioPlayer/>
      
      <Footer />
    </>
  );
}

export default App;