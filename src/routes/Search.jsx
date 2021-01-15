import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Utils/LoadingPage';
import CityPost from '../components/City/CityPost';
import { searchPictures } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom';

const SearchContainer = styled.main`
  margin-top: 120px;
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

const SearchBar = styled.input`
  width: 200px;
  padding: 15px;
  background: rgba(200, 200, 200, 0.5);
`;

const Search = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [keyword, setKeyword] = useState(match.params.keyword);
  const [searchInput, setSearchInput] = useState('');

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    const filter = {
      or: [
        {
          title: { wildcard: `*${keyword}*` },
        },
        {
          location: { wildcard: `*${keyword}*` },
        },
        {
          description: { wildcard: `*${keyword}*` },
        },
      ],
    };

    try {
      const data = await API.graphql(
        graphqlOperation(searchPictures, { filter: filter }),
      );
      const posts = await data.data.searchPictures.items;
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchInput(value);
  };

  return (
    <>
      <Navigation show={true} navSearch={false} />
      <SearchContainer>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <SearchBar type="text" onChange={onChange} placeholder="검색" />
            <SearchGridWrap hasPost={true}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={{
                    pathname: `/city/${post.city}/${post.id}`,
                    state: { next: null, cityName: post.city, post: post },
                  }}
                >
                  <CityPost key={post.id} post={post} cityName={post.city} />
                </Link>
              ))}
            </SearchGridWrap>
          </>
        )}
      </SearchContainer>
    </>
  );
};

export default Search;
