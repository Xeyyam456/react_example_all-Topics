import { NavLink } from "react-router-dom";
import { RESTAURANT } from "../../../router/restaurantRoutes";
import styles from "./restaurantNavbar.module.css";

const LINKS = [
  { label: "Ana Səhifə", to: RESTAURANT.HOME },
  { label: "Haqqımızda", to: RESTAURANT.ABOUT },
  { label: "Menyu", to: RESTAURANT.MENU },
  { label: "Əlaqə", to: RESTAURANT.CONTACT },
];

function RestaurantNavbar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>🍽 Bistro</span>
      <ul className={styles.links}>
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === RESTAURANT.HOME}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default RestaurantNavbar;
