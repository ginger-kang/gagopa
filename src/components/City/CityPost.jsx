import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Post = styled.div`
  width: 21vw;
  height: 21vw;
  cursor: pointer;
  position: relative;

  & div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  & img {
    object-fit: cover;
  }
`;

const CityPost = ({ post, cityName }) => {
  return (
    <Post>
      <img src={post.attachment.uri} alt="attachment" />
      <Link to={`/city/${cityName}/${post.id}`}>
        <div />
      </Link>
    </Post>
  );
};

export default CityPost;
