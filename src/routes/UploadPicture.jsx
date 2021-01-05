import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createPicture } from '../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { ImFolderUpload } from 'react-icons/im';
import { ThemeContext, UserContext } from '../App';
import { lightTheme } from '../theme';
import Navigation from '../components/Nav/Navigation';
import { translateToKo } from '../utils/utils';

import config from '../aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const UploadContainer = styled.div`
  width: 100%;
  padding-top: 70px;
`;

const UploadFormWrap = styled.div`
  width: 750px;
  border-radius: 10px;
  margin: 40px auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) => props.themeProps.itemBackground};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;

const Preview = styled.div`
  width: 100%;
  height: 100%;
  max-height: 400px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const FileWrap = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.themeProps.body};
  cursor: pointer;
  border: 2px dashed #888888;

  & span {
    font-size: 14px;
    margin-top: 10px;
    font-weight: 600;
  }
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

const PreviewWrap = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileUploadContainer = styled.div`
  width: 45%;
  min-width: 300px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
  margin-top: 40px;
`;

const InputWrap = styled.div`
  width: 55%;

  & input,
  & textarea {
    font-size: 13px;
    padding: 15px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:focus {
      outline: none;
      border: 2px solid
        ${(props) => (props.theme === lightTheme ? '#7038d4' : 'none')};
    }
  }
`;

const ButtonContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-evenly;
`;

const Select = styled.select`
  width: 55%;
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
`;

const FileName = styled.span`
  margin-top: 8px;
  font-size: 13px;
  color: #888888;
  line-height: 1.2;
`;

const InputDescription = styled.p`
  width: 50%;
  margin-top: 5px;
  font-size: 12px;
  color: #a0a0a0;
  line-height: 1.2;
  margin-bottom: 20px;
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
  }
`;

const UploadPicture = () => {
  const [fileName, setFileName] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [cityName, setCityName] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');

  const { theme } = useContext(ThemeContext);
  const { userObj } = useContext(UserContext);
  const hiddenFileInput = useRef(null);
  const history = useHistory();

  const cityList = Object.values(translateToKo);

  const onSubmit = async (e) => {
    let key;
    e.preventDefault();
    if (attachment && cityName && location) {
      Storage.put(fileName, attachment, {
        contentType: attachment.type,
      })
        .then((result) => {
          key = result.key;
          addPicture(key);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('필수 항목들을 빠짐없이 입력해주세요.');
    }
  };

  const addPicture = async (key) => {
    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    const inputData = {
      authorId: userObj.attributes.sub,
      city: cityName,
      location: location,
      instagram: instagram,
      description: description,
      attachment: {
        bucket: 'mytravel-picture13646-dev',
        key: `public/${key}`,
        uri: url,
      },
    };
    await API.graphql(graphqlOperation(createPicture, { input: inputData }))
      .then(() => alert('사진을 성공적으로 업로드했습니다 🙆'))
      .then(() => history.push('/'))
      .catch((error) => console.log(error));
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'location') {
      setLocation(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'instagram') {
      setInstagram(value);
    }
  };

  const onSelectOptionChange = (event) => {
    console.log(event.target.value);
    setCityName(event.target.value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    setFileName(files[0].name);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFilePreview(result);
      setAttachment(file);
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Navigation show={true} />
      <UploadContainer>
        <UploadFormWrap themeProps={theme}>
          <Title>사진 업로드</Title>
          <FileUploadContainer>
            {filePreview ? (
              <>
                <PreviewWrap>
                  <Preview>
                    <img src={filePreview} alt="file" />
                  </Preview>
                </PreviewWrap>
                <FileName>{fileName}</FileName>
              </>
            ) : (
              <FileWrap onClick={handleFileClick} themeProps={theme}>
                <ImFolderUpload size={35} />
                <span>*파일 선택</span>
              </FileWrap>
            )}
            <input
              type="file"
              id="file-input"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={(e) => onFileChange(e)}
              style={{ display: 'none' }}
            />
          </FileUploadContainer>
          <TextInputContainer>
            <InputContainer>
              <span>*도시</span>
              <Select onChange={onSelectOptionChange}>
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
              <span>*위치</span>
              <InputWrap theme={theme}>
                <input
                  name="location"
                  value={location}
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
                  value={instagram}
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
                  value={description}
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
                사진 업로드
              </SubmitButton>
              <CancelButton theme={theme} onClick={() => history.push('/')}>
                취소
              </CancelButton>
            </ButtonContainer>
          </TextInputContainer>
        </UploadFormWrap>
      </UploadContainer>
    </>
  );
};

export default UploadPicture;
