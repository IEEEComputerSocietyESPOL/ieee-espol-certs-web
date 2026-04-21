import React from 'react';
import styles from './StatsBar.module.css';

interface StatsBarProps {
  total: number;
  thisYear: number;
  totalHours: number;
  chapters: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ total, thisYear, totalHours, chapters }) => {
  const stats = [
    { label: 'Certificados totales', value: total, accent: '#003087' },
    { label: 'Este año', value: thisYear, accent: '#3B6D11' },
    { label: 'Horas acreditadas', value: `${totalHours}h`, accent: '#534AB7' },
    { label: 'Capítulos / Grupos', value: chapters, accent: '#854F0B' },
  ];

  return (
    <div className={styles.statsBar}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <span className={styles.value} style={{ color: s.accent }}>
            {s.value}
          </span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
