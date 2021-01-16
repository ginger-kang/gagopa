import React, { useContext, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../App';
import { lightTheme } from '../../theme';
import { API, graphqlOperation } from 'aws-amplify';
import { listComments } from '../../graphql/queries';
import { createComment } from '../../graphql/mutations';
import LoadingPage from '../Utils/LoadingPage';
import { dateToString } from '../../utils/utils';

const CommentContainer = styled.div`
  width: 950px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const CommentHeader = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 25px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentWrap = styled.div`
  width: 100%;
  height: ${(props) => (props.isMany ? '600px' : 'auto')};
  overflow-y: ${(props) => (props.isMany ? 'auto' : 'unset')};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CommentBox = styled.div`
  width: 50%;
  height: 200px;
  padding: 20px;
`;

const CommentAuthor = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const UserName = styled.span`
  font-weight: 600;
`;

const Text = styled.p`
  margin-top: 18px;
`;

const Date = styled.span`
  font-size: 11px;
  color: #888888;
  margin-top: 8px;
`;

const Comment = ({ pictureId }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isMany, setIsMany] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await API.graphql(
        graphqlOperation(listComments, {
          filter: { pictureId: { eq: pictureId } },
        }),
      );
      const comments = await data.data.listComments.items;
      setComments(comments);
      setCommentCount(comments.length);
      commentCount > 6 ? setIsMany(true) : setIsMany(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [pictureId, commentCount]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCommentInput(value);
  };

  const onSubmit = async () => {
    const inputData = {
      authorId: cognitoUser.userId,
      pictureId: pictureId,
      text: commentInput,
    };
    await API.graphql(graphqlOperation(createComment, { input: inputData }))
      .then(() => setCommentInput(''))
      .then(() => setCommentCount(0))
      .then(() => alert('성공'))
      .catch((error) => console.log(error));
  };

  console.log(comments);

  return (
    <CommentContainer theme={theme}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <CommentHeader>
            <span>댓글</span>
            &nbsp;
            <span>{comments.length}개</span>
          </CommentHeader>
          <CommentWrap isMany={isMany}>
            {comments.map((comment) => (
              <CommentBox key={comment.id}>
                <CommentAuthor>
                  <Avatar src={comment.author.avatar.uri} alt="avatar" />
                  <InfoWrap>
                    <UserName>{comment.author.username}</UserName>
                    <Date>{dateToString(comments[0].createdAt)}</Date>
                  </InfoWrap>
                </CommentAuthor>
                <Text>{comment.text}</Text>
              </CommentBox>
            ))}
          </CommentWrap>
        </>
      )}
      <input
        type="text"
        value={commentInput}
        placeholder="댓글"
        onChange={onChange}
      />
      <button onClick={onSubmit} style={{ marginBottom: '50px' }}>
        등록
      </button>
    </CommentContainer>
  );
};

export default Comment;
