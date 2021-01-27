import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { lightTheme } from '../../theme';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBarWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.div`
  width: 250px;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid white;
  background: none;
  color: white;

  ${(props) =>
    props.show &&
    css`
      background: ${props.theme.itemBackground};
      color: ${props.theme.text};
      border: 1px solid
        ${(props) =>
          props.theme === lightTheme ? 'rgba(0,0,0,0.1)' : '#fcfcfc'};
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
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
          props.theme === lightTheme ? '#949494' : '#fcfcfc'};
      `};
  }
`;

const NavSearchBar = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKeyword(value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: `/search/${keyword}`,
      });
    }
  };

  return (
    <SearchBarWrap>
      <Search>
        {show ? (
          <SearchBar
            type="text"
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="사진 검색"
            theme={theme}
            show={show}
          />
        ) : (
          <SearchBar
            type="text"
            onChange={onChange}
            onKeyPress={onKeyPress}
            theme={theme}
            show={show}
          />
        )}
        <Link to={`/search/${keyword}`}>
          <SearchButton show={show} theme={theme}>
            <AiOutlineSearch size={20} />
          </SearchButton>
        </Link>
      </Search>
    </SearchBarWrap>
  );
};

export default NavSearchBar;
