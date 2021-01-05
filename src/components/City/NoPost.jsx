import React from 'react';
import styled from 'styled-components';
import doodle from '../../static/assets/doodle.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 60px;
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

const NoPost = ({ hasPost, cityName }) => {
  return (
    !hasPost && (
      <Container>
        <ContentWrap>
          <ImageWrap>
            <img src={doodle} alt="doodle" />
          </ImageWrap>
          <span>사진이 없습니다.</span>
          <span>{cityName} 사진을 첫 번째로 올려주세요!</span>
        </ContentWrap>
      </Container>
    )
  );
};

export default NoPost;
