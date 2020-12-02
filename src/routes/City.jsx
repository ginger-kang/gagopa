import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import CityIntro from '../components/CityIntro';

const CityContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const City = ({ match }) => {
  const [cityObjects, setCityObjects] = useState(null);
  const cityName = match.params.cityName;

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listPictures, {
          filter: { city: { beginsWith: '도쿄' } },
        }),
      );
      console.log(data.data.listPictures.items);
      setCityObjects(data.data.listPictures.items);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CityContainer>
      <CityIntro cityName={cityName} />
    </CityContainer>
  );
};

export default City;
