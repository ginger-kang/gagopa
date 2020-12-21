import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';

const ProfileWrap = styled.div`
  position: relative;

  & svg {
    cursor: pointer;
  }
`;

const ProfileMenuDropDown = styled.div`
  width: 230px;
  height: 220px;
  position: absolute;
  left: -190px;
  top: 45px;
  background: ${(props) => props.theme.itemBackground};
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  display: block;
  padding: 8px 0 8px 0;

  & ul {
    width: 100%;
    height: 100%;
  }
  & li {
    height: 42px;
    padding: 0 18px 0 18px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
  & a {
    color: ${(props) => props.theme.text};
    font-size: 13px;
  }
`;

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = () => setIsActive(!isActive);

  return (
    <ProfileWrap onClick={onClick} ref={dropdownRef}>
      <FaUserCircle size={30} />
      {isActive && (
        <ProfileMenuDropDown theme={theme}>
          <ul>
            <NavLink to="/signin">
              <li>로그인</li>
            </NavLink>
            <NavLink to="/signup">
              <li>회원가입</li>
            </NavLink>
            <NavLink to="/upload">
              <li>여행 사진 올리기</li>
            </NavLink>
          </ul>
        </ProfileMenuDropDown>
      )}
    </ProfileWrap>
  );
};

export default Profile;
