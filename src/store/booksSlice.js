import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BookService from '../services/BookService';

// API-dan kitabları çəkən async funksiya
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await BookService.getBooks();
  return response.data.docs;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = 'Kitablar yüklənmədi. Yenidən cəhd edin.';
      });
  },
});

export const selectBooks = (state) => state.books.list;
export const selectLoading = (state) => state.books.loading;
export const selectError = (state) => state.books.error;

export default booksSlice.reducer;
