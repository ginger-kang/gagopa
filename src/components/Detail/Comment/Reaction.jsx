import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import Emoji from './Emoji';

const ReactionWrap = styled.div`
  overflow: auto;
`;
const EmojiWrap = styled.span`
  position: relative;
  & svg {
    color: #949494;
    cursor: pointer;
  }
`;

const Reaction = ({ reactions }) => {
  const emojiRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(emojiRef, false);

  const onClick = () => setIsActive(!isActive);

  return (
    <>
      <ReactionWrap></ReactionWrap>
      <EmojiWrap onClick={onClick} ref={emojiRef}>
        <HiOutlineEmojiHappy size={22} />
        {isActive && <Emoji />}
      </EmojiWrap>
    </>
  );
};

export default Reaction;
