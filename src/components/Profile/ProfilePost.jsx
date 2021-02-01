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
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
  &:last-child {
    border: none;
  }
`;

const Picture = styled.div`
  width: 200px;
  height: 200px;
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
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const City = styled.span`
  font-size: 16px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 13px 0 5px 0;
`;

const Date = styled.span`
  font-size: 11px;
  color: #969696;
`;

const ProfilePost = ({ post }) => {
  const likesCount = post.likes.items.length ? post.likes.items.length : 0;
  const commentsCount = post.comments.items.length
    ? post.comments.items.length
    : 0;
  const postPicture = post.attachment;
  const cityName = getKeyByValue(translateToKo, post.city);
  const description =
    post.description.length > 21
      ? post.description.slice(0, 21) + '...'
      : post.description;
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
          <City>{post.city}</City>
          <Title>{post.title}</Title>
          <Date>{dateToString(post.createdAt)}</Date>
          <p>{description}</p>
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
