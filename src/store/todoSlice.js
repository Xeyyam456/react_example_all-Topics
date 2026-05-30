import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'redux_todos';

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

const initialState = {
  todos: loadFromStorage(),
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action) {
      const title = action.payload.trim();
      if (!title) return;
      state.todos.push({ id: Date.now(), title, completed: false });
      saveToStorage(state.todos);
    },

    toggleTodo(state, action) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      saveToStorage(state.todos);
    },
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;

export const selectTodos = (state) => state.todo.todos;

export default todoSlice.reducer;
