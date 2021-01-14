import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Utils/LoadingPage';
import CityPost from '../components/City/CityPost';
import { searchPictures } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom';

const SearchContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchGridWrap = styled.div`
  display: ${(props) => (props.hasPost ? 'grid' : 'none')};
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  margin-bottom: 60px;
`;

const Search = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  const keyword = match.params.keyword;

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(graphqlOperation(searchPictures));
      const posts = await data.data.searchPictures.items;
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(posts);
  console.log(keyword);

  return (
    <>
      <Navigation show={true}>
        <SearchContainer>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <SearchGridWrap hasPost={true}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={{
                    pathname: `/city/tokyo/${post.id}`,
                    state: { next: null, cityName: 'tokyo', post: post },
                  }}
                >
                  <CityPost key={post.id} post={post} cityName="tokyo" />
                </Link>
              ))}
            </SearchGridWrap>
          )}
        </SearchContainer>
      </Navigation>
    </>
  );
};

export default Search;
