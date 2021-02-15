import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  background: black;
  padding: 0 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLogoWrap = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Comfortaa', cursive;
`;

const HomeFooter = () => {
  return (
    <Footer>
      <FooterLogoWrap>gagopa</FooterLogoWrap>
    </Footer>
  );
};

export default HomeFooter;
