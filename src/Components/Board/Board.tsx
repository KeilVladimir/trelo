import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Column from '../Column';
import PopUpForAuthor from '../PopUpForAuthor';
import LocalStorage from '../../Services/LocalStorage';

console.log(LocalStorage);
const Board: React.FC = () => {
  const columns = [
    {
      nameColumns: 'TODO',
      id: 0,
    },
    {
      nameColumns: 'In Progress',
      id: 1,
    },
    {
      nameColumns: 'Testing',
      id: 2,
    },
    {
      nameColumns: 'Done',
      id: 3,
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
      JSON.stringify(columns);
      LocalStorage.setInLocal(LocalStorage.keyColumn, JSON.stringify(columns));
      setCreatedColumn(columns);
    } else {
      setCreatedColumn(storeForColumn);
    }
  }, []);
  let open;
  if (LocalStorage.getFromLocal(LocalStorage.keyAuthor) === null) {
    open = true;
  }
  const [isOpen, setIsOpen] = useState<boolean>(open);
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
