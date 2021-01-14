import React, { useEffect, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listMenus } from '../../graphql/queries';
import { translateToKo } from '../../utils/utils';
import { ThemeContext } from '../../App';
import { lightTheme } from '../../theme';

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
`;

const IntroContent = styled.div`
  font-size: 14px;
  color: #888888;
`;

const ChangeCityButton = styled.button`
  padding: 8px 13px;
  margin-left: 13px;
  border-radius: 8px;
  background: none;
  font-size: 13px;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
  color: ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
`;

const CityNavContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CityIntro = ({ cityName, toggleList }) => {
  const [cityInfo, setCityInfo] = useState();
  const { theme } = useContext(ThemeContext);

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
              <CityNavContainer>
                <IntroSubhead>
                  <span>{translateToKo[cityInfo.city]}</span>
                </IntroSubhead>
                <ChangeCityButton theme={theme} onClick={toggleList}>
                  도시 변경
                </ChangeCityButton>
              </CityNavContainer>
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
