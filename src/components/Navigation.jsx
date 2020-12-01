import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import DarkModeToggle from '../components/DarkModeToggle';

const NavContainer = styled.nav`
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: ${(props) => props.themeProps.itemBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
`;

const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer themeProps={theme}>
      <DarkModeToggle />
    </NavContainer>
  );
};

export default Navigation;
