import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Column from "./Components/Column";
import PopUpForAuthor from "./Components/PopUpForAuthor";

const ColumnsStyle = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around`
const App: React.FC = () => { //вопрос про нейминг App на Board
    const arrayColumns = [
        {
            nameColumns: "TODO",
            id: 0
        },
        {
            nameColumns: "In Progress",
            id: 1
        },
        {
            nameColumns: "Testing",
            id: 2
        },
        {
            nameColumns: "Done",
            id: 3
        }
    ]
    interface ColumnTypes {
        nameColumns: string,
        id: number
    }
    const [stateAuthor,SetStateAuthor] = useState<boolean>(JSON.parse(localStorage.getItem('author') || "true"))// убрать
    const [stateCol, SetStateCol] = useState<ColumnTypes[]>([]);
    const saved = JSON.parse(localStorage.getItem('nameBoard') || "[]") as ColumnTypes[];
    useEffect(() => {
        if (saved.length === 0) {
            SetColumnStorage(JSON.stringify(arrayColumns))
            SetStateCol(arrayColumns)
        } else {
            SetStateCol(saved)
        }

    }, [])

    const SetColumnStorage = (ColumnsState: string):void => {
        localStorage.setItem('nameBoard', ColumnsState);
    }

    return (
        <ColumnsStyle>
            {
                stateCol.map(elem => (
                    <Column key={elem.id} propsForColumn={elem} SetColumnStorage={SetColumnStorage}/>
                ))
            }
            {stateAuthor ?<PopUpForAuthor isOpen={true} />:<PopUpForAuthor isOpen={false}/>}
        </ColumnsStyle>


    )
}
export default App;