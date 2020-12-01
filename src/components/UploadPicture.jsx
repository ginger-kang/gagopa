import React, { useState } from 'react';
import { createPicture } from '../graphql/mutations';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

Amplify.configure(awsconfig);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#757ce8',
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
      width: '200px',
    },
  },
}));

const UploadPicture = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [cityName, setCityName] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');

  const classes = useStyles();

  const onSubmit = async (e) => {
    let key;
    e.preventDefault();
    if (file) {
      Storage.put(fileName, file, {
        contentType: file.type,
      })
        .then((result) => {
          key = result;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('파일을 업로드 해주세요.');
    }
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
    if (name === 'city') {
      setCityName(value);
    } else if (name === 'location') {
      setLocation(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'instagram') {
      setInstagram(value);
    }
  };

  const onFileChange = (e) => {
    e.preventDefault();
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="video-uploader">
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            name="city"
            value={cityName}
            onChange={onChange}
            label="도시"
            variant="outlined"
            color="primary"
            type="text"
            maxLength={10}
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
          <p>
            <input
              className="video-input"
              type="file"
              id="file-input"
              accept="image/*, video/*"
              onChange={(e) => onFileChange(e)}
            />
          </p>
          <button type="submit" className="btn">
            Submit <button className="btn-icon" />
          </button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default UploadPicture;
