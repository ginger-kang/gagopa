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
  setSessionNext,
  getSessionNext,
} from '../utils/sessionStorage';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Load/LoadingPage';
import NoPost from '../components/City/NoPost';
import CityPost from '../components/City/CityPost';
import LoadMorePostButton from '../components/City/LoadMorePostButton';
import CityListModal from '../components/City/CityListModal';
import CitySort from '../components/City/CitySort';
import { POST_COUNT } from '../utils/constant';

const CityContainer = styled.main`
  width: 100%;
  max-width: 1450px;
  margin: 60px auto 0 auto;
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
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 13px;
    grid-row-gap: 13px;
  }
`;

const CityItemWrap = styled.div`
  width: 64vw;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 98%;
  }
`;

const City = ({ match }) => {
  const sessionCommentSort = parseInt(getSessionCommentSort());
  const sessionLikeSort = parseInt(getSessionLikeSort());
  const sessionNext = parseInt(getSessionNext());

  const [fetchPostData, setFetchPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState(sessionNext ? sessionNext : POST_COUNT);
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
    setNext((next) => next + POST_COUNT);
    setSessionNext(next + POST_COUNT);
  };

  const initializeNext = () => {
    setSessionNext(0);
    setNext(POST_COUNT);
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
      {showList && (
        <CityListModal
          toggleList={toggleList}
          initializeNext={initializeNext}
        />
      )}
    </>
  );
};

export default City;
