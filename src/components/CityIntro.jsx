import React from 'react';
import styled from 'styled-components';
import introImage from '../static/assets/example.jpeg';

const CityIntroContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityIntroWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content;
  align-items: center;
`;

const IntroPictureWrap = styled.div`
  width: 130px;
  height: 130px;

  & img {
    border-radius: 100%;
  }
`;

const IntroContentWrap = styled.div`
  padding: 30px;
`;

const IntroSubhead = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const IntroContent = styled.p`
  font-size: 14px;
  color: #777777;
`;

const CityIntro = ({ cityName }) => {
  return (
    <CityIntroContainer>
      <CityIntroWrap>
        <IntroPictureWrap>
          <img src={introImage} alt="city" />
        </IntroPictureWrap>
        <IntroContentWrap>
          <IntroSubhead>TOKYO</IntroSubhead>
          <IntroContent>일본의 수도이자 중심</IntroContent>
        </IntroContentWrap>
      </CityIntroWrap>
    </CityIntroContainer>
  );
};

export default CityIntro;
