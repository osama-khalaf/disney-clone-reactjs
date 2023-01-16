import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Search(props) {
  const [searchMovies, setSearchMovies] = React.useState();
  const [searchSeries, setSearchSeries] = React.useState();
  React.useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&query=${props.search}&include_adult=false`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&query=${props.search}&include_adult=false`
      ),
    ])

      .then(([resMovies, resSeries]) =>
        Promise.all([resMovies.json(), resSeries.json()])
      )
      .then(([dataMovies, dataSeries]) =>
        Promise.all([
          setSearchMovies(dataMovies.results),
          setSearchSeries(dataSeries.results),
        ])
      );
    props.search &&
      document
        .getElementById("resultsScroll")
        .scrollTo({ top: 0, behavior: "smooth" });
  }, [props.search]);

  if (searchMovies && searchSeries) {
    return (
      <SearchContainer id="SearchContainer" onClick={props.on}>
        <input
          onKeyDown={(e) => e.code === "Escape" && props.on()}
          onBlur={() => this.focus()}
          autoFocus
          onClick={(e) => {
            e.stopPropagation();
          }}
          onInput={(e) => {
            e.target.value
              ? props.setSearch(e.target.value)
              : props.setSearch();
          }}
        ></input>
        {props.search && (
          <Div id="resultsScroll">
            <ResultContainer>
              <h1>MOVIES</h1>
              <div>
                {searchMovies.map((item) => (
                  <SearchResult key={item.id}>
                    <Link to={`/MoviesDetails/${item.id}`}>
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                        />
                        <p>{item.original_title}</p>
                      </>
                    </Link>
                  </SearchResult>
                ))}
              </div>
            </ResultContainer>
            <ResultContainer>
              <h1>SERIES</h1>
              <div>
                {searchSeries.map((item) => (
                  <SearchResult key={item.id}>
                    <Link to={`/seriesDetails/${item.id}`}>
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                        />
                        <p>{item.name}</p>
                      </>
                    </Link>
                  </SearchResult>
                ))}
              </div>
            </ResultContainer>
          </Div>
        )}
      </SearchContainer>
    );
  }
}

const ResultContainer = styled.div`
  width: 50%;
`;
const Div = styled.div`
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow-y: scroll;
  background-color: transparent;

  @media (max-width: 600px) {
    gap: 5px;
  }
  @media (min-width: 768px) {
    width: 60%;
    align-self: center;
    gap: 5px;
  }

  img {
    width: 10%;
    margin-left: 10px;
    border-radius: 7px;

    @media (max-width: 600px) {
      width: 35%;
      border-radius: 5px;
    }
    @media (min-width: 601px) {
      width: 25%;
      border-radius: 5px;
    }
    @media (min-width: 768px) {
      width: 15%;
      border-radius: 5px;
    }

    @media (max-width: 400px) {
      width: 35%;
      margin-left: 5px;
      border-radius: 5px;
    }
  }
`;

const SearchResult = styled.div`
  a {
    background-color: rgba(147, 147, 147, 0.3);
    backdrop-filter: blur(5px);
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px 0;
    text-decoration: none;
    color: white;
    background-color: rgb(255 255 255 / 37%);
    text-shadow: -1px 2px 4px black;

    @media (max-width: 600px) {
      font-size: 16px;
      gap: 5px;
    }
    @media (min-width: 601px) {
      font-size: 16px;
      gap: 15px;
    }
    @media (min-width: 768px) {
      font-size: 16px;
      gap: 15px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
      gap: 5px;
    }
  }
`;
const SearchContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 15px 230px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(7px);
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 99999;

  @media (max-width: 600px) {
    padding: 15px 5px;
  }
  @media (min-width: 601px) {
    padding: 15px 5px;
  }

  input {
    width: 45%;
    align-self: center;
    pointer-events: auto;
    padding: 10px 20px;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: bold;

    @media (max-width: 600px) {
      width: 80%;
    }
    @media (min-width: 601px) {
      width: 80%;
    }
    @media (min-width: 768px) {
      width: 45%;
    }
  }
`;
