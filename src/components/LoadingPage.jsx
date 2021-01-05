import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
`;

const Dot = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #b9b9b9;
  color: #b9b9b9;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #b9b9b9;
    color: #b9b9b9;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #b9b9b9;
    color: #b9b9b9;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #b9b9b9;
    }
    50%,
    100% {
      background-color: #dedede;
    }
  }
`;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <Loading>
        <Dot />
      </Loading>
    </LoadingContainer>
  );
};

export default LoadingPage;
