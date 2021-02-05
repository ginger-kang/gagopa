import React, { useContext } from 'react';
import styled from 'styled-components';
import { useGoogleMaps } from 'react-hook-google-maps';
import { ThemeContext } from '../../../App';
import { lightTheme } from '../../../theme';

const LocationContainer = styled.article`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  width: 690px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  border-radius: 8px;
`;

const Container = styled.div`
  width: 688px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
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

  & span {
    text-align: center;
    font-size: 14px;
    line-height: 1.3;
  }
  & div {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
    &:hover {
      transition: all 0.2s ease-in;
      transform: scale(1.1);
    }
  }
`;

const Map = ({ location }) => {
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
        <MapSticky theme={theme}></MapSticky>
      </LocationContainer>
    </>
  );
};

export default Map;
