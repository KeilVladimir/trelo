import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { InfoCardAll } from '../../types';
import { Comment } from '../Comment';
import { v4 as uuid } from 'uuid';
import { Error } from '../../ui/Error';

const PopUpForCard: React.FC<InfoCardAll> = ({
  id,
  nameColumns,
  author,
  open,
  isOpen,
  about,
  name,
  renameCard,
  comments,
  addDescription,
  deleteDescription,
  addComment,
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [isOpenName, setIsOpenName] = useState<boolean>(false);
  const refCard = useRef<HTMLElement>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [newCardName, setNewCardName] = useState<string>(name);
  const [newDescription, setNewDescription] = useState<string>(about);
  const [isOpenErrorCards, setIsOpenErrorCard] = useState<boolean>(false);
  const [isOpenErrorDescription, setIsOpenErrorDescription] =
    useState<boolean>(false);
  const [isOpenErrorComment, setIsOpenErrorComment] = useState<boolean>(false);
  useEffect(() => {
    refCard.current?.focus();
  }, [refCard]);
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
          }}
          onClick={() => {
            open(false);
          }}>
          <div onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => {
                open(false);
              }}>
              X
            </button>
            <h4>Информация о карте</h4>
            {<p>Название карточки : {name}</p>}
            {!isOpenName && (
              <button
                onClick={() => {
                  setIsOpenName(true);
                  setIsOpenErrorCard(false);
                }}>
                Изменить название карточки
              </button>
            )}
            {isOpenErrorCards && <Error>Введите не пустое значение</Error>}
            {isOpenName && (
              <>
                <input
                  onChange={(event) => {
                    setNewCardName(event.target?.value);
                  }}
                  value={newCardName}
                />
                <button
                  onClick={() => {
                    {
                      setIsOpenName(false);
                      if (newCardName.trim() === '') {
                        setIsOpenErrorCard(true);
                      } else {
                        renameCard(newCardName, id);
                        setIsOpenErrorCard(false);
                      }
                    }
                  }}>
                  Изменить имя карточки
                </button>
              </>
            )}
            <p>Название колонки : {nameColumns}</p>
            <p>Автор карточки : {author}</p>
            <p>Описание : {about}</p>
            {!isOpenDescription && (
              <button
                onClick={() => {
                  setIsOpenDescription(true);
                  setIsOpenErrorDescription(false);
                }}>
                Изменить описание
              </button>
            )}
            {isOpenDescription && (
              <>
                <input
                  onChange={(event) => {
                    setNewDescription(event.target?.value);
                  }}
                  type="text"
                  value={
                    newDescription === 'Описание отсутствует'
                      ? ''
                      : newDescription
                  }
                />
                <button
                  onClick={() => {
                    setIsOpenDescription(false);
                    if (newDescription.trim() === '') {
                      setIsOpenErrorDescription(true);
                    } else {
                      addDescription(newDescription, id);
                      setIsOpenErrorDescription(false);
                    }
                  }}>
                  Добавить описание
                </button>
              </>
            )}
            {
              <>
                <button
                  onClick={() => {
                    deleteDescription(id);
                  }}>
                  {' '}
                  Удалить описание
                </button>
                <br />
              </>
            }
            {isOpenErrorDescription && (
              <Error>Введите не пустое значение</Error>
            )}
            <h4>Коментарии</h4>
            <input
              onChange={(event) => {
                setNewComment(event.target?.value);
              }}
              type="text"
              value={newComment}
            />
            {
              <button
                onClick={() => {
                  if (newComment.trim() === '') {
                    setIsOpenErrorComment(true);
                  } else {
                    setIsOpenErrorComment(false);
                    addComment(newComment, id);
                    setNewComment('');
                  }
                }}>
                Добавить комент
              </button>
            }
            {isOpenErrorComment && <Error>Введите не пустое значение</Error>}
            {comments.map(
              (comment) =>
                comment.cardId === id && <Comment key={uuid()} {...comment} />,
            )}
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
