import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigateTo("/");
      }
    });
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      navigateTo("/");
    });
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      dispatch(setSignOut());
    });
    navigateTo("/login");
  };

  return (
    <Nav>
      <Link to={"/"}>
        <Logo src="./images/logo.svg" />
      </Link>
      {!userName ? (
        <Login onClick={signIn}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <Link to={"/"}>
              <img src="./images/home-icon.svg" />
              <span>HOME</span>
            </Link>
            <a component={Link}>
              <img src="./images/search-icon.svg " />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="./images/watchlist-icon.svg " />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="./images/original-icon.svg " />
              <span>ORIGINAL</span>
            </a>
            <a>
              <img src="./images/movie-icon.svg " />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="./images/series-icon.svg " />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg onClick={signOutUser} src={userPhoto} />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    position: relative;

    @media (max-width: 800px) {
      display: none;
    }

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
    }

    &:after {
      content: "";
      color: white;
      height: 2px;
      width: calc(100% - 24px);
      background: white;
      position: absolute;
      left: 15px;
      right: 0;
      bottom: -6px;
      opacity: 0;
      transform-origin: left center;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      transform: scaleX(0);
    }

    &:hover {
      &:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  cursor: pointer;
  color: white;
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  margin-left: auto;

  &:hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;
