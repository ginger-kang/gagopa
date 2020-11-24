import React, { useEffect } from 'react';
import styled from 'styled-components';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Hello = styled.div`
  background-color: orange;
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
  return <Hello>안녕하세요</Hello>;
};

export default Home;
