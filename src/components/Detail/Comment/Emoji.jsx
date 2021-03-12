import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../App';
import { lightTheme } from '../../../theme';
import { REACTIONS } from '../../../utils/constant';

const IconWrap = styled.ul`
  width: 170px;
  position: absolute;
  left: 0;
  top: 5px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-shadow: 1px 1px 11px rgba(0, 0, 0, 0.3);
`;

const Character = styled.li`
  padding: 8px;
  font-size: 22px;
  display: inline-block;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(1.1);
  }
`;

const Emoji = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <IconWrap theme={theme}>
      {REACTIONS.map((character, index) => (
        <Character key={index}>{character}</Character>
      ))}
    </IconWrap>
  );
};

export default Emoji;
