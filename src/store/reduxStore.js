import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// ── Redux Store ────────────────────────────────────────────────
// Bütün reducer-ları burada birləşdiririk
const store = configureStore({
  reducer: {
    counter: counterReducer,   // state.counter olaraq oxunacaq
  },
});

export default store;
