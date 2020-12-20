import React from 'react';
import styled from 'styled-components';
import mainImage from '../static/assets/mainImage.jpg';
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 50px 30px 50px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <BackgroundContainer>
        <ImageWrap>
          <img src={mainImage} alt="main" />
        </ImageWrap>
      </BackgroundContainer>
      <HomeCityListContainer>
        <HomeCityList />
      </HomeCityListContainer>
    </HomeContainer>
  );
};

export default Home;
