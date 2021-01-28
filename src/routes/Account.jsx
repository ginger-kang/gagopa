import React, { useContext } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Nav/Navigation';
import { CognitoContext, ThemeContext, UserContext } from '../App';
import { FcBusinessContact, FcCancel, FcKey } from 'react-icons/fc';
import { lightTheme } from '../theme';
import { Link, Redirect } from 'react-router-dom';
import { AUTH_ALERT_MESSAGE } from '../utils/constant';

const AccountContainer = styled.div`
  width: 100%;
  padding-top: 70px;
`;

const AccountWrap = styled.div`
  width: 850px;
  margin: 0 auto 0 auto;
  padding: 50px 0 50px 0;
`;

const AccountMenu = styled.div`
  width: 100%;
  display: grid;
  margin-top: 50px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  & div {
    border: 1px solid
      ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
    background: ${(props) => props.theme.itemBackground};
  }
  & span {
    margin: 20px 0 20px 0;
  }
  & a {
    color: ${(props) => props.theme.text};
  }
  & p {
    line-height: 1.5;
    font-size: 14px;
    color: #888888;
  }
`;

const MenuWrap = styled.div`
  height: 180px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  cursor: pointer;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const MyAccountTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 10px;
  margin-bottom: 30px;
`;

const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const AvatarWrap = styled.div`
  width: 150px;
  height: 150px;

  & img {
    border-radius: 100%;
    object-fit: cover;
  }
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

const Account = () => {
  const { cognitoUser } = useContext(CognitoContext);
  const { userObj } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  if (userObj === null) {
    return <Redirect to="/" />;
  }
  const { attributes } = userObj;

  const notChange = () => {
    alert(AUTH_ALERT_MESSAGE.GOOGLE_CANNOT_EDIT_PASSWORD);
  };

  return (
    <>
      <Navigation show={true} navSearch={true} />
      <AccountContainer>
        <AccountWrap>
          <MyAccountTitle>내 계정</MyAccountTitle>
          <ProfileHeader>
            <AvatarWrap>
              {cognitoUser && <img src={cognitoUser.avatar.uri} alt="avatar" />}
            </AvatarWrap>
            <ProfileContent>
              <SubHead>닉네임</SubHead>
              <span>{cognitoUser.username}</span>
              <br />
              <SubHead>이메일</SubHead>
              <span>{cognitoUser.email}</span>
            </ProfileContent>
          </ProfileHeader>
          <AccountMenu theme={theme}>
            <Link to="/profile/edit">
              <MenuWrap>
                <FcBusinessContact size={39} />
                <span>프로필 편집</span>
                <p>프로필 사진, 닉네임 등을 변경하세요.</p>
              </MenuWrap>
            </Link>
            {attributes.identities ? (
              <MenuWrap onClick={notChange}>
                <FcKey size={39} />
                <span>비밀번호 변경</span>
                <p>비밀번호를 변경하세요.</p>
              </MenuWrap>
            ) : (
              <Link to="/password/edit">
                <MenuWrap>
                  <FcKey size={39} />
                  <span>비밀번호 변경</span>
                  <p>비밀번호를 변경하세요.</p>
                </MenuWrap>
              </Link>
            )}
            <MenuWrap>
              <FcCancel size={39} />
              <span>회원 탈퇴</span>
              <p>계정을 삭제하세요.</p>
            </MenuWrap>
          </AccountMenu>
        </AccountWrap>
      </AccountContainer>
    </>
  );
};

export default Account;
