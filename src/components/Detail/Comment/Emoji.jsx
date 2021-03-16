import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../../App';
import { lightTheme } from '../../../theme';
import { REACTIONS } from '../../../utils/constant';
import { API, graphqlOperation } from 'aws-amplify';
import { createCommentReaction } from '../../../graphql/mutations';

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

const Emoji = ({ commentId, pictureId }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);

  const createReactions = async (character) => {
    const inputData = {
      userId: cognitoUser.userId,
      commentId: commentId,
      pictureId: pictureId,
      emoji: character,
    };
    await API.graphql(
      graphqlOperation(createCommentReaction, { input: inputData }),
    );
  };

  const onClick = (character) => {
    createReactions(character);
  };

  return (
    <IconWrap theme={theme}>
      {REACTIONS.map((character, index) => (
        <Character key={index} onClick={() => onClick(character)}>
          {character}
        </Character>
      ))}
    </IconWrap>
  );
};

export default Emoji;
