# IEEE ESPOL — Portal de Certificados

Portal frontend para que los miembros de la Rama IEEE ESPOL visualicen sus certificados de participación en charlas, talleres y actividades organizadas por la rama general, capítulos técnicos y grupos de afinidad.

## 🛠 Stack

- **React 18** + **TypeScript**
- **Vite** (bundler y dev server)
- **CSS Modules** (estilos encapsulados por componente)
- Sin dependencias UI externas (cero overhead)

## 📁 Estructura del proyecto

```
src/
├── context/
│   └── AuthContext.tsx          # Estado global de autenticación
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx       # Layout con panel izquierdo branding
│   │   ├── AuthLayout.module.css
│   │   ├── LoginPage.tsx        # Página de inicio de sesión
│   │   ├── RegisterPage.tsx     # Página de registro
│   │   └── AuthForm.module.css  # Estilos compartidos de formularios
│   ├── profile/
│   │   ├── ProfilePage.tsx      # Perfil con edición inline
│   │   └── ProfilePage.module.css
│   ├── layout/
│   │   ├── Topbar.tsx           # Barra superior con menú de usuario
│   │   └── Topbar.module.css
│   ├── ui/
│   │   ├── StatsBar.tsx         # Tarjetas de estadísticas
│   │   ├── FilterBar.tsx        # Filtros por capítulo, tipo y año
│   │   └── *.module.css
│   └── certificates/
│       ├── CertificateCard.tsx  # Tarjeta individual
│       ├── CertificateGrid.tsx  # Grid responsivo
│       ├── CertificateModal.tsx # Modal de detalle
│       └── *.module.css
├── data/
│   ├── mockData.ts              # Datos de ejemplo (12 certificados)
│   └── config.ts                # Colores y config por capítulo
├── hooks/
│   └── useCertificates.ts       # Hook de filtrado y estadísticas
├── pages/
│   ├── Dashboard.tsx            # Página principal de certificados
│   └── Dashboard.module.css
├── types/
│   └── index.ts                 # Interfaces TypeScript
├── App.tsx                      # Router principal (sin react-router)
├── main.tsx
└── index.css
```

## 🚀 Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## 🔐 Flujo de autenticación

El proyecto usa un `AuthContext` con router interno basado en estado. Las páginas disponibles son:

| Estado (`currentPage`) | Componente | Descripción |
|---|---|---|
| `login` | `LoginPage` | Inicio de sesión |
| `register` | `RegisterPage` | Registro de nuevo miembro |
| `dashboard` | `Dashboard` | Portal de certificados |
| `profile` | `ProfilePage` | Perfil editable del miembro |

**Demo:** cualquier email válido + contraseña de 6+ caracteres funciona en el login.

## 🏗 Build para producción

```bash
npm run build
npm run preview
```

