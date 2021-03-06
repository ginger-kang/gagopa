import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../../App';
import { Link } from 'react-router-dom';
import { lightTheme } from '../../../theme';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { GoComment } from 'react-icons/go';
import { IoLogoInstagram } from 'react-icons/io';
import { AiOutlineEllipsis, AiOutlineFullscreen } from 'react-icons/ai';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createPictureLike,
  deletePictureLike,
} from '../../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { dateToString } from '../../../utils/utils';
import { FaQuestion } from 'react-icons/fa';
import { AUTH_ALERT_MESSAGE } from '../../../utils/constant';
import EditDeletePost from './EditDeletePost';
import PictureExpand from './PictureExpand';
import PostLikesUser from './PostLikesUser';

const ArticleWrap = styled.article`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  @media screen and (max-width: 1000px) {
    width: 95vw;
  }
`;

const PictureWrap = styled.div`
  width: 100%;
  padding: 15px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 8px;
`;

const MainPicture = styled.div`
  width: 550px;
  height: 550px;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
  }
  & svg {
    color: white;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    width: 55vw;
    height: 55vw;
    min-width: 400px;
    min-height: 400px;
  }
  @media screen and (max-width: 450px) {
    width: 90vw;
    height: 90vw;
    min-width: 300px;
    min-height: 300px;
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
    @media screen and (max-width: 1000px) {
      width: 6vw;
      height: 6vw;
      min-width: 41px;
      min-height: 41px;
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
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 1000px) {
    width: 95vw;
  }
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
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
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
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transition: all 0.2s ease-in;
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const ContentWrap = styled.div`
  width: 690px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  border-radius: 8px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const AuthorWrap = styled.div`
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 450px) {
    padding: 10px 5px;
  }
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  & a {
    color: ${(props) => props.theme.text};
  }
`;

const AuthorName = styled.span`
  font-size: 1.3rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const CreatedDate = styled.span`
  font-size: 10px;
  color: #888888;
  margin-top: 10px;
`;

const InfoWrap = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  line-height: 2;
`;

const InfoHeader = styled.h3`
  position: relative;
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const ModifyAndDelete = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    right: 15px;
  }
`;

const InfoTitle = styled.h5`
  font-size: 13px;
  color: #848484;
  width: 35px;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 10px;
  font-size: 14px;
  word-break: break-word;

  & span {
    width: 380px;
    @media screen and (max-width: 610px) {
      width: 260px;
    }
    @media screen and (max-width: 510px) {
      width: 190px;
    }
    @media screen and (max-width: 400px) {
      width: 160px;
    }
  }
`;

const IconWrap = styled.div`
  width: 100%;
  padding: 15px;
  border-top: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    cursor: pointer;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const IconContent = styled.div`
  margin-left: 8px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
`;

const Description = styled.span`
  width: 90%;
`;

const UploadLinkButton = styled.button`
  width: 260px;
  height: 40px;
  background: #7038d4;
  color: white;
  border-radius: 8px;
