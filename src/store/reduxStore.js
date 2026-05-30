import { configureStore } from '@reduxjs/toolkit';
import counterReducer  from './counterSlice';
import todoReducer     from './todoSlice';
import booksReducer    from './booksSlice';
import wishlistReducer from './wishlistSlice';

const store = configureStore({
  reducer: {
    counter:  counterReducer,
    todo:     todoReducer,
    books:    booksReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
