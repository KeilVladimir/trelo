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
  const [changeableCard, setChangeableCard] = useState<CardType>();
  const [isOpen, setIsOpen] = useState<boolean>(Local.getAuthor() === '');

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

  const handleFindCard = (id: number) => {
    setChangeableCard(cards.find((card) => card.id === id));
  };

  const handleNameCard = (newName: string) => {
    if (changeableCard !== undefined) {
      setChangeableCard({
        ...changeableCard,
        name: newName,
      });
    }
  };

  const handleReplacementDescription = (newDescription: string) => {
    if (changeableCard !== undefined) {
      setChangeableCard({
        ...changeableCard,
        about: newDescription,
      });
    }
  };

  const handleDeleteDescription = () => {
    if (changeableCard !== undefined) {
      setChangeableCard({
        ...changeableCard,
        about: 'Описание отсутствует',
      });
    }
  };

  const handleAddComment = (body: string, cardId: number) => {
    const newComments: Comment = {
      body: body,
      author: Local.getAuthor(),
      cardId: cardId,
      id: uuid(),
    };
    setComments((prevState) => [...prevState, newComments]);
    Local.setComment([...comments, newComments]);
  };

  useEffect(() => {
    setIsOpen(Local.getAuthor() === '');
  }, []);

  const saveCard = () => {
    if (changeableCard !== undefined) {
      setCards(
        cards.map((elem) => {
          elem.id === changeableCard.id ? (elem = changeableCard) : elem;
          return elem;
        }),
      );
    }
    Local.setCard(cards);
    setChangeableCard(undefined);
  };

  return (
    <ContextCard.Provider value={handleFindCard}>
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
          {changeableCard !== undefined && (
            <PopUpForCard
              comments={comments}
              {...changeableCard}
              renameCard={handleNameCard}
              addDescription={handleReplacementDescription}
              deleteDescription={handleDeleteDescription}
              addComment={handleAddComment}
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
