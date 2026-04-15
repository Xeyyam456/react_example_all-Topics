import  styles  from './card.module.css'

export default function Card() {
    return (
        <div className={styles.card}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFEWXg_To5nU7qvKm8j8tZkFIaM92hufSFQ&s"
            alt="image"
            className={styles.cardImage} />
            <h2 className={styles.cardTitle}>Card Component</h2>
            <p className={styles.cardDescription}>This is a simple card component styled with CSS Modules.</p>
        </div>
    )
}