import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import CityIntro from '../components/CityIntro';

const CityContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  margin-bottom: 60px;
`;

const CityPost = styled.div`
  width: 21vw;
  height: 21vw;
`;

const City = ({ match }) => {
  const [cityObjects, setCityObjects] = useState([]);
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
      const pictures = await data.data.listPictures.items;
      setCityObjects(pictures);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CityContainer>
      <CityIntro cityName={cityName} />
      <CityGridWrap>
        {cityObjects.map((post) => (
          <CityPost key={post.id}>
            <img src={post.attachment.uri} alt="attachment" />
          </CityPost>
        ))}
      </CityGridWrap>
    </CityContainer>
  );
};

export default City;
