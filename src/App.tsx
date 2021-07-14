import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Column from './Components/Column';
import PopUpForAuthor from './Components/PopUpForAuthor';

const ColumnsStyle = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
const App: React.FC = () => {
  //вопрос про нейминг App на Board
  const arrayColumns = [
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

  interface ColumnTypes {
    nameColumns: string;
    id: number;
  }

  const [stateCol, SetStateCol] = useState<ColumnTypes[]>([]);

  useEffect(() => {
    const storeForColumn = JSON.parse(
      localStorage.getItem('nameBoard') || '[]',
    ) as ColumnTypes[];
    console.log('saved: ' + storeForColumn);
    if (storeForColumn.length === 0) {
      JSON.stringify(arrayColumns);
      SetStateInLocal('nameBoard', JSON.stringify(arrayColumns));
      SetStateCol(arrayColumns);
    } else {
      SetStateCol(storeForColumn);
    }
  }, []);

  const SetStateInLocal = (key: string, state: string): void => {
    localStorage.setItem(key, state);
  };

  return (
    <ColumnsStyle>
      {stateCol.map((elem) => (
        <Column
          key={elem.id}
          propsForColumn={elem}
          SetStateInLocal={SetStateInLocal}
        />
      ))}

      <PopUpForAuthor SetStateInLocal={SetStateInLocal} />
    </ColumnsStyle>
  );
};
export default App;
