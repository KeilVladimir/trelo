import { createAction } from '@reduxjs/toolkit';
import { Card, RefactorCard } from '../../types';

const renameCard = createAction<RefactorCard, 'renameCard'>('renameCard');
const addCard = createAction<Card, 'addCard'>('addCard');
const deleteCard = createAction<number, 'deleteCard'>('deleteCard');

export { renameCard, addCard, deleteCard };
