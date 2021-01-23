import React from 'react';
import styled from 'styled-components';
import { useGoogleMaps } from 'react-hook-google-maps';

const LocationContainer = styled.div`
  width: 950px;
  height: 700px;
`;

const Container = styled.div`
  width: 950px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapTitle = styled.h3`
  height: 40px;
  padding: 0 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Map = ({ location }) => {
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
        <MapTitle>위치</MapTitle>
        <Container>
          <div ref={ref} style={{ width: '100%', height: '100%' }} />
        </Container>
      </LocationContainer>
    </>
  );
};

export default Map;
