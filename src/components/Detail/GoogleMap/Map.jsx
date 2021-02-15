import React, { useContext } from 'react';
import styled from 'styled-components';
import { useGoogleMaps } from 'react-hook-google-maps';
import { ThemeContext } from '../../../App';
import { lightTheme } from '../../../theme';

const LocationContainer = styled.article`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 1000px) {
    width: 95vw;
  }
`;

const MapContainer = styled.div`
  width: 690px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  border-radius: 8px;
  @media screen and (max-width: 1000px) {
    width: 95vw;
  }
`;

const Container = styled.div`
  width: 688px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const MapTitle = styled.h3`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const MapSticky = styled.div`
  width: 300px;
  height: 300px;
  margin-left: 10px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  position: sticky;
  top: 73px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & h5 {
    font-size: 14px;
    font-weight: 600;
  }
  & span {
    width: 90%;
    text-align: center;
    font-size: 12px;
    line-height: 1.3;
  }
  & div {
    width: 130px;
    height: 130px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transition: all 0.2s ease-in;
      transform: scale(1.1);
    }
    & img {
      border-radius: 100%;
    }
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Map = ({ location, pictureObj }) => {
  const { theme } = useContext(ThemeContext);
  const { ref, map, google } = useGoogleMaps(process.env.REACT_APP_API_KEY, {
    zoom: 15,
    center: location,
  });

  if (map) {
    new google.maps.Marker({ position: location, map });
  }

  return (
    <>
      <LocationContainer>
        <MapContainer theme={theme}>
          <MapTitle theme={theme}>위치</MapTitle>
          <Container>
            <div ref={ref} style={{ width: '100%', height: '100%' }} />
          </Container>
        </MapContainer>
        <MapSticky theme={theme}>
          <h5>{pictureObj.location}</h5>
          <div>
            <img src={pictureObj.attachment[0].uri} alt="attachment" />
          </div>
          <span>
            해당 위치가 잘못되었거나 더 정확한 위치를 알고 있다면 댓글로
            알려주세요.
          </span>
        </MapSticky>
      </LocationContainer>
    </>
  );
};

export default Map;
