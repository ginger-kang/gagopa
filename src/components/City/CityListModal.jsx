import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { listMenus } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import LoadingPage from '../Load/LoadingPage';
import { translateToKo } from '../../utils/translate';
import { Link } from 'react-router-dom';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ListWrap = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 15px;
  background: ${(props) => props.theme.itemBackground};
`;

const ListHeader = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid #ababab80 !important;
`;

const CityList = styled.ul`
  width: 100%;
  height: 420px;
  overflow: auto;
`;

const City = styled.li`
  width: 100%;
  height: 70px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ababab80 !important;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 14px;
  margin-left: 15px;
`;

const CityListModal = ({ toggleList, initializeNext }) => {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  const getCityMenuList = async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(graphqlOperation(listMenus));
      const rtn = await data.data.listMenus.items;
      setCityList(rtn);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCityMenuList();
  }, []);

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleList();
    }
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <ListWrap theme={theme}>
        <ListHeader>도시 선택</ListHeader>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <CityList>
            {cityList.map((city, index) => (
              <Link to={{ pathname: `/city/${city.city}` }} key={index}>
                <City
                  theme={theme}
                  onClick={() => {
                    toggleList();
                    initializeNext();
                  }}
                >
                  <Thumbnail src={city.thumbnail.uri} alt="thumbnail" />
                  <Name>{translateToKo[city.city]}</Name>
                </City>
              </Link>
            ))}
          </CityList>
        )}
      </ListWrap>
    </ModalContainer>
  );
};

export default CityListModal;
