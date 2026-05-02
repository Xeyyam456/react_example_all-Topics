import { Link } from "react-router-dom";
import styles from "./menu.module.css";

function ProductCard({ product }) {
  return (
    <Link to={`/restaurant/menu/${product.id}`} className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.cardImg}
      />
      <div className={styles.cardBody}>
        <p className={styles.cardCategory}>{product.category}</p>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <div className={styles.cardFooter}>
          <span className={styles.cardPrice}>${product.price}</span>
          <span className={styles.cardRating}>⭐ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
