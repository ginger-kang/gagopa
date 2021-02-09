import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../App';
import { API, graphqlOperation } from 'aws-amplify';
import { updateComment, deleteComment } from '../../../graphql/mutations';
import LoadingPage from '../../Load/LoadingPage';
import { lightTheme } from '../../../theme';

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
  display: ${(props) => (props.isEdit ? 'none' : 'flex')};
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

const EditWrap = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 12px;
  background: ${(props) => props.theme.itemBackground};
  display: ${(props) => (props.isEdit ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 420px) {
    width: 95vw;
  }
`;

const EditTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Edit = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const EditInput = styled.textarea`
  width: 90%;
  height: 60px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  resize: none;

  &:focus {
    outline: none;
    border: 1.5px solid #7038d4;
  }
`;

const EditButtonWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.button`
  width: 100%;
  height: 40px;
  background: none;
  color: ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
`;

const EditCancelButton = styled.button`
  width: 100%;
  height: 40px;
  color: #ca2121;
  background: none;
  border: 1px solid #ca2121;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 10px;
`;

const EditDeleteComment = ({ id, toggle, refresh, text }) => {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = async () => {
    const updateInputData = {
      id: id,
      text: editText,
    };
    setIsLoading(true);
    await API.graphql(
      graphqlOperation(updateComment, { input: updateInputData }),
    )
      .then(() => toggle(''))
      .catch((error) => {
        console.log(error.message);
      });
    refresh((prev) => prev - 1);
  };

  const handleDelete = async () => {
    const deleteInputData = {
      id: id,
    };
    setIsLoading(true);
    await API.graphql(
      graphqlOperation(deleteComment, { input: deleteInputData }),
    )
      .then(() => toggle(''))
      .catch((error) => {
        console.log(error.message);
      });
    refresh((prev) => prev - 1);
  };

  const handleCancel = () => {
    toggle('');
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggle('');
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditText(value);
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <MenuWrap theme={theme} isEdit={isEdit}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <Menu>
            <MenuList onClick={() => setIsEdit(true)}>수정</MenuList>
            <MenuList onClick={handleDelete}>삭제</MenuList>
            <MenuList onClick={handleCancel}>취소</MenuList>
          </Menu>
        )}
      </MenuWrap>
      <EditWrap theme={theme} isEdit={isEdit}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <Edit>
            <EditTitle>댓글 수정</EditTitle>
            <EditInput value={editText} onChange={onChange} maxLength="120" />
            <EditButtonWrap>
              <EditButton theme={theme} onClick={handleEdit}>
                수정
              </EditButton>
              <EditCancelButton onClick={() => setIsEdit(false)}>
                취소
              </EditCancelButton>
            </EditButtonWrap>
          </Edit>
        )}
      </EditWrap>
    </ModalContainer>
  );
};

export default EditDeleteComment;
