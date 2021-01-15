import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import Navigation from '../components/Nav/Navigation';
import { lightTheme } from '../theme';
import { Auth } from 'aws-amplify';

const EditContainer = styled.div`
  width: 100%;
  padding-top: 70px;
`;

const EditWrap = styled.div`
  width: 750px;
  margin: 0 auto;
  padding: 50px 0;
`;

const EditTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;
const Edit = styled.div`
  width: 100%;
  padding: 20px;
  background: ${(props) => props.theme.itemBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    width: 135px;
    text-align: center;
    font-size: 15px;
    margin-right: 10px;
  }
  :first-child {
    margin: 40px 0;
  }
  :nth-child(2) {
    margin-bottom: 10px;
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
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
`;
const ButtonWrap = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 45px;
`;

const SubmitButton = styled.button`
  width: 110px;
  height: 47px;
  background: none;
  color: ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
`;

const Cancel = styled.button`
  width: 110px;
  height: 47px;
  color: #ca2121;
  background: none;
  border: 1px solid #ca2121;
  font-size: 14px;
  border-radius: 5px;
`;

const PasswordEdit = () => {
  const { theme } = useContext(ThemeContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'newPasswordConfirm') {
      setNewPasswordConfirm(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (oldPassword !== newPassword && newPassword === newPasswordConfirm) {
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, oldPassword, newPassword);
        })
        .then((data) => console.log(data))
        .then(() => alert('비밀번호 변경이 완료되었습니다.'))
        .then(() => history.push('/account'))
        .catch((err) => alert(err.message));
    } else {
      alert('비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
      <Navigation show={true} navSearch={true} />
      <EditContainer>
        <EditWrap>
          <EditTitle>비밀번호 변경</EditTitle>
          <Edit theme={theme}>
            <InputContainer>
              <span>현재 비밀번호</span>
              <InputWrap>
                <input
                  name="oldPassword"
                  type="password"
                  placeholder="현재 비밀번호"
                  onChange={onChange}
                  required
                ></input>
              </InputWrap>
            </InputContainer>
            <InputContainer>
              <span>새로운 비밀번호</span>
              <InputWrap>
                <input
                  name="newPassword"
                  type="password"
                  placeholder="비밀번호는 8 ~ 15자리의 숫자, 영문 및 특수문자 사용"
                  onChange={onChange}
                  required
                ></input>
              </InputWrap>
            </InputContainer>
            <InputContainer>
              <span>새로운 비밀번호 확인</span>
              <InputWrap>
                <input
                  type="password"
                  name="newPasswordConfirm"
                  placeholder="새 비밀번호 확인"
                  onChange={onChange}
                  required
                ></input>
              </InputWrap>
            </InputContainer>
            <ButtonWrap>
              <SubmitButton theme={theme} onClick={onSubmit}>
                제출
              </SubmitButton>
              <Link to="/account">
                <Cancel>취소</Cancel>
              </Link>
            </ButtonWrap>
          </Edit>
        </EditWrap>
      </EditContainer>
    </>
  );
};

export default PasswordEdit;
