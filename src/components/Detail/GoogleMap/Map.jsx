import React from 'react';
import styled from 'styled-components';
import { useGoogleMaps } from 'react-hook-google-maps';

const Container = styled.div`
  width: 950px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Map = ({ location }) => {
  const { ref, map, google } = useGoogleMaps(process.env.REACT_APP_API_KEY, {
    zoom: 17,
    center: location,
  });

  if (map) {
    new google.maps.Marker({ position: location, map });
  }

  return (
    <>
      <Container>
        <div ref={ref} style={{ width: '100%', height: '100%' }} />
      </Container>
    </>
  );
};

export default Map;