`;

const MoreDescription = styled.span`
  font-size: 14px;
  color: #277cff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Article = ({ pictureObj, moveScrollToComment }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);
  const [likesList, setLikesList] = useState(pictureObj.likes.items);
  const [likesCount, setLikesCount] = useState(likesList.length);
  const [isLiked, setIsLiked] = useState(false);
  const [likesId, setLikesId] = useState(undefined);
  const [likesUserToggle, setLikesUserToggle] = useState(false);
  const [likesUserIds, setLikesUserIds] = useState(null);
  const [firstLikesUser, setFirstLikesUser] = useState(
    pictureObj.likes?.items[0]?.user.username,
  );
  const [description, setDescription] = useState(
    pictureObj.description.length > 47
      ? pictureObj.description.slice(0, 44) + '...'
      : pictureObj.description,
  );
  const [descriptionFlag, setDescriptionFlag] = useState(
    pictureObj.description.length > 48,
  );
  const [pictureIndex, setPictureIndex] = useState(0);
  const [editToggle, setEditToggle] = useState(false);
  const [editPostId, setEditPostId] = useState('');
  const [expandPicture, setExpandPicture] = useState(false);

  const commentsCount = pictureObj.comments.items.length;
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
      alert(AUTH_ALERT_MESSAGE.NOT_SIGN_IN);
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

    if (likesCount === 0) {
      setFirstLikesUser(cognitoUser.username);
    }
    setLikesList((prev) => [...prev, inputData]);
    setLikesCount((prev) => prev + 1);
  };

  const handleDeleteLike = async () => {
    if (!cognitoUser) {
      alert(AUTH_ALERT_MESSAGE.NOT_SIGN_IN);
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
  const alertMessage = () => alert(AUTH_ALERT_MESSAGE.NOT_SIGN_IN);

  const moreDescriptionClick = () => {
    setDescription(pictureObj.description);
    setDescriptionFlag(false);
  };

  const handleEditPost = (id) => {
    setEditToggle((prev) => !prev);
    setEditPostId(id);
  };

  const handleExpandPicture = () => {
    setExpandPicture((prev) => !prev);
  };

  const handleLikesUser = () => {
    let ids = [];
    likesList.forEach((data) => {
      ids.push(data.userId);
    });
    setLikesUserIds(ids);
    setLikesUserToggle((prev) => !prev);
  };

  const displayLikeUsers = () => {
    if (likesCount === 0) {
      return <span>0개</span>;
    } else if (likesCount === 1) {
      return (
        <>
          <span style={{ fontWeight: 'bold' }}>{firstLikesUser}</span>
          <span>님이 좋아합니다.</span>
        </>
      );
    } else {
      return (
        <>
          <span style={{ fontWeight: 'bold' }}>{firstLikesUser}</span>님 외
          <span style={{ fontWeight: 'bold' }}> {likesCount - 1}명</span>
        </>
      );
    }
  };

  return (
    <>
      <ArticleWrap>
        <PictureWrap theme={theme}>
          <MainPicture>
            <img src={pictures[pictureIndex].uri} alt="post" />
            <AiOutlineFullscreen size={30} onClick={handleExpandPicture} />
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
            <InfoHeader theme={theme}>
              사진
              {cognitoUser && cognitoUser.userId === pictureObj.authorId && (
                <ModifyAndDelete>
                  <AiOutlineEllipsis
                    size={30}
                    onClick={() => handleEditPost(pictureObj.id)}
                  />
                </ModifyAndDelete>
              )}
            </InfoHeader>
            <InfoWrap>
              <AuthorWrap theme={theme}>
                <Avatar src={pictureObj.author.avatar.uri} alt="avatar" />
                <Content theme={theme}>
                  <Link to={{ pathname: `/user/${pictureObj.authorId}` }}>
                    <AuthorName>{pictureObj.author.username}</AuthorName>
                  </Link>
                  <CreatedDate>
                    {dateToString(pictureObj.createdAt)}
                  </CreatedDate>
                </Content>
              </AuthorWrap>
              <div style={{ width: '450px', padding: '15px 3px' }}>
                <Info>
                  <InfoContent>
                    <InfoTitle>제목</InfoTitle>
                    <span>{pictureObj.title}</span>
                  </InfoContent>
                </Info>
                <Info>
                  <InfoContent>
                    <InfoTitle>도시</InfoTitle>
                    <span>{pictureObj.city}</span>
                  </InfoContent>
                </Info>
                <Info>
                  <InfoContent>
                    <InfoTitle>위치</InfoTitle>
                    <span>{pictureObj.location}</span>
                  </InfoContent>
                </Info>
                <Info>
                  <InfoContent>
                    <InfoTitle>설명</InfoTitle>
                    <Description>
                      {descriptionFlag ? (
                        <>
                          <span>{description}</span>
                          &nbsp;
                          <MoreDescription onClick={moreDescriptionClick}>
                            더보기
                          </MoreDescription>
                        </>
                      ) : (
                        <span>{description}</span>
                      )}
                    </Description>
                  </InfoContent>
                </Info>
              </div>
            </InfoWrap>
            <IconWrap theme={theme}>
              <Icon>
                {isLiked ? (
                  <IoIosHeart size={28} onClick={handleDeleteLike} />
                ) : (
                  <IoIosHeartEmpty size={28} onClick={handleLike} />
                )}
                <IconContent onClick={handleLikesUser}>
                  {displayLikeUsers()}
                </IconContent>
              </Icon>
              <Icon onClick={moveScrollToComment}>
                <GoComment size={24} />
                <IconContent>{commentsCount}개</IconContent>
              </Icon>
              <Icon
                onClick={() =>
                  window.open(
                    `https://instagram.com/${pictureObj.instagram}`,
                    '_blank',
                  )
                }
              >
                <IoLogoInstagram size={28} />
                <IconContent>
                  <span style={{ fontWeight: 'bold' }}>
                    {pictureObj.instagram}
                  </span>
                </IconContent>
              </Icon>
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
            {cognitoUser ? (
              <>
                <Link to="/upload">
                  <UploadLinkButton>사진 올리러 가기</UploadLinkButton>
                </Link>
              </>
            ) : (
              <UploadLinkButton onClick={alertMessage}>
                여행 사진 올리기
              </UploadLinkButton>
            )}
          </ContentSticky>
        </ContentContainer>
      </ArticleWrap>
      {editToggle && (
        <EditDeletePost
          id={editPostId}
          toggle={handleEditPost}
          pictureObj={pictureObj}
        />
      )}
      {expandPicture && (
        <PictureExpand
          picture={pictures[pictureIndex].uri}
          toggle={handleExpandPicture}
        />
      )}
      {likesUserToggle && (
        <PostLikesUser ids={likesUserIds} toggle={handleLikesUser} />
      )}
    </>
  );
};
export default Article;
