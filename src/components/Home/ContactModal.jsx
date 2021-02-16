import React, { useContext } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import styled from 'styled-components';
import { ThemeContext } from '../../App';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ContactWrap = styled.div`
  width: 250px;
  height: 150px;
  border-radius: 8px;
  background: ${(props) => props.theme.itemBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Contact = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
`;

const Info = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & span {
    margin-left: 5px;
  }
`;

const ContactModal = ({ trigger }) => {
  const { theme } = useContext(ThemeContext);
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      trigger();
    }
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <ContactWrap theme={theme}>
        <Contact>
          <span>Contact</span>
        </Contact>
        <Info>
          <AiOutlineMail size={20} />
          <span>kdhoon07@gmail.com</span>
        </Info>
      </ContactWrap>
    </ModalContainer>
  );
};

export default ContactModal;
