import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { lightTheme } from '../../theme';

const CommentWrap = styled.div`
  width: 950px;
  height: 550px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const Comment = ({ pictureObj }) => {
  const { theme } = useContext(ThemeContext);

  return <CommentWrap theme={theme}></CommentWrap>;
};

export default Comment;
