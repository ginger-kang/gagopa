import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeCityListWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`;

const HomeCitys = styled.div`
  width: 100%;
  height: 100%;
  background: red;
`;

const HomeCityList = () => {
  const cityName = 'tokyo';
  return (
    <HomeCityListWrap>
      <Link to={`/city/${cityName}`}>
        <HomeCitys />
      </Link>
    </HomeCityListWrap>
  );
};

export default HomeCityList;
