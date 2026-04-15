import { useState } from "react";
import styles from "./pokemonCart.module.css";

function PokemonCart() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cart, setCart] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !imageUrl.trim()) return;

    const newPokemon = {
      id: Date.now(),
      name: name.trim(),
      image: imageUrl.trim(),
    };

    setCart([...cart, newPokemon]);
    setName("");
    setImageUrl("");
  };

  const handleRemove = (id) => {
    setCart(cart.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Pokemon Cart</h1>

      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="Pokémon Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Pokémon Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.addBtn}>
          Add to Cart
        </button>
      </form>

      <h2 className={styles.cartTitle}>Your Carts</h2>

      {cart.length === 0 ? (
        <p className={styles.emptyMsg}>No Pokémon in the cart yet.</p>
      ) : (
        <div className={styles.cartGrid}>
          {cart.map((pokemon) => (
            <div key={pokemon.id} className={styles.card}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className={styles.cardImage}
              />
              <p className={styles.cardName}>{pokemon.name}</p>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemove(pokemon.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonCart;
