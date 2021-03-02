import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { ThemeContext, CognitoContext } from '../../App';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import NavMenu from './NavMenu';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import NavSearchBar from './NavSearchBar';
import { AUTH_ALERT_MESSAGE } from '../../utils/constant';
import Logo from '../../static/assets/logo.png';

const NavBarContainer = styled.nav`
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 100;
  color: white;
  background: transparent;
  ${(props) =>
    props.show &&
    css`
      background: ${props.themeProps.itemBackground};
      color: ${props.themeProps.text};
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    `};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavBarWrap = styled.div`
  width: 100vw;
  max-width: 1450px;
  margin: 0 auto;
  height: 70px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 800px) {
    padding: 0 10px 0 10px;
    justify-content: space-around;
  }
`;

const TitleContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & a {
    color: white;
    ${(props) =>
      props.show &&
      css`
        color: ${props.themeProps.text};
      `};
  }
  @media screen and (max-width: 800px) {
    width: auto;
  }
`;

const SearchContainer = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: auto;
  }
`;

const NavMenuContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 40px;
  }
`;

const UploadPictureContent = styled.div`
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  @media screen and (max-width: 800px) {
    display: none;
  }
  ${(props) =>
    props.show &&
    css`
      color: ${props.theme.text};
    `};
`;

const ResponsiveTitle = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-family: 'Comfortaa', cursive;
  @media screen and (max-width: 800px) {
    display: block;
    width: 40px;
  }
  & img {
    width: 32px;
  }
`;

const Title = styled.div`
  font-size: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-family: 'Comfortaa', cursive;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Navigation = ({ show, navSearch }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);
  const [darkTheme, setDarkTheme] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleDarkTheme = () => setDarkTheme(!darkTheme);
  const toggleSignIn = () => setSignIn(!signIn);
  const toggleSignUp = () => setSignUp(!signUp);

  const alertMessage = () => alert(AUTH_ALERT_MESSAGE.NOT_SIGN_IN);

  return (
    <>
      <NavBarContainer themeProps={theme} show={show}>
        <NavBarWrap>
          <TitleContainer themeProps={theme} show={show}>
            <Link to="/">
              <Title>gagopa</Title>
            </Link>
            <Link to="/">
              <ResponsiveTitle>
                <img src={Logo} alt="logo" />
              </ResponsiveTitle>
            </Link>
          </TitleContainer>
          <SearchContainer>
            {navSearch && <NavSearchBar show={show} />}
          </SearchContainer>
          <NavMenuContainer>
            {cognitoUser ? (
              <Link to="/upload">
                <UploadPictureContent theme={theme} show={show}>
                  사진 올리기
                </UploadPictureContent>
              </Link>
            ) : (
              <UploadPictureContent
                theme={theme}
                show={show}
                onClick={alertMessage}
              >
                사진 올리기
              </UploadPictureContent>
            )}
            <NavMenu
              handleDarkTheme={handleDarkTheme}
              toggleSignIn={toggleSignIn}
              toggleSignUp={toggleSignUp}
            />
          </NavMenuContainer>
        </NavBarWrap>
      </NavBarContainer>
      {darkTheme && <DarkModeToggle handleDarkTheme={handleDarkTheme} />}
      {signIn && <SignIn toggleSignIn={toggleSignIn} />}
      {signUp && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

export default Navigation;
