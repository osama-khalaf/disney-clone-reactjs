import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [watchMovies, setWatchMovies] = React.useState(
    (localStorage.getItem("movies") &&
      JSON.parse(localStorage.getItem("movies"))) ||
      []
  );
  const [watchSeries, setWatchSeries] = React.useState(
    (localStorage.getItem("series") &&
      JSON.parse(localStorage.getItem("series"))) ||
      []
  );

  localStorage.setItem("movies", JSON.stringify(watchMovies));
  localStorage.setItem("series", JSON.stringify(watchSeries));

  const moviesElements = watchMovies.map((item) => (
    <Wrap key={item.id}>
      <div id="re">
        <Link to={`/MoviesDetails/${item.id}`}>
          <img src={`${item.poster}`} />
        </Link>
        <span
          onClick={() => {
            setWatchMovies(watchMovies.filter((ele) => ele.id != item.id));
          }}
        >
          +
        </span>
        <span className="badge">Movie</span>
      </div>
      <div>{item.name}</div>
      <div>
        {item.release_date.slice(0, 4)} | {item.run_time}
      </div>
    </Wrap>
  ));
  const seriesElements = watchSeries.map((item) => (
    <Wrap key={item.id}>
      <div id="re">
        <Link to={`/seriesDetails/${item.id}`}>
          <img src={`${item.poster}`} />
        </Link>

        <span
          onClick={() => {
            setWatchSeries(watchSeries.filter((ele) => ele.id != item.id));
          }}
        >
          +
        </span>
        <span className="badge">Series</span>
      </div>
      <div>{item.name}</div>
      <div>
        {item.release_date.slice(0, 4)} | {item.seasons} Seasons
      </div>
    </Wrap>
  ));

  return (
    <Container>
      {(watchMovies.length > 0 || watchSeries.length > 0) && (
        <sapn
          id="removeAll"
          onClick={() => {
            setWatchMovies([]);
            setWatchSeries([]);
          }}
        >
          Remove All
        </sapn>
      )}
      {moviesElements}
      {seriesElements}
      <>
        {watchMovies.length == 0 && seriesElements.length == 0 && (
          <h1 style={{ textAlign: "center", gridColumn: "span 5" }}>
            Nothing has been added to the watch list<br></br> Browse movies and
            series
          </h1>
        )}
      </>
    </Container>
  );
}

const Container = styled.div`
  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  position: relative;
  max-width: 1480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  justify-items: center;
  gap: 25px;
  padding: 60px 60px 110px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 60px 15px 160px;
  }

  @media (min-width: 481px) and (max-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 601px) and (max-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  & #removeAll {
    position: absolute;
    top: 15px;
    right: 60px;
    padding: 15px 25px;
    background-color: #bf0000;
    border-radius: 7px;
    cursor: pointer;

    @media (max-width: 480px) {
      right: 15px;
    }
  }
`;

const Wrap = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: rgba(147, 147, 147, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;

  & #re {
    margin: 0 auto;
    position: relative;
  }

  & .badge {
    position: absolute;
    top: 8px;
    left: 7px;
    font-weight: 100;
    font-size: 15px;
    padding: 10px 30px;
    background-color: #ededed;
    color: black;
    transform: rotateZ(0deg);
    width: 0;
    height: 0;
    border-radius: 5px;
  }

  span {
    position: absolute;
    opacity: 1;
    background-color: #bf0000;
    cursor: pointer;
    transition-duration: 300ms;
    border-radius: 7px;
    font-weight: bold;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    right: 0;
    transform: rotateZ(45deg);
    font-size: 20px;
  }

  div {
    align-self: flex-start;
    font-weight: bold;
    margin-left: 5px;
    margin-bottom: 5px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 4px solid transparent;
    transition-duration: 300ms;

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }

  &:hover span {
    opacity: 100%;
  }
`;
