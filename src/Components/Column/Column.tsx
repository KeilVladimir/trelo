import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import LocalStorage from '../../Services/LocalStorage';
interface PropsForColumn {
  nameColumns: string;
  id: number;
}

const Column: React.FC<{
  key: number;
  propsForColumn: PropsForColumn;
  cardName: any[]; // по карточкам еще не сделал
}> = (props) => {
  const [isOpenAddCard, setIsOpenAddCard] = useState<boolean>(true);
  const [isOpenButton, setIsOpenButton] = useState<boolean>(false);
  const [nameBoard, setNameBoard] = useState<string>(
    props.propsForColumn.nameColumns,
  );
  const handleNameColumn = (event) => {
    setNameBoard(event.target.value);
    const arrayColumns = JSON.parse(
      LocalStorage.getFromLocal(LocalStorage.keyColumn) || '[]',
    );

    arrayColumns[props.propsForColumn.id] = {
      nameColumns: event.target.value,
      id: props.propsForColumn.id,
    };
    LocalStorage.setInLocal(
      LocalStorage.keyColumn,
      JSON.stringify(arrayColumns),
    );
  };
  return (
    <BoardStyled>
      <textarea onChange={handleNameColumn} value={nameBoard}>
        {nameBoard}
      </textarea>
      {props.cardName.map((elem) => (
        <Card key={2} cardName={elem.name} /> //передать массив из карточек из APP в Column и из коламна мэпом выводить карты , ком для себя чтобы не забыть че хотел сделать
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
          <input placeholder="Введите название карточки" />
          <button
            onClick={() => {
              setIsOpenButton(false);
              setIsOpenAddCard(true);
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
  }

  width: 270px;
  min-height: 100px;
  height: auto;
  background: rgb(235, 236, 240);
  font-family: sans-serif;
`;

export default Column;
