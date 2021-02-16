import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  left: 7%;
  top: 60%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    left: 50%;
    top: 60%;
    transform: translateX(-50%);
  }
`;

const Content = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    width: max-content;
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 43px;
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
      <Link to="/city/tokyo">
        <Button>여행하러 가기</Button>
      </Link>
    </Container>
  );
};

export default HomeIntroContent;
