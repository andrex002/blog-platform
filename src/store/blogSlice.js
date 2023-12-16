import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ApiBlog from '../services/apiBlog';

const Api = new ApiBlog();

const initialState = {
  posts: [],
  totalPosts: 0,
  currentPage: 1,
  totalPages: 1,
  currentPost: null,
  loading: true,
  error: '',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      console.log(action);
      state.posts = action.payload.articles;
      state.loading = false;
      state.totalPosts = action.payload.articlesCount;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.currentPost = action.payload.article;
      state.loading = false;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const getPosts = createAsyncThunk('posts/getPosts', async (page, { rejectWithValue }) => {
  try {
    const result = await Api.getArticlesList(page);
    if (result.errors) {
      throw new Error('Ошибка! Посты не загрузились');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getPost = createAsyncThunk('posts/getPost', async (slug, { rejectWithValue }) => {
  try {
    const result = await Api.getArticle(slug);
    if (result.errors) {
      throw new Error('Пост не загрузился');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export default blogSlice.reducer;
