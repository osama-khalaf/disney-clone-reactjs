import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "../videolayout.css";

export default function Detail(props) {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = React.useState();
  const [logo, setLogo] = React.useState();
  const [trailerData, setTrailerData] = React.useState();

  const [playTrailer, setPlayTrailer] = React.useState(false);

  //   const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&include_image_language=en%2Cnull`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US`
      ),
    ])
      .then(([resDetails, resLogo, resTrailer]) =>
        Promise.all([resDetails.json(), resLogo.json(), resTrailer.json()])
      )
      .then(([dataDetails, dataLogo, dataTrailer]) => {
        setMovieDetail(dataDetails);
        setLogo(dataLogo.logos[0].file_path);
        setTrailerData(dataTrailer.results[0].key);
      });
  }, []);

  const plyTrlrBtn = () => {
    setPlayTrailer((prevState) => !prevState);
  };

  if (movieDetail) {
    return (
      <Container>
        <Background>
          <img
            alt=""
            src={`https://www.themoviedb.org/t/p/original${movieDetail.backdrop_path}`}
          />
        </Background>
        <ImgTitle>
          <img alt="" src={`https://www.themoviedb.org/t/p/original${logo}`} />
        </ImgTitle>
        <Controls>
          <PlayButton>
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
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <AddButton>
            <span>+</span>
          </AddButton>
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

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: rgb(249, 249, 249);
  font-size: 18px;
  min-height: 20px;
  margin-top: 26px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 24px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 760px;
`;
