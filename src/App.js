import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './global-styles';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listPictures } from './graphql/queries';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const Hello = styled.div`
  background-color: orange;
`;

function App() {
  const [name, setName] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    fetchPicture();
  }, []);

  const fetchPicture = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listPictures));
      console.log(data.data.listPictures);
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (e) => {
    e.preventDefault();
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      Storage.put(name, file, {
        // level: 'protected',
        contentType: file.type,
      })
        .then((result) => {
          console.log(result);
        })
        .then(() => {
          document.getElementById('file-input').value = null;
          setFile(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('파일을 업로드 해주세요.');
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Hello>안녕하세요</Hello>
      <div className="video-uploader">
        <form onSubmit={(e) => onSubmit(e)}>
          <p>
            <label className="select-label">Select video: </label>
          </p>
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
    </React.Fragment>
  );
}

export default App;
