import Reacts, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { ColumnTypes, Comment as CommentType } from '../../types';
import React from 'react';
import { Local } from '../../services/localStorage';
import { Context } from '../Board/Board';
const Comment: Reacts.FC<CommentType> = ({
  body,
  author,
  id,
  index,
  cardId,
}) => {
  const refComment = useRef<HTMLInputElement>(null);
  const columns = Local.getColumn();
  const setCreatedColumn = useContext<(state: ColumnTypes[]) => void>(Context);
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const cardActual = columns[index].cards.findIndex(
    (card) => card.id === cardId,
  );
  const handleCommentUpdate = () => {
    columns[index].cards[cardActual].comments.map((comment) => {
      comment.id === id ? (comment.body = refComment.current?.value) : comment;
    });

    setCreatedColumn(columns);
    Local.setColumn(columns);
  };
  const deleteCommentHandle = () => {
    columns[index].cards[cardActual].comments = columns[index].cards[
      cardActual
    ].comments.filter((comment) => comment.id !== id);
    setCreatedColumn(columns);
    Local.setColumn(columns);
  };

  return (
    <CommentStyle>
      <ButtonDelete onClick={deleteCommentHandle}>Х</ButtonDelete>
      <p>Автор комментария : {author}</p>
      {!isOpenComment && (
        <>
          <p>{body}</p>
          <button
            onClick={() => {
              setIsOpenComment(true);
            }}>
            {' '}
            Изменить комментарий
          </button>
        </>
      )}
      {isOpenComment && (
        <>
          <input ref={refComment} />
          <button
            onClick={() => {
              setIsOpenComment(false);
              handleCommentUpdate();
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
