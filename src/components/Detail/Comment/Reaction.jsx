import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick';
import { API, graphqlOperation } from 'aws-amplify';
import { listCommentReactions } from '../../../graphql/queries';
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

const Reaction = ({ commentId, pictureId }) => {
  const emojiRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(emojiRef, false);
  const [reactionData, setReactionData] = useState(null);

  const fetchReactions = useCallback(async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listCommentReactions, {
          filter: {
            commentId: { beginsWith: commentId },
          },
        }),
      );
      const fetchReactionData = await data.data.listCommentReactions.items;
      setReactionData(fetchReactionData);
    } catch (error) {
      console.error(error.message);
    }
  }, [commentId]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const onClick = () => setIsActive(!isActive);

  console.log(reactionData);

  return (
    <>
      <ReactionWrap></ReactionWrap>
      <EmojiWrap onClick={onClick} ref={emojiRef}>
        <HiOutlineEmojiHappy size={22} />
        {isActive && <Emoji commentId={commentId} pictureId={pictureId} />}
      </EmojiWrap>
    </>
  );
};

export default Reaction;
