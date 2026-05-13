import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './addCart.module.css';
function AddCartPage() {
  const navigate = useNavigate();
  // Context-dən lazımi dəyərləri alırıq
  const { text, setText, cartItems, addItem } = useCart();

  // Formu göndərəndə işləyir
  function handleSubmit(e) {
    e.preventDefault();
    addItem(text);
    }
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Add to Cart</h1>
      {/* Mətn daxiletmə formu */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={`form-control ${styles.input}`}
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
      {/* Səbətin cari sayı */}
      <p className={styles.count}>
        Items in cart: <strong>{cartItems.length}</strong>
      </p>
      {/* Səbətə keç */}
      <button className="btn btn-primary" onClick={() => navigate('/cart')}>
        Go to Cart
      </button>
    </div>
  );
}
export default AddCartPage;
