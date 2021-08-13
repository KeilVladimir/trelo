import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { InfoCardAll, RefactorCard } from '../../types';
import { Comment } from '../Comment';
import { v4 as uuid } from 'uuid';
import { Error } from '../../ui/Error';
import { Form, Field } from 'react-final-form';

const PopUpForCard: React.FC<InfoCardAll> = ({
  id,
  about,
  name,
  comments,
  saveCard,
  author,
  nameColumns,
  setChangeableCard,
  addComment,
}) => {
  const refCard = useRef<HTMLElement>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [isOpenErrorComment, setIsOpenErrorComment] = useState<boolean>(false);

  useEffect(() => {
    refCard.current?.focus();
  }, [refCard]);

  const initialState: RefactorCard = {
    id: id,
    about: about,
    name: name,
  };
  const onSubmit = (values) => {
    if (values.about.trim() && values.name.trim() !== '') {
      saveCard(values);
    }
  };
  const required = (value) => (value ? '' : 'Поле не может быть пустым');
  return (
    <>
      <PopUpForCardStyle
        tabIndex="0"
        ref={refCard}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === 'Escape') {
            setChangeableCard(undefined);
          }
        }}
        onClick={() => {
          setChangeableCard(undefined);
        }}>
        <section onClick={(event) => event.stopPropagation()}>
          <button
            onClick={() => {
              setChangeableCard(undefined);
            }}>
            X
          </button>
          <h4>Информация о карте</h4>
          <p>Название колонки : {nameColumns}</p>
          <p>Автор карточки : {author}</p>

          <Form onSubmit={onSubmit} initialValues={initialState}>
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <FieldBox>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    validate={required}
                    value={initialState.name}>
                    {({ input, meta }) => (
                      <span>
                        <label>Имя карты</label>
                        <input
                          {...input}
                          type="text"
                          placeholder="Напишите имя"
                        />
                        {meta.error && meta.touched && <p>{meta.error}</p>}
                      </span>
                    )}
                  </Field>
                </FieldBox>{' '}
                <br />
                <FieldBox>
                  <Field
                    name="about"
                    component="input"
                    type="text"
                    validate={required}
                    value={initialState.about}>
                    {({ input, meta }) => (
                      <span>
                        <label>Описание карты</label>
                        <input
                          {...input}
                          type="text"
                          placeholder="Напишите описание"
                        />
                        <button
                          onClick={() => {
                            values.about = '';
                          }}>
                          {' '}
                          Удалить описание
                        </button>
                        {meta.error && meta.touched && <p>{meta.error}</p>}
                      </span>
                    )}
                  </Field>
                </FieldBox>
                <br />
                <button type="submit">Сохранить изменения</button>
              </form>
            )}
          </Form>

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
                  setNewComment('');
                  addComment(newComment, id);
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
        </section>
      </PopUpForCardStyle>
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
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    padding-left: 10px;
  }

  button {
    margin-left: 10px;
    background-color: #0067a3;
    color: white;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }

  button:hover {
    background-color: #0a3391;
  }

  h4 {
    margin-left: 45%;
  }

  section {
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
    border-radius: 5%;
  }

  input {
    margin-left: 10px;
    border-radius: 5%;
  }

  span {
    margin-left: 10px;
    display: block;
  }
`;
const FieldBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    display: flex;
    align-items: baseline;
  }

  p {
    display: block;
    color: #b30100;
  }
`;
export default PopUpForCard;
