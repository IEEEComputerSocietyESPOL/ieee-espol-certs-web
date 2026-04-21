import React, { useEffect } from 'react';
import { Certificate } from '../../types';
import { CHAPTER_CONFIG, ACTIVITY_TYPE_COLORS, formatDate } from '../../data/config';
import styles from './CertificateModal.module.css';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!certificate) return null;

  const chapterCfg = CHAPTER_CONFIG[certificate.chapter];
  const typeCfg = ACTIVITY_TYPE_COLORS[certificate.activityType];

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.header} style={{ background: chapterCfg.bg, borderBottom: `1px solid ${chapterCfg.border}` }}>
          <div className={styles.headerContent}>
            <span className={styles.chapterAbbr} style={{ background: chapterCfg.border, color: chapterCfg.color }}>
              {chapterCfg.abbr}
            </span>
            <div>
              <h2 className={styles.title}>{certificate.title}</h2>
              <p className={styles.chapterName} style={{ color: chapterCfg.color }}>
                {chapterCfg.label} · IEEE ESPOL
              </p>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Fecha</span>
              <span className={styles.metaValue}>{formatDate(certificate.date)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Horas</span>
              <span className={styles.metaValue}>{certificate.hours}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Tipo de actividad</span>
              <span
                className={styles.typeBadge}
                style={{ background: typeCfg.bg, color: typeCfg.color }}
              >
                {certificate.activityType}
              </span>
            </div>
            {certificate.speaker && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Ponente / Instructor</span>
                <span className={styles.metaValue}>{certificate.speaker}</span>
              </div>
            )}
          </div>

          <div className={styles.description}>
            <p className={styles.descriptionLabel}>Descripción</p>
            <p className={styles.descriptionText}>{certificate.description}</p>
          </div>

          <div className={styles.certPreview}>
            <div className={styles.certPreviewInner} style={{ borderColor: chapterCfg.border }}>
              <div className={styles.certPreviewHeader} style={{ background: chapterCfg.bg }}>
                <span style={{ color: chapterCfg.color, fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
                  CERTIFICADO DE PARTICIPACIÓN
                </span>
              </div>
              <div className={styles.certPreviewBody}>
                <p className={styles.certPreviewSub}>IEEE ESPOL · {chapterCfg.label}</p>
                <p className={styles.certPreviewTitle}>{certificate.title}</p>
                <p className={styles.certPreviewDate}>{formatDate(certificate.date)}</p>
              </div>
            </div>
          </div>

          <button
            className={styles.downloadBtn}
            style={{ background: chapterCfg.color }}
            onClick={() => alert('Función de descarga próximamente disponible')}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 13h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Descargar certificado PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
