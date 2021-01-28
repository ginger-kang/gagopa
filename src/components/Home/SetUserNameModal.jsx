import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { lightTheme } from '../../theme';
import { Link } from 'react-router-dom';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalWrap = styled.div`
  width: 320px;
  height: 220px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#565656')};
  background: ${(props) => props.theme.itemBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  line-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    &:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
`;

const ButtonWrap = styled.div`
  width: 280px;
  height: 46px;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${(props) =>
    props.theme === lightTheme ? '#7038d4' : '#fcfcfc'};
  color: ${(props) => (props.theme === lightTheme ? '#fcfcfc' : '#363537')};
  &:hover {
    background: ${(props) =>
      props.theme === lightTheme ? '#5f2eb7' : '#e0e0e0'};
  }
`;

const SetUserNameModal = ({ toggleFirstUser }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ModalContainer>
      <ModalWrap theme={theme}>
        <Content>
          <span>현재 닉네임이 설정되어 있지 않습니다.</span>
          <span
            style={{ fontSize: '12px', opacity: '0.8', marginBottom: '20px' }}
          >
            구글 계정으로 로그인한 경우
            <br />
            초기 닉네임을 설정해야 합니다.
          </span>
        </Content>
        <ButtonWrap>
          <Link to="/profile/edit">
            <Button theme={theme} onClick={toggleFirstUser}>
              닉네임 설정하러 가기
            </Button>
          </Link>
        </ButtonWrap>
      </ModalWrap>
    </ModalContainer>
  );
};

export default SetUserNameModal;
