import React from 'react';
import styled from 'styled-components';
import { IoArrowDownCircleOutline } from 'react-icons/io5';

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 60px;
`;

const Button = styled.button`
  background: none;
  margin: 0 auto;

  & svg {
    color: #9c9c9c;
  }
`;

const GetNextPostButton = ({ hasNext, getNextPost }) => {
  return (
    hasNext && (
      <ButtonContainer>
        <Button onClick={getNextPost}>
          <IoArrowDownCircleOutline size={38} />
        </Button>
      </ButtonContainer>
    )
  );
};

export default GetNextPostButton;
