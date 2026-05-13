import styles from './products.module.css';

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.cardImg}
      />
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{product.category}</span>
        <h3 className={styles.cardName}>{product.title}</h3>
        <p className={styles.cardPrice}>${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
