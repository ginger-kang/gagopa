import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Nav/Navigation';
import { CognitoContext, ThemeContext } from '../App';
import { lightTheme } from '../theme';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import LoadingPage from '../components/Load/LoadingPage';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProfilePost from '../components/Profile/ProfilePost';

const ProfileContainer = styled.main`
  width: 100vw;
  margin: 10px auto 0 auto;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.theme === lightTheme ? '#f5f5f5' : '#252424'};
`;

const ProfileWrap = styled.article`
  width: 1100px;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const UserInfoWrap = styled.div`
  width: 300px;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
  background: ${(props) => props.theme.itemBackground};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  @media screen and (max-width: 800px) {
    width: 95%;
    flex-direction: row;
  }
`;

const Avatar = styled.div`
  width: 280px;
  height: 280px;
  background: none;
  border-radius: 100%;
  margin: 10px 0 0 0;

  & img {
    border-radius: 100%;
    object-fit: fill;
  }
  @media screen and (max-width: 800px) {
    width: 30vw;
    height: 30vw;
    margin: 10px;
  }
`;

const InfoWrap = styled.div`
  width: 100%;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & a {
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 800px) {
    width: 58vw;
  }
`;

const Name = styled.span`
  font-size: 26px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const Email = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  & span {
    font-size: 15px;
    margin-left: 7px;
    @media screen and (max-width: 500px) {
      font-size: 14px;
      margin-left: 0;
      word-break: break-all;
    }
  }
  & svg {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
`;

const Introduce = styled.p`
  font-size: 16px;
  line-height: 20px;
  margin-top: 20px;
  @media screen and (max-width: 500px) {
    margin-top: 12px;
  }
`;

const EditButton = styled.button`
  width: 280px;
  height: 35px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  margin-top: 20px;
  background: ${(props) =>
    props.theme === lightTheme ? '#7038d4' : '#fcfcfc'};
  color: ${(props) => (props.theme === lightTheme ? '#fcfcfc' : '#363537')};

  &:hover {
    background: ${(props) =>
      props.theme === lightTheme ? '#5e2fb3' : '#d4d4d4'};
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    margin-top: 12px;
  }
`;

const PostContainer = styled.div`
  width: 650px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
  background: ${(props) => props.theme.itemBackground};
  border-radius: 8px;
  margin-bottom: 60px;
  @media screen and (max-width: 800px) {
    width: 95%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

const PostHeader = styled.h4`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
`;

const PostWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);
  const userId = match.params.id;
  const isOwnUser = cognitoUser && userId === cognitoUser.userId;

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(
        graphqlOperation(getUser, {
          userId: userId,
        }),
      );
      const userData = await data.data.getUser;
      setUser(userData);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Navigation show={true} navSearch={true} />
      <ProfileContainer theme={theme}>
        <ProfileWrap>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <UserInfoWrap theme={theme}>
                <Avatar>
                  <img src={user.avatar.uri} alt="avatar" />
                </Avatar>
                <InfoWrap>
                  <Name>{user.username}</Name>
                  <Email>
                    <AiOutlineMail size={22} />
                    <span>{user.email}</span>
                  </Email>
                  <Introduce>{user.introduce}</Introduce>
                  {isOwnUser && (
                    <Link to="/profile/edit">
                      <EditButton theme={theme}>프로필 수정하기</EditButton>
                    </Link>
                  )}
                </InfoWrap>
              </UserInfoWrap>
              <PostContainer theme={theme}>
                <PostHeader theme={theme}>{user.username}의 사진</PostHeader>
                <PostWrap>
                  {user.pictures.items.map((post) => (
                    <ProfilePost key={post.id} post={post} />
                  ))}
                </PostWrap>
              </PostContainer>
            </>
          )}
        </ProfileWrap>
      </ProfileContainer>
    </>
  );
};

export default Profile;
