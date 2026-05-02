import styles from "./about.module.css";

const EVENTS = [
  { year: "2010", text: "Bistro ilk dəfə Bakı şəhərinin mərkəzində qapılarını açdı." },
  { year: "2013", text: "Menyumuza Avropa mətbəxi əlavə edildi və ilk xarici aşpazımız işə qəbul edildi." },
  { year: "2016", text: "\"İlin Restoranı\" mükafatını qazandıq." },
  { year: "2019", text: "İkinci filialımızı Nizami küçəsində açdıq." },
  { year: "2022", text: "Onlayn sifariş sistemimizi istifadəyə verdik." },
  { year: "2025", text: "15 illik yubileyi beynəlxalq qonaqlarla birlikdə qeyd etdik." },
];

function History() {
  return (
    <div>
      <h2 className={styles.subTitle}>Tarixçəmiz</h2>
      <ul className={styles.timeline}>
        {EVENTS.map((event) => (
          <li key={event.year} className={styles.timelineItem}>
            <p className={styles.timelineYear}>{event.year}</p>
            <p className={styles.timelineText}>{event.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
