import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import MoviesDetails from "./components/MoviesDetails";
import Login from "./components/Login";
import MoviesList from "./components/MoviesList";
import SeriesList from "./components/SeriesList";
import SeriesDetails from "./components/SeriesDetails";
import Search from "./components/Search";
import WatchList from "./components/WatchList";
import Marvel from "./components/Marvel";
import NationalGeographic from "./components/NationalGeographic";
import Pixar from "./components/Pixar";
import StarWars from "./components/StarWars";
import DreamWorks from "./components/DreamWorks";
import Disney from "./components/Disney";
import Original from "./components/Original";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName } from "./user/userSlice";
import "./App.css";

function App() {
  const userName = useSelector(selectUserName);

  let docWidth = document.documentElement.offsetWidth;

  [].forEach.call(document.querySelectorAll("*"), function (el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  });
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={!userName ? <Login /> : <Home />} />
          <Route path="/MoviesDetails/:id" element={<MoviesDetails />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/series" element={<SeriesList />} />
          <Route path="/seriesDetails/:id" element={<SeriesDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watch-list" element={<WatchList />} />
          <Route path="/original" element={<Original />} />
          <Route path="/disney" element={<Disney />} />
          <Route path="/pixar" element={<Pixar />} />
          <Route path="/marvel" element={<Marvel />} />
          <Route path="/national-geographic" element={<NationalGeographic />} />
          <Route path="/star-wars" element={<StarWars />} />
          <Route path="/dream-works" element={<DreamWorks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
