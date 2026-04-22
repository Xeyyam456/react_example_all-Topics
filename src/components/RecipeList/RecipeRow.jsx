import { useState } from "react";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";
import styles from "./recipeList.module.css";

export default function RecipeRow({ recipe, onRemove }) {
  const [modal, setModal] = useState(null); // null | "ingredients" | "instructions" | "confirm"

  function openModal(type) { setModal(type); }
  function openRemoveModal() { setModal("confirm"); }

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.td}>
          <img src={recipe.image} alt={recipe.name} className={styles.rowImg} />
        </td>
        <td className={styles.td}><strong>{recipe.name}</strong></td>
        <td className={styles.td}>
          <button className={`${styles.btn} ${styles.btnBlue}`} onClick={() => openModal("ingredients")}>
            Ingredients
          </button>
        </td>
        <td className={styles.td}>
          <button className={`${styles.btn} ${styles.btnGray}`} onClick={() => openModal("instructions")}>
            Instructions
          </button>
        </td>
        <td className={styles.td}>
          <button className={`${styles.btn} ${styles.btnRed}`} onClick={openRemoveModal}>
            Remove
          </button>
        </td>
      </tr>

      {modal === "confirm" && (
        <ConfirmModal
          name={recipe.name}
          onConfirm={() => { onRemove(recipe.id); setModal(null); }}
          onCancel={() => setModal(null)}
        />
      )}

      {modal === "ingredients" && (
        <Modal
          title={`${recipe.name} — Ingredients`}
          items={recipe.ingredients}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "instructions" && (
        <Modal
          title={`${recipe.name} — Instructions`}
          items={recipe.instructions}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
