import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column } from '../Column';
import { PopUpForAuthor } from '../PopUpForAuthor';
import { Local } from '../../services/LocalStorage';
import { v4 as uuid } from 'uuid';

const Board: React.FC = () => {
  const columns = [
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

  interface columnTypes {
    nameColumns: string;
    id: number;
    // Cards: { cardsName: string; about: string }[]; // про карты еще не сделал
  }

  const [createdColumn, setCreatedColumn] = useState<columnTypes[]>([]);

  useEffect(() => {
    const storeForColumn = JSON.parse(
      localStorage.getItem('nameBoard') || '[]',
    ) as columnTypes[];
    if (storeForColumn.length === 0) {
      Local.setInLocalColumn(JSON.stringify(columns));
      setCreatedColumn(columns);
    } else {
      setCreatedColumn(storeForColumn);
    }
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(
    Local.getFromLocalAuthor() === null,
  );
  useEffect(() => {
    setIsOpen(Local.getFromLocalAuthor() === null);
  });
  return (
    <>
      <ColumnsStyle>
        {createdColumn.map((elem) => (
          <Column key={elem.id} propsForColumn={elem} cardName={[]} />
        ))}
      </ColumnsStyle>
      {isOpen && <PopUpForAuthor setIsOpen={setIsOpen} />}
    </>
  );
};

const ColumnsStyle = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
export default Board;
