import React, { useContext } from 'react';
import styled from 'styled-components';
import { Card as CardType, Comment } from '../../types';
import { ContextCard } from '../Board/Board';
import { useSelector } from 'react-redux';
import { getComments } from '../../ducks/comment';
import useAppDispatch from '../hooks/useAppDispatch';
import { deleteCard } from '../../ducks/card';

const Card: React.FC<CardType> = ({ id, name, author }) => {
  const dispatchInfo = useContext<(id: number) => void>(ContextCard);
  const comments: Comment[] = useSelector(getComments);
  const dispatch = useAppDispatch();
  let commentsActual = 0;
  comments.forEach((comment) => comment.cardId === id && commentsActual++);

  return (
    <>
      <CardStyle>
        <button
          onClick={() => {
            dispatch(deleteCard(id));
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
