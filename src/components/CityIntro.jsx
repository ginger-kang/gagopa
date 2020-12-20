import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import { cityToKo } from '../utils/utils';

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
  & div {
    width: 110px;
    height: 110px;
    border-radius: 100%;
    background: ${(props) => props.city.description};
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
  const [cityInfo, setCityInfo] = useState();

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
      const city = await data.data.listPictures.items[0];
      setCityInfo(city);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CityIntroContainer>
      <CityIntroWrap>
        {cityInfo && (
          <>
            <IntroPictureWrap city={cityInfo}>
              <div />
            </IntroPictureWrap>
            <IntroContentWrap>
              <IntroSubhead>
                <span>{cityToKo[cityInfo.city]}</span>
              </IntroSubhead>
              <IntroContent>#일본</IntroContent>
            </IntroContentWrap>
          </>
        )}
      </CityIntroWrap>
    </CityIntroContainer>
  );
};

export default CityIntro;
