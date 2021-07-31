import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { v4 as uuid } from 'uuid';
import { Local } from '../../services/localStorage';
import { Column as ColumnType, ColumnTypes } from '../../types';
import { Error } from '../../ui/Error';

const Column: React.FC<ColumnType> = ({
  propsForColumn,
  cards,
  setCards,
  setCreatedColumn,
}) => {
  const [isOpenAddCard, setIsOpenAddCard] = useState<boolean>(true);
  const [isOpenButton, setIsOpenButton] = useState<boolean>(false);
  const [nameCard, setNameCard] = useState<string>('');
  const refColumnName = useRef<HTMLTextAreaElement>(null);
  const [isOpenError, setIsOpenError] = useState<boolean>(false);
  const [isOpenErrorCard, setIsOpenErrorCard] = useState<boolean>(false);
  const columns: ColumnTypes[] = Local.getColumn();
  const idColumn = propsForColumn.id;
  const handleCard = () => {
    cards.push({
      id: uuid(),
      about: 'Описание отсутствует',
      name: nameCard,
      author: Local.getAuthor(),
      idColumn: idColumn,
      nameColumns: propsForColumn.nameColumns,
    });
    Local.setCard(cards);
    setCards(cards);
  };
  const handleDeleteCard = (id: number) => {
    const newCards = cards.filter((card) => card.id !== id);
    Local.setCard(newCards);
    setCards(newCards);
  };
  const handleNameColumn = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    columns.map((column) => {
      if (column.id === idColumn) {
        column.nameColumns = event.target.value;
        setCreatedColumn(columns);
        Local.setColumn(columns);
      }
    });
  };
  return (
    <BoardStyled>
      <textarea
        onBlur={(event) => {
          if (event.target.value === '') {
            setIsOpenError(true);
            refColumnName.current?.focus();
          } else {
            setIsOpenError(false);
          }
        }}
        ref={refColumnName}
        onChange={handleNameColumn}
        value={propsForColumn.nameColumns}>
        {propsForColumn.nameColumns}
      </textarea>
      {isOpenError && <Error>Поле не может быть пустым</Error>}
      {cards.map(
        (elem) =>
          idColumn === elem.idColumn && (
            <Card
              key={elem.id}
              {...elem}
              nameColumns={propsForColumn.nameColumns}
              deleteCard={handleDeleteCard}
            />
          ),
      )}
      {isOpenAddCard && (
        <AddCard
          isOpen={true}
          onClick={() => {
            setIsOpenAddCard(false);
            setIsOpenButton(true);
            setIsOpenErrorCard(false);
          }}>
          Добавить карточку
        </AddCard>
      )}
      {isOpenButton && (
        <CardForm>
          <input
            onChange={(event) => {
              setNameCard(event.target.value);
            }}
            placeholder="Введите название карточки"
          />
          <button
            onClick={() => {
              if (nameCard.trim() === '') {
                setIsOpenErrorCard(true);
              } else {
                setIsOpenErrorCard(false);
                setIsOpenButton(false);
                setIsOpenAddCard(true);
                handleCard();
              }
            }}>
            Добавить карточку
          </button>
        </CardForm>
      )}
      {isOpenErrorCard && <Error>Поле не может быть пустым</Error>}
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
