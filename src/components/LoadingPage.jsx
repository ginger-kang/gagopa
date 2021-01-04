import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
`;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <div>loading...</div>
    </LoadingContainer>
  );
};

export default LoadingPage;
