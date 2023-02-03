import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import {
  addComment,
  deleteComment,
  getTotalComments,
  getPagingComments,
  initialState,
  SubmitMode,
  updateComment,
} from './comments.action';

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetForm: state => {
      state.inputs = initialState.inputs;
    },
    setForm: (state, action: PayloadAction<Comment>) => {
      state.inputs = { ...action.payload };
    },
    setMode: (state, action: PayloadAction<SubmitMode>) => {
      state.submitMode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPagingComments.pending, state => {
        state.loading = true;
      })
      .addCase(getPagingComments.fulfilled, (state, action) => {
        const [comments, currentPage] = action.payload;
        state.loading = false;
        state.comments = comments;
        state.currentPage = currentPage;
      })
      .addCase(
        getPagingComments.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );

    builder
      .addCase(getTotalComments.pending, state => {
        state.loading = true;
      })
      .addCase(getTotalComments.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCount = action.payload.length;
      })
      .addCase(
        getTotalComments.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );

    builder.addCase(addComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments?.push(action.payload);
    });
    builder.addCase(
      addComment.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    builder.addCase(updateComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateComment.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(
      updateComment.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    builder
      .addCase(deleteComment.pending, state => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments!.filter(
          comment => comment.id !== action.payload.id,
        );
      })
      .addCase(deleteComment.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForm, setForm, setMode } = commentsSlice.actions;
export default commentsSlice;
