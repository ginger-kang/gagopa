import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { Auth } from 'aws-amplify';
import { ThemeContext } from '../../App';
import { UserContext } from '../../App';
import { getCurrentUserInfo } from '../User/CreateUser';
import googleLogo from '../../static/assets/googleLogo.svg';

const SignInContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.isSignIn ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.5)'};
  z-index: 999;
`;

const SignInWrap = styled.div`
  width: 520px;
  height: 480px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.itemBackground};
  opacity: ${(props) => (props.isSignIn ? 0.95 : 1)};
`;

const SignInHeader = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid rgb(235, 235, 235) !important;
`;

const CloseButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: none;
  position: absolute;
  left: 15px;
  top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  & svg {
    color: ${(props) => props.theme.text};
  }
`;

const Header = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const SignInMain = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const InputWrap = styled.div`
  width: 70%;

  & input {
    padding: 15px;
    width: 100%;
    margin-top: 18px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:focus {
      outline: none;
      border: 1.5px solid #7038d4;
    }
  }
`;

const LoginButton = styled.button`
  width: 70%;
  height: 47px;
  background: #7038d4;
  color: white;
  font-size: 14px;
  margin-top: 18px;
  border-radius: 5px;
  pointer-events: ${(props) => (props.isSignIn ? 'none' : 'auto')};
  filter: ${(props) =>
    props.isSignIn ? 'brightness(85%)' : 'brightness(100%)'};
`;

const GoogleLoginWrap = styled.div`
  width: 70%;
  margin-top: 18px;
  filter: ${(props) =>
    props.isSignIn ? 'brightness(85%)' : 'brightness(100%)'};
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 47px;
    border-radius: 8px;
    border: 2px solid #1f72eb;
    font-size: 0.8rem;
    cursor: pointer;
    background: white;
    color: #363537;
    pointer-events: ${(props) => (props.isSignIn ? 'none' : 'auto')};
  }
  & img {
    width: 25px;
    margin-right: 10px;
  }
`;

const SignIn = ({ toggleSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { refreshUser } = useContext(UserContext);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const signIn = async () => {
    try {
      setIsSignIn(true);
      await Auth.signIn(username, password).then(() => getCurrentUserInfo());
      window.location.reload();
      refreshUser(true);
    } catch (error) {
      alert('사용자명 혹은 비밀번호를 확인해 주세요.');
      setIsSignIn(false);
      console.log('error signing in', error);
    }
  };

  const onKeyPress = (e) => {
    if (!isSignIn && e.key === 'Enter') {
      signIn();
    }
  };

  const googleSignIn = () => {
    Auth.federatedSignIn({ provider: 'Google' });
  };

  const onCloseClick = () => toggleSignIn();
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleSignIn();
    }
  };

  return (
    <SignInContainer isSignIn={isSignIn} onClick={onMaskClick}>
      <SignInWrap isSignIn={isSignIn} theme={theme}>
        <SignInHeader>
          <CloseButton theme={theme} onClick={onCloseClick}>
            <IoIosClose size={28} />
          </CloseButton>
          <Header>로그인</Header>
        </SignInHeader>
        <SignInMain>
          <InputWrap>
            <input
              name="username"
              type="username"
              required
              value={username}
              onChange={onChange}
              onKeyPress={onKeyPress}
              placeholder="사용자명"
            />
          </InputWrap>
          <InputWrap>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={onChange}
              onKeyPress={onKeyPress}
              placeholder="비밀번호"
            />
          </InputWrap>
          {isSignIn ? (
            <LoginButton isSignIn={isSignIn} onClick={signIn} disabled>
              로그인
            </LoginButton>
          ) : (
            <LoginButton isSignIn={isSignIn} onClick={signIn}>
              로그인
            </LoginButton>
          )}
          <GoogleLoginWrap isSignIn={isSignIn}>
            <button onClick={googleSignIn}>
              <img src={googleLogo} alt="google" />
              구글 계정으로 로그인
            </button>
          </GoogleLoginWrap>
        </SignInMain>
      </SignInWrap>
    </SignInContainer>
  );
};

export default SignIn;
