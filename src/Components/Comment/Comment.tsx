import Reacts, { useState } from 'react';
import styled from 'styled-components';
import { Comment as CommentType } from '../../types';
import { Error } from '../../ui/Error';
import { useSelector } from 'react-redux';
import { getAuthor } from '../../ducks/author';
import useAppDispatch from '../hooks/useAppDispatch';
import { deleteComment, renameComment } from '../../ducks/comment';

const Comment: Reacts.FC<CommentType> = ({ body, id }) => {
  const [newBody, setNewBody] = useState<string>(body);
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const [isOpenError, setIsOpenError] = useState<boolean>(false);
  const author = useSelector(getAuthor);
  const dispatch = useAppDispatch();

  return (
    <CommentStyle>
      <ButtonDelete
        onClick={() => {
          dispatch(deleteComment(id));
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
                dispatch(renameComment({ id: id, body: newBody }));
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
  height: auto;
  padding: 5px;
  p {
    padding-left: 12px;
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
