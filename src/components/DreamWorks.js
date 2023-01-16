import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function DreamWorks() {
  const [movieData, setMovieData] = React.useState([]);
  const [seeMore, setSeeMore] = React.useState(1);
  const handelclick = () => setSeeMore((preCount) => preCount + 1);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&sort_by=popularity.desc&with_companies=521&page=${seeMore}`
    )
      .then((resData) => resData.json())
      .then((data) => setMovieData((preData) => [...preData, ...data.results]));
  }, [seeMore]);

  if (movieData.length > 0) {
    return (
      <Container>
        <Posters>
          {movieData.map((ele) => (
            <Wrap key={ele.id}>
              <Link to={`/MoviesDetails/${ele.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${ele.poster_path}`}
                />
              </Link>
            </Wrap>
          ))}
        </Posters>

        <ViewMore onClick={handelclick}>VIEW MORE</ViewMore>
      </Container>
    );
  }
}

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
const Posters = styled.div`
  max-width: 1360px;
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  justify-items: center;
  gap: 25px;
  padding: 30px 0 26px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 601px) and (max-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const Wrap = styled.div`
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

const ViewMore = styled.div`
  &:before {
    background: url("/images/navbar-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 7px;
    border: 2px solid rgba(249, 249, 249, 0.8);
  }

  position: relative;
  max-width: 1360px;
  width: 100%;
  text-align: center;
  margin: 50px 0;
  padding: 20px 0;
  border-radius: 7px;
  cursor: pointer;

  @media (max-width: 400px) {
    width: 35%;
    margin: 5px 0 40px;
    padding: 15px 0;
    font-size: 11px;
  }
  @media (max-width: 600px) {
    width: 35%;
    margin: 30px 0 40px;
    padding: 15px 0;

    @media (max-width: 800px) {
      margin-bottom: 110px;
    }
  }
`;
