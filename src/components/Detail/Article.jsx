import React, { useContext, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../App';
import { lightTheme } from '../../theme';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { GoComment } from 'react-icons/go';
import { IoLogoInstagram } from 'react-icons/io';
import { API, graphqlOperation } from 'aws-amplify';
import { createPictureLike, deletePictureLike } from '../../graphql/mutations';
import { getPicture } from '../../graphql/queries';
import LoadingPage from '../Utils/LoadingPage';

const ArticleWrap = styled.article`
  width: 950px;
  height: 550px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const PictureWrap = styled.div`
  width: 550px;
  height: 100%;
  margin-right: 20px;
`;

const ContentWrap = styled.div`
  width: 400px;
  height: 550px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const AuthorWrap = styled.header`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  padding: 10px 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const AuthorName = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`;

const CreatedDate = styled.span`
  font-size: 10px;
  color: #888888;
  margin-top: 10px;
`;

const InfoWrap = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background: rgba(0, 0, 0, 0.02);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
`;

const Info = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;

  span {
    margin-left: 15px;
  }
  :last-child {
    position: absolute;
    bottom: 0;
  }
`;

const InfoTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const IconWrap = styled.div`
  width: 100%;
  height: 80px;
  border-top: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const Description = styled.span`
  width: 280px;
  height: 20px;
  line-height: 1.3;
`;

const Article = ({ pictureId, date }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);
  const [likesList, setLikesList] = useState([]);
  const [pictureObj, setPictureObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(
    likesList.some((element) => element.userId === cognitoUser.userId),
  );

  const handleLike = async () => {
    if (!cognitoUser) {
      alert('먼저 로그인을 해주세요.');
      return;
    }
    setIsLiked(true);
    const inputData = {
      pictureId: pictureId,
      userId: cognitoUser.userId,
    };
    await API.graphql(
      graphqlOperation(createPictureLike, { input: inputData }),
    );
  };

  const handleDeleteLike = async () => {
    if (!cognitoUser) {
      alert('먼저 로그인을 해주세요.');
      return;
    }
    setIsLiked(false);
    const user = likesList.find(
      (element) => element.userId === cognitoUser.userId,
    );
    const deleteInputData = {
      id: user.id,
    };
    await API.graphql(
      graphqlOperation(deletePictureLike, { input: deleteInputData }),
    );
  };

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(
        graphqlOperation(getPicture, {
          id: pictureId,
        }),
      );
      const picture = data.data.getPicture;
      setPictureObj(picture);
      setLikesList(picture.likes.items);
      setLikesCount(picture.likes.items.length);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [pictureId]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <ArticleWrap>
      <PictureWrap>
        <img src={pictureObj.attachment.uri} alt="post" />
      </PictureWrap>
      <ContentWrap theme={theme}>
        <AuthorWrap theme={theme}>
          <Avatar src={pictureObj.author.avatar.uri} alt="avatar" />
          <Content>
            <AuthorName>{pictureObj.author.username}</AuthorName>
            <CreatedDate>
              {date.year}년 {date.month}월 {date.day}일
            </CreatedDate>
          </Content>
        </AuthorWrap>
        <InfoWrap>
          <Info>
            <InfoTitle>제목</InfoTitle>
            <span style={{ fontWeight: 'bold' }}>{pictureObj.title}</span>
          </Info>
          <Info>
            <InfoTitle>도시</InfoTitle>
            <span>{pictureObj.city}</span>
          </Info>
          <Info>
            <InfoTitle>위치</InfoTitle>
            <span>{pictureObj.location}</span>
          </Info>
          <Info>
            <InfoTitle>설명</InfoTitle>
            <Description>{pictureObj.description}</Description>
          </Info>
          <Info>
            <InfoTitle>Likes</InfoTitle>
            <span>{likesCount}</span>
          </Info>
        </InfoWrap>
        <IconWrap theme={theme}>
          {isLiked ? (
            <IoIosHeart size={35} onClick={handleDeleteLike} />
          ) : (
            <IoIosHeartEmpty size={35} onClick={handleLike} />
          )}
          <GoComment size={31} />
          <IoLogoInstagram
            size={35}
            onClick={() =>
              window.open(
                `https://instagram.com/${pictureObj.instagram}`,
                '_blank',
              )
            }
          />
        </IconWrap>
      </ContentWrap>
    </ArticleWrap>
  );
};
export default Article;
