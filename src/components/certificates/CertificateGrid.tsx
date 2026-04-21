import React from 'react';
import { Certificate } from '../../types';
import CertificateCard from './CertificateCard';
import styles from './CertificateGrid.module.css';

interface CertificateGridProps {
  certificates: Certificate[];
  onSelect: (cert: Certificate) => void;
}

const CertificateGrid: React.FC<CertificateGridProps> = ({ certificates, onSelect }) => {
  if (certificates.length === 0) {
    return (
      <div className={styles.empty}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={styles.emptyIcon}>
          <rect x="6" y="8" width="28" height="26" rx="4" stroke="#ccc" strokeWidth="1.5" />
          <path d="M13 16h14M13 22h10" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className={styles.emptyText}>No se encontraron certificados</p>
        <p className={styles.emptySub}>Intenta ajustar los filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {certificates.map((cert) => (
        <CertificateCard key={cert.id} certificate={cert} onClick={onSelect} />
      ))}
    </div>
  );
};

export default CertificateGrid;
