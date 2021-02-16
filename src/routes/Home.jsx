import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import styled from 'styled-components';
import HomeCityList from '../components/Home/HomeCityList';
import SetUserNameModal from '../components/Home/SetUserNameModal';
import Navigation from '../components/Nav/Navigation';
import { NAV_SCROLL_OFFSET } from '../utils/constant';
import { CognitoContext } from '../App';
import PopularPost from '../components/Home/PopularPost';
import HomeIntroContent from '../components/Home/HomeIntroContent';
import HomeFooter from '../components/Home/HomeFooter';
import { backgroundImage, getRandomIndex } from '../utils/utils';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

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

const DotWrap = styled.div`
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;

  & div {
    &:nth-child(${(props) => props.index + 1}) {
      background: white;
    }
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 1px solid white;
  background: none;
  cursor: pointer;
  margin: 0 3px;
`;

const LeftSlideButton = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  background: none;
  & svg {
    color: white;
  }
  &:hover {
    background: rgba(220, 220, 220, 0.9);
    & svg {
      color: #383838;
    }
  }
  @media screen and (max-width: 450px) {
    left: 10px;
  }
`;

const RightSlideButton = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  background: none;
  & svg {
    color: white;
  }
  &:hover {
    background: rgba(220, 220, 220, 0.9);

    & svg {
      color: #383838;
    }
  }
  @media screen and (max-width: 450px) {
    right: 10px;
  }
`;

const randomIndex = getRandomIndex(5);

const Home = () => {
  const [NavBar, setNavBar] = useState(false);
  const [isFirstGoogleUser, setIsFirstGoogleUser] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(randomIndex);
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
  const handleDotClick = (index) => {
    setBackgroundIndex(index);
  };

  const rightSlide = () => {
    if (backgroundIndex === backgroundImage.length - 1) {
      setBackgroundIndex(0);
    } else {
      setBackgroundIndex((prev) => prev + 1);
    }
  };

  const leftSlide = () => {
    if (backgroundIndex === 0) {
      setBackgroundIndex(backgroundImage.length - 1);
    } else {
      setBackgroundIndex((prev) => prev - 1);
    }
  };

  return (
    <React.Fragment>
      <Navigation show={NavBar} navSearch={true} />
      <HomeContainer>
        <BackgroundContainer>
          <ImageWrap>
            <img src={backgroundImage[backgroundIndex]} alt="main" />
          </ImageWrap>
          <DotWrap index={backgroundIndex}>
            {backgroundImage.map((bg, index) => (
              <Dot key={index} onClick={() => handleDotClick(index)} />
            ))}
          </DotWrap>
          <HomeIntroContent />
          <LeftSlideButton onClick={leftSlide}>
            <BiChevronLeft size={30} />
          </LeftSlideButton>
          <RightSlideButton onClick={rightSlide}>
            <BiChevronRight size={30} />
          </RightSlideButton>
        </BackgroundContainer>
        <HomeCityListContainer>
          <HomeCityList />
        </HomeCityListContainer>
        <PopularPost />
        <HomeFooter />
      </HomeContainer>
      {isFirstGoogleUser && (
        <SetUserNameModal toggleFirstUser={toggleFirstUser} />
      )}
    </React.Fragment>
  );
};

export default Home;
