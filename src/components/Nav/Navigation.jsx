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

const NavBarContainer = styled.nav`
  width: 100vw;
  max-width: 1450px;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 0 90px 0 90px;
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
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 200px;
  height: 100%;
  font-size: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-family: 'Comfortaa', cursive;
  & a {
    color: white;
    ${(props) =>
      props.show &&
      css`
        color: ${props.themeProps.text};
      `};
  }
`;

const SearchContainer = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavMenuContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadPictureContent = styled.span`
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  ${(props) =>
    props.show &&
    css`
      color: ${props.theme.text};
    `};
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
        <TitleContainer themeProps={theme} show={show}>
          <Link to="/">gagopa</Link>
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
      </NavBarContainer>
      {darkTheme && <DarkModeToggle handleDarkTheme={handleDarkTheme} />}
      {signIn && <SignIn toggleSignIn={toggleSignIn} />}
      {signUp && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

export default Navigation;
