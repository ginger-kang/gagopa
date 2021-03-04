import React, { useContext, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext, CognitoContext } from '../../../App';
import { lightTheme } from '../../../theme';
import { API, graphqlOperation } from 'aws-amplify';
import { commentsByDate } from '../../../graphql/queries';
import { createComment } from '../../../graphql/mutations';
import LoadingPage from '../../Load/LoadingPage';
import { dateToString } from '../../../utils/utils';
import { AiOutlineEllipsis } from 'react-icons/ai';
import EditDeleteComment from './EditDeleteComment';
import { AUTH_ALERT_MESSAGE, EMPTY_COMMENT } from '../../../utils/constant';
import NoComment from './NoComment';

const CommentContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.theme.itemBackground};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  @media screen and (max-width: 1000px) {
    width: 95vw;
  }
`;

const CommentHeader = styled.header`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
`;

const CommentWrap = styled.ul`
  width: 100%;
  height: ${(props) => (props.isMany ? '600px' : 'auto')};
  overflow-y: ${(props) => (props.isMany ? 'auto' : 'unset')};
  display: ${(props) => (props.hasComment ? 'flex' : 'none')};
  flex-direction: row;
  flex-wrap: wrap;
  @media screen and (max-width: 1000px) {
    display: block;
    flex-direction: column;
    flex-wrap: none;
  }
`;

const CommentBox = styled.li`
  width: 100%;
  padding: 20px 15px 20px 25px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
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

const TextWrap = styled.div`
  overflow: auto;
  margin-top: 13px;
  padding: 0 40px 5px 0;
`;

const Text = styled.p`
  font-size: 15px;
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
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    right: 15px;
  }
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

const InputWrap = styled.div`
  width: 75%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1000px) {
    width: 60%;
  }
`;

const Input = styled.textarea`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  resize: none;
  font-size: 14px;
  line-height: 20px;
  margin: 0 10px 0 15px;
  padding: 8px 45px 8px 8px;
  color: ${(props) => (props.theme === lightTheme ? '#353536' : 'white')};
  background: ${(props) =>
    props.theme === lightTheme ? '#f5f5f5' : '#252424'};
  border: 1px solid
    ${(props) => (props.theme === lightTheme ? '#cacaca' : '#4c4949')};
  &:focus {
    outline: none;
    border: 1px solid #7038d4;
  }
`;

const CommentSubmitButton = styled.button`
  border-radius: 8px;
  font-size: 14px;
  color: ${(props) => (props.theme === lightTheme ? '#7038d4' : '#8c52f3')};
  position: absolute;
  right: 18px;
  top: 50%;
  background: none;
  transform: translateY(-50%);
`;

const ReactionBox = styled.div`
  padding: 15px 0 5px 0;
`;

const Comment = ({ pictureId }) => {
  const { theme } = useContext(ThemeContext);
  const { cognitoUser } = useContext(CognitoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isMany, setIsMany] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [editToggle, setEditToggle] = useState(false);
  const [editCommentId, setEditCommentId] = useState('');
  const [editText, setEditText] = useState('');
  const [hasComment, setHasComment] = useState(false);

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
      setHasComment(comments.length > 0);
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
      alert(AUTH_ALERT_MESSAGE.NOT_SIGN_IN);
      return;
    }
    if (!commentInput) {
      alert(EMPTY_COMMENT);
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
      .catch((error) => console.log(error));
  };

  const handleCommentMenu = (id, text) => {
    setEditText(text);
    setEditCommentId(id);
    setEditToggle((prev) => !prev);
  };
  return (
    <>
      <CommentContainer theme={theme}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <CommentHeader theme={theme}>
              <span>댓글</span>
              &nbsp;
              <span>{comments.length}개</span>
            </CommentHeader>
            <NoComment hasComment={hasComment} />
            <CommentWrap isMany={isMany} hasComment={hasComment}>
              {comments.map((comment) => (
                <CommentBox key={comment.id}>
                  <CommentAuthor>
                    <Avatar src={comment.author.avatar.uri} alt="avatar" />
                    <InfoWrap>
                      <UserName>{comment.author.username}</UserName>
                      <Date>{dateToString(comments[0].createdAt)}</Date>
                    </InfoWrap>
                    {cognitoUser &&
                      comment.author.userId === cognitoUser.userId && (
                        <ModifyAndDelete>
                          <AiOutlineEllipsis
                            size={30}
                            onClick={() =>
                              handleCommentMenu(comment.id, comment.text)
                            }
                          />
                        </ModifyAndDelete>
                      )}
                  </CommentAuthor>
                  <TextWrap>
                    <Text>{comment.text}</Text>
                  </TextWrap>
                  <ReactionBox>🤍💙🤍💙🤍💙</ReactionBox>
                </CommentBox>
              ))}
            </CommentWrap>
            <CommentInputWrap theme={theme}>
              {cognitoUser ? (
                <Avatar src={cognitoUser.avatar.uri} alt="avatar" />
              ) : (
                <span style={{ fontSize: '30px' }}>👻</span>
              )}
              <InputWrap>
                <Input
                  type="text"
                  value={commentInput}
                  placeholder="댓글 작성"
                  onChange={onChange}
                  autoComplete="off"
                  autoCorrect="off"
                  maxLength="100"
                  theme={theme}
                />
                <CommentSubmitButton onClick={onSubmit} theme={theme}>
                  등록
                </CommentSubmitButton>
              </InputWrap>
            </CommentInputWrap>
          </>
        )}
      </CommentContainer>
      {editToggle && (
        <EditDeleteComment
          id={editCommentId}
          toggle={handleCommentMenu}
          refresh={setCommentCount}
          text={editText}
        />
      )}
    </>
  );
};

export default Comment;
