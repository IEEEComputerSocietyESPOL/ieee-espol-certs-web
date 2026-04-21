import React, { useState } from 'react';
import { Certificate } from '../types';
import { useAuth } from '../context/AuthContext';
import { mockMember } from '../data/mockData';
import { useCertificates } from '../hooks/useCertificates';
import Topbar from '../components/layout/Topbar';
import StatsBar from '../components/ui/StatsBar';
import FilterBar from '../components/ui/FilterBar';
import CertificateGrid from '../components/certificates/CertificateGrid';
import CertificateModal from '../components/certificates/CertificateModal';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { member } = useAuth();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Use real member certs if available; fall back to mock for demo accounts
  const certs = member?.certificates?.length ? member.certificates : mockMember.certificates;

  const {
    filtered,
    filters,
    stats,
    availableYears,
    setChapter,
    setActivityType,
    setYear,
    setSearch,
    resetFilters,
  } = useCertificates(certs);

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
          </div>

          <div className={styles.singleStat}>
            <span className={styles.singleStatValue}>{stats.total}</span>
            <span className={styles.singleStatLabel}>Certificados totales</span>
          </div>
          
          <FilterBar
            filters={filters}
            availableYears={availableYears}
            onChapter={setChapter}
            onActivityType={setActivityType}
            onYear={setYear}
            onSearch={setSearch}
            onReset={resetFilters}
            resultCount={filtered.length}
          />

          <CertificateGrid certificates={filtered} onSelect={setSelectedCert} />
        </div>
      </main>

      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
};

export default Dashboard;
