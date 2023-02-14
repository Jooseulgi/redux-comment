import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

export type SubmitMode = 'put' | 'post';

interface StateType {
  comments: null | Comment[];
  totalCount: number;
  currentPage: number;
  loading: boolean;
  error: null | string;
  inputs: Comment;
  submitMode: SubmitMode;
}

export const initialState = {
  comments: null,
  totalCount: 0,
  currentPage: 0,
  loading: false,
  error: null,
  inputs: {
    id: '',
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  },
  submitMode: 'post',
} as StateType;

export const getPagingComments = createAsyncThunk(
  'comment/getPagingComments',
  async (pageNum: number, thunkApi) => {
    try {
      const response = await instance.get(
        `/comments?_page=${pageNum}&_limit=4&_order=desc&_sort=id`,
      );
      return [response.data, pageNum];
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getTotalComments = createAsyncThunk(
  'comment/getTotalComments',
  async (_: void, thunkApi) => {
    try {
      const response = await instance.get('/comments');
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  async (comment: Comment, thunkApi) => {
    try {
      const response = await instance.post('/comments', comment);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async (comment: Comment, thunkApi) => {
    try {
      const response = await instance.put(`/comments/${comment.id}`, comment);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (id: Comment['id'], thunkApi) => {
    try {
      const response = await instance.delete(`/comments/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
