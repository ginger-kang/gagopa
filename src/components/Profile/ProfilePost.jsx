import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { translateToKo } from '../../utils/translate';
import { getKeyByValue } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { lightTheme } from '../../theme';
import { ThemeContext } from '../../App';
import { dateToString } from '../../utils/utils';
import { IoIosHeartEmpty } from 'react-icons/io';
import { GoComment } from 'react-icons/go';

const Post = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
  &:last-child {
    border: none;
  }
`;

const Picture = styled.div`
  width: 180px;
  height: 180px;
  position: relative;

  & img {
    border-radius: 8px;
    object-fit: cover;
  }
`;

const ContentWrap = styled.div`
  width: 400px;
  height: 200px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 670px) {
    width: 50%;
  }
  @media screen and (max-width: 550px) {
    width: 130px;
    justify-content: center;
  }
`;

const Content = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & p {
    font-size: 15px;
    margin-top: 20px;
  }
  @media screen and (max-width: 550px) {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

const LeftSlideButton = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  left: 3px;
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
  width: 28px;
  height: 28px;
  position: absolute;
  right: 3px;
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

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 13px 0 5px 0;
`;

const Date = styled.span`
  font-size: 11px;
  color: #969696;
  margin-top: 5px;
`;

const ProfilePost = ({ post }) => {
  const likesCount = post.likes.items.length ? post.likes.items.length : 0;
  const commentsCount = post.comments.items.length
    ? post.comments.items.length
    : 0;
  const postPicture = post.attachment;
  const cityName = getKeyByValue(translateToKo, post.city);
  const [pictureIndex, setPictureIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

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
    <Post theme={theme}>
      <Picture>
        <Link
          to={{
            pathname: `/city/${cityName}/${post.id}`,
            state: { cityName: cityName, post: post },
          }}
        >
          <img src={post.attachment[pictureIndex].uri} alt="attachment" />
        </Link>
        {postPicture.length > 1 && (
          <>
            <LeftSlideButton onClick={leftFileSlide}>
              <BiChevronLeft size={25} />
            </LeftSlideButton>
            <RightSlideButton onClick={rightFileSlide}>
              <BiChevronRight size={25} />
            </RightSlideButton>{' '}
          </>
        )}
      </Picture>
      <ContentWrap>
        <Content>
          <Title>{post.title}</Title>
          <Date>{dateToString(post.createdAt)}</Date>
        </Content>
        <Item>
          <IoIosHeartEmpty size={20} />
          &nbsp;
          <span>{likesCount}</span>
          &nbsp; &nbsp; &nbsp;
          <GoComment size={20} />
          &nbsp;
          <span>{commentsCount}</span>
        </Item>
      </ContentWrap>
    </Post>
  );
};

export default ProfilePost;
