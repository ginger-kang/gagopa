import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { updatePicture } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { ThemeContext, UserContext } from '../App';
import { lightTheme } from '../theme';
import Navigation from '../components/Nav/Navigation';
import { translateToKo } from '../utils/translate';
import { UPLOAD_ALERT_MESSAGE } from '../utils/constant';

const EditContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  padding-top: 70px;
  background: ${(props) =>
    props.theme === lightTheme ? '#f5f5f5' : '#252424'};
`;

const EditFormWrap = styled.div`
  width: 600px;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  padding: 0 0 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${(props) => (props.themeProps === lightTheme ? '#dadada' : '#565656')};
  background: ${(props) => props.themeProps.itemBackground};
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

const EditHeader = styled.header`
  width: 100%;
  height: 50px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SubmitButton = styled.div`
  width: 130px;
  height: 47px;
  border-radius: 5px;
  background: none;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
  color: ${(props) => (props.theme === lightTheme ? '#7038d4' : '#fcfcfc')};
  font-size: 13px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.div`
  width: 130px;
  height: 47px;
  border-radius: 5px;
  background: none;
  border: 1px solid #e22d2d;
  color: #e22d2d;
  font-size: 13px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInputContainer = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrap = styled.div`
  width: 65%;

  & input,
  & textarea {
    font-size: 13px;
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:focus {
      outline: none;
      border: 1px solid
        ${(props) => (props.theme === lightTheme ? '#7038d4' : 'none')};
    }
  }
  @media screen and (max-width: 450px) {
    width: 240px;
  }
`;

const ButtonContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

const Select = styled.select`
  width: 65%;
  height: 47px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
  @media screen and (max-width: 430px) {
    width: 240px;
  }
`;

const InputDescription = styled.p`
  width: 60%;
  margin-top: 5px;
  font-size: 11px;
  color: #a0a0a0;
  line-height: 1.2;
  margin-bottom: 20px;
  word-break: keep-all;
  @media screen and (max-width: 450px) {
    width: 220px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & span {
    width: 90px;
    text-align: center;
    font-size: 15px;
    @media screen and (max-width: 600px) {
      width: 80px;
    }
  }
`;

const EditPost = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  const id = match.params.id;
  const pictureObj = location.state.pictureObj;

  const [newCityName, setNewCityName] = useState(pictureObj.city);
  const [newTitle, setNewTitle] = useState(pictureObj.title);
  const [newLocation, setNewLocation] = useState(pictureObj.location);
  const [newInstagram, setNewInstagram] = useState(pictureObj.instagram);
  const [newDescription, setNewDescription] = useState(pictureObj.description);

  const { theme } = useContext(ThemeContext);
  const { userObj } = useContext(UserContext);

  const cityList = Object.values(translateToKo);
  const cityName = Object.keys(translateToKo).find(
    (key) => translateToKo[key] === pictureObj.city,
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newCityName || !newLocation || !newTitle) {
      alert(UPLOAD_ALERT_MESSAGE.LACK_REQUIRED_FIELD);
      return;
    }
    editPicture();
  };

  const editPicture = async () => {
    const inputData = {
      id: id,
      authorId: userObj.attributes.sub,
      country: '일본',
      city: newCityName,
      title: newTitle,
      location: newLocation,
      instagram: newInstagram,
      description: newDescription,
      attachment: pictureObj.attachment,
    };
    await API.graphql(graphqlOperation(updatePicture, { input: inputData }))
      .then(() => alert(UPLOAD_ALERT_MESSAGE.COMPLETE_UPDATE_PICTURE))
      .then(() => history.push(`/city/${cityName}/${id}`))
      .catch((error) => console.log(error));
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'location') {
      setNewLocation(value);
    } else if (name === 'description') {
      setNewDescription(value);
    } else if (name === 'instagram') {
      setNewInstagram(value);
    } else if (name === 'title') {
      setNewTitle(value);
    }
  };

  const onSelectOptionChange = (event) => {
    setNewCityName(event.target.value);
  };

  return (
    <>
      <Navigation show={true} navSearch={true} />
      <EditContainer theme={theme}>
        <EditFormWrap themeProps={theme}>
          <EditHeader>사진 수정하기</EditHeader>
          <TextInputContainer>
            <InputContainer>
              <span>*도시</span>
              <Select onChange={onSelectOptionChange} value={newCityName}>
                <option value="" hidden>
                  도시
                </option>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </InputContainer>
            <InputContainer>
              <span />
              <InputDescription>
                해당 사진의 도시 명을 골라주세요.
              </InputDescription>
            </InputContainer>
            <InputContainer>
              <span>*사진 제목</span>
              <InputWrap theme={theme}>
                <input
                  name="title"
                  value={newTitle}
                  onChange={onChange}
                  placeholder="사진 제목"
                />
              </InputWrap>
            </InputContainer>
            <InputContainer>
              <span />
              <InputDescription>
                사진 게시물의 제목을 적어주세요.
              </InputDescription>
            </InputContainer>
            <InputContainer>
              <span>*위치</span>
              <InputWrap theme={theme}>
                <input
                  name="location"
                  value={newLocation}
                  onChange={onChange}
                  placeholder="위치"
                />
              </InputWrap>
            </InputContainer>
            <InputContainer>
              <span />
              <InputDescription>
                사진의 정확한 위치를 알고 있다면 적어주세요.
                <br />
                알고 계신 대로만 적어주셔도 좋습니다.
                <br />
                예) 신주쿠, 시부야역 스크램블, 도쿄
              </InputDescription>
            </InputContainer>
            <InputContainer>
              <span>인스타</span>
              <InputWrap theme={theme}>
                <input
                  name="instagram"
                  value={newInstagram}
                  onChange={onChange}
                  placeholder="인스타그램 계정"
                />
              </InputWrap>
            </InputContainer>
            <InputContainer>
              <span />
              <InputDescription>
                계정을 입력하실 경우 사진과 함께 입력하신 인스타그램 계정으로
                링크를 달아드립니다.
              </InputDescription>
            </InputContainer>
            <InputContainer>
              <span>사진 설명</span>
              <InputWrap theme={theme}>
                <textarea
                  name="description"
                  value={newDescription}
                  onChange={onChange}
                  placeholder="사진 설명"
                />
              </InputWrap>
            </InputContainer>
            <InputContainer>
              <span />
              <InputDescription>
                사진에 대한 추가적인 설명이 있으시면 적어주세요.
                <br />
                TMI 환영합니다.
              </InputDescription>
            </InputContainer>
            <ButtonContainer>
              <SubmitButton theme={theme} onClick={onSubmit}>
                수정하기
              </SubmitButton>
              <CancelButton
                theme={theme}
                onClick={() => history.push(`/city/${cityName}/${id}`)}
              >
                취소
              </CancelButton>
            </ButtonContainer>
          </TextInputContainer>
        </EditFormWrap>
      </EditContainer>
    </>
  );
};

export default EditPost;
