import React, { useContext, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../App';
import { lightTheme } from '../../theme';
import { API, graphqlOperation } from 'aws-amplify';
import { commentsByDate } from '../../graphql/queries';
import { createComment } from '../../graphql/mutations';
import LoadingPage from '../Utils/LoadingPage';
import { dateToString } from '../../utils/utils';
import { AiOutlineEllipsis } from 'react-icons/ai';

const CommentContainer = styled.div`
  width: 950px;
  margin-bottom: 100px;
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
  padding: 5px 20px;
`;

const CommentAuthor = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
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
  font-size: 15px;
  padding: 0 40px 15px 0;
  line-height: 1.5;
`;

const Date = styled.span`
  font-size: 11px;
  color: #888888;
  margin-top: 8px;
`;

const ModifyAndDelete = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 35px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const CommentInputWrap = styled.div`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const Input = styled.textarea`
  width: 500px;
  height: 40px;
  padding: 10px;
  margin: 0 10px;
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
        graphqlOperation(commentsByDate, {
          pictureId: pictureId,
          sortDirection: 'DESC',
        }),
      );
      const comments = await data.data.commentsByDate.items;
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
    if (!cognitoUser) {
      alert('먼저 로그인을 해주세요.');
      return;
    }
    const inputData = {
      authorId: cognitoUser.userId,
      pictureId: pictureId,
      text: commentInput,
    };
    await API.graphql(graphqlOperation(createComment, { input: inputData }))
      .then(() => setCommentInput(''))
      .then(() => setCommentCount((prev) => prev + 1))
      .then(() => alert('성공'))
      .catch((error) => console.log(error));
  };

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
                  {cognitoUser && comment.author.userId === cognitoUser.userId && (
                    <ModifyAndDelete>
                      <AiOutlineEllipsis size={30} />
                    </ModifyAndDelete>
                  )}
                </CommentAuthor>
                <Text>{comment.text}</Text>
              </CommentBox>
            ))}
          </CommentWrap>
          <CommentInputWrap theme={theme}>
            {cognitoUser ? (
              <Avatar src={cognitoUser.avatar.uri} alt="avatar" />
            ) : (
              <span style={{ fontSize: '1.5rem' }}>👻</span>
            )}
            <Input
              type="text"
              value={commentInput}
              placeholder="댓글"
              onChange={onChange}
              autoComplete="off"
              autoCorrect="off"
              maxLength="100"
            />
            <button onClick={onSubmit}>등록</button>
          </CommentInputWrap>
        </>
      )}
    </CommentContainer>
  );
};

export default Comment;
