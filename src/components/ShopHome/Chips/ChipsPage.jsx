import { useState } from 'react';
import styles from '../shopHome.module.css';
import ChipsCard from './ChipsCard';
import Button from '../../Button/Button';

function ChipsPage({ onBack }) {
  const [chipsCards, setChipsCards] = useState([]);

  return (
    <div className={styles.chipsPage}>
      <div className={styles.chipsHeader}>
        <h1 className={styles.chipsTitle}>
          Chips <span className={styles.chipsCount}>({chipsCards.length})</span>
        </h1>
        <div className={styles.chipsBtnRow}>
            <Button variant="success" onClick={() => setChipsCards((prev) => [...prev, { id: Date.now() }])}>Add</Button>
            <Button variant="danger" onClick={() => setChipsCards([])}>Reset</Button>
            <Button variant="secondary" onClick={onBack}>Go Home</Button>
        </div>
      </div>
      <div className={styles.chipsGrid}>
        {chipsCards.map((card) => (
          <ChipsCard
            key={card.id}
            onDelete={() => setChipsCards((prev) => prev.filter((c) => c.id !== card.id))}
          />
        ))}
      </div>
    </div>
  );
}

export default ChipsPage;
