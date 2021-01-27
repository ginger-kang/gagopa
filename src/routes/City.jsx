import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { picturesByDate } from '../graphql/queries';
import CityIntro from '../components/City/CityIntro';
import { translateToKo } from '../utils/translate';
import { sortByLikes, sortByComments } from '../utils/utils';
import {
  setSessionLikeSort,
  getSessionLikeSort,
  setSessionCommentSort,
  getSessionCommentSort,
} from '../utils/sessionStorage';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Load/LoadingPage';
import NoPost from '../components/City/NoPost';
import CityPost from '../components/City/CityPost';
import LoadMorePostButton from '../components/City/LoadMorePostButton';
import { useLocation } from 'react-router-dom';
import CityListModal from '../components/City/CityListModal';
import CitySort from '../components/City/CitySort';

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

const CityItemWrap = styled.div`
  width: 63vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const postCount = 27;

const City = ({ match }) => {
  let location = useLocation();
  const sessionCommentSort = parseInt(getSessionCommentSort());
  const sessionLikeSort = parseInt(getSessionLikeSort());

  const [fetchPostData, setFetchPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState(
    location.state.next ? location.state.next : postCount,
  );
  const [showList, setShowList] = useState(false);
  const [sortDirection, setSortDirection] = useState('DESC');
  const [likeSort, setLikeSort] = useState(
    sessionLikeSort ? sessionLikeSort : 0,
  );
  const [commentSort, setCommentSort] = useState(
    sessionCommentSort ? sessionCommentSort : 0,
  );
  const cityName = match.params.cityName;
  const hasNext = fetchPostData.length > next;
  const hasPost = fetchPostData.length !== 0;

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(
        graphqlOperation(picturesByDate, {
          city: translateToKo[cityName],
          sortDirection: sortDirection,
        }),
      );
      const pictures = await data.data.picturesByDate.items;
      likeSort
        ? setFetchPostData(pictures.sort((a, b) => sortByLikes(a, b)))
        : setFetchPostData(pictures);
      commentSort
        ? setFetchPostData(pictures.sort((a, b) => sortByComments(a, b)))
        : setFetchPostData(pictures);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [cityName, sortDirection, likeSort, commentSort]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const handleLoadMorePosts = () => {
    setNext((next) => next + postCount);
  };

  const cityObjects = fetchPostData && fetchPostData.slice(0, next);
  const toggleList = () => setShowList(!showList);
  const changeSortDirection = (dir) => {
    setSortDirection(dir);
    setSessionLikeSort(0);
    setLikeSort(0);
    setSessionCommentSort(0);
    setCommentSort(0);
  };

  const postSortByLike = () => {
    setSessionLikeSort(1);
    setLikeSort(1);
    setSessionCommentSort(0);
    setCommentSort(0);
  };

  const postSortByComment = () => {
    setSessionCommentSort(1);
    setCommentSort(1);
    setSessionLikeSort(0);
    setLikeSort(0);
  };

  return (
    <>
      <Navigation show={true} navSearch={true} />
      <CityContainer>
        <CityIntro cityName={cityName} toggleList={toggleList} />
        <CityItemWrap>
          <CitySort
            changeSortDirection={changeSortDirection}
            postSortByLike={postSortByLike}
            postSortByComment={postSortByComment}
          />
        </CityItemWrap>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <NoPost hasPost={hasPost} cityName={translateToKo[cityName]} />
            <CityGridWrap hasPost={hasPost}>
              {cityObjects.map((post) => (
                <CityPost
                  key={post.id}
                  post={post}
                  cityName={cityName}
                  next={next}
                />
              ))}
            </CityGridWrap>
            <LoadMorePostButton
              loadMorePost={handleLoadMorePosts}
              hasNext={hasNext}
            />
          </>
        )}
      </CityContainer>
      {showList && <CityListModal toggleList={toggleList} />}
    </>
  );
};

export default City;
