import React from 'react';
import styled from 'styled-components';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import Emoji from './Emoji';

const ReactionWrap = styled.div``;
const EmojiWrap = styled.div``;

const Reaction = ({ reactions }) => {
  console.log(reactions);
  return (
    <>
      <ReactionWrap></ReactionWrap>
      <EmojiWrap>
        <HiOutlineEmojiHappy size={22} />
        <Emoji />
      </EmojiWrap>
    </>
  );
};

export default Reaction;
