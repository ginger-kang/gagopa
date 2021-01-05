import React from 'react';
import styled from 'styled-components';
import { IoIosHeart } from 'react-icons/io';
import { FaComment } from 'react-icons/fa';

const Post = styled.div`
  width: 21vw;
  height: 21vw;
  cursor: pointer;
  position: relative;

  & img {
    object-fit: cover;
  }
`;

const Hover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const HeartAndComment = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  color: white;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    opacity: 1;
  }
  & svg {
    color: white;
    margin: 0 5px;
  }
`;

const CityPost = ({ post }) => {
  const likesCount = post.likes.length ? post.likes.length : 0;

  return (
    <Post>
      <img src={post.attachment.uri} alt="attachment" />
      <Hover>
        <HeartAndComment>
          <IoIosHeart size={24} />
          <span>{likesCount}</span>
          &nbsp; &nbsp; &nbsp;
          <FaComment size={20} />
          <span>0</span>
        </HeartAndComment>
      </Hover>
    </Post>
  );
};

export default CityPost;
