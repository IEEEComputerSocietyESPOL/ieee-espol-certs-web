import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CHAPTER_CONFIG } from '../../data/config';
import { Chapter } from '../../types';
import styles from './ProfilePage.module.css';

const CAREERS = [
  'Acuicultura',
  'Administración de Empresas',
  'Alimentos',
  'Arqueología',
  'Auditoría y Control de Gestión',
  'Biología',
  'Ciencia de Datos e Inteligencia Artificial',
  'Computación',
  'Diseño de Productos',
  'Diseño Gráfico',
  'Economía',
  'Electricidad',
  'Electrónica y Automatización',
  'Estadística',
  'Geología',
  'Ingeniería Agrícola y Biológica',
  'Ingeniería Civil',
  'Ingeniería Industrial',
  'Ingeniería Naval',
  'Ingeniería Química',
  'Logística y Transporte',
  'Matemática',
  'Materiales',
  'Mecánica',
  'Mecatrónica',
  'Minas',
  'Nutrición y Dietética',
  'Oceanografía',
  'Petróleos',
  'Producción para Medios de Comunicación',
  'Telecomunicaciones',
  'Telemática',
  'Turismo',
];

const ProfilePage: React.FC = () => {
  const { member, navigate, logout, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: member?.name || '',
    email: member?.email || '',
    career: member?.career || '',
    studentId: member?.studentId || '',
  });

  if (!member) return null;

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: member.name,
      email: member.email,
      career: member.career,
      studentId: member.studentId,
    });
    setEditing(false);
  };

  // Stats from certificates
  const certsByChapter = member.certificates.reduce<Record<string, number>>((acc, c) => {
    acc[c.chapter] = (acc[c.chapter] || 0) + 1;
    return acc;
  }, {});

  const totalHours = member.certificates.reduce((s, c) => s + c.hours, 0);
  const joinYear = new Date(member.joinDate).getFullYear();

  return (
    <div className={styles.page}>
      {/* Top nav */}
      <header className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('dashboard')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al portal
        </button>
        <div className={styles.topbarRight}>
          {saved && (
            <span className={styles.savedBadge}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 5" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Cambios guardados
            </span>
          )}
          <button className={styles.logoutBtn} onClick={logout}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>

          {/* Hero profile card */}
          <div className={styles.heroCard}>
            <div className={styles.heroBg} aria-hidden="true" />
            <div className={styles.heroContent}>
              <div className={styles.avatarLarge}>{member.initials}</div>
              <div className={styles.heroInfo}>
                <h1 className={styles.heroName}>{member.name}</h1>
                <p className={styles.heroCareer}>{member.career}</p>
                <div className={styles.heroPills}>
                  <span className={styles.heroPill}>{member.studentId}</span>
                </div>
              </div>
              <button
                className={styles.editBtn}
                onClick={() => setEditing(true)}
                style={{ display: editing ? 'none' : 'flex' }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Editar perfil
              </button>
            </div>
          </div>

          <div className={styles.twoCol}>
            {/* Left: edit form / info */}
            <div className={styles.leftCol}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Información personal</h2>
                  {editing && (
                    <div className={styles.editActions}>
                      <button className={styles.cancelBtn} onClick={handleCancel}>Cancelar</button>
                      <button className={styles.saveBtn} onClick={handleSave}>Guardar cambios</button>
                    </div>
                  )}
                </div>

                {editing ? (
                  <div className={styles.editForm}>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Nombre completo</label>
                      <input
                        className={styles.fieldInput}
                        type="text"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Correo institucional</label>
                      <input
                        className={styles.fieldInput}
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Matrícula</label>
                        <input
                          className={styles.fieldInput}
                          type="text"
                          value={form.studentId}
                          onChange={(e) => set('studentId', e.target.value)}
                        />
                      </div>
                      <div className={styles.formField}>
                        <label className={styles.fieldLabel}>Carrera</label>
                        <select
                          className={`${styles.fieldInput} ${styles.fieldSelect}`}
                          value={form.career}
                          onChange={(e) => set('career', e.target.value)}
                        >
                          {CAREERS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.infoGrid}>
                    {[
                      { label: 'Nombre', value: member.name },
                      { label: 'Correo', value: member.email },
                      { label: 'Matrícula', value: member.studentId },
                      { label: 'Carrera', value: member.career },
                    ].map((row) => (
                      <div key={row.label} className={styles.infoRow}>
                        <span className={styles.infoLabel}>{row.label}</span>
                        <span className={styles.infoValue}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Change password */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Seguridad</h2>
                </div>
                <button className={styles.passwordBtn}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="7" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Cambiar contraseña
                </button>
                <p className={styles.passwordHint}>Recibirás un correo con instrucciones para restablecer tu contraseña.</p>
              </div>
            </div>

            {/* Right: stats */}
            <div className={styles.rightCol}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Resumen de actividad</h2>
                </div>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard} style={{ borderLeft: '3px solid #003087' }}>
                    <span className={styles.statNum} style={{ color: '#003087' }}>{member.certificates.length}</span>
                    <span className={styles.statLabel}>Certificados</span>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Participación por capítulo</h2>
                </div>
                <div className={styles.chapterList}>
                  {Object.entries(certsByChapter)
                    .sort((a, b) => b[1] - a[1])
                    .map(([chapter, count]) => {
                      const cfg = CHAPTER_CONFIG[chapter as Chapter];
                      const pct = Math.round((count / member.certificates.length) * 100);
                      return (
                        <div key={chapter} className={styles.chapterRow}>
                          <div className={styles.chapterRowTop}>
                            <div className={styles.chapterName}>
                              <span className={styles.chapterDot} style={{ background: cfg.color }} />
                              <span>{chapter}</span>
                            </div>
                            <span className={styles.chapterCount}>{count} cert.</span>
                          </div>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{ width: `${pct}%`, background: cfg.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
