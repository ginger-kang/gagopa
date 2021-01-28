import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosHeart } from 'react-icons/io';
import { FaComment } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

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

const LeftSlideButton = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  background: none;
  & svg {
    color: white;
  }
  &:hover {
    background: rgba(220, 220, 220, 0.9);
    & svg {
      color: #383838;
    }
  }
`;

const RightSlideButton = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  background: none;
  & svg {
    color: white;
  }
  &:hover {
    background: rgba(220, 220, 220, 0.9);

    & svg {
      color: #383838;
    }
  }
`;

const CityPost = ({ post, cityName }) => {
  const likesCount = post.likes.items.length ? post.likes.items.length : 0;
  const commentsCount = post.comments.items.length
    ? post.comments.items.length
    : 0;
  const postPicture = post.attachment;
  const [pictureIndex, setPictureIndex] = useState(0);

  const rightFileSlide = () => {
    if (pictureIndex === postPicture.length - 1) {
      setPictureIndex(0);
    } else {
      setPictureIndex((prev) => prev + 1);
    }
  };

  const leftFileSlide = () => {
    if (pictureIndex === 0) {
      setPictureIndex(postPicture.length - 1);
    } else {
      setPictureIndex((prev) => prev - 1);
    }
  };

  return (
    <Post>
      <img src={post.attachment[pictureIndex].uri} alt="attachment" />
      <Link
        key={post.id}
        to={{
          pathname: `/city/${cityName}/${post.id}`,
          state: { cityName: cityName, post: post },
        }}
      >
        <Hover>
          <HeartAndComment>
            <IoIosHeart size={24} />
            <span>{likesCount}</span>
            &nbsp; &nbsp; &nbsp;
            <FaComment size={20} />
            <span>{commentsCount}</span>
          </HeartAndComment>
        </Hover>
      </Link>
      {postPicture.length > 1 && (
        <>
          <LeftSlideButton onClick={leftFileSlide}>
            <BiChevronLeft size={30} />
          </LeftSlideButton>
          <RightSlideButton onClick={rightFileSlide}>
            <BiChevronRight size={30} />
          </RightSlideButton>{' '}
        </>
      )}
    </Post>
  );
};

export default CityPost;
