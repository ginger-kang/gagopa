import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../App';
import { API, graphqlOperation } from 'aws-amplify';
import { deletePicture } from '../../../graphql/mutations';
import LoadingPage from '../../Load/LoadingPage';
import { Link, useHistory } from 'react-router-dom';
import { translateToKo } from '../../../utils/translate';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const MenuWrap = styled.div`
  width: 320px;
  height: 185px;
  border-radius: 12px;
  background: ${(props) => props.theme.itemBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const Menu = styled.ul`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  border-radius: 12px;
  & a {
    color: ${(props) => props.theme.text};
  }
`;

const MenuList = styled.li`
  width: 100%;
  padding: 5px 0;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ababab80;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  &:nth-child(1) {
    border-top: 1px solid #ababab80;
  }

  &:nth-child(3) {
    color: #e60000;
  }
`;

const EditDeletePost = ({ id, toggle, pictureObj }) => {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const cityName = Object.keys(translateToKo).find(
    (key) => translateToKo[key] === pictureObj.city,
  );

  const handleDelete = async () => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      const deleteInputData = {
        id: id,
      };
      setIsLoading(true);
      await API.graphql(
        graphqlOperation(deletePicture, { input: deleteInputData }),
      )
        .then(() => toggle(''))
        .then(() => history.push(`/city/${cityName}`))
        .catch((error) => {
          console.log(error.message);
        });
    }

    return;
  };

  const handleCancel = () => {
    toggle('');
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggle('');
    }
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <MenuWrap theme={theme}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <Menu theme={theme}>
            <Link
              to={{
                pathname: `/post/edit/${id}`,
                state: { pictureObj: pictureObj },
              }}
            >
              <MenuList>수정</MenuList>
            </Link>
            <MenuList onClick={handleDelete}>삭제</MenuList>
            <MenuList onClick={handleCancel}>취소</MenuList>
          </Menu>
        )}
      </MenuWrap>
    </ModalContainer>
  );
};

export default EditDeletePost;
