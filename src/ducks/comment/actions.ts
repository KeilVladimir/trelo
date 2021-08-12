import { createAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';

export interface renameCommentType {
  body: string;
  id: number;
}

const addComment = createAction<Comment, 'addComment'>('addComment');
const renameComment = createAction<renameCommentType, 'renameComment'>(
  'renameComment',
);
const deleteComment = createAction<number, 'deleteComment'>('deleteComment');
export { addComment, renameComment, deleteComment };
