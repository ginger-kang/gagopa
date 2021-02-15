import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import Map from './Map';
import NoMap from './NoMap';

export default function Geocoding({ location, pictureObj }) {
  const [resultLatitude, setResultLatitue] = useState(0);
  const [resultLongitude, setResultLongitude] = useState(0);

  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY);
    Geocode.setLanguage('en');
    Geocode.fromAddress(location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        if (lat > 0 && lng > 0) {
          setResultLatitue(lat);
          setResultLongitude(lng);
        }
      },
      (error) => {
        console.error(error);
      },
    );
  }, [location]);

  const resultLocation = { lat: resultLatitude, lng: resultLongitude };

  return resultLocation.lat && resultLocation.lng ? (
    <Map location={resultLocation} pictureObj={pictureObj} />
  ) : (
    <NoMap />
  );
}
