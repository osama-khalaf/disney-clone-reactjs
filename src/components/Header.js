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
import Search from "./Search";

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

  const [searchON, setSearchON] = React.useState(false);
  const [search, setSearch] = React.useState();

  const handelClick = () => {
    searchON == false && setSearch();
    setSearchON((pre) => !pre);
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
            <a onClick={handelClick}>
              <img src="./images/search-icon.svg " />
              <span>SEARCH</span>
            </a>
            <Link to={"/watch-list"}>
              <img src="./images/watchlist-icon.svg " />
              <span>WATCHLIST</span>
            </Link>
            <Link to={"/original"}>
              <a>
                <img src="./images/original-icon.svg " />
                <span>ORIGINAL</span>
              </a>
            </Link>
            <Link to={"/movies"}>
              <a>
                <img src="./images/movie-icon.svg " />
                <span>MOVIES</span>
              </a>
            </Link>
            <Link to={"/series"}>
              <a>
                <img src="./images/series-icon.svg " />
                <span>SERIES</span>
              </a>
            </Link>
          </NavMenu>
          <UserImg onClick={signOutUser} src={userPhoto} />
        </>
      )}
      {searchON && (
        <Search on={handelClick} search={search} setSearch={setSearch} />
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  margin: 0;
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

  @media (min-width: 768px) {
    padding: 0px 4px;
  }

  @media (max-width: 800px) {
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
      border-radius: 50px;
      border: 2px solid rgba(249, 249, 249, 0.8);
    }

    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    width: 95%;
    height: 70px;
    margin: auto;
    border-radius: 50px;
    z-index: 99999;
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    position: relative;

    @media (min-width: 768px) and (max-width: 992px) {
      padding: 0px 4px;
    }

    @media (max-width: 800px) {
      display: block;
      padding: 0;
    }

    img {
      height: 20px;

      @media (max-width: 800px) {
        height: 30px;
      }
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;

      @media (max-width: 800px) {
        display: none;
      }
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

      @media (max-width: 800px) {
        left: 0px;
        width: 100%;
      }
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
  margin-left: auto;
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
