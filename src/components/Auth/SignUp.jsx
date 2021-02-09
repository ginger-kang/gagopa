import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import { IoIosClose } from 'react-icons/io';
import googleLogo from '../../static/assets/googleLogo.svg';
import LoadingPage from '../Load/LoadingPage';
import { AUTH_ALERT_MESSAGE } from '../../utils/constant';
import sprintingDoodle from '../../static/assets/sprintingDoodle.png';

const SignUpContainer = styled.div`
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

const SignUpWrap = styled.div`
  width: 520px;
  height: 610px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.itemBackground};
  @media screen and (max-width: 550px) {
    width: 95vw;
  }
  @media screen and (max-width: 330px) {
    height: 550px;
  }
`;

const SignUpHeader = styled.header`
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

const SignUpMain = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  @media screen and (max-width: 330px) {
    height: 500px;
  }
`;

const InputWrap = styled.div`
  width: 70%;
  height: 70px;
  :not(:first-child) {
    margin-top: 10px;
  }
  & input {
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &:focus {
      outline: none;
      border: 1px solid #7038d4;
    }
  }
  & span {
    display: inline-block;
    margin: 5px;
    font-size: 8px;
    opacity: 0.6;
  }
  @media screen and (max-width: 550px) {
    width: 85%;
  }
  @media screen and (max-width: 330px) {
    height: 60px;
  }
`;

const ConfirmInputWrap = styled.div`
  width: 70%;
  & input {
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &:focus {
      outline: none;
      border: 1px solid #7038d4;
    }
  }
  & span {
    display: inline-block;
    margin: 5px;
    font-size: 8px;
    opacity: 0.6;
  }
  @media screen and (max-width: 550px) {
    width: 85%;
  }
`;

const SubmitButton = styled.button`
  width: 70%;
  height: 47px;
  background: #7038d4;
  color: white;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 5px;
  @media screen and (max-width: 550px) {
    width: 85%;
  }
`;

const ConfirmButton = styled.button`
  width: 70%;
  height: 47px;
  background: #7038d4;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 15px;
  @media screen and (max-width: 550px) {
    width: 85%;
  }
`;

const GoogleLoginWrap = styled.div`
  width: 70%;
  margin-top: 18px;
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 47px;
    margin-top: 20px;
    border-radius: 8px;
    border: 2px solid #1f72eb;
    font-size: 0.8rem;
    cursor: pointer;
    background: white;
    color: #363537;
  }
  & img {
    width: 25px;
    margin-right: 10px;
  }
  @media screen and (max-width: 550px) {
    width: 85%;
  }
`;

const ConfirmContent = styled.div`
  width: 80%;
  padding: 20px 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  line-height: 20px;
  @media screen and (max-width: 550px) {
    width: 85%;
  }
`;

const DoodleWrap = styled.div`
  width: 300px;
  @media screen and (max-width: 330px) {
    width: 200px;
  }
`;

const ConfirmWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SignUp = ({ toggleSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [isSignInClick, setIsSignInClick] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'code') {
      setCode(value);
    }
  };

  const signUp = async () => {
    if (password !== passwordConfirm) {
      alert(AUTH_ALERT_MESSAGE.PASSWORD_INCORRECT);
      return;
    }
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setConfirm((confirm) => !confirm);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onCloseClick = () => toggleSignUp();
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleSignUp();
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code).then(window.location.reload());
    } catch (error) {
      console.log(error.message);
    }
  };
  const googleSignIn = () => {
    setIsSignInClick(true);
    Auth.federatedSignIn({ provider: 'Google' });
  };

  return (
    <SignUpContainer onClick={onMaskClick}>
      <SignUpWrap theme={theme}>
        <SignUpHeader>
          <CloseButton theme={theme} onClick={onCloseClick}>
            <IoIosClose size={28} />
          </CloseButton>
          <Header>회원가입</Header>
        </SignUpHeader>
        {isSignInClick ? (
          <SignUpMain>
            <LoadingPage />
          </SignUpMain>
        ) : (
          <SignUpMain>
            {!confirm ? (
              <>
                <InputWrap>
                  <input
                    name="username"
                    type="username"
                    required
                    value={username}
                    onChange={onChange}
                    placeholder="아이디"
                  />
                  <span>로그인 아이디가 초기 닉네임으로 설정됩니다.</span>
                </InputWrap>
                <InputWrap>
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={onChange}
                    placeholder="비밀번호"
                  />
                  <span>
                    비밀번호는 8 ~ 15자리의 숫자, 영문 및 특수문자 사용
                  </span>
                </InputWrap>
                <InputWrap>
                  <input
                    name="passwordConfirm"
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={onChange}
                    placeholder="비밀번호 확인"
                  />
                  <span>
                    비밀번호는 8 ~ 15자리의 숫자, 영문 및 특수문자 사용
                  </span>
                </InputWrap>
                <InputWrap>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={onChange}
                    placeholder="이메일 주소"
                  />
                  <span>입력하신 이메일 주소로 확인 코드가 발송됩니다.</span>
                </InputWrap>
                <SubmitButton onClick={signUp}>회원가입</SubmitButton>
                <GoogleLoginWrap>
                  <div style={{ borderBottom: '1px solid #ababab80' }}></div>
                  <button onClick={googleSignIn}>
                    <img src={googleLogo} alt="google" />
                    구글 계정으로 로그인
                  </button>
                </GoogleLoginWrap>
              </>
            ) : (
              <>
                <ConfirmWrap>
                  <ConfirmContent>
                    <DoodleWrap>
                      <img src={sprintingDoodle} alt="doodle" />
                    </DoodleWrap>
                    <span style={{ fontWeight: '600' }}>{email}</span>(으)로
                    보낸 회원가입 코드를 입력해주세요.
                  </ConfirmContent>
                  <ConfirmInputWrap>
                    <input
                      name="code"
                      type="code"
                      required
                      value={code}
                      onChange={onChange}
                      placeholder="확인코드"
                    />
                  </ConfirmInputWrap>
                  <ConfirmButton onClick={confirmSignUp}>확인</ConfirmButton>
                </ConfirmWrap>
              </>
            )}
          </SignUpMain>
        )}
      </SignUpWrap>
    </SignUpContainer>
  );
};

export default SignUp;
