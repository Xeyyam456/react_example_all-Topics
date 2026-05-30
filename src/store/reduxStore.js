import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer    from './todoSlice';

// ── Redux Store ────────────────────────────────────────────────
// Bütün reducer-ları burada birləşdiririk
const store = configureStore({
  reducer: {
    counter: counterReducer,   // state.counter olaraq oxunacaq
    todo:    todoReducer,      // state.todo olaraq oxunacaq
  },
});

export default store;
