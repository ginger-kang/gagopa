import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../App';
import { FaUserCircle } from 'react-icons/fa';

const ProfileWrap = styled.div`
  position: relative;

  & svg {
    cursor: pointer;
  }
`;

const ProfileMenuDropDown = styled.div`
  width: 180px;
  height: 200px;
  position: absolute;
  left: -145px;
  top: 45px;
  background: ${(props) => props.theme.itemBackground};
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
`;

const Profile = () => {
  const [profileMenuFlag, setProfileMenuFlag] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onProfileClick = () => setProfileMenuFlag((prev) => !prev);

  return (
    <ProfileWrap onClick={onProfileClick}>
      <FaUserCircle size={33} />
      {profileMenuFlag && <ProfileMenuDropDown theme={theme} />}
    </ProfileWrap>
  );
};

export default Profile;
