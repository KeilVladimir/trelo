import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column } from '../Column';
import { PopUpForAuthor } from '../PopUpForAuthor';
import { PopUpForCard } from '../PopUpForCard';
import { Card as CardType, RefactorCard } from '../../types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { getCard, renameCard } from '../../ducks/card';
import useAppDispatch from '../hooks/useAppDispatch';
import { getColumns } from '../../ducks/column';
import { addComment, getComments } from '../../ducks/comment';
import { getAuthor } from '../../ducks/author';

export const ContextCard = React.createContext<(id: number) => void>(() => {});

const Board: React.FC = () => {
  const [changeableCard, setChangeableCard] = useState<CardType>();
  const dispatch = useAppDispatch();
  const cards = useSelector(getCard);
  const columns = useSelector(getColumns);
  const comments = useSelector(getComments);
  const author = useSelector(getAuthor);
  const [isOpen, setIsOpen] = useState<boolean>(author === '');

  const handleFindCard = (id: number) => {
    setChangeableCard(cards.find((card) => card.id === id));
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
    setIsOpen(author === '');
  }, [author]);

  const saveCard = (newCard: RefactorCard) => {
    if (changeableCard !== undefined) {
      dispatch(renameCard(newCard));
    }
  };

  return (
    <ContextCard.Provider value={handleFindCard}>
      <>
        <Head>
          <h3>Trello</h3>
        </Head>
        <ColumnsStyle>
          {columns.map((elem) => (
            <Column key={elem.id} propsForColumn={elem} cards={cards} />
          ))}
        </ColumnsStyle>
        {isOpen && <PopUpForAuthor setIsOpen={setIsOpen} />}
        {changeableCard !== undefined && (
          <PopUpForCard
            comments={comments}
            {...changeableCard}
            saveCard={saveCard}
            setChangeableCard={setChangeableCard}
            addComment={handleAddComment}
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

const Head = styled.div`
  width: 100%;
  height: 50px;
  background-color: #0067a3;
  color: #7fb3d1;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 25px;
    margin: 0;
  }
`;
export default Board;
