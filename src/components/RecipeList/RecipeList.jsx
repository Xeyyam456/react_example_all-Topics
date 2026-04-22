import { useEffect, useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/UserService";
import { reducer, initialState, LS_KEY } from "./recipeReducer";
import Spinner from "./Spinner";
import RecipeCard from "./RecipeCard";
import RecipeRow from "./RecipeRow";
import styles from "./recipeList.module.css";

export default function RecipeList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { recipes, saved, loading } = state;

  // API-dan data çək
  useEffect(() => {
    UserService.getRecipes()
      .then((data) => dispatch({ type: "SET_RECIPES", payload: data }));
  }, []);

  // saved dəyişdikdə localStorage-a yaz
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(saved));
  }, [saved]);

  function addRecipe(recipe) {
    if (saved.find((r) => r.id === recipe.id)) {
      toast.warning(`"${recipe.name}" artıq siyahıdadır!`);
      return;
    }
    dispatch({ type: "ADD_RECIPE", payload: recipe });
    toast.success(`"${recipe.name}" əlavə edildi!`);
  }

  function deleteRecipe(id) {
    const recipe = saved.find((r) => r.id === id);
    dispatch({ type: "REMOVE_RECIPE", payload: id });
    toast.success(`"${recipe?.name}" silindi!`);
  }

  if (loading) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Cards */}
      <div className={styles.cards}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onGetRecipe={addRecipe}
            isAdded={saved.some((r) => r.id === recipe.id)}
          />
        ))}
      </div>

      {/* Table */}
      {saved.length > 0 && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}></th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Ingredients</th>
                <th className={styles.th}>Instructions</th>
                <th className={styles.th}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {saved.map((recipe) => (
                <RecipeRow key={recipe.id} recipe={recipe} onRemove={deleteRecipe} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
