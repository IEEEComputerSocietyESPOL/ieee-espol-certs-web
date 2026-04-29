import React, { useState } from 'react';
import { Certificate } from '../types';
import { useAuth } from '../context/AuthContext';
import { mockMember } from '../data/mockData';
import { useCertificates } from '../hooks/useCertificates';
import Topbar from '../components/layout/Topbar';
import FilterBar from '../components/ui/FilterBar';
import CertificateGrid from '../components/certificates/CertificateGrid';
import CertificateModal from '../components/certificates/CertificateModal';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { member } = useAuth();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certs = member?.certificates?.length ? member.certificates : mockMember.certificates;

  const {
    paginated,
    filters,
    stats,
    availableYears,
    currentPage,
    totalPages,
    goToPage,
    setChapter,
    setActivityType,
    setYear,
    setSearch,
    resetFilters,
  } = useCertificates(certs);

  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className={styles.page}>
      <Topbar member={member ?? mockMember} />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.heading}>Mis Certificados</h1>
              <p className={styles.subheading}>
                Historial completo de tu participación en actividades IEEE ESPOL
              </p>
            </div>
            <div className={styles.singleStat}>
              <span className={styles.singleStatValue}>{stats.total}</span>
              <span className={styles.singleStatLabel}>Certificados totales</span>
            </div>
          </div>

          <FilterBar
            filters={filters}
            availableYears={availableYears}
            onChapter={setChapter}
            onActivityType={setActivityType}
            onYear={setYear}
            onSearch={setSearch}
            onReset={resetFilters}
          />

          <CertificateGrid certificates={paginated} onSelect={setSelectedCert} />

          {/* Paginación */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={`${styles.pageBtn} ${currentPage === 1 ? styles.pageBtnDisabled : ''}`}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {getPageNumbers().map((page, index) =>
                page === '...' ? (
                  <span key={`dots-${index}`} className={styles.pageDots}>···</span>
                ) : (
                  <button
                    key={page}
                    className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                    onClick={() => goToPage(page as number)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className={`${styles.pageBtn} ${currentPage === totalPages ? styles.pageBtnDisabled : ''}`}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <p className={styles.pageInfo}>
              Página {currentPage} de {totalPages}
            </p>
          )}
        </div>
      </main>

      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
};

export default Dashboard;