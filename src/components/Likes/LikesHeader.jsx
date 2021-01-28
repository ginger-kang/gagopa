import React, { useContext } from 'react';
import styled from 'styled-components';
import { CognitoContext } from '../../App';

const LikesHeaderContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LikesHeaderWrap = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderPictureWrap = styled.div`
  width: 130px;
  height: 130px;

  & img {
    border-radius: 100%;
    object-fit: cover;
  }
`;

const HeaderContentWrap = styled.div`
  padding: 30px;
`;

const HeaderSubhead = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const HeaderContent = styled.div`
  width: 64vw;
  margin: 30px 0 0 0;
  font-size: 15px;
  color: #888888;
`;

const LikesHeader = () => {
  const { cognitoUser } = useContext(CognitoContext);
  return (
    <LikesHeaderContainer>
      <LikesHeaderWrap>
        <HeaderPictureWrap>
          <img src={cognitoUser.avatar.uri} alt="avatar" />
        </HeaderPictureWrap>
        <HeaderContentWrap>
          <HeaderSubhead>{cognitoUser.username}</HeaderSubhead>
        </HeaderContentWrap>
      </LikesHeaderWrap>
      <HeaderContent>{cognitoUser.username}이(가) 좋아요한 사진</HeaderContent>
    </LikesHeaderContainer>
  );
};

export default LikesHeader;
