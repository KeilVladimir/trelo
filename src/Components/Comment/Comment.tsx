import Reacts, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Comment as CommentType } from '../../types';
import React from 'react';
import { Local } from '../../services/localStorage';
import { ContextComment } from '../Board/Board';
import { Error } from '../../ui/Error';

const Comment: Reacts.FC<CommentType> = ({ body, author, id }) => {
  let comments = Local.getComment();
  const setComments = useContext(ContextComment);
  const [newBody, setNewBody] = useState<string>(body);
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const [isOpenError, setIsOpenError] = useState<boolean>(false);

  let newComments;
  const handleDeleteComment = (id: number) => {
    newComments = comments.filter((comment) => comment.id !== id);
    setComments(newComments);
    Local.setComment(newComments);
  };
  const handleUdpateComment = (id: number) => {
    newComments = comments.map((comment) => {
      comment.id === id ? (comment.body = newBody) : comment;
      return comment;
    });
    setComments(newComments);
    Local.setComment(newComments);
  };
  return (
    <CommentStyle>
      <ButtonDelete
        onClick={() => {
          handleDeleteComment(id);
        }}>
        Х
      </ButtonDelete>
      <p>Автор комментария : {author}</p>
      {!isOpenComment && (
        <>
          <p>{body}</p>
          <button
            onClick={() => {
              setIsOpenComment(true);
              setIsOpenError(false);
            }}>
            {' '}
            Изменить комментарий
          </button>
          <br />
        </>
      )}
      {isOpenError && <Error>Введите не пустое значение</Error>}
      {isOpenComment && (
        <>
          <input
            onChange={(event) => {
              setNewBody(event.target?.value);
            }}
            value={newBody}
          />
          <button
            onClick={() => {
              setIsOpenComment(false);
              if (newBody.trim() === '') {
                setIsOpenError(true);
              } else {
                setIsOpenError(false);
                handleUdpateComment(id);
              }
            }}>
            Изменить
          </button>
        </>
      )}
    </CommentStyle>
  );
};
const CommentStyle = styled.span`
  margin: 10px;
  min-width: 200px;
  width: auto;
  max-width: 350px;
  display: block;
  border: 1px ridge black;
  margin-bottom: 10px;
  height: auto;

  p {
    padding-left: 30px;
  }

  button {
  }
`;
const ButtonDelete = styled.button`
  float: right;
  background: #ad0509;
  color: white;
`;
export default Comment;
