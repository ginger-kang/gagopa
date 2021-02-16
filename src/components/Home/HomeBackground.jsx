import React, { useState } from 'react';
import styled from 'styled-components';
import { backgroundImage, getRandomIndex } from '../../utils/utils';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import HomeIntroContent from './HomeIntroContent';

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

const HomeBackground = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(randomIndex);

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
  );
};

export default HomeBackground;
