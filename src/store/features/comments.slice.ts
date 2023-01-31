import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Comment } from '../../types';

const API = 'http://localhost:4000/comments';

// action
export const getComments = createAsyncThunk(
  'comment/getComments',
  async (data, thunkApi) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

interface BasicState {
  loading: boolean;
  comments: null | Comment[];
  error: null | string;
}

const initialState = {
  loading: false,
  comments: null,
  error: null,
} as BasicState;

// slice
const getCommentsSlice = createSlice({
  name: 'getComments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, state => {
        state.loading = true;
      })
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload;
        },
      )
      .addCase(getComments.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getCommentsSlice.reducer;
