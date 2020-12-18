import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';

const HomeCityListWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`;

const CityMenu = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MenuThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: ${(props) => props.bgColor};
`;

const MenuContentWrap = styled.div`
  width: 170px;
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HomeCityList = () => {
  const [menuObj, setMenuObj] = useState(null);

  useEffect(() => {
    fetchPictures();
  }, []);

  const cityToKo = {
    tokyo: '도쿄',
    osaka: '오사카',
    sapporo: '삿포로',
    kyoto: '교토',
    enosima: '에노시마',
    yamanashi: '야마나시',
  };

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listPictures, {
          filter: { location: { beginsWith: 'menu' } },
        }),
      );
      const menus = await data.data.listPictures.items;
      setMenuObj(menus);
      console.log(menus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeCityListWrap>
      {menuObj &&
        menuObj.map((menu) => (
          <CityMenu key={menu.id}>
            <MenuThumbnail bgColor={menu.description} />
            <MenuContentWrap>
              <span>{cityToKo[menu.city]}</span>
            </MenuContentWrap>
          </CityMenu>
        ))}
      {/* <Link to={`/city/${cityName}`}>
        <HomeCitys />
      </Link> */}
    </HomeCityListWrap>
  );
};

export default HomeCityList;
