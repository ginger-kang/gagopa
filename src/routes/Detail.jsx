import React, { useEffect, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/nav/Navigation';
import LoadingPage from '../components/load/LoadingPage';
import { ThemeContext } from '../App';
import { lightTheme } from '../theme';
import Comment from '../components/detail/comment/Comment';
import Article from '../components/detail/article/Article';
import Geocode from '../components/detail/GoogleMap/Geocode';

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  width: 55px;
  height: 55px;
  bottom: 1.5rem;
  border-radius: 30px;
  position: fixed;
  bottom: 25px;
  left: 3rem;
  font-size: 13px;
  background: ${(props) => props.theme.mainColor};
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const HorizontalLine = styled.div`
  background-color: ${(props) =>
    props.theme === lightTheme ? '#cacaca' : '#4c4949'};
  width: 950px;
  height: 1px;
  margin: 30px 0;
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
      <Navigation show={true} navSearch={true} />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container>
          <Article pictureObj={pictureObj} />
          <HorizontalLine theme={theme} />
          <Geocode location={pictureObj.location} />
          <Comment pictureId={pictureId} />
        </Container>
      )}
      {/* <Link
        to={{
          pathname: `/city/${cityName}/`,
          state: { next: nextState },
        }}
      >
        <BackButton theme={theme}>돌아가기</BackButton>
      </Link> */}
    </>
  );
};

export default Detail;
