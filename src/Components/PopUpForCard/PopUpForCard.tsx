import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ColumnTypes, InfoCardAll } from '../../types';
import { Local } from '../../services/localStorage';
import { Context } from '../Board/Board';
import { Comment } from '../Comment';
import { v4 as uuid } from 'uuid';

const PopUpForCard: React.FC<InfoCardAll> = ({
  id,
  nameColumn,
  index,
  author,
  open,
  isOpen,
  state,
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [isOpenName, setIsOpenName] = useState<boolean>(false);
  const refCard = useRef<HTMLElement>(null);
  const refCommentName = useRef<HTMLInputElement>(null);
  const refCardName = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const setCreatedColumn = useContext<(state: ColumnTypes[]) => void>(Context);
  const columns = Local.getColumn();
  const cardIndex = state[index].cards.findIndex((item) => item.id === id);
  const card = columns[index].cards[cardIndex];
  const handleComment = () => {
    columns[index].cards.map((card) => {
      card.id === id
        ? card.comments.push({
            body: refCommentName.current?.value,
            author: author,
            cardId: id,
            id: uuid(),
            index: index,
          })
        : card;
    });
    setCreatedColumn(columns);
    Local.setColumn(columns);
  };
  const handleName = () => {
    columns[index].cards.map((card) => {
      card.id === id ? (card.name = refCardName.current?.value) : card;
    });
    setCreatedColumn(columns);
    Local.setColumn(columns);
  };
  const handleDeleteDescripyion = () => {
    columns[index].cards.map((card) => {
      card.id === id ? (card.about = 'описание отсутствует') : card;
    });
    setCreatedColumn(columns);
    Local.setColumn(columns);
  };
  const handleDescriptionCard = () => {
    columns[index].cards.map((card) => {
      card.id === id ? (card.about = refDescription.current?.value) : card;
    });
    setCreatedColumn(columns);
    Local.setColumn(columns);
  };
  useEffect(() => {
    refCard.current?.focus();
  });
  return (
    <>
      {isOpen && (
        <PopUpForCardStyle
          tabIndex="0"
          ref={refCard}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === 'Escape') {
              open(false);
            }
          }}>
          <button
            onClick={() => {
              open(false);
            }}>
            X
          </button>
          <div>
            <h4>Информация о карте</h4>
            {<p>Название карточки : {card.name}</p>}
            {!isOpenName && (
              <button
                onClick={() => {
                  setIsOpenName(true);
                }}>
                Изменить название карточки
              </button>
            )}
            {isOpenName && (
              <>
                <input ref={refCardName || ''} />
                <button
                  onClick={() => {
                    setIsOpenName(false);
                    handleName();
                  }}>
                  Изменить имя карточки
                </button>
              </>
            )}
            <p>Название колонки : {nameColumn}</p>
            <p>Автор карточки : {author}</p>
            <p>
              Описание :
              {card.about === '' ? 'Описание отстуствует' : card.about}
            </p>
            {!isOpenDescription && (
              <button
                onClick={() => {
                  setIsOpenDescription(true);
                }}>
                Изменить описание
              </button>
            )}
            {isOpenDescription && (
              <>
                <input ref={refDescription || ''} />
                <button
                  onClick={() => {
                    setIsOpenDescription(false);
                    handleDescriptionCard();
                  }}>
                  Добавить описание
                </button>
              </>
            )}
            <button onClick={handleDeleteDescripyion}> Удалить описание</button>
            <h4>Коментарии</h4>
            <input ref={refCommentName} type="text" />
            <button onClick={handleComment}>Добавить комент</button>
            {card.comments.map((comment) => (
              <Comment key={uuid()} {...comment} />
            ))}
          </div>
        </PopUpForCardStyle>
      )}
    </>
  );
};
const PopUpForCardStyle = styled.span`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: block;

  p {
    padding-left: 10px;
  }

  button {
    margin-left: 10px;
  }

  h4 {
    margin-left: 45%;
  }

  div {
    background: white;
    min-height: 400px;
    margin: 0 auto;
    width: 80%;
    padding-top: 10px;
  }

  textarea {
    font-size: 16px;
    background: rgb(235, 236, 240);
    padding-top: 17px;
    padding-left: 30px;

    padding-bottom: 10px;
    border: none;
  }
`;
export default PopUpForCard;
