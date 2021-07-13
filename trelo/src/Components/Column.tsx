import React, {useState} from 'react';
import styled from 'styled-components';

const AddCard = styled.div<{ isOpen: boolean }>`
  &:hover {
    background: rgb(218, 220, 226);
    transition: 0.5s;
  }

  display: ${({isOpen}) => isOpen ? 'block' : 'none'};
  width: 60%;
  height: auto;
  color: rgb(102, 116, 138);
  margin-left: 24px;
  padding: 5px;
  border-radius: 2px;
`
const BoardStyled = styled.div<string>`
  textarea {
    color: rgb(23, 43, 77);
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

  input {
    width: 180px;
    min-height: 50px;
    margin: 26px;
    display: ${props => props.display};
  }

  button {
    display: ${props => props.display};
    margin-left: 26px;
    margin-bottom: 10px;
    width: 141px;
    background: rgb(0, 121, 191);
    height: 37px;
    color: white;
    border: none;
    border-radius: 2px;
  }
`
interface PropsForColumn{
    nameColumns: string,
    id: number
}
const Column: React.FC<{ key:number ,propsForColumn:PropsForColumn ,SetColumnStorage(ColumnsState: string): void }> = (props) => {
    const [displayAddCard, SetDisplayAddCard] = useState<string>("block");
    const [displayBtn, SetDisplayBtn] = useState<string>("none");
    const [nameBoard, SetNameBoard] = useState<string>(props.propsForColumn.nameColumns)
    const HandlerNameColumn =  (event) => {
        SetNameBoard(event.target.value)
        let arrayColumns = JSON.parse(localStorage.getItem('nameBoard') || '[]')
        arrayColumns[props.propsForColumn.id] = {nameColumns: event.target.value, id: props.propsForColumn.id}
        props.SetColumnStorage(JSON.stringify(arrayColumns))
    }
    return (

        <BoardStyled display={displayBtn}>
            <textarea onChange={HandlerNameColumn} value={nameBoard}>
                    {nameBoard}
            </textarea>
            <AddCard isOpen={true} display={displayAddCard} onClick={() => {
                SetDisplayAddCard("none")
                SetDisplayBtn("block")
            }}>Добавить карточку</AddCard>
            <input placeholder="Введите название карточки"/>
            <button onClick={() => {
                SetDisplayBtn("none")
                SetDisplayAddCard("block")
            }
            }>Добавить карточку
            </button>
        </BoardStyled>
    )
}
export default Column;
