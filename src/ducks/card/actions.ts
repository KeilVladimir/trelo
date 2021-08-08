import { createAction } from '@reduxjs/toolkit';
import { Card } from '../../types';

const renameCard = createAction<Card, 'renameCard'>('renameCard');
const addCard = createAction<Card, 'addCard'>('addCard');
const deleteCard = createAction<number, 'deleteCard'>('deleteCard');

export { renameCard, addCard, deleteCard };
