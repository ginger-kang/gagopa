import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createPicture } from '../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { ImFolderUpload } from 'react-icons/im';
import { ThemeContext, UserContext } from '../App';
import { lightTheme } from '../theme';
import Navigation from '../components/Nav/Navigation';
import { translateToKo } from '../utils/translate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import config from '../aws-exports';
import { PICTURE_MAX_COUNT, UPLOAD_ALERT_MESSAGE } from '../utils/constant';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const UploadContainer = styled.main`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  padding-top: 70px;
`;

const UploadFormWrap = styled.div`
  width: 600px;
  border-radius: 10px;
  margin: 40px auto;
  padding: 50px 0;
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
  display: ${(props) => (props.isFileUpload ? 'none' : 'flex')};
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

const PreviewContainer = styled.div`
  width: 300px;
  height: 300px;
  display: ${(props) => (props.isFileUpload ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
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
  @media screen and (max-width: 450px) {
    width: 220px;
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
  @media screen and (max-width: 450px) {
    width: 220px;
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
  font-size: 11px;
  color: #a0a0a0;
  line-height: 1.2;
  margin-bottom: 20px;
  word-break: keep-all;
  @media screen and (max-width: 450px) {
    width: 200px;
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

const LeftSlideButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
  @media screen and (max-width: 450px) {
    left: -35px;
  }
`;

const RightSlideButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
  @media screen and (max-width: 450px) {
    right: -35px;
  }
`;

const UploadPicture = () => {
  const [fileNames, setFileNames] = useState(null);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [fileObjs, setFileObjs] = useState(null);
  const [fileArray, setFileArray] = useState(null);
  const [fileIndex, setFileIndex] = useState(0);

  const [cityName, setCityName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');

  const { theme } = useContext(ThemeContext);
  const { userObj } = useContext(UserContext);
  const hiddenFileInput = useRef(null);
  const history = useHistory();

  const cityList = Object.values(translateToKo);

  const s3Upload = (fileName, attachment) => {
    Storage.put(fileName, attachment, {
      contentType: attachment.type,
    }).catch((err) => {
      console.log(err);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !fileObjs || !location || !title) {
      alert(UPLOAD_ALERT_MESSAGE.LACK_REQUIRED_FIELD);
      return;
    }
    for (let i = 0; i < fileObjs.length; i++) {
      s3Upload(fileNames[i], fileObjs[i]);
    }
    addPicture(fileNames);
  };

  const addPicture = async (keys) => {
    let attachments = [];
    keys.forEach((key) => {
      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      const S3Object = {
        bucket: 'mytravel-picture13646-dev',
        key: `public/${key}`,
        uri: url,
      };
      attachments.push(S3Object);
    });
    const inputData = {
      authorId: userObj.attributes.sub,
      country: '일본',
      city: cityName,
      title: title,
      location: location,
      instagram: instagram,
      description: description,
      attachment: attachments,
    };
    await API.graphql(graphqlOperation(createPicture, { input: inputData }))
      .then(() => alert(UPLOAD_ALERT_MESSAGE.COMPLETE_UPLOAD_PICTURE))
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
    } else if (name === 'title') {
      setTitle(value);
    }
  };

  const onSelectOptionChange = (event) => {
    setCityName(event.target.value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    if (files.length > PICTURE_MAX_COUNT) {
      alert(UPLOAD_ALERT_MESSAGE.OVER_PICTURE_MAX_COUNT);
      return;
    }
    const fileArrays = [];
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      fileArrays.push(URL.createObjectURL(files[i]));
      fileNames.push(files[i].name);
    }
    setFileObjs(files);
    setIsFileUpload(true);
    setFileArray(fileArrays);
    setFileNames(fileNames);
  };

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  const rightFileSlide = () => {
    if (fileIndex === fileObjs.length - 1) return;
    setFileIndex((prev) => prev + 1);
  };

  const leftFileSlide = () => {
    if (fileIndex === 0) return;
    setFileIndex((prev) => prev - 1);
  };

  return (
    <>
      <Navigation show={true} navSearch={true} />
      <UploadContainer>
        <UploadFormWrap themeProps={theme}>
          <Title>사진 업로드</Title>
          <FileUploadContainer>
            <>
              {fileArray && (
                <PreviewContainer isFileUpload={isFileUpload}>
                  <PreviewWrap>
                    <Preview>
                      <img src={fileArray[fileIndex]} alt="..." />
                    </Preview>
                    <FileName>{fileNames[fileIndex]}</FileName>
                  </PreviewWrap>
                  <LeftSlideButton onClick={leftFileSlide}>
                    <BiChevronLeft size={25} />
                  </LeftSlideButton>
                  <RightSlideButton onClick={rightFileSlide}>
                    <BiChevronRight size={25} />
                  </RightSlideButton>
                </PreviewContainer>
              )}
              <FileWrap
                onClick={handleFileClick}
                themeProps={theme}
                isFileUpload={isFileUpload}
              >
                <ImFolderUpload size={35} />
                <span>*파일 선택(최대 6장)</span>
              </FileWrap>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                ref={hiddenFileInput}
                multiple="multiple"
                onChange={(e) => onFileChange(e)}
                style={{ display: 'none' }}
              />
            </>
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
              <span>*사진 제목</span>
              <InputWrap theme={theme}>
                <input
                  name="title"
                  value={title}
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
