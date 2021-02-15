import React, { useEffect, useState, useContext, useCallback } from 'react';
import { ThemeContext } from '../../App';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../../graphql/queries';
import LoadingPage from '../Load/LoadingPage';
import { translateToKo } from '../../utils/translate';
import { getKeyByValue, sortByPopular } from '../../utils/utils';

const PopularContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
  @media screen and (max-width: 800px) {
    padding: 5px 2px;
  }
`;

const PupularHeader = styled.header`
  width: 100%;
  padding: 0 33px;
  & span {
    font-size: 1.5rem;
    font-weight: 700;
  }
  @media screen and (max-width: 1415px) {
    padding: 0 8px;
  }
`;

const PopularWrap = styled.ul`
  width: 100%;
  padding: 20px 22px 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  & a {
    color: ${(props) => props.theme.text};
  }
  @media screen and (max-width: 1415px) {
    padding: 20px 0px;
  }
`;

const PopularItemWrap = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 8px;
  cursor: pointer;
  margin-bottom: 30px;
`;

const PopularItem = styled.div`
  width: 22vw;
  height: 22vw;
  min-width: 250px;
  min-height: 250px;
  max-width: 318px;
  max-height: 318px;

  & img {
    border-radius: 11px;
  }
`;

const PopularItemContent = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 10px 5px;
`;

const PopularPost = () => {
  const [popularPost, setPopularPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(graphqlOperation(listPictures));
      const pictures = data.data.listPictures.items;
      pictures.sort((a, b) => sortByPopular(a, b));
      setPopularPost(pictures.slice(0, 4));
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <PopularContainer>
      <PupularHeader>
        <span>인기 사진</span>
      </PupularHeader>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <PopularWrap theme={theme}>
          {popularPost.map((post) => (
            <Link
              to={{
                pathname: `/city/${getKeyByValue(translateToKo, post.city)}/${
                  post.id
                }`,
              }}
              key={post.id}
            >
              <PopularItemWrap>
                <PopularItem>
                  <img src={post.attachment[0].uri} alt="pop" />
                </PopularItem>
                <PopularItemContent>{post.city}</PopularItemContent>
              </PopularItemWrap>
            </Link>
          ))}
        </PopularWrap>
      )}
    </PopularContainer>
  );
};

export default PopularPost;
