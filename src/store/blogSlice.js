import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ApiBlog from '../services/apiBlog';

const Api = new ApiBlog();

const initialState = {
  posts: [],
  totalPosts: 0,
  currentPage: 1,
  totalPages: 1,
  currentPost: null,
  user: {},
  authorized: false,
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
      state.posts = action.payload.articles;
      state.loading = false;
      state.totalPosts = action.payload.articlesCount;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.page;
      state.error = '';
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.currentPost = action.payload.article;
      state.loading = false;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authorized = true;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authorized = true;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authorized = true;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.authorized = true;
      }
      state.loading = false;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.authorized = false;
      state.user = {};
    });
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.currentPage = 1;
      state.currentPost = action.payload.article;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.currentPost = action.payload.article;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(favoritePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        return post.slug === action.payload.article.slug ? action.payload.article : post;
      });
      state.currentPost = action.payload.article;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(favoritePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(unfavoritePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        return post.slug === action.payload.article.slug ? action.payload.article : post;
      });
      state.currentPost = action.payload.article;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(unfavoritePost.rejected, (state, action) => {
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

export const signUp = createAsyncThunk('user/signUp', async (userData, { rejectWithValue }) => {
  try {
    const result = await Api.registration(userData);
    if (result.errors) {
      throw new Error('Ошибка! Регистрация не прошла');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const signIn = createAsyncThunk('user/signIn', async (userData, { rejectWithValue }) => {
  try {
    const result = await Api.authorization(userData);
    if (result.errors) {
      throw new Error('Не верный логин или пароль');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const editProfile = createAsyncThunk('user/editProfile', async (userData, { rejectWithValue }) => {
  try {
    const result = await Api.editProfile(userData);
    if (result.errors) {
      throw new Error('Ошибка! Не получилось отредактировать профиль');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getProfile = createAsyncThunk('user/getProfile', async (_, { rejectWithValue }) => {
  if (!Api.getToken()) return;

  try {
    const result = await Api.getUserProfile();
    if (result.errors) {
      throw new Error('Ошибка! Не удалось получить данные о профиле');
    }

    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  return Api.logOutUser();
});

export const createPost = createAsyncThunk('posts/create', async (postData, { rejectWithValue }) => {
  try {
    const result = await Api.createPost(postData);
    if (result.errors) {
      throw new Error('Ошибка! Не удалось добавить статью');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const editPost = createAsyncThunk('posts/edit', async (postData, { rejectWithValue }) => {
  try {
    const result = await Api.editPost(postData);
    if (result.errors) {
      throw new Error('Ошибка! Не удалось отредактировать статью');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (slug, { rejectWithValue }) => {
  try {
    const result = await Api.deletePost(slug);
    if (result.errors) {
      throw new Error('Ошибка! Не удалось удалить статью');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const favoritePost = createAsyncThunk('posts/favoritePost', async (slug, { rejectWithValue }) => {
  try {
    const result = await Api.favoritePost(slug);
    if (result.errors) {
      throw new Error('Ошибка! Лайк не поставлен');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const unfavoritePost = createAsyncThunk('posts/unfavoritePost', async (slug, { rejectWithValue }) => {
  try {
    const result = await Api.unfavoritePost(slug);
    if (result.errors) {
      throw new Error('Ошибка! Лайк не убран');
    }
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export default blogSlice.reducer;
