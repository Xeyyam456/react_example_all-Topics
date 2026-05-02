import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../Navbar/RestaurantNavbar";
import styles from "./restaurantLayout.module.css";

function RestaurantLayout() {
  return (
    <div className={styles.layout}>
      <RestaurantNavbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default RestaurantLayout;
