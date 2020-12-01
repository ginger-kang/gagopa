import React, { useState } from 'react';
import { createPicture } from '../graphql/mutations';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const UploadPicture = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      Storage.put(name, file, {
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
    addPicture();
  };

  const addPicture = async () => {
    const inputData = {
      city: 'tokyo',
      location: 'koenji',
      instagram: 'dehhun',
      attachment: {
        bucket: 'mytravel-picture',
        key: 'public/saiki.png',
        uri: 's3://mytravel-picture13646-dev/public/saiki.png',
      },
    };
    await API.graphql(graphqlOperation(createPicture, { input: inputData }));
  };

  const onFileChange = (e) => {
    e.preventDefault();
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  };

  return (
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
  );
};

export default UploadPicture;
