import React from 'react';
import styled from 'styled-components';
import bgImage from '../static/assets/bgImage.png';
import awsconfig from '../aws-exports';
import HomeCityList from '../components/HomeCityList';

const HomeContainer = styled.main`
  width: 100%;
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 750px;
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  & img {
    object-fit: cover;
  }
`;

const HomeCityListContainer = styled.div`
  width: 100%;
  height: 250px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 70px 30px 70px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <BackgroundContainer>
        <ImageWrap>
          <img src={bgImage} alt="bgimage" />
        </ImageWrap>
      </BackgroundContainer>
      <HomeCityListContainer>
        <HomeCityList />
      </HomeCityListContainer>
    </HomeContainer>
  );
};

export default Home;
