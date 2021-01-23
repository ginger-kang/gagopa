import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../../App';
import { lightTheme } from '../../../theme';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { GoComment } from 'react-icons/go';
import { IoLogoInstagram } from 'react-icons/io';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createPictureLike,
  deletePictureLike,
} from '../../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { dateToString } from '../../../utils/utils';
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaBookOpen,
  FaMagic,
  FaQuestion,
} from 'react-icons/fa';

const ArticleWrap = styled.article`
  width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const PictureWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const MainPicture = styled.div`
  width: 550px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const PicturePreview = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & div {
    width: 60px;
    height: 60px;
    opacity: 0.4;
    margin: 0 6px;
    cursor: pointer;

    &:nth-child(${(props) => props.index + 1}) {
      opacity: 1;
    }
  }
`;

const Picture = styled.div`
  & img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 1000px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentSticky = styled.div`
  width: 300px;
  height: 300px;
  margin-left: 10px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  position: sticky;
  top: 73px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  & span {
    text-align: center;
    font-size: 14px;
    line-height: 1.3;
  }
  & div {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
    &:hover {
      transition: all 0.2s ease-in;
      transform: scale(1.1);
    }
  }
`;

const ContentWrap = styled.div`
  width: 480px;
  height: 600px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  border-radius: 10px;
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
  height: 410px;
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
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  line-height: 1.8;
  margin-top: 20px;
`;

const InfoTitle = styled.span`
  font-size: 17px;
  font-weight: bold;
`;

const InfoContent = styled.div`
  max-width: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 30px;
`;

const IconWrap = styled.div`
  width: 100%;
  height: 70px;
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
  width: 90%;
  height: 20px;
  margin-top: 5px;
  line-height: 1.3;
`;

const UploadLinkButton = styled.button`
  width: 80%;
  height: 45px;
  background: linear-gradient(45deg, #9f04ff, #3a19f1);
  color: white;
  border-radius: 8px;
`;

const Article = ({ pictureObj }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);
  const [likesList, setLikesList] = useState(pictureObj.likes.items);
  const [likesCount, setLikesCount] = useState(likesList.length);
  const [isLiked, setIsLiked] = useState(false);
  const [likesId, setLikesId] = useState(undefined);
  const [pictureIndex, setPictureIndex] = useState(0);

  const pictures = pictureObj.attachment;

  useEffect(() => {
    if (cognitoUser) {
      let user = likesList.find(
        (element) => element.userId === cognitoUser.userId,
      );
      setIsLiked(
        likesList.some((element) => element.userId === cognitoUser.userId),
      );
      setLikesId(user ? user.id : undefined);
    }
  }, [cognitoUser, likesList]);

  const handleLike = async () => {
    if (!cognitoUser) {
      alert('먼저 로그인을 해주세요.');
      return;
    }
    const id = uuidv4();
    const inputData = {
      id: id,
      pictureId: pictureObj.id,
      userId: cognitoUser.userId,
    };
    await API.graphql(graphqlOperation(createPictureLike, { input: inputData }))
      .then(() => setIsLiked(true))
      .then(() => setLikesId(id));
    setLikesList((prev) => [...prev, inputData]);
    setLikesCount((prev) => prev + 1);
  };

  const handleDeleteLike = async () => {
    if (!cognitoUser) {
      alert('먼저 로그인을 해주세요.');
      return;
    }
    const deleteInputData = {
      id: likesId,
    };
    await API.graphql(
      graphqlOperation(deletePictureLike, { input: deleteInputData }),
    )
      .then(() => setIsLiked(false))
      .then(() => setLikesId(undefined));
    const myLike = likesList.filter((like) => like.id === likesId);
    const idx = likesList.indexOf(myLike);
    const nextLikesList = likesList.splice(idx, 1);
    if (idx > -1) setLikesList(nextLikesList);
    setLikesCount((prev) => prev - 1);
  };

  const onPicturePreviewClick = (index) => setPictureIndex(index);

  return (
    <ArticleWrap>
      <PictureWrap>
        <MainPicture>
          <img src={pictures[pictureIndex].uri} alt="post" />
        </MainPicture>
        <PicturePreview index={pictureIndex}>
          {pictures.map((picture, index) => (
            <Picture key={index} onClick={() => onPicturePreviewClick(index)}>
              <img src={picture.uri} alt="post" />
            </Picture>
          ))}
        </PicturePreview>
      </PictureWrap>
      <ContentContainer>
        <ContentWrap theme={theme}>
          <AuthorWrap theme={theme}>
            <Avatar src={pictureObj.author.avatar.uri} alt="avatar" />
            <Content>
              <AuthorName>{pictureObj.author.username}</AuthorName>
              <CreatedDate>{dateToString(pictureObj.createdAt)}</CreatedDate>
            </Content>
          </AuthorWrap>
          <InfoWrap>
            <Info>
              <FaMagic size={30} />
              <InfoContent>
                <InfoTitle>제목</InfoTitle>
                <span style={{ fontSize: '14.5px' }}>{pictureObj.title}</span>
              </InfoContent>
            </Info>
            <Info>
              <FaBuilding size={30} />
              <InfoContent>
                <InfoTitle>도시</InfoTitle>
                <span>{pictureObj.city}</span>
              </InfoContent>
            </Info>
            <Info>
              <FaMapMarkerAlt size={30} />
              <InfoContent>
                <InfoTitle>위치</InfoTitle>
                <span>{pictureObj.location}</span>
              </InfoContent>
            </Info>
            <Info>
              <FaBookOpen size={30} />
              <InfoContent>
                <InfoTitle>설명</InfoTitle>
                <Description>{pictureObj.description}</Description>
              </InfoContent>
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
        <ContentSticky theme={theme}>
          <span>
            여러분들만의
            <br />
            일본 여행 사진을 올려주세요.
          </span>
          <div>
            <FaQuestion size={28} />
          </div>
          <UploadLinkButton>사진 올리러 가기</UploadLinkButton>
        </ContentSticky>
      </ContentContainer>
    </ArticleWrap>
  );
};
export default Article;
