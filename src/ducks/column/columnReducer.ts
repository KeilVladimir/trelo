import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { ColumnTypes } from '../../types';
import { columnAction } from './actions';
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
] as ColumnTypes[];

export const columnReducer = createReducer<ColumnTypes[]>(columns, {
  [columnAction.type]: (state, action: PayloadAction<ColumnTypes>) => {
    console.log(action.payload);
    state.map((column) =>
      column.id === action.payload.id
        ? (column.nameColumns = action.payload.nameColumns)
        : column,
    );
  },
});
