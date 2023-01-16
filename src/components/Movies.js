import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Movies() {
  const [latestMovie, setLatestMovie] = React.useState();
  const [popularMovie, setPopularMovie] = React.useState();
  const [topRatedMovie, setTopRatedMovie] = React.useState();
  const [upcomingMovie, setUpcomingMovie] = React.useState();

  React.useEffect(() => {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&page=1"
      ),
      fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&page=2"
      ),
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&page=2"
      ),
      fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&page=2"
      ),
    ])
      .then(([resLatest, resPopular, restop, resUpComing]) =>
        Promise.all([
          resLatest.json(),
          resPopular.json(),
          restop.json(),
          resUpComing.json(),
        ])
      )
      .then(([latest, popular, topRated, upcoming]) => [
        setLatestMovie(latest.results),
        setPopularMovie(popular.results),
        setTopRatedMovie(topRated.results),
        setUpcomingMovie(upcoming.results),
      ]);
  }, []);

  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  {
    if (popularMovie && latestMovie && topRatedMovie && upcomingMovie) {
      return (
        <Container>
          <H className="firstChild">Latest</H>
          <Carousel {...settings}>
            {latestMovie.map((item) => {
              return (
                <Wrap2 key={item.id}>
                  <Link to={`/MoviesDetails/${item.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    />
                  </Link>
                </Wrap2>
              );
            })}
          </Carousel>

          <H>Now Playing</H>

          <Carousel {...settings}>
            {popularMovie.map((item) => {
              return (
                <Wrap2 key={item.id}>
                  <Link to={`/MoviesDetails/${item.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    />
                  </Link>
                </Wrap2>
              );
            })}
          </Carousel>

          <H>Upcoming</H>

          <Carousel {...settings}>
            {upcomingMovie.map((item) => {
              return (
                <Wrap2 key={item.id}>
                  <Link to={`/MoviesDetails/${item.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    />
                  </Link>
                </Wrap2>
              );
            })}
          </Carousel>

          <H>Top Rated</H>

          <Carousel {...settings}>
            {topRatedMovie.map((item) => {
              return (
                <Wrap2 key={item.id}>
                  <Link to={`/MoviesDetails/${item.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    />
                  </Link>
                </Wrap2>
              );
            })}
          </Carousel>
        </Container>
      );
    }
  }
}
const H = styled.h2`
  letter-spacing: 0.3rem;
  margin: 80px 0 0px;
  font-size: 30px;
  &.firstChild {
    margin-top: 0;
  }
`;

const Carousel = styled(Slider)`
  margin-top: 20px;

  .slick-list {
    overflow: visible;
  }

  button {
    display: none !important;
  }
`;

const Wrap2 = styled.div`
  img {
    border-radius: 10px;
    width: 95%;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    border: 4px solid transparent;
    transition-duration: 300ms;
    object-fit: cover;

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

const Container = styled.div`
  margin-bottom: 60px;
`;
