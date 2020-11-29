import React, { useEffect } from 'react';
import styled from 'styled-components';
import bgImage from '../static/assets/bgImage.png';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

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

const Home = () => {
  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listPictures));
      console.log(data.data.listPictures);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HomeContainer>
      <BackgroundContainer>
        <ImageWrap>
          <img src={bgImage} alt="bgimage" />
        </ImageWrap>
      </BackgroundContainer>
    </HomeContainer>
  );
};

export default Home;
