import React, { useContext } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { UserContext, CognitoContext } from '../App';

const AccountContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
`;

const AccountWrap = styled.div`
  width: 850px;
  margin: 0 auto 0 auto;
  padding: 50px 0 50px 0;
`;

const AccountMenu = styled.div`
  width: 100%;
  height: 500px;
  display: grid;
  background: tomato;
  margin-top: 50px;
`;

const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const AvatarWrap = styled.div`
  width: 150px;
  height: 150px;
`;

const ProfileContent = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 30px;
  line-height: 1.5;
`;

const SubHead = styled.span`
  font-size: 14px;
  color: #888888;
  margin-right: 5px;
`;

// 프로필 편집, 비밀번호 변경, 회원 탈퇴

const Account = () => {
  const { userObj } = useContext(UserContext);
  const { cognitoUser } = useContext(CognitoContext);

  return (
    <>
      <Navigation show={true} />
      <AccountContainer>
        <AccountWrap>
          <ProfileHeader>
            <AvatarWrap>
              <img src={cognitoUser.avatar.uri} alt="avatar" />
            </AvatarWrap>
            <ProfileContent>
              <SubHead>사용자명</SubHead>
              <span>{userObj.username}</span>
              <br />
              <SubHead>이메일</SubHead>
              <span>{userObj.attributes.email}</span>
            </ProfileContent>
          </ProfileHeader>
          <AccountMenu></AccountMenu>
        </AccountWrap>
      </AccountContainer>
    </>
  );
};

export default Account;
