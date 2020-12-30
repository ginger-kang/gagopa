import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import { IoIosClose } from 'react-icons/io';

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
`;

const SignUpWrap = styled.div`
  width: 520px;
  height: 480px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.itemBackground};
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
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const InputWrap = styled.div`
  width: 70%;
  height: 70px;

  & input {
    padding: 15px;
    width: 100%;
    margin-top: 3px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:focus {
      outline: none;
      border: 2px solid #7038d4;
    }
  }
`;

const SubmitButton = styled.button`
  width: 70%;
  height: 47px;
  background: #7038d4;
  color: white;
  font-size: 14px;
  margin-top: 3px;
  border-radius: 5px;
`;

const SignUp = ({ toggleSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'code') {
      setCode(value);
    }
  };

  const signUp = async () => {
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
      console.log('error signing up:', error);
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
      console.log('error confirming sign up', error);
    }
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
                  placeholder="비밀번호"
                />
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
              </InputWrap>
              <SubmitButton onClick={signUp}>회원가입</SubmitButton>
            </>
          ) : (
            <>
              <div>{email}로 보낸 회원가입 코드를 입력해주세요.</div>
              <InputWrap>
                <input
                  name="code"
                  type="code"
                  required
                  value={code}
                  onChange={onChange}
                  placeholder="확인코드"
                />
              </InputWrap>
              <SubmitButton onClick={confirmSignUp}>확인</SubmitButton>
            </>
          )}
        </SignUpMain>
      </SignUpWrap>
    </SignUpContainer>
  );
};

export default SignUp;
