import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column } from '../Column';
import { PopUpForAuthor } from '../PopUpForAuthor';
import { PopUpForCard } from '../PopUpForCard';
import { Local } from '../../services/localStorage';
import { Card as CardType, ColumnTypes, Comment } from '../../types';
import { v4 as uuid } from 'uuid';

export const Context = React.createContext<(state: ColumnTypes[]) => void>(
  () => {},
);
export const ContextCard = React.createContext<(id: number) => void>(() => {});
export const ContextOpenInfo = React.createContext<(state: boolean) => void>(
  () => {},
);
export const ContextComment = React.createContext<(state: Comment[]) => void>(
  () => {},
);

const Board: React.FC = () => {
  const columns: ColumnTypes[] = [
    {
      nameColumns: 'TODO',
      id: uuid(),
    },
    {
      nameColumns: 'In Progress',
      id: uuid(),
    },
    {
      nameColumns: 'Testing',
      id: uuid(),
    },
    {
      nameColumns: 'Done',
      id: uuid(),
    },
  ];
  const [cards, setCards] = useState<CardType[]>(Local.getCard());
  const [createdColumn, setCreatedColumn] = useState<ColumnTypes[]>([]);
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>(Local.getComment());
  const [card, setCard] = useState<CardType>();

  useEffect(() => {
    const stateColumn: ColumnTypes[] = Local.getColumn();
    if (stateColumn.length === 0) {
      Local.setColumn(columns);
      Local.setCard([]);
      Local.setComment([]);
      setCreatedColumn(columns);
    } else {
      setCreatedColumn(stateColumn);
    }
  }, []);
  const handleCard = (id: number) => {
    setCard(cards.find((card) => card.id === id));
  };
  let newCard: CardType[];
  const handleNameCard = (newName: string, id: number) => {
    newCard = cards.map((card) => {
      card.id === id ? (card.name = newName) : card;
      return card;
    });
    setCards(newCard);
    Local.setCard(newCard);
  };

  const handleDescriptionCard = (newDescription: string, id: number) => {
    newCard = cards.map((card) => {
      card.id === id ? (card.about = newDescription) : card;
      return card;
    });
    setCards(newCard);
    Local.setCard(newCard);
  };
  const handleDeleteDescription = (id: number) => {
    newCard = cards.map((card) => {
      card.id === id ? (card.about = 'Описание отсутствует') : card;
      return card;
    });
    setCards(newCard);
    Local.setCard(newCard);
  };

  const handleComment = (body: string, cardId: number) => {
    const newComments: Comment = {
      body: body,
      author: Local.getAuthor(),
      cardId: cardId,
      id: uuid(),
    };
    setComments((prevState) => [...prevState, newComments]);
    Local.setComment([...comments, newComments]);
  };

  const [isOpen, setIsOpen] = useState<boolean>(Local.getAuthor() === '');
  useEffect(() => {
    setIsOpen(Local.getAuthor() === '');
  }, []);
  return (
    <Context.Provider value={setCreatedColumn}>
      <ContextCard.Provider value={handleCard}>
        <ContextOpenInfo.Provider value={setIsOpenInfo}>
          <ContextComment.Provider value={setComments}>
            <>
              <ColumnsStyle>
                {createdColumn.map((elem) => (
                  <Column
                    key={elem.id}
                    propsForColumn={elem}
                    setCreatedColumn={setCreatedColumn}
                    setCards={setCards}
                    cards={cards}
                  />
                ))}
              </ColumnsStyle>
              {isOpen && <PopUpForAuthor setIsOpen={setIsOpen} />}
              {isOpenInfo && (
                <PopUpForCard
                  comments={comments}
                  id={card!.id}
                  name={card!.name}
                  author={card!.author}
                  about={card!.about}
                  nameColumns={card!.nameColumns}
                  open={setIsOpenInfo}
                  isOpen={isOpenInfo}
                  renameCard={handleNameCard}
                  addDescription={handleDescriptionCard}
                  deleteDescription={handleDeleteDescription}
                  addComment={handleComment}
                />
              )}
            </>
          </ContextComment.Provider>
        </ContextOpenInfo.Provider>
      </ContextCard.Provider>
    </Context.Provider>
  );
};

const ColumnsStyle = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
export default Board;
