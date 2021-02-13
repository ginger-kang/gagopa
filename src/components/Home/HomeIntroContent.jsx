import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 7%;
  top: 55%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  border-radius: 30px;
  color: white;
  border: 1px solid white;
  background: none;
  margin-top: 30px;
  font-size: 14px;
  &:hover {
    color: #353537;
    border: none;
    background: white;
  }
`;

const HomeIntroContent = () => {
  return (
    <Container>
      <Content>
        <span>집에서 일본 여행하고</span>
        <span>몰랐던 여행 스팟 알아가자</span>
      </Content>
      <Button>여행하러 가기</Button>
    </Container>
  );
};

export default HomeIntroContent;
