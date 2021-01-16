import React, { useEffect, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Utils/LoadingPage';
import { ThemeContext } from '../App';
import { lightTheme } from '../theme';
import Comment from '../components/Detail/Comment';
import Article from '../components/Detail/Article';

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  background: ${(props) => props.theme.mainColor};
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const HorizontalLine = styled.div`
  background-color: ${(props) =>
    props.theme === lightTheme ? '#cacaca' : '#4c4949'};
  width: 950px;
  height: 1px;
  margin: 50px 0;
`;

const Detail = ({ match }) => {
  let location = useLocation();
  const [pictureObj, setPictureObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  const pictureId = match.params.id;
  const nextState = location.state.next;
  const cityName = location.state.cityName;

  let date;

  if (pictureObj) {
    const createdAt = pictureObj.createdAt.split('T');
    date = {
      year: createdAt[0].split('-')[0],
      month: createdAt[0].split('-')[1],
      day: createdAt[0].split('-')[2],
    };
  }

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
          <Article pictureObj={pictureObj} date={date} />
          <HorizontalLine theme={theme} />
          <Comment pictureId={pictureId} />
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
