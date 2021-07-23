import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column } from '../Column';
import { PopUpForAuthor } from '../PopUpForAuthor';
import { PopUpForCard } from '../PopUpForCard';
import { Local } from '../../services/localStorage';
import { ColumnTypes, InfoCard } from '../../types';
import { v4 as uuid } from 'uuid';

export const Context = React.createContext<(state: ColumnTypes[]) => void>(
  () => {},
);
export const ContextCard = React.createContext<(state: InfoCard) => void>(
  () => {},
);
export const ContextOpenInfo = React.createContext<(state: boolean) => void>(
  () => {},
);
const Board: React.FC = () => {
  const columns: ColumnTypes[] = [
    {
      nameColumns: 'TODO',
      id: uuid(),
      cards: [],
    },
    {
      nameColumns: 'In Progress',
      id: uuid(),
      cards: [],
    },
    {
      nameColumns: 'Testing',
      id: uuid(),
      cards: [],
    },
    {
      nameColumns: 'Done',
      id: uuid(),
      cards: [],
    },
  ];

  const [createdColumn, setCreatedColumn] = useState<ColumnTypes[]>([]);
  const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
  const [propsInfo, setPropsInfo] = useState<InfoCard | Record<string, never>>(
    {},
  );

  useEffect(() => {
    const stateColumn = Local.getColumn();
    if (stateColumn.length === 0) {
      Local.setColumn(columns);
      setCreatedColumn(columns);
    } else {
      setCreatedColumn(stateColumn);
    }
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(Local.getAuthor() === null);
  useEffect(() => {
    setIsOpen(Local.getAuthor() === null);
  }, []);
  return (
    <Context.Provider value={setCreatedColumn}>
      <ContextCard.Provider value={setPropsInfo}>
        <ContextOpenInfo.Provider value={setIsOpenInfo}>
          <>
            <ColumnsStyle>
              {createdColumn.map((elem) => (
                <Column
                  key={elem.id}
                  propsForColumn={elem}
                  cards={elem.cards}
                  setCreatedColumn={setCreatedColumn}
                />
              ))}
            </ColumnsStyle>
            {isOpen && <PopUpForAuthor setIsOpen={setIsOpen} />}
            {isOpenInfo && (
              <PopUpForCard
                id={propsInfo.id}
                author={propsInfo.author}
                index={propsInfo.index}
                nameColumn={propsInfo.nameColumn}
                open={setIsOpenInfo}
                isOpen={isOpenInfo}
                state={createdColumn}
              />
            )}
          </>
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
