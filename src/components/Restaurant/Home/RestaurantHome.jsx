import { Link } from "react-router-dom";
import { RESTAURANT } from "../../../router/restaurantRoutes";
import styles from "./restaurantHome.module.css";

function RestaurantHome() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Bistro Restoranına Xoş Gəldiniz</h1>
        <p className={styles.subtitle}>
          Ən dadlı yeməklər, ən rahat mühit — hər anı xüsusi edin
        </p>
        <Link to={RESTAURANT.MENU} className={styles.cta}>
          Menyuya Bax
        </Link>
      </div>
    </div>
  );
}

export default RestaurantHome;
