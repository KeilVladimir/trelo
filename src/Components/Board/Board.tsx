import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column } from '../Column';
import { PopUpForAuthor } from '../PopUpForAuthor';
import { PopUpForCard } from '../PopUpForCard';
import { Local } from '../../services/localStorage';
import { Card as CardType, ColumnTypes, Comment } from '../../types';

import { v4 as uuid } from 'uuid';

export const ContextCard = React.createContext<(id: number) => void>(() => {});
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

  const handleNameCard = (newName: string, id: number) => {
    if (card !== undefined) {
      setCard({
        ...card,
        name: newName,
      });
    }
  };

  let newCard: CardType[];
  const handleDescriptionCard = (newDescription: string, id: number) => {
    if (card !== undefined) {
      setCard({
        ...card,
        about: newDescription,
      });
    }
  };
  const handleDeleteDescription = (id: number) => {
    if (card !== undefined) {
      setCard({
        ...card,
        about: 'Описание отсутствует',
      });
    }
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
  const saveCard = () => {
    let refactorCard;
    if (card !== undefined) {
      refactorCard = cards.map((elem) => {
        elem.id === card.id ? (elem = card) : elem;
        return elem;
      });
      setCards(refactorCard);
      Local.setCard(refactorCard);
    }
    setCard(undefined);
  };

  return (
    <ContextCard.Provider value={handleCard}>
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
          {card !== undefined && (
            <PopUpForCard
              comments={comments}
              {...card}
              renameCard={handleNameCard}
              addDescription={handleDescriptionCard}
              deleteDescription={handleDeleteDescription}
              addComment={handleComment}
              saveCard={saveCard}
            />
          )}
        </>
      </ContextComment.Provider>
    </ContextCard.Provider>
  );
};

const ColumnsStyle = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
export default Board;
