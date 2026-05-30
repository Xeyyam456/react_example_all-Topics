import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    // Kitabı wishlist-ə əlavə et (eyni kitab iki dəfə əlavə olunmasın)
    addBook(state, action) {
      const alreadyAdded = state.items.find((item) => item.key === action.payload.key);
      if (alreadyAdded) return;
      state.items.push({ ...action.payload, isRead: false });
    },

    // Kitabı wishlist-dən sil
    removeBook(state, action) {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },

    // Kitabı oxunmuş / oxunmamış et
    toggleRead(state, action) {
      const book = state.items.find((item) => item.key === action.payload);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
  },
});

export const { addBook, removeBook, toggleRead } = wishlistSlice.actions;

// Bütün wishlist kitabları
export const selectWishlist = (state) => state.wishlist.items;

// Ümumi kitab sayı
export const selectTotalCount = (state) => state.wishlist.items.length;

// Oxunmuş kitab sayı
export const selectReadCount = (state) => state.wishlist.items.filter((item) => item.isRead).length;

export default wishlistSlice.reducer;
