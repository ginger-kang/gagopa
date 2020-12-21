import React, { useEffect, useState, useCallback } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';

const Detail = ({ match }) => {
  const [pictureObj, setPictureObj] = useState(null);
  const pictureId = match.params.id;

  const fetchPictures = useCallback(async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(getPicture, {
          id: pictureId,
        }),
      );
      const picture = data.data.getPicture;
      setPictureObj(picture);
    } catch (error) {
      alert(error);
    }
  }, [pictureId]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return <div>detail</div>;
};

export default Detail;
