import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function SeriesDetails() {
  const { id } = useParams();
  const [seriesDetail, setSeriesDetail] = React.useState();
  const [recommended, setRecommended] = React.useState();
  const [addWatchList, setAddWatchList] = React.useState();
  React.useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=e6d3cedbec25664ec7c2dbb722aa5e56&language=en-US&page=1`
      ),
    ])
      .then(([resDetails, resRecommended]) =>
        Promise.all([resDetails.json(), resRecommended.json()])
      )
      .then(([dataDetails, dataRecommended]) => {
        setSeriesDetail(dataDetails);
        setRecommended(dataRecommended.results);
      });

    arrayOfSeries.filter((item) => item.id == id).length === 0
      ? setAddWatchList(true)
      : setAddWatchList(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  let arrayOfSeries = JSON.parse(localStorage.getItem("series")) || [];

  const addToWatchList = () => {
    const movie = {
      id: id,
      name: seriesDetail.original_name,
      poster: `https://www.themoviedb.org/t/p/original${seriesDetail.poster_path}`,
      release_date: seriesDetail.first_air_date,
      overview: seriesDetail.overview,
      seasons: seriesDetail.seasons.length,
    };
    arrayOfSeries.push(movie);
    localStorage.setItem("series", JSON.stringify(arrayOfSeries));
    setAddWatchList(!addWatchList);
  };

  const removefromWatchList = () => {
    arrayOfSeries = arrayOfSeries.filter((item) => item.id != id);
    localStorage.setItem("series", JSON.stringify(arrayOfSeries));
    setAddWatchList(!addWatchList);
  };

  localStorage.setItem("series", JSON.stringify(arrayOfSeries));

  if (seriesDetail && recommended) {
    return (
      <Container>
        <Background>
          <img
            alt=""
            src={`https://www.themoviedb.org/t/p/original${seriesDetail.backdrop_path}`}
          />
        </Background>
        <Grid>
          <img
            alt=""
            src={`https://www.themoviedb.org/t/p/original${seriesDetail.poster_path}`}
          />
          <Data>
            <SubTitle>
              <div>{seriesDetail.first_air_date.slice(0, 4)} |</div>
              <div>{seriesDetail.genres.map((e) => `${e.name}.`)}</div>
              <div>{seriesDetail.seasons.length} Seasons</div>
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
            </SubTitle>
            <Description>{seriesDetail.overview}</Description>
          </Data>
        </Grid>
        <H>Seasons</H>
        <SeasonsContainer>
          {seriesDetail.seasons.map((item) => {
            const logoPath =
              item.poster_path === null
                ? seriesDetail.poster_path
                : item.poster_path;

            return (
              <Wrap key={item.id}>
                <img
                  src={`https://www.themoviedb.org/t/p/original${logoPath}`}
                />
                <div>{item.name}</div>
                <div>
                  {item.air_date !== null && item.air_date.slice(0, 4)} |{" "}
                  {item.episode_count} Episodes
                </div>
              </Wrap>
            );
          })}
        </SeasonsContainer>
        <H>Recommended</H>
        <RecommendedContainer>
          {recommended.map((item) => {
            return (
              <Wrap key={item.id}>
                <Link to={`/seriesDetails/${item.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
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
  text-shadow: -1px 2px 4px black;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 20px;
  margin-top: 60px;

  @media (max-width: 480px) {
    height: 766px;
    display: grid;
    margin-bottom: 50px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (min-width: 481px) and (max-width: 600px) {
    height: 766px;
    display: grid;
    margin-bottom: 120px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (min-width: 601px) and (max-width: 992px) {
    grid-template-columns: 1fr 3fr;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 7px;

    @media (max-width: 480px) {
      padding: 40px;
    }

    @media (min-width: 481px) and (max-width: 600px) {
      padding: 0 60px;
    }
  }
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  color: rgb(249, 249, 249);
  font-size: 24px;
  min-height: 20px;

  @media (max-width: 480px) {
    justify-content: center;
    font-size: 18px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 18px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 760px;

  @media (max-width: 480px) {
    font-size: 16px;
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
    margin: 0;
    font-size: 20px;
  }
`;

const Wrap = styled.div`
  width: 95%;
  background-color: rgba(147, 147, 147, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;

  div {
    font-weight: bold;
    margin-left: 5px;
    margin-bottom: 5px;
  }

  img {
    width: 100%;
    border-radius: 5px;
    border: 4px solid transparent;
    transition-duration: 300ms;
    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
const SeasonsContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 25px;
  padding: 30px 0 26px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 481px) and (max-width: 600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 601px) and (max-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
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

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
  }

  span {
    font-size: 30px;
    color: white;

    @media (max-width: 480px) {
      font-size: 16px;
    }
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

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
  }

  span {
    font-size: 30px;
    color: white;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

const RecommendedContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
  }

  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 25px;
  padding: 30px 0 26px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-bottom: 120px;
  }

  @media (min-width: 481px) and (max-width: 600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-bottom: 120px;
  }
  @media (min-width: 601px) and (max-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-bottom: 120px;
  }
`;
