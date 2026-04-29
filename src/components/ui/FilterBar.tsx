import React from 'react';
import { Chapter, ActivityType, FilterState } from '../../types';
import { ALL_CHAPTERS, ALL_ACTIVITY_TYPES } from '../../data/config';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filters: FilterState;
  availableYears: number[];
  onChapter: (c: Chapter | 'Todos') => void;
  onActivityType: (a: ActivityType | 'Todos') => void;
  onYear: (y: number | 'Todos') => void;
  onSearch: (s: string) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  availableYears,
  onChapter,
  onActivityType,
  onYear,
  onSearch,
  onReset,
}) => {
  const hasActiveFilters =
    filters.chapter !== 'Todos' ||
    filters.activityType !== 'Todos' ||
    filters.year !== 'Todos' ||
    filters.search !== '';

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.chapterPills}>
          <button
            className={`${styles.pill} ${filters.chapter === 'Todos' ? styles.active : ''}`}
            onClick={() => onChapter('Todos')}
          >
            Todos
          </button>
          {ALL_CHAPTERS.map((ch) => (
            <button
              key={ch}
              className={`${styles.pill} ${filters.chapter === ch ? styles.active : ''}`}
              onClick={() => onChapter(ch)}
            >
              {ch}
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
            <circle cx="6.5" cy="6.5" r="5" stroke="#aaa" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Buscar certificado..."
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.selectGroup}>
          <label className={styles.selectLabel}>Tipo</label>
          <select
            value={filters.activityType}
            onChange={(e) => onActivityType(e.target.value as ActivityType | 'Todos')}
            className={styles.select}
          >
            <option value="Todos">Todos los tipos</option>
            {ALL_ACTIVITY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label className={styles.selectLabel}>Año</label>
          <select
            value={filters.year}
            onChange={(e) =>
              onYear(e.target.value === 'Todos' ? 'Todos' : Number(e.target.value))
            }
            className={styles.select}
          >
            <option value="Todos">Todos los años</option>
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={onReset}>
            Limpiar filtros ×
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
