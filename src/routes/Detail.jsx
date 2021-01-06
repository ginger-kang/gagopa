import React, { useEffect, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/LoadingPage';
import { ThemeContext } from '../App';

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
  bottom: 25px;
  left: 50%;
  font-size: 13px;
  transform: translateX(-50%);
  background: ${(props) => props.theme.itemBackground};
  color: ${(props) => props.theme.text};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Detail = ({ match }) => {
  let location = useLocation();
  const [pictureObj, setPictureObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  const pictureId = match.params.id;
  const nextState = location.state.next;
  const cityName = location.state.cityName;

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
          pathname: `/city/${cityName}/`,
          state: { next: nextState },
        }}
      >
        <BackButton theme={theme}>돌아가기</BackButton>
      </Link>
    </>
  );
};

export default Detail;
