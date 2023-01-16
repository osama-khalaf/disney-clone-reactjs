import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "../videolayout.css";
import { Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = React.useState();
  const [logo, setLogo] = React.useState();
  const [trailerData, setTrailerData] = React.useState();
  const [similarData, setSimilarData] = React.useState();

  const [playTrailer, setPlayTrailer] = React.useState(false);

  const [addWatchList, setAddWatchList] = React.useState();

  // localStorage.clear();

  React.useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&include_image_language=en%2Cnull`
      ),
    ])
      .then(([resDetails, resTrailer, resSimilar, resLogo]) =>
        Promise.all([
          resDetails.json(),
          resTrailer.json(),
          resSimilar.json(),
          resLogo.json(),
        ])
      )
      .then(([dataDetails, dataTrailer, dataSimilar, dataLogo]) => {
        setMovieDetail(dataDetails);
        dataTrailer.results.length
          ? setTrailerData(dataTrailer.results[0].key)
          : setTrailerData("0");
        setSimilarData(dataSimilar.results);
        setLogo(dataLogo.logos);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });

    arrayOfMovies.filter((item) => item.id == id).length === 0
      ? setAddWatchList(true)
      : setAddWatchList(false);
  }, [id]);

  ////////////////////////////////////////////////

  const plyTrlrBtn = () => {
    setPlayTrailer((prevState) => !prevState);
  };

  let arrayOfMovies = JSON.parse(localStorage.getItem("movies")) || [];

  const addToWatchList = () => {
    const movie = {
      id: id,
      name: movieDetail.original_title,
      poster: `https://www.themoviedb.org/t/p/original${movieDetail.poster_path}`,
      release_date: movieDetail.release_date,
      overview: movieDetail.overview,
      run_time: `${Math.floor(movieDetail.runtime / 60)}h ${
        movieDetail.runtime % 60
      }m`,
    };
    arrayOfMovies.push(movie);
    localStorage.setItem("movies", JSON.stringify(arrayOfMovies));
    setAddWatchList(!addWatchList);
  };

  const removefromWatchList = () => {
    arrayOfMovies = arrayOfMovies.filter((item) => item.id != id);
    localStorage.setItem("movies", JSON.stringify(arrayOfMovies));
    setAddWatchList(!addWatchList);
  };

  localStorage.setItem("movies", JSON.stringify(arrayOfMovies));

  //////////////////////////////////////////////

  if (movieDetail && logo && trailerData && similarData) {
    similarData.length = 18;
    const logoPath =
      logo.length > 0
        ? logo[0].file_path
        : movieDetail.poster_path === null
        ? movieDetail.backdrop_path
        : movieDetail.poster_path;
    const backdropPath =
      movieDetail.backdrop_path !== null
        ? movieDetail.backdrop_path
        : movieDetail.poster_path !== null
        ? movieDetail.poster_path
        : logo;

    return (
      <Container>
        <Background>
          <img
            alt=""
            src={`https://www.themoviedb.org/t/p/original${backdropPath}`}
          />
        </Background>
        <ImgTitle>
          <img
            alt=""
            src={`https://www.themoviedb.org/t/p/original${logoPath}`}
          />
        </ImgTitle>
        <Controls>
          <PlayButton onClick={plyTrlrBtn}>
            <img alt="" src="/images/play-icon-black.png" />
            <span>PLAY</span>
          </PlayButton>
          <TrailerButton onClick={plyTrlrBtn}>
            <img alt="" src="/images/play-icon-white.png" />
            <span>TRAILER</span>
          </TrailerButton>
          {playTrailer && (
            <div onClick={plyTrlrBtn} className="video-layout">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerData}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {addWatchList && (
            <AddButton onClick={addToWatchList}>
              <span>+</span>
            </AddButton>
          )}
          {!addWatchList && (
            <RemoveButton onClick={removefromWatchList}>
              <span>-</span>
            </RemoveButton>
          )}
          <GroupWatchButton>
            <img alt="" src="/images/group-icon.png" />
          </GroupWatchButton>
        </Controls>
        <SubTitle>
          <div>{movieDetail.release_date} .</div>
          <div>{movieDetail.genres.map((e) => `${e.name}, `)} .</div>
          <div>
            {Math.floor(movieDetail.runtime / 60)}h {movieDetail.runtime % 60}m
          </div>
        </SubTitle>
        <Description>{movieDetail.overview}</Description>

        <H>Recommended</H>
        <RecommendedContainer>
          {similarData.map((ele) => {
            return (
              <Wrap key={ele.id}>
                <Link to={`/MoviesDetails/${ele.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${ele.poster_path}`}
                  />
                </Link>
              </Wrap>
            );
          })}
        </RecommendedContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.7;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ImgTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 30vw;
  min-width: 260px;
  margin-top: 60px;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 870px) {
    margin-top: 30px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 20px;
`;
const PlayButton = styled.button`
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background-color: rgb(249, 249, 249);
  border: none;
  padding: 0 24px;
  margin-right: 22px;
  letter-spacing: 1.8px;
  cursor: pointer;

  @media (max-width: 300px) {
    width: 36%;
    padding: 0 5px 0px 3px;
    margin-right: 35px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: white;

  @media (max-width: 300px) {
    width: 50%;
    padding: 0 5px 0px 3px;
    margin-right: 0;
  }
`;
const AddButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-right: 16px;

  span {
    font-size: 30px;
    color: white;
  }
`;
const RemoveButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-right: 16px;
  padding-bottom: 7px;

  span {
    font-size: 30px;
    color: white;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  color: rgb(249, 249, 249);
  font-size: 18px;
  min-height: 20px;
  margin-top: 26px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 24px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 760px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const H = styled.h2`
  letter-spacing: 0.3rem;
  margin: 80px 0 0px;
  font-size: 30px;

  &.firstChild {
    margin-top: 0;
  }

  @media (max-width: 480px) {
    margin: 40px 0 0px;
    font-size: 20px;
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
const RecommendedContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 25px;
  padding: 30px 0 26px;

  @media (max-width: 480px) {
    padding-bottom: 120px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 481px) and (max-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
