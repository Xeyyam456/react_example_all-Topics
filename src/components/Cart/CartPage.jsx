import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './cart.module.css';
function CartPage() {
  const navigate = useNavigate();
  // Context-dən məlumatları alırıq
  const { cartItems, removeItem, clearCart } = useCart();
  return (
    <div className={styles.page}>
      <h1 className={styles.title}> My Cart{' '}
        <span className="badge bg-secondary">{cartItems.length}</span>
      </h1>
      {/* Səbət boşdursa bildiriş göstər */}
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty.</p>
      ) : (
        <>
          {/* Məhsullar siyahısı */}
          <ul className={styles.list}>
            {cartItems.map((item, index) => (
              <li key={index} className={styles.item}>
                <span>{item}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Hamısını sil düyməsi */}
          <button className={`btn btn-warning ${styles.clearBtn}`} onClick={clearCart}>
            Clear All
          </button>
        </>
      )}
      {/* Geri qayıt */}
      <button className={`btn btn-secondary ${styles.backBtn}`} onClick={() => navigate('/add')}>
        Back to Add
      </button>
    </div>
  );
}
export default CartPage;
