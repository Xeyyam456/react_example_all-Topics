import styles from "./recipeList.module.css";

export default function RecipeCard({ recipe, onGetRecipe, isAdded }) {
  return (
    <div className={styles.card}>
      <img src={recipe.image} alt={recipe.name} className={styles.cardImg} />
      <p className={styles.cardName}>{recipe.name}</p>
      <p className={styles.cardCuisine}>Cuisine: {recipe.cuisine}</p>
      <button
        className={`${styles.getBtn} ${isAdded ? styles.getBtnAdded : ""}`}
        onClick={() => onGetRecipe(recipe)}
      >
        {isAdded ? "✔ Added" : "Get Recipe"}
      </button>
    </div>
  );
}
