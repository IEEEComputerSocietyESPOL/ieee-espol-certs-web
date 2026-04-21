import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import styles from './AuthForm.module.css';

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

const RegisterPage: React.FC = () => {
  const { register, navigate } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    studentId: '',
    career: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Ingresa tu nombre completo.';
    if (!form.email.includes('@')) e.email = 'Ingresa un email válido.';
    if (!form.studentId.match(/^\d{9,}$/)) e.studentId = 'El matrícula debe tener al menos 9 dígitos.';
    if (!form.career) e.career = 'Selecciona tu carrera.';
    if (form.password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await register({
      name: form.name,
      email: form.email,
      studentId: form.studentId,
      career: form.career,
      password: form.password,
    });
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Crear cuenta</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Ej. María González Vera"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-email">Correo institucional</label>
            <input
              id="reg-email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="usuario@espol.edu.ec"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="studentId">Matrícula</label>
              <input
                id="studentId"
                type="text"
                className={`${styles.input} ${errors.studentId ? styles.inputError : ''}`}
                placeholder="20XXXXXXX"
                value={form.studentId}
                onChange={(e) => set('studentId', e.target.value)}
              />
              {errors.studentId && <span className={styles.fieldError}>{errors.studentId}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="career">Carrera</label>
              <select
                id="career"
                className={`${styles.input} ${styles.select} ${errors.career ? styles.inputError : ''}`}
                value={form.career}
                onChange={(e) => set('career', e.target.value)}
              >
                <option value="">Seleccionar...</option>
                {CAREERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.career && <span className={styles.fieldError}>{errors.career}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-password">Contraseña</label>
            <div className={styles.inputWrapper}>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${styles.inputWithIcon} ${errors.password ? styles.inputError : ''}`}
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="Repite la contraseña"
              value={form.confirmPassword}
              onChange={(e) => set('confirmPassword', e.target.value)}
            />
            {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Crear cuenta'}
          </button>
        </form>

        <div className={styles.divider}><span>¿Ya tienes cuenta?</span></div>

        <button type="button" className={styles.secondaryBtn} onClick={() => navigate('login')}>
          Iniciar sesión
        </button>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
