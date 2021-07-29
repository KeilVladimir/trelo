import React, { useContext } from 'react';
import styled from 'styled-components';
import { CardAll } from '../../types';
import { Local } from '../../services/localStorage';
import { ContextCard } from '../Board/Board';
import { ContextOpenInfo } from '../Board/Board';

const Card: React.FC<CardAll> = ({ id, name, author, deleteCard }) => {
  const dispatchInfo = useContext<(id: number) => void>(ContextCard);
  const open = useContext<(state: boolean) => void>(ContextOpenInfo);
  const comments = Local.getComment();
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
            open(true);
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
