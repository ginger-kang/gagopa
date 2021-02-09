import React from 'react';
import styled from 'styled-components';
import doodle from '../../../static/assets/doodle.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 30px 0;
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
    @media screen and (max-width: 500px) {
      font-size: 1rem;
      width: 80%;
      text-align: center;
      word-break: keep-all;
    }
  }
`;

const ImageWrap = styled.div`
  width: 320px;
  height: 250px;
  margin-bottom: 20px;
`;

const NoComment = ({ hasComment }) => {
  return (
    !hasComment && (
      <Container>
        <ContentWrap>
          <ImageWrap>
            <img src={doodle} alt="doodle" />
          </ImageWrap>
          <span>등록된 댓글이 없습니다.</span>
        </ContentWrap>
      </Container>
    )
  );
};

export default NoComment;
