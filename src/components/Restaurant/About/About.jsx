import { NavLink, Outlet } from "react-router-dom";
import { RESTAURANT } from "../../../router/restaurantRoutes";
import styles from "./about.module.css";

const TABS = [
  { label: "Ümumi", to: RESTAURANT.ABOUT, end: true },
  { label: "Komandamız", to: RESTAURANT.ABOUT_TEAM },
  { label: "Tarixçə", to: RESTAURANT.ABOUT_HISTORY },
];

function About() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Haqqımızda</h1>

      <nav className={styles.tabs}>
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.activeTab : ""}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default About;
