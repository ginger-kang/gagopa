import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import introImage from '../static/assets/example.jpeg';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';

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
  justify-content;
  align-items: center;
`;

const IntroPictureWrap = styled.div`
  width: 130px;
  height: 130px;

  & img {
    border-radius: 100%;
  }
`;

const IntroContentWrap = styled.div`
  padding: 30px;
`;

const IntroSubhead = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const IntroContent = styled.p`
  font-size: 14px;
  color: #777777;
`;

const CityIntro = ({ cityName }) => {
  const [cityInfo, setCityInfo] = useState(null);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listPictures, {
          filter: {
            location: { beginsWith: 'menu' },
            city: { beginsWith: cityName },
          },
        }),
      );
      const city = await data.data.listPictures.items;
      console.log(city);
      setCityInfo(city);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CityIntroContainer>
      <CityIntroWrap>
        <IntroPictureWrap>
          <img src={introImage} alt="city" />
        </IntroPictureWrap>
        <IntroContentWrap>
          <IntroSubhead>
            <span>{cityInfo[0].city}</span>
          </IntroSubhead>
          <IntroContent>#일본 #감성</IntroContent>
        </IntroContentWrap>
      </CityIntroWrap>
    </CityIntroContainer>
  );
};

export default CityIntro;
