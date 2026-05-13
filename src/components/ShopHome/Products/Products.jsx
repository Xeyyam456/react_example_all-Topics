import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import ProductCard from './ProductCard';
import styles from './products.module.css';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [categories, setCategories] = useState([]);

  // Kateqoriyaları bir dəfə yüklə
  useEffect(() => {
    ProductService.getCategories()
    .then((data) => setCategories(data));
  }, []);

  // Category dəyişəndə məhsulları yüklə
  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = category
      ? ProductService.getProductsByCategory(category)
      : ProductService.getProducts();

    request
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  function handleFilter(value) {
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  }

  const activeCategory = categories.find((c) => c.slug === category);
  const pageTitle = activeCategory ? activeCategory.name : 'All Products';

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{pageTitle}</h1>

      <div className={styles.filters}>
        {/* All Products düyməsi */}
        <button
          onClick={() => handleFilter('')}
          className={`${styles.filterBtn} ${category === '' ? styles.active : ''}`}
        >
          All Products
        </button>

        {/* API-dən gələn kateqoriyalar */}
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleFilter(cat.slug)}
            className={`${styles.filterBtn} ${category === cat.slug ? styles.active : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading && <p className={styles.status}>Yüklənir...</p>}
      {error   && <p className={styles.error}>Xəta: {error}</p>}

      {!loading && !error && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

