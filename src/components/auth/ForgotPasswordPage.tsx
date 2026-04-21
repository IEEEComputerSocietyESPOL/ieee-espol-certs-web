import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import styles from './AuthForm.module.css';

const ForgotPasswordPage: React.FC = () => {
  const { navigate } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout>
      <div className={styles.formCard}>
        {!sent ? (
          <>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Recuperar contraseña</h2>
              <p className={styles.formSubtitle}>
                Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="forgot-email">
                  Correo institucional
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  className={styles.input}
                  placeholder="usuario@espol.edu.ec"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading || !email}
              >
                {loading ? <span className={styles.spinner} /> : 'Enviar instrucciones'}
              </button>
            </form>

            <div className={styles.divider}><span>¿Recordaste tu contraseña?</span></div>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => navigate('login')}
            >
              Volver al inicio de sesión
            </button>
          </>
        ) : (
          <>
            <div className={styles.successIcon}>
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" stroke="#003087" strokeWidth="1.5" />
                <path
                  d="M15 26l8 8 14-16"
                  stroke="#003087"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Revisa tu correo</h2>
              <p className={styles.formSubtitle}>
                Enviamos instrucciones para restablecer tu contraseña a{' '}
                <strong>{email}</strong>. Revisa también tu carpeta de spam.
              </p>
            </div>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => navigate('login')}
            >
              Volver al inicio de sesión
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              style={{ marginTop: 10 }}
              onClick={() => { setSent(false); setEmail(''); }}
            >
              Intentar con otro correo
            </button>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;