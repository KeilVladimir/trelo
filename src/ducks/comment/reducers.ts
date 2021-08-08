import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import * as CommentAction from './actions';
import { Comment } from '../../types';
import { renameCommentType } from './actions';

export const commentReducer = createReducer<Comment[]>([], {
  [CommentAction.addComment.type]: (state, action: PayloadAction<Comment>) => {
    state.push(action.payload);
  },
  [CommentAction.renameComment.type]: (
    state,
    action: PayloadAction<renameCommentType>,
  ) => {
    state.map((com) => {
      com.id === action.payload.id ? (com.body = action.payload.body) : com;
    });
  },
  [CommentAction.deleteComment.type]: (
    state,
    action: PayloadAction<number>,
  ) => {
    return state.filter((com) => com.id !== action.payload);
  },
});
