import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../../services/ProductService";
import ProductCard from "./ProductCard";
import styles from "./menu.module.css";

async function GetDatas(setDatas, setLoading) {
  try {
    const products = await ProductService.getProducts();
    setDatas(products);
  } catch (err) {
    toast.error("Xəta: " + err.message);
  } finally {
    setLoading(false);
  }
}

function Menu() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetDatas(setDatas, setLoading);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <Spinner animation="border" variant="warning" />
        <p className={styles.loadingText}>Yüklənir...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className={styles.title}>Menyumuz</h1>
      <div className={styles.grid}>
        {datas.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Menu;
