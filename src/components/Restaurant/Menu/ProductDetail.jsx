import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../../services/ProductService";
import { RESTAURANT } from "../../../router/restaurantRoutes";
import styles from "./productDetail.module.css";

async function GetDatas(id, setData, setLoading) {
  try {
    const product = await ProductService.getProductById(id);
    setData(product);
  } catch (err) {
    toast.error("Xəta: " + err.message);
  } finally {
    setLoading(false);
  }
}

function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    GetDatas(id, setData, setLoading);
    setActiveImg(0);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <Spinner animation="border" variant="warning" />
        <p className={styles.loadingText}>Yüklənir...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.loadingBox}>
        <p>Məhsul tapılmadı.</p>
        <Link to={RESTAURANT.MENU} className={styles.backLink}>← Menyuya qayıt</Link>
      </div>
    );
  }

  const images = data.images?.length ? data.images : [data.thumbnail];

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Link to={RESTAURANT.MENU} className={styles.backLink}>← Menyuya qayıt</Link>

      <div className={styles.card}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <img
            src={images[activeImg]}
            alt={data.title}
            className={styles.mainImg}
          />
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`${styles.thumb} ${i === activeImg ? styles.activeThumb : ""}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.category}>{data.category}</p>
          <h1 className={styles.productTitle}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Qiymət</span>
              <span className={styles.price}>${data.price}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Reytinq</span>
              <span className={styles.metaValue}>⭐ {data.rating}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Stok</span>
              <span className={styles.metaValue}>{data.stock} ədəd</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Brend</span>
              <span className={styles.metaValue}>{data.brand || "—"}</span>
            </div>
          </div>

          {data.tags?.length > 0 && (
            <div className={styles.tags}>
              {data.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
