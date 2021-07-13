import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { lightTheme } from '../../theme';
import { AiOutlineSearch } from 'react-icons/ai';
import PauseSearchNotice from '../Notice/PauseSearchNotice';

const SearchBarWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.div`
  width: 350px;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: 1px solid white;
  background: none;
  color: white;

  ${(props) =>
    props.show &&
    css`
      background: ${(props) =>
        props.theme === lightTheme ? '#f5f5f5' : '#252424'};
      color: ${props.theme.text};
      border: 1px solid
        ${(props) => (props.theme === lightTheme ? '#bfbac5cc' : '#7b7b7b')};
    `};

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
    color: white;
    ${(props) =>
      props.show &&
      css`
        color: ${(props) =>
          props.theme === lightTheme ? '#949494' : '#828282'};
      `};
  }
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const NavSearchBar = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  const [noticeToggle, setNoticeToggle] = useState(false);
  const [keyword, setKeyword] = useState('');
  // const history = useHistory();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNoticeToggle((prev) => !prev);
  };

  const onKeyPress = (e) => {
    // 검색 기능 중지
    // if (e.key === 'Enter') {
    //   history.push({
    //     pathname: `/search/${keyword}`,
    //   });
    // }
  };

  return (
    <>
      <SearchBarWrap>
        <Search>
          {show ? (
            <SearchBar
              type="text"
              value={keyword}
              onChange={onChange}
              onKeyPress={onKeyPress}
              placeholder="사진 검색"
              theme={theme}
              show={show}
              maxLength="17"
            />
          ) : (
            <SearchBar
              type="text"
              value={keyword}
              onChange={onChange}
              onKeyPress={onKeyPress}
              theme={theme}
              show={show}
              maxLength="17"
            />
          )}
          {/* <Link to={`/search/${keyword}`}>
          <SearchButton show={show} theme={theme}>
            <AiOutlineSearch size={20} />
          </SearchButton>
        </Link> */}
          <SearchButton
            show={show}
            theme={theme}
            onClick={() => setNoticeToggle((prev) => !prev)}
          >
            <AiOutlineSearch size={20} />
          </SearchButton>
        </Search>
      </SearchBarWrap>
      {noticeToggle && (
        <PauseSearchNotice trigger={() => setNoticeToggle((prev) => !prev)} />
      )}
    </>
  );
};

export default NavSearchBar;
