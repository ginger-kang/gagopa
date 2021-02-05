import React, { useContext } from 'react';
import styled from 'styled-components';
import { CognitoContext } from '../../App';

const LikesHeaderContainer = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LikesHeaderWrap = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderAvatarWrap = styled.div`
  width: 130px;
  height: 130px;

  & img {
    border-radius: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 400px) {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: 338px) {
    width: 80px;
    height: 80px;
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
  margin: 30px 0 20px 0;
  font-size: 15px;
  color: #888888;
  @media screen and (max-width: 690px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LikesHeader = () => {
  const { cognitoUser } = useContext(CognitoContext);
  return (
    <LikesHeaderContainer>
      <LikesHeaderWrap>
        <HeaderAvatarWrap>
          <img src={cognitoUser.avatar.uri} alt="avatar" />
        </HeaderAvatarWrap>
        <HeaderContentWrap>
          <HeaderSubhead>{cognitoUser.username}</HeaderSubhead>
        </HeaderContentWrap>
      </LikesHeaderWrap>
      <HeaderContent>{cognitoUser.username}이(가) 좋아요한 사진</HeaderContent>
    </LikesHeaderContainer>
  );
};

export default LikesHeader;
