import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import introImage from '../static/assets/example.jpeg';

const CityContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityIntroContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityIntroWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:
  align-items: center;
`;

const IntroPictureWrap = styled.div`
  width: 150px;
  height: 150px;

  & img {
    border-radius: 100%;
  }
`;

const IntroContentWrap = styled.div`
  padding: 30px;
`;

const IntroSubhead = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 10px 0;
`;

const IntroContent = styled.p`
  font-size: 14px;
  color: #777777;
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
      <CityIntroContainer>
        <CityIntroWrap>
          <IntroPictureWrap>
            <img src={introImage} alt="city" />
          </IntroPictureWrap>
          <IntroContentWrap>
            <IntroSubhead>도쿄</IntroSubhead>
            <IntroContent>일본의 수도이자 중심</IntroContent>
          </IntroContentWrap>
        </CityIntroWrap>
      </CityIntroContainer>
    </CityContainer>
  );
};

export default City;
