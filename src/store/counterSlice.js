import { createSlice } from '@reduxjs/toolkit';
// ── Başlanğıc state ────────────────────────────────────────────
const initialState = {
  count: 0,
};
// ── Slice (state + actions birlikdə) ──────────────────────────
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // "+" düyməsi: count-u 1 artırır
    increment(state) {
      state.count += 1;
    },
    // "-" düyməsi: count-u 1 azaldır, 0-dan aşağı düşmür
    decrement(state) {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
    // "Addition" düyməsi: inputdakı dəyəri count-a əlavə edir
    addByValue(state, action) {
      state.count += action.payload;
    },
    // "Subtract" düyməsi: inputdakı dəyəri count-dan çıxır, 0-dan aşağı düşmür
    subtractByValue(state, action) {
      const result = state.count - action.payload;
      state.count = result < 0 ? 0 : result;
    },
    // "Reset" düyməsi: count-u 0-a qaytarır
    reset(state) {
      state.count = 0;
    },
  },
});
// Action-ları export edirik — komponentdə istifadə üçün
export const { increment, decrement, addByValue, subtractByValue, reset } = counterSlice.actions;
// Reducer-i export edirik — store-a qoşmaq üçün
export default counterSlice.reducer;
