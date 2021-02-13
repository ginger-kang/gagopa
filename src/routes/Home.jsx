import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import styled from 'styled-components';
import mainImage from '../static/assets/mainImage.jpg';
import HomeCityList from '../components/Home/HomeCityList';
import SetUserNameModal from '../components/Home/SetUserNameModal';
import Navigation from '../components/Nav/Navigation';
import { NAV_SCROLL_OFFSET } from '../utils/constant';
import { CognitoContext } from '../App';
import PopularPost from '../components/Home/PopularPost';
import HomeIntroContent from '../components/Home/HomeIntroContent';

const HomeContainer = styled.main`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  & img {
    object-fit: cover;
  }
`;

const HomeCityListContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  @media screen and (max-width: 1415px) {
    padding: 30px;
  }
  @media screen and (max-width: 800px) {
    padding: 30px 5px;
  }
`;

const Home = () => {
  const [NavBar, setNavBar] = useState(false);
  const [isFirstGoogleUser, setIsFirstGoogleUser] = useState(false);
  const { cognitoUser } = useContext(CognitoContext);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (cognitoUser && cognitoUser.username.startsWith('Google_')) {
      setIsFirstGoogleUser(true);
    }
  }, [cognitoUser]);

  const handleScroll = () => {
    if (window.scrollY >= NAV_SCROLL_OFFSET) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  const toggleFirstUser = () => setIsFirstGoogleUser((prev) => !prev);

  return (
    <React.Fragment>
      <Navigation show={NavBar} navSearch={true} />
      <HomeContainer>
        <BackgroundContainer>
          <ImageWrap>
            <img src={mainImage} alt="main" />
          </ImageWrap>
          <HomeIntroContent />
        </BackgroundContainer>
        <HomeCityListContainer>
          <HomeCityList />
        </HomeCityListContainer>
        <PopularPost />
      </HomeContainer>
      {isFirstGoogleUser && (
        <SetUserNameModal toggleFirstUser={toggleFirstUser} />
      )}
    </React.Fragment>
  );
};

export default Home;
