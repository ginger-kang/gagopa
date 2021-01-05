import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import CityIntro from '../components/City/CityIntro';
import { cityToKo } from '../utils/utils';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/LoadingPage';
import GetNextPostButton from '../components/City/GetNextPostButton';
import NoPost from '../components/City/NoPost';
import CityPost from '../components/City/CityPost';

const CityContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityGridWrap = styled.div`
  display: ${(props) => (props.hasPost ? 'grid' : 'none')};
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  margin-bottom: 60px;
`;

const City = ({ match }) => {
  const [cityObjects, setCityObjects] = useState([]);
  const [prevToken, setPrevToken] = useState(undefined);
  const [nextToken, setNextToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const cityName = match.params.cityName;
  const hasNext = !!nextToken && cityObjects.length !== 0;
  const hasPost = cityObjects.length !== 0;

  useEffect(() => {
    const fetchPictures = async () => {
      setIsLoading(true);
      try {
        const data = await API.graphql(
          graphqlOperation(listPictures, {
            filter: { city: { beginsWith: cityToKo[cityName] } },
            limit: 2,
            nextToken: prevToken,
          }),
        );
        const pictures = await data.data.listPictures.items;
        const token = await data.data.listPictures.nextToken;
        setCityObjects((prev) => [...prev, ...pictures]);
        setNextToken(token);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPictures();
  }, [cityName, prevToken]);

  const getNextPost = () => {
    setPrevToken(nextToken);
    setNextToken(null);
  };

  const reset = () => {
    setPrevToken(undefined);
    setNextToken(null);
  };

  return (
    <>
      <Navigation show={true} />
      <CityContainer>
        <CityIntro cityName={cityName} />
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <NoPost hasPost={hasPost} cityName={cityToKo[cityName]} />
            <CityGridWrap hasPost={hasPost}>
              {cityObjects.map((post) => (
                <CityPost key={post.id} post={post} cityName={cityName} />
              ))}
            </CityGridWrap>
            <GetNextPostButton getNextPost={getNextPost} hasNext={hasNext} />
          </>
        )}
      </CityContainer>
    </>
  );
};

export default City;
