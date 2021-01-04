import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import CityIntro from '../components/CityIntro';
import { cityToKo } from '../utils/utils';
import Navigation from '../components/Navigation';
import LoadingPage from '../components/LoadingPage';

const CityContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  margin-bottom: 60px;
`;

const CityPost = styled.div`
  width: 21vw;
  height: 21vw;
  cursor: pointer;
  position: relative;

  & div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  & img {
    object-fit: cover;
  }
`;

const City = ({ match }) => {
  const [cityObjects, setCityObjects] = useState([]);
  const [prevToken, setPrevToken] = useState(undefined);
  const [nextToken, setNextToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const cityName = match.params.cityName;
  const hasNext = !!nextToken;

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
        setCityObjects(pictures);
        setNextToken(token);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPictures();

    return () => reset();
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
            <CityGridWrap>
              {cityObjects.map((post) => (
                <CityPost key={post.id}>
                  <img src={post.attachment.uri} alt="attachment" />
                  <Link to={`/city/${cityName}/${post.id}`}>
                    <div />
                  </Link>
                </CityPost>
              ))}
            </CityGridWrap>
            <button onClick={getNextPost}>다음</button>
          </>
        )}
      </CityContainer>
    </>
  );
};

export default City;
