import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { lightTheme } from '../../theme';
import { ThemeContext } from '../../App';
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineMail,
} from 'react-icons/ai';
import ContactModal from './ContactModal';

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid
    ${(props) => (props.theme === lightTheme ? '#bfbac5cc' : '#7b7b7b')};
  padding: 0 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLogoWrap = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Comfortaa', cursive;
  margin-right: 5px;
  color: ${(props) => (props.theme === lightTheme ? '#a0a0a0' : '#7b7b7b')};
`;

const FooterIconWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & svg {
    color: ${(props) => (props.theme === lightTheme ? '#a0a0a0' : '#7b7b7b')};
    &:hover {
      color: ${(props) => (props.theme === lightTheme ? '#363537' : '#fafafa')};
    }
  }
`;

const Icon = styled.div`
  margin: 0 5px;
  cursor: pointer;
`;

const HomeFooter = () => {
  const [contact, setContact] = useState(false);
  const { theme } = useContext(ThemeContext);

  const contactTrigger = () => setContact((prev) => !prev);
  return (
    <>
      <Footer theme={theme}>
        <FooterLogoWrap theme={theme}>gagopa</FooterLogoWrap>
        <FooterIconWrap theme={theme}>
          <Icon>
            <AiOutlineGithub
              size={25}
              onClick={() =>
                window.open(`https://github.com/ginger-kang`, '_blank')
              }
            />
          </Icon>
          <Icon>
            <AiOutlineInstagram
              size={25}
              onClick={() =>
                window.open(`https://instagram.com/dehhun`, '_blank')
              }
            />
          </Icon>
          <Icon>
            <AiOutlineMail size={25} onClick={contactTrigger} />
          </Icon>
        </FooterIconWrap>
      </Footer>
      {contact && <ContactModal trigger={contactTrigger} />}
    </>
  );
};

export default HomeFooter;
