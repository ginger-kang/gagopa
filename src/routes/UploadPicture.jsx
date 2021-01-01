import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createPicture } from '../graphql/mutations';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FiUpload } from 'react-icons/fi';
import { ThemeContext, UserContext } from '../App';
import { lightTheme } from '../theme';

import config from '../aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const UploadContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadFormWrap = styled.div`
  width: 70%;
  min-width: 1000px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 120px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background: ${(props) => props.themeProps.itemBackground};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 950px) {
    flex-direction: column;
    width: 55%;
    min-width: 600px;
  }
`;

const UploadForm = styled.form`
  min-width: 500px;
  width: 45%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.div`
  width: 100%;
  height: 100%;
  max-height: 400px;
  border-radius: 10px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const FileWrap = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.themeProps.body};
  cursor: pointer;
  border-radius: 8px;
  border: 4px dashed ${(props) => props.themeProps.text};
`;

const SubmitButton = styled.input`
  width: 400px;
  height: 53px;
  border-radius: 8px;
  border: none;
  color: white;
  background: #672dce;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 10px;
`;

const ContentsWrap = styled.div`
  width: 400px;
  height: 400px;
  max-height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileUploadContainer = styled.div`
  width: 45%;
  min-width: 500px;
  height: 450px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '400px',
    },
  },
}));

const UploadPicture = () => {
  const [fileName, setFileName] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [cityName, setCityName] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');
  let materialTheme;

  const { theme } = useContext(ThemeContext);
  const { userObj } = useContext(UserContext);
  const classes = useStyles();
  const hiddenFileInput = useRef(null);
  const history = useHistory();

  if (theme === lightTheme) {
    materialTheme = createMuiTheme({
      palette: {
        primary: {
          light: '#7038d4',
          main: '#7038d4',
          dark: '#002884',
          contrastText: '#fff',
        },
      },
    });
  } else {
    materialTheme = createMuiTheme({
      palette: {
        primary: {
          light: '#fcfcfc',
          main: '#fcfcfc',
          dark: '#002884',
          contrastText: '#fff',
        },
        type: 'dark',
      },
    });
  }

  const onSubmit = async (e) => {
    let key;
    e.preventDefault();
    if (attachment) {
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
      alert('파일을 업로드 해주세요.');
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
      .catch((error) => alert(error.message));
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

  const onAutoCompleteChange = (event, value) => {
    setCityName(value);
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

  const citys = ['도쿄', '오사카', '삿포로'];

  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <UploadContainer>
          <UploadFormWrap themeProps={theme}>
            <FileUploadContainer>
              {filePreview ? (
                <ContentsWrap>
                  <Preview>
                    <img src={filePreview} alt="file" />
                  </Preview>
                </ContentsWrap>
              ) : (
                <FileWrap onClick={handleFileClick} themeProps={theme}>
                  <FiUpload size={35} />
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
            <UploadForm
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={(e) => onSubmit(e)}
            >
              <Autocomplete
                options={citys}
                getOptionLabel={(option) => option}
                style={{ width: 400 }}
                name="city"
                onChange={(event, value) => onAutoCompleteChange(event, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={cityName}
                    label="도시"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                name="location"
                value={location}
                onChange={onChange}
                type="text"
                label="위치"
                variant="outlined"
                color="primary"
                maxLength={20}
              />
              <TextField
                name="instagram"
                value={instagram}
                onChange={onChange}
                type="text"
                label="인스타그램"
                variant="outlined"
                color="primary"
                maxLength={10}
              />
              <TextField
                name="description"
                value={description}
                onChange={onChange}
                label="추가설명"
                variant="outlined"
                color="primary"
                type="text"
                maxLength={10}
              />
              <SubmitButton type="submit" value="사진 업로드"></SubmitButton>
            </UploadForm>
          </UploadFormWrap>
        </UploadContainer>
      </ThemeProvider>
    </>
  );
};

export default UploadPicture;
