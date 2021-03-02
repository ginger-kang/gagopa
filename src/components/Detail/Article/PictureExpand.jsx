import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PictureWrap = styled.div`
  width: 50%;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  color: white;
`;

const PictureExpand = ({ picture, toggle }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };
  return (
    <Container onClick={onMaskClick}>
      <PictureWrap>
        <img src={picture} alt="" />
      </PictureWrap>
      <CloseButton onClick={toggle}>
        <AiOutlineClose size={30} />
      </CloseButton>
    </Container>
  );
};

export default PictureExpand;
