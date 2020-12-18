import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';

const Detail = ({ match }) => {
  const [pictureObj, setPictureObj] = useState(null);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(getPicture, {
          id: match.params.id,
        }),
      );
      const picture = data.data.getPicture;
      setPictureObj(picture);
    } catch (error) {
      alert(error);
    }
  };
  return <div>detail</div>;
};

export default Detail;
