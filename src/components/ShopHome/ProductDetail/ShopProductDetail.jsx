import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import styles from './shopProductDetail.module.css';

function ShopProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    ProductService.getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.status}>Loading…</p>;
  if (error)   return <p className={styles.error}>Error: {error}</p>;
  if (!product) return null;

  const discounted = product.discountPercentage > 0;

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate(-1)} className={styles.backLink}>← Back</button>

      <div className={styles.card}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.mainImg}
          />
          {product.images?.length > 1 && (
            <div className={styles.thumbRow}>
              {product.images.slice(0, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className={styles.thumb}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>
          {product.brand && (
            <p className={styles.brand}>
              Brand: <strong>{product.brand}</strong>
            </p>
          )}
          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            {discounted && (
              <span className={styles.discount}>
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>

          <div className={styles.meta}>
            <span className={styles.metaItem}>⭐ {product.rating?.toFixed(1)}</span>
            <span className={styles.metaItem}>Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopProductDetail;
