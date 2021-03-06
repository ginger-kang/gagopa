import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Load/LoadingPage';
import CityPost from '../components/City/CityPost';
import { API, graphqlOperation } from 'aws-amplify';
import { recommendKeyword } from '../utils/utils';
import { ThemeContext } from '../App';
import { lightTheme } from '../theme';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchContainer = styled.main`
  width: 100%;
  max-width: 1450px;
  margin: 120px auto 0 auto;
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
  margin-top: 10px;
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 13px;
    grid-row-gap: 13px;
  }
`;

const SearchHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

const SearchBarWrap = styled.div`
  width: 400px;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 250px;
    margin-bottom: 15px;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 13px;
  border-radius: 30px;
  background: ${(props) =>
    props.theme === lightTheme ? '#f5f5f5' : '#333333'};
  color: ${(props) => props.theme.text};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#bfbac5cc' : '#7b7b7b')};
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  & svg {
    color: ${(props) => (props.theme === lightTheme ? '#949494' : '#828282')};
  }
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const SearchContentWrap = styled.div`
  width: 64vw;
  max-width: 1200px;
  height: 110px;
  margin: 40px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
    width: 100%;
    align-items: center;
  }
`;

const SearchContent = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const RecommendWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 5px 0 5px 0;
`;

const TagWrap = styled.div`
  width: 100%;
  margin: 25px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  @media screen and (max-width: 580px) {
    display: -webkit-box;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin: 20px 0 0 0;
  }
`;

const Tag = styled.div`
  padding: 10px 20px;
  border: 1px solid #bfbac5cc;
  border-radius: 30px;
  font-size: 14px;
  margin: 0 2px;
  cursor: pointer;
  color: ${(props) => props.theme.text};

  &:hover {
    border: 1px solid
      ${(props) => (props.theme === lightTheme ? '#fcfcfc' : '#363537')};
    color: ${(props) => (props.theme === lightTheme ? '#fcfcfc' : '#363537')};
    background: ${(props) =>
      props.theme === lightTheme ? '#7038d4' : '#fcfcfc'};
  }
  @media screen and (max-width: 900px) {
    margin: 2px;
  }
`;

const Search = ({ match }) => {
  const { theme } = useContext(ThemeContext);
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
      // 검색 기능 중지
      // const data = await API.graphql(
      //   graphqlOperation(searchPictures, { filter: filter }),
      // );
      // const posts = await data?.data?.searchPictures?.items;
      // setPosts(posts);
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

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      setKeyword(searchInput);
    }
  };

  const onTagClick = (tag) => {
    setKeyword(tag);
  };

  return (
    <>
      <Navigation show={true} navSearch={false} />
      <SearchContainer>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <SearchHeader>
              <SearchBarWrap>
                <SearchBar
                  type="text"
                  onChange={onChange}
                  placeholder="사진 검색"
                  onKeyPress={onKeyPress}
                  theme={theme}
                  maxLength={30}
                />
                <SearchButton theme={theme}>
                  <AiOutlineSearch size={25} />
                </SearchButton>
              </SearchBarWrap>
              <SearchContentWrap>
                <SearchContent>
                  '{keyword}'로 검색한 결과 {posts.length}개
                </SearchContent>
                <RecommendWrap>
                  <TagWrap>
                    {recommendKeyword.map((tag, index) => (
                      <Tag
                        key={index}
                        theme={theme}
                        onClick={() => onTagClick(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </TagWrap>
                </RecommendWrap>
              </SearchContentWrap>
            </SearchHeader>
            <SearchGridWrap hasPost={true}>
              {posts.map((post) => (
                <CityPost key={post.id} post={post} cityName={post.city} />
              ))}
            </SearchGridWrap>
          </>
        )}
      </SearchContainer>
    </>
  );
};

export default Search;
