import React, { useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ThemeContext } from '../App';
import DarkModeToggle from '../components/DarkModeToggle';
import Profile from './Profile';

const NavBarContainer = styled.nav`
  width: 100vw;
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
`;

const SearchContainer = styled.div`
  width: 400px;
  height: 100%;
`;

const NavMenuContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Navigation = ({ show }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavBarContainer themeProps={theme} show={show}>
      <TitleContainer />
      <SearchContainer />
      <NavMenuContainer>
        <DarkModeToggle />
        <Profile />
      </NavMenuContainer>
    </NavBarContainer>
  );
};

export default Navigation;
