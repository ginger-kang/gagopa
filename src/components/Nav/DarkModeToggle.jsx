import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../App';

const ThemeModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ThemeModeWrap = styled.div`
  width: 280px;
  height: 200px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.itemBackground};
`;

const ThemeModeHeader = styled.header`
  width: 100%;
  height: 50px;
  position: relative;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid #ababab80 !important;
`;

const Theme = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LightColor = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, #1f78ff, #9cd42f);
  border-radius: 100%;
`;

const Light = styled.div`
  width: 50%;
  height: 100%;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const DarkColor = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, #e8e1e1, #676565);
  border-radius: 100%;
`;

const Dark = styled.div`
  width: 50%;
  height: 100%;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const DarkModeToggle = ({ handleDarkTheme }) => {
  const { theme, setLightTheme, setDarkTheme } = useContext(ThemeContext);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      handleDarkTheme();
    }
  };

  return (
    <ThemeModalContainer onClick={onMaskClick}>
      <ThemeModeWrap theme={theme}>
        <ThemeModeHeader>화면 테마 설정</ThemeModeHeader>
        <Theme>
          <Light onClick={setLightTheme}>
            <LightColor />
            <span>라이트 모드</span>
          </Light>
          <Dark onClick={setDarkTheme}>
            <DarkColor />
            <span>다크 모드</span>
          </Dark>
        </Theme>
      </ThemeModeWrap>
    </ThemeModalContainer>
  );
};

export default DarkModeToggle;
