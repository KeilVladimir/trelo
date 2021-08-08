import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column } from '../Column';
import { PopUpForAuthor } from '../PopUpForAuthor';
import { PopUpForCard } from '../PopUpForCard';
import { Local } from '../../services/localStorage';
import { Card as CardType } from '../../types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { getCard, renameCard } from '../../ducks/card';
import useAppDispatch from '../hooks/useAppDispatch';
import getColumns from '../../ducks/column/selectors';
import { addComment, getComments } from '../../ducks/comment';
import { getAuthor } from '../../ducks/author';

export const ContextCard = React.createContext<(id: number) => void>(() => {});

const Board: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(Local.getCard());
  const [changeableCard, setChangeableCard] = useState<CardType>();
  const [isOpen, setIsOpen] = useState<boolean>(Local.getAuthor() === '');
  const dispatch = useAppDispatch();
  const Cards = useSelector(getCard);
  const Columns = useSelector(getColumns);
  const Comments = useSelector(getComments);
  const author = useSelector(getAuthor);
  const handleFindCard = (id: number) => {
    setChangeableCard(Cards.find((card) => card.id === id));
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
    dispatch(
      addComment({
        body: body,
        author: author,
        cardId: cardId,
        id: uuid(),
      }),
    );
  };

  useEffect(() => {
    setIsOpen(Local.getAuthor() === ''); //!!!!!!!!!!!!!!!!!
  }, []);

  const saveCard = () => {
    if (changeableCard !== undefined) {
      dispatch(renameCard(changeableCard));
    }
    setChangeableCard(undefined);
  };

  return (
    <ContextCard.Provider value={handleFindCard}>
      <>
        <ColumnsStyle>
          {Columns.map((elem) => (
            <Column
              key={elem.id}
              propsForColumn={elem}
              setCards={setCards}
              cards={cards}
            />
          ))}
        </ColumnsStyle>
        {isOpen && <PopUpForAuthor setIsOpen={setIsOpen} />}
        {changeableCard !== undefined && (
          <PopUpForCard
            comments={Comments}
            {...changeableCard}
            renameCard={handleNameCard}
            addDescription={handleReplacementDescription}
            deleteDescription={handleDeleteDescription}
            addComment={handleAddComment}
            saveCard={saveCard}
          />
        )}
      </>
    </ContextCard.Provider>
  );
};

const ColumnsStyle = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
export default Board;
