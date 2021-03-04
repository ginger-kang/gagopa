import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { listUsers } from '../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { ThemeContext } from '../../../App';
import LoadingPage from '../../Load/LoadingPage';
import { Link } from 'react-router-dom';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ListWrap = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 15px;
  background: ${(props) => props.theme.itemBackground};
  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const ListHeader = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid #ababab80 !important;
`;

const UserList = styled.ul`
  width: 100%;
  height: 420px;
  overflow: auto;
`;

const User = styled.li`
  width: 100%;
  height: 70px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ababab80 !important;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 14px;
  margin-left: 15px;
`;

const PostLikesUser = ({ ids, toggle }) => {
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCityMenuList = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(graphqlOperation(listUsers));
      const users = await data.data.listUsers.items;
      const likesUser = users.filter((user) => ids.includes(user.userId));
      setUsers(likesUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [ids]);

  useEffect(() => {
    getCityMenuList();
  }, [getCityMenuList]);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <ListWrap theme={theme}>
        <ListHeader>좋아요한 사람</ListHeader>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <UserList>
            {users.map((user, index) => (
              <Link to={{ pathname: `/user/${user.userId}` }} key={index}>
                <User
                  theme={theme}
                  onClick={() => {
                    toggle();
                  }}
                >
                  <Avatar src={user.avatar.uri} alt="avatar" />
                  <Name>{user.username}</Name>
                </User>
              </Link>
            ))}
          </UserList>
        )}
      </ListWrap>
    </ModalContainer>
  );
};

export default PostLikesUser;
