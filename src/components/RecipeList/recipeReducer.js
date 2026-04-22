export const LS_KEY = "savedRecipes";

export const initialState = {
  recipes: [],
  saved: JSON.parse(localStorage.getItem(LS_KEY) || "[]"),
  loading: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_RECIPES":
      return { ...state, recipes: action.payload, loading: false };
    case "ADD_RECIPE":
      return { ...state, saved: [...state.saved, action.payload] };
    case "REMOVE_RECIPE":
      return { ...state, saved: state.saved.filter((r) => r.id !== action.payload) };
    default:
      return state;
  }
}
