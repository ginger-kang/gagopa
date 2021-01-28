import React, { useEffect, useState, useContext, useCallback } from 'react';
import { ThemeContext, CognitoContext } from '../../App';
import { lightTheme } from '../../theme';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { listPictures } from '../../graphql/queries';
import LoadingPage from '../Load/LoadingPage';
import { translateToKo } from '../../utils/translate';
import { FaQuestion } from 'react-icons/fa';

const PopularCityListWrap = styled.div`
  display: grid;
  width: 1400px;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 10px;
`;

const Picture = styled.div`
  position: relative;
  width: 330px;
  height: 330px;
  margin-bottom: 15px;
  cursor: pointer;
  :nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  :nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }
  :nth-child(3) {
    grid-column: 3;
    grid-row: 1;
  }
  :nth-child(4) {
    grid-column: 1;
    grid-row: 2;
  }
  :nth-child(5) {
    grid-column: 2;
    grid-row: 2;
  }
  :nth-child(6) {
    grid-column: 3;
    grid-row: 2;
  }
`;

const Hover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
  span {
    position: absolute;
    font-size: 20px;
    color: white;
  }
`;
const ContentSticky = styled.div`
  width: 300px;
  height: 300px;
  margin-left: 10px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  position: sticky;
  top: 73px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  & span {
    text-align: center;
    font-size: 14px;
    line-height: 1.3;
  }
  & div {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
    &:hover {
      transition: all 0.2s ease-in;
      transform: scale(1.1);
    }
  }
`;
const UploadLinkButton = styled.button`
  width: 240px;
  height: 45px;
  background: linear-gradient(45deg, #9f04ff, #3a19f1);
  color: white;
  border-radius: 8px;
`;

const PopularCityList = () => {
  const [highLikeList, setHighLikeList] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);

  const sortByLikes = (a, b) => {
    return b.likes.items.length - a.likes.items.length;
  };

  const fetchPictures = useCallback(async () => {
    try {
      const data = await API.graphql(graphqlOperation(listPictures));
      const pictures = data.data.listPictures.items;
      pictures.sort((a, b) => sortByLikes(a, b));
      let highLikeArray = [];
      console.log(pictures);

      for (let i = 0; i < 6; i++) {
        highLikeArray.push(pictures[i]);
      }
      setHighLikeList(highLikeArray);
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const alertMessage = () => alert('먼저 로그인 해주세요.');
  return (
    <>
      <PopularCityListWrap>
        {highLikeList ? (
          highLikeList.map((picture, index) => (
            <Picture key={index}>
              <img src={picture.attachment[0].uri} alt="post" />
              <Link
                key={picture.id}
                to={{
                  pathname: `/city/${translateToKo[`${picture.city}`]}/${
                    picture.id
                  }`,
                  state: { next: null },
                }}
              >
                <Hover>
                  <span>게시물로 이동 ↑</span>
                </Hover>
              </Link>
            </Picture>
          ))
        ) : (
          <LoadingPage />
        )}
        <ContentSticky theme={theme}>
          <span>
            여러분들만의
            <br />
            일본 여행 사진을 올려주세요.
          </span>
          <div>
            <FaQuestion size={28} />
          </div>
          {cognitoUser ? (
            <>
              <Link to="/upload">
                <UploadLinkButton>사진 올리러 가기</UploadLinkButton>
              </Link>
            </>
          ) : (
            <UploadLinkButton onClick={alertMessage}>
              여행 사진 올리기
            </UploadLinkButton>
          )}
        </ContentSticky>
      </PopularCityListWrap>
    </>
  );
};

export default PopularCityList;
