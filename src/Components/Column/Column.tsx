import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { v4 as uuid } from 'uuid';
import { Local } from '../../services/localStorage';
import { Card as CardType, ColumnTypes, PropsForColumn } from '../../types';

const Column: React.FC<{
  key: number;
  propsForColumn: PropsForColumn;
  cards: CardType[];
  setCreatedColumn: (createdColumn: ColumnTypes[]) => void;
}> = (props) => {
  const [isOpenAddCard, setIsOpenAddCard] = useState<boolean>(true);
  const [isOpenButton, setIsOpenButton] = useState<boolean>(false);
  const [nameColumn, setNameBoard] = useState<string>(
    props.propsForColumn.nameColumns,
  );
  const refCardName = useRef<HTMLInputElement>(null);

  const columns = Local.getColumn();
  const columnActual = columns.findIndex(
    (item) => item.nameColumns === nameColumn,
  );

  const handleCard = () => {
    columns[columnActual].cards.push({
      id: uuid(),
      about: '',
      name: refCardName.current?.value,
      author: Local.getAuthor() || '',
      comments: [],
    });
    props.setCreatedColumn(columns);
    Local.setColumn(columns);
  };

  const handleNameColumn = (event) => {
    setNameBoard(event.target.value);
    columns[columnActual] = {
      nameColumns: event.target.value,
      id: props.propsForColumn.id,
      cards: props.cards,
    };
    Local.setColumn(columns);
    props.setCreatedColumn(columns);
  };
  return (
    <BoardStyled>
      <textarea onChange={handleNameColumn} value={nameColumn}>
        {nameColumn}
      </textarea>
      {props.cards.map((elem) => (
        <Card key={elem.id} {...elem} nameColumn={nameColumn} />
      ))}
      {isOpenAddCard && (
        <AddCard
          isOpen={true}
          onClick={() => {
            setIsOpenAddCard(false);
            setIsOpenButton(true);
          }}>
          Добавить карточку
        </AddCard>
      )}
      {isOpenButton && (
        <CardForm>
          <input ref={refCardName} placeholder="Введите название карточки" />
          <button
            onClick={() => {
              setIsOpenButton(false);
              setIsOpenAddCard(true);
              handleCard();
            }}>
            Добавить карточку
          </button>
        </CardForm>
      )}
    </BoardStyled>
  );
};
const AddCard = styled.div`
  &:hover {
    background: rgb(218, 220, 226);
    transition: 0.5s;
  }

  display: block;
  width: 60%;
  height: auto;
  color: rgb(102, 116, 138);
  margin-left: 24px;
  padding: 5px;
  border-radius: 2px;
`;
const CardForm = styled.div`
  input {
    width: 180px;
    min-height: 50px;
    margin: 26px;
    display: block;
  }

  button {
    display: block;
    margin-left: 26px;
    margin-bottom: 10px;
    width: 141px;
    background: rgb(0, 121, 191);
    height: 37px;
    color: white;
    border: none;
    border-radius: 2px;
  }
`;
const BoardStyled = styled.div<string>`
  textarea {
    background: rgb(235, 236, 240);
    padding-top: 17px;
    padding-left: 30px;
    font-size: 19px;
    padding-bottom: 10px;
    border: none;
    resize: none;
  }

  width: 270px;
  min-height: 100px;
  height: auto;
  background: rgb(235, 236, 240);
  font-family: sans-serif;
`;
export default Column;
