import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { CognitoContext, ThemeContext, UserContext } from '../App';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import { Auth } from 'aws-amplify';

const ProfileWrap = styled.div`
  position: relative;
  margin-left: 20px;

  & svg {
    cursor: pointer;
  }
`;

const ProfileMenuDropDown = styled.div`
  width: 230px;
  position: absolute;
  left: -190px;
  top: 45px;
  background: ${(props) => props.theme.itemBackground};
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  display: block;
  padding: 8px 0 8px 0;

  & ul {
    width: 100%;
    height: 100%;
  }
  & li {
    height: 42px;
    padding: 0 18px 0 18px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 13px;
    color: ${(props) => props.theme.text};

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
  & a {
    color: ${(props) => props.theme.text};
    font-size: 13px;
  }
`;

const AvatarWrap = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Profile = ({ handleDarkTheme, toggleSignIn, toggleSignUp }) => {
  const { theme } = useContext(ThemeContext);
  const { userObj, refreshUser } = useContext(UserContext);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { cognitoUser } = useContext(CognitoContext);

  const onClick = () => setIsActive(!isActive);

  const signOut = async () => {
    const ok = window.confirm('로그아웃 하시겠습니까?');
    if (ok) {
      try {
        await Auth.signOut().then(() => refreshUser(false));
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
  };

  const alertMessage = () => alert('로그인 먼저 해주세요!');

  return (
    <ProfileWrap onClick={onClick} ref={dropdownRef}>
      {userObj ? (
        <AvatarWrap>
          <img src={cognitoUser.avatar.uri} alt="avatar" />
        </AvatarWrap>
      ) : (
        <FaUserCircle size={30} />
      )}
      {isActive && (
        <ProfileMenuDropDown theme={theme}>
          <ul>
            {!userObj && (
              <>
                <li onClick={toggleSignIn}>로그인</li>
                <li
                  style={{ borderBottom: '1px solid #ababab80' }}
                  onClick={toggleSignUp}
                >
                  회원가입
                </li>
              </>
            )}
            {userObj ? (
              <>
                <NavLink to="/account">
                  <li>내 계정</li>
                </NavLink>
                <NavLink to="/upload">
                  <li>여행 사진 올리기</li>
                </NavLink>
              </>
            ) : (
              <li onClick={alertMessage}>여행 사진 올리기</li>
            )}
            <NavLink to="/city/tokyo">
              <li>사진 둘러보기</li>
            </NavLink>
            <li onClick={handleDarkTheme}>화면 테마 설정</li>
            {userObj && (
              <li
                onClick={signOut}
                style={{ borderTop: '1px solid #ababab80' }}
              >
                로그아웃
              </li>
            )}
          </ul>
        </ProfileMenuDropDown>
      )}
    </ProfileWrap>
  );
};

export default Profile;
