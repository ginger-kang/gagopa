import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';
import Navigation from '../components/Nav/Navigation';
import LoadingPage from '../components/Load/LoadingPage';
import { ThemeContext } from '../App';
import { lightTheme } from '../theme';
import Comment from '../components/Detail/Comment/Comment';
import Article from '../components/Detail/Article/Article';
import Geocode from '../components/Detail/GoogleMap/Geocode';

const Container = styled.main`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.theme === lightTheme ? '#f5f5f5' : '#252424'};
`;

const HorizontalLine = styled.div`
  background-color: ${(props) =>
    props.theme === lightTheme ? '#cacaca' : '#4c4949'};
  width: 1000px;
  height: 1px;
  margin: 15px 0;
  @media screen and (max-width: 1000px) {
    width: 95vw;
    margin: 15px 0;
  }
`;

const Detail = ({ match }) => {
  const [pictureObj, setPictureObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const commentRef = useRef();
  const pictureId = match.params.id;

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

  const moveScrollToComment = () => {
    const { offsetTop } = commentRef.current;
    window.scrollTo(0, offsetTop - 60);
  };

  return (
    <>
      <Navigation show={true} navSearch={true} />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container theme={theme}>
          <Article
            pictureObj={pictureObj}
            moveScrollToComment={moveScrollToComment}
          />
          <HorizontalLine theme={theme} />
          <Geocode location={pictureObj.location} />
          <HorizontalLine theme={theme} ref={commentRef} />
          <Comment pictureId={pictureId} />
        </Container>
      )}
    </>
  );
};

export default Detail;
