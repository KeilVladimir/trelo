import React, { useContext } from 'react';
import styled from 'styled-components';
import { Card as CardProps, InfoCard } from '../../types';
import { ColumnTypes } from '../../types';
import { Local } from '../../services/localStorage';
import { Context } from '../Board/Board';
import { ContextCard } from '../Board/Board';
import { ContextOpenInfo } from '../Board/Board';

const Card: React.FC<CardProps> = ({
  id,
  name,
  comments,
  author,
  nameColumn,
}) => {
  const dispatchInfo = useContext<(state: InfoCard) => void>(ContextCard);
  const open = useContext<(state: boolean) => void>(ContextOpenInfo);
  const setCreatedColumn = useContext<(state: ColumnTypes[]) => void>(Context);
  const columns = Local.getColumn();
  const columnIndex = columns.findIndex(
    (Column) => Column.nameColumns === nameColumn,
  );
  const deleteCardHandle = () => {
    columns[columnIndex].cards = columns[columnIndex].cards.filter(
      (card) => card.id !== id,
    );
    Local.setColumn(columns);
    setCreatedColumn(columns);
  };
  return (
    <>
      <CardStyle>
        <button onClick={deleteCardHandle}>Х</button>
        <div
          onClick={() => {
            open(true);
            dispatchInfo({
              id: id,
              author: author,
              index: columnIndex,
              nameColumn: nameColumn,
            });
          }}>
          <p>{name}</p>
          <p> {'Автор карты: ' + author}</p>
          <p>{' Коментариев: ' + comments.length}</p>
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
