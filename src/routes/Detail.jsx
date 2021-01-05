import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/LoadingPage';

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PictureWrap = styled.div`
  width: 50%;
  max-width: 500px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled.button`
  width: 125px;
  height: 45px;
  right: 5rem;
  bottom: 1.5rem;
  border-radius: 30px;
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const Detail = ({ match }) => {
  let location = useLocation();
  const [pictureObj, setPictureObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pictureId = match.params.id;
  const nextState = location.state.next;

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(
        graphqlOperation(getPicture, {
          id: pictureId,
        }),
      );
      const picture = data.data.getPicture;
      setPictureObj(picture);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [pictureId]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <>
      <Navigation show={true} />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container>
          <PictureWrap>
            <img src={pictureObj.attachment.uri} alt="post" />
          </PictureWrap>
        </Container>
      )}
      <Link
        to={{
          pathname: `/city/tokyo/`,
          state: { next: nextState },
        }}
      >
        <BackButton>돌아가기</BackButton>
      </Link>
    </>
  );
};

export default Detail;
