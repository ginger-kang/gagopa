import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import { cityToKo } from '../utils/utils';
import { ThemeContext } from '../App';

const HomeCityListWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`;

const CityMenu = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.itemBackground};
  border-radius: 8px;
  padding: 10px;
`;

const MenuThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: ${(props) => props.bgColor};
`;

const MenuContentWrap = styled.div`
  width: 220px;
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
`;

const HomeCityList = () => {
  const [menuObj, setMenuObj] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(listPictures, {
          filter: { location: { beginsWith: 'menu' } },
        }),
      );
      const menus = await data.data.listPictures.items;
      setMenuObj(menus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeCityListWrap>
      {menuObj &&
        menuObj.map((menu) => (
          <Link to={`/city/${menu.city}`}>
            <CityMenu key={menu.id} theme={theme}>
              <MenuThumbnail bgColor={menu.description} />
              <MenuContentWrap>
                <span>{cityToKo[menu.city]}</span>
              </MenuContentWrap>
            </CityMenu>
          </Link>
        ))}
    </HomeCityListWrap>
  );
};

export default HomeCityList;
