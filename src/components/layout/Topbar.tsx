import React, { useState, useRef, useEffect } from 'react';
import { Member } from '../../types';
import { useAuth } from '../../context/AuthContext';
import ieeeLogo from '../../assets/ieeeespol-logo.png';
import styles from './Topbar.module.css';

interface TopbarProps {
  member: Member;
}

const Topbar: React.FC<TopbarProps> = ({ member }) => {
  const { navigate, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <img src={ieeeLogo} alt="IEEE ESPOL" className={styles.logoImg} />
      </div>

      <div className={styles.userArea} ref={menuRef}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{member.name}</span>
          <span className={styles.userDetail}>{member.career}</span>
        </div>
        <button
          className={styles.avatarBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú de usuario"
          aria-expanded={menuOpen}
        >
          <div className={styles.avatar}>{member.initials}</div>
        </button>

        {menuOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownName}>{member.name}</span>
              <span className={styles.dropdownEmail}>{member.email}</span>
            </div>
            <div className={styles.dropdownDivider} />
            <button
              className={styles.dropdownItem}
              onClick={() => { navigate('profile'); setMenuOpen(false); }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Mi perfil
            </button>
            <button
              className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
              onClick={() => { logout(); setMenuOpen(false); }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
