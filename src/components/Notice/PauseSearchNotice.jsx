import React, { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { ThemeContext } from '../../App';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const NoticeWrap = styled.div`
  width: 300px;
  height: 240px;
  border-radius: 8px;
  position: relative;
  background: ${(props) => props.theme.itemBackground};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Notice = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 600;

  & span {
    font-size: 60px;
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & span {
    margin-left: 5px;
    line-height: 1.5;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

const PauseSearchNotice = ({ trigger }) => {
  const { theme } = useContext(ThemeContext);
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      trigger();
    }
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <NoticeWrap theme={theme}>
        <Notice>
          <span>🙇‍♂️</span>
        </Notice>
        <Info>
          <span>
            개발자가 검색 기능을 유지할만한 <br />
            돈이 없어 지원을 중지합니다.
          </span>
        </Info>
        <CloseButton theme={theme} onClick={() => trigger()}>
          <AiOutlineClose size={20} />
        </CloseButton>
      </NoticeWrap>
    </ModalContainer>
  );
};

export default PauseSearchNotice;
