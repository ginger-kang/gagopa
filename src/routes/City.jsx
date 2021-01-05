import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../graphql/queries';
import CityIntro from '../components/City/CityIntro';
import { cityToKo } from '../utils/utils';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/LoadingPage';
import NoPost from '../components/City/NoPost';
import CityPost from '../components/City/CityPost';
import LoadMorePostButton from '../components/City/LoadMorePostButton';

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

const postCount = 2;

const City = ({ match }) => {
  const [fetchPostData, setFetchPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState(2);
  const cityName = match.params.cityName;
  const hasNext = fetchPostData.length > next;
  const hasPost = fetchPostData.length !== 0;

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(
        graphqlOperation(listPictures, {
          filter: { city: { beginsWith: cityToKo[cityName] } },
        }),
      );
      const pictures = await data.data.listPictures.items;
      setFetchPostData(pictures);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const cityObjects = fetchPostData && fetchPostData.slice(0, next);

  const handleLoadMorePosts = () => {
    setNext((next) => next + postCount);
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
            <LoadMorePostButton
              loadMorePost={handleLoadMorePosts}
              hasNext={hasNext}
            />
          </>
        )}
      </CityContainer>
    </>
  );
};

export default City;
