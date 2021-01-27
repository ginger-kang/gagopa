import React from 'react';
import styled from 'styled-components';
import doodle from '../../../static/assets/doodle.png';

const LocationContainer = styled.div`
  width: 950px;
  height: 700px;
`;

const Container = styled.div`
  width: 950px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.5;
  }
`;

const ImageWrap = styled.div`
  width: 320px;
  height: 250px;
  margin-bottom: 20px;
`;

const MapTitle = styled.h3`
  height: 40px;
  padding: 0 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const NoMap = () => {
  return (
    <LocationContainer>
      <MapTitle>위치</MapTitle>
      <Container>
        <ContentWrap>
          <ImageWrap>
            <img src={doodle} alt="doodle" />
          </ImageWrap>
          <span>위치를 지도에 표시하는 도중 문제가 발생 했습니다.</span>
          <span>새로고침을 해주세요.</span>
        </ContentWrap>
      </Container>
    </LocationContainer>
  );
};

export default NoMap;
