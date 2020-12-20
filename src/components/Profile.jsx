import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

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
    height: 40px;
    padding: 0 13px 0 13px;
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
  const [profileMenuFlag, setProfileMenuFlag] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onProfileClick = () => setProfileMenuFlag((prev) => !prev);

  return (
    <ProfileWrap onClick={onProfileClick}>
      <FaUserCircle size={30} />
      {profileMenuFlag && (
        <ProfileMenuDropDown theme={theme}>
          <ul>
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
