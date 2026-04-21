import React, { useState } from 'react';
import { Certificate } from '../../types';
import { CHAPTER_CONFIG, ACTIVITY_TYPE_COLORS, formatDate } from '../../data/config';
import styles from './CertificateCard.module.css';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: (cert: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const chapterCfg = CHAPTER_CONFIG[certificate.chapter];
  const typeCfg = ACTIVITY_TYPE_COLORS[certificate.activityType];

  return (
    <article
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onClick={() => onClick(certificate)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(certificate)}
      aria-label={`Certificado: ${certificate.title}`}
    >
      <div
        className={styles.banner}
        style={{ background: chapterCfg.bg, borderBottom: `1px solid ${chapterCfg.border}` }}
      >
        <span className={styles.chapterAbbr} style={{ color: chapterCfg.color, background: chapterCfg.border }}>
          {chapterCfg.abbr}
        </span>
        <span className={styles.hours} style={{ color: chapterCfg.color }}>
          {certificate.hours}h
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{certificate.title}</h3>

        <p className={styles.chapter} style={{ color: chapterCfg.color }}>
          {chapterCfg.label}
        </p>

        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(certificate.date)}</span>
          <span
            className={styles.typeBadge}
            style={{ background: typeCfg.bg, color: typeCfg.color }}
          >
            {certificate.activityType}
          </span>
        </div>

        {certificate.speaker && (
          <p className={styles.speaker}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ marginRight: 4 }}>
              <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {certificate.speaker}
          </p>
        )}

        <button
          className={styles.downloadBtn}
          onClick={(e) => {
            e.stopPropagation();
            alert('Función de descarga próximamente disponible');
          }}
          aria-label="Descargar certificado"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Descargar PDF
        </button>
      </div>
    </article>
  );
};

export default CertificateCard;
