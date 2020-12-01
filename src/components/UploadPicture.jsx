import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { createPicture } from '../graphql/mutations';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

Amplify.configure(awsconfig);

const UploadContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const UploadFormWrap = styled.div`
  width: 55%;
  min-width: 600px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UploadForm = styled.form`
  min-width: 550px;
  width: 60%;
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
  height: 50px;
  border-radius: 8px;
  border: none;
  color: white;
  background: #672dce;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 30px;
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
  margin-top: 30px;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#672dce',
      main: '#672dce',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

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
  const [attachment, setAttachment] = useState('');
  const [cityName, setCityName] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');

  const classes = useStyles();
  const hiddenFileInput = useRef(null);

  const onSubmit = async (e) => {
    let key;
    e.preventDefault();
    console.log(cityName, location, instagram);
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
    const inputData = {
      city: cityName,
      location: location,
      instagram: instagram,
      description: description,
      attachment: {
        bucket: 'mytravel-picture',
        key: `public/${key}`,
        uri: `s3://mytravel-picture13646-dev/public/${key}`,
      },
    };
    await API.graphql(graphqlOperation(createPicture, { input: inputData }));
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
    console.log(fileName);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  const citys = ['도쿄', '오사카', '삿포로'];

  return (
    <ThemeProvider theme={theme}>
      <UploadContainer>
        <UploadFormWrap>
          <UploadForm
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => onSubmit(e)}
          >
            {attachment ? (
              <ContentsWrap>
                <Preview>
                  <img src={attachment} alt="file" />
                </Preview>
              </ContentsWrap>
            ) : (
              <FileWrap onClick={handleFileClick} themeProps={theme}>
                <p style={{ marginTop: '20px' }}>
                  여기서 사진을 업로드하고 미리보기로 보실 수 있습니다.
                </p>
              </FileWrap>
            )}
            <input
              type="file"
              id="file-input"
              accept="image/*, video/*"
              ref={hiddenFileInput}
              onChange={(e) => onFileChange(e)}
              style={{ display: 'none' }}
            />
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
  );
};

export default UploadPicture;
