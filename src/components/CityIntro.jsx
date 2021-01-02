import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listMenus } from '../graphql/queries';
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
  width: 110px;
  height: 110px;

  & img {
    border-radius: 100%;
    object-fit: cover;
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

const IntroContent = styled.div`
  font-size: 14px;
  color: #888888;
`;

const CityIntro = ({ cityName }) => {
  const [cityInfo, setCityInfo] = useState();

  const fetchPictures = useCallback(async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listMenus, {
          filter: {
            city: { beginsWith: cityName },
          },
        }),
      );
      const city = await data.data.listMenus.items[0];
      setCityInfo(city);
    } catch (error) {
      console.log(error);
    }
  }, [cityName]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <CityIntroContainer>
      <CityIntroWrap>
        {cityInfo && (
          <>
            <IntroPictureWrap>
              <img src={cityInfo.thumbnail.uri} alt="thumbnail" />
            </IntroPictureWrap>
            <IntroContentWrap>
              <IntroSubhead>
                <span>{cityToKo[cityInfo.city]}</span>
              </IntroSubhead>
              <IntroContent>
                {cityInfo.tag.split(' ').map((tag, idx) => (
                  <span key={idx}>#{tag} </span>
                ))}
              </IntroContent>
            </IntroContentWrap>
          </>
        )}
      </CityIntroWrap>
    </CityIntroContainer>
  );
};

export default CityIntro;
