import { createAction } from '@reduxjs/toolkit';
import { ColumnTypes } from '../../types';

export const columnAction = createAction<ColumnTypes, 'columnAction'>(
  'columnAction',
);
