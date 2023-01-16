import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Viewers() {
  return (
    <Container>
      <Wrap>
        <Link to={"/disney"}>
          <img src="/images/viewers-disney.png" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/disney.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to={"/marvel"}>
          <img src="/images/viewers-marvel.png" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/marvel.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to={"/national-geographic"}>
          <img src="/images/viewers-national.png" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/national-geographic.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to={"/pixar"}>
          <img src="/images/viewers-pixar.png" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/pixar.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to={"/star-wars"}>
          <img src="/images/viewers-starwars.png" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/star-wars.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
      <Wrap>
        <Link to={"/dream-works"}>
          <img src="/images/viewers-dreamworks.png" />
          <video autoPlay={true} loop={true} playsInline={true}>
            <source src="/videos/dreamworks.mp4" type="video/mp4" />
          </video>
        </Link>
      </Wrap>
    </Container>
  );
}

export default Viewers;

const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 25px;
  padding: 30px 0 26px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: 10px;
    opacity: 0;
    z-index: -1;

    @media (max-width: 600px) {
      opacity: 1;
    }
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`;
