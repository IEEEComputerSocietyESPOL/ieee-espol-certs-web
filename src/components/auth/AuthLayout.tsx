import React, { ReactNode } from 'react';
import styles from './AuthLayout.module.css';
import ieeeLogo from '../../assets/ieeeespol-logo.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <div className={styles.brandInner}>
          <div className={styles.brandLogo}>
            <img src={ieeeLogo} alt="IEEE ESPOL" className={styles.logoImg} />
          </div>

          <div className={styles.brandHero}>
            <h1 className={styles.heroHeading}>
              Tu trayectoria<br />técnica,<br />
              <span className={styles.heroAccent}>documentada.</span>
            </h1>
            <p className={styles.heroBody}>
              Accede a todos los certificados que has obtenido participando en charlas, talleres y actividades de la rama IEEE ESPOL.
            </p>
          </div>
        </div>

        <div className={styles.gridPattern} aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className={styles.gridDot} />
          ))}
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;