import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { lightTheme } from '../../theme';
import { ThemeContext } from '../../App';
import { MdSort } from 'react-icons/md';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';

const SortWrap = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  background: none;
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 100%;
  font-size: 13px;
  & svg {
    color: #828282;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const SortMenuWrap = styled.div`
  position: absolute;
  top: 40px;
  right: 5px;
  padding: 5px 0;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#e2e2e2' : '#565656')};
  border-radius: 10px;
  z-index: 999;
  & ul {
    width: 150px;
  }
  & li {
    height: 35px;
    padding: 0 15px 0 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 13px;
    color: ${(props) => props.theme.text};

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const CitySort = () => {
  const { theme } = useContext(ThemeContext);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = () => setIsActive(!isActive);

  return (
    <SortWrap ref={dropdownRef}>
      <SortButton onClick={onClick}>
        <MdSort size={22} />
      </SortButton>
      {isActive && (
        <SortMenuWrap theme={theme}>
          <ul>
            <li>좋아요순</li>
            <li>최신순</li>
            <li>오래된순</li>
          </ul>
        </SortMenuWrap>
      )}
    </SortWrap>
  );
};

export default CitySort;
