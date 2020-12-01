import React, { useEffect } from 'react';
import styled from 'styled-components';
import bgImage from '../static/assets/bgImage.png';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import awsconfig from '../aws-exports';
import HomeCityList from '../components/HomeCityList';
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
  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listPictures, {
          filter: { city: { beginsWith: 'tokyo' } },
        }),
      );
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
      <HomeCityListContainer>
        <HomeCityList />
      </HomeCityListContainer>
    </HomeContainer>
  );
};

export default Home;
