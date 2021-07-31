import React, { useContext } from 'react';
import styled from 'styled-components';
import { CardAll, Comment } from '../../types';
import { Local } from '../../services/localStorage';
import { ContextCard } from '../Board/Board';

const Card: React.FC<CardAll> = ({ id, name, author, deleteCard }) => {
  const dispatchInfo = useContext<(id: number) => void>(ContextCard);
  const comments: Comment[] = Local.getComment();
  let commentsActual = 0;
  comments.forEach((comment) => comment.cardId === id && commentsActual++);

  return (
    <>
      <CardStyle>
        <button
          onClick={() => {
            deleteCard(id);
          }}>
          Х
        </button>
        <div
          onClick={() => {
            dispatchInfo(id);
          }}>
          <p>{name}</p>
          <p> {'Автор карты: ' + author}</p>
          {<p>{' Коментариев: ' + commentsActual}</p>}
        </div>
      </CardStyle>
    </>
  );
};
const CardStyle = styled.div`
  width: 150px;
  min-height: 60px;
  background: white;
  margin-left: 35px;
  height: auto;
  border-radius: 13px;

  p {
    padding-top: 5px;
    padding-left: 5px;
  }

  button {
    color: red;
    background: white;
    float: right;
    border: none;
    font-size: 18px;
  }
`;
export default Card;
