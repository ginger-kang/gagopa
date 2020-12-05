import React from 'react';

const Detail = ({ match }) => {
  console.log(match.params.cityName);
  console.log(match.params.id);
  return <div>detail</div>;
};

export default Detail;
