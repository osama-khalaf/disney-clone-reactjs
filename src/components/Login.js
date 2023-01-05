import React from "react";
import styled from "styled-components";

export default function Login() {
  return (
    <Container>
      <CTA>
        <CTALogoOne src="./images/cta-logo-one.svg" />
        <SignUp>get all there</SignUp>
        <Description>
          Thousands of hours of series, movies & originals from the world's
          greatest storytellers. Discover more than you’d ever imagined with new
          and exclusive originals streaming now. Endless entertainment. Stories
          for everyone. All series in one place. All movies in one place.
        </Description>
        <CTALogoTwo src="./images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before {
    background: url("/images/login-background.jpg") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.7;
    z-index: -1;
  }
`;

const CTA = styled.div`
  width: 90%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const CTALogoOne = styled.img``;

const SignUp = styled.a`
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  padding: 17px 0;
  color: #f9f9f9;
  border-radius: 4px;
  background-color: #0063e5;
  font-size: 18px;
  cursor: pointer;
  transition: all 250ms;
  letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;

const CTALogoTwo = styled.img`
  width: 95%;
`;
