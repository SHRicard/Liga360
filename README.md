# ⚽ Liga360

**Plataforma integral para la gestión y organización de torneos de fútbol**

Liga360 es una aplicación web completa que conecta a jugadores, organizadores de torneos y administradores en un ecosistema deportivo digital. Diseñada para facilitar la creación, gestión y participación en torneos de fútbol amateur y semi-profesional.

---

## 📖 Descripción

Liga360 resuelve los desafíos comunes en la organización de torneos de fútbol: desde la inscripción de equipos hasta el seguimiento de estadísticas, pasando por la gestión financiera y la moderación de la plataforma. Todo centralizado en una única aplicación moderna y fácil de usar.

### 🎯 Objetivo

Transformar la manera en que se organizan y gestionan los torneos de fútbol, proporcionando herramientas profesionales accesibles para organizadores de todos los niveles y una experiencia completa para jugadores que desean seguir su evolución deportiva.

---

## ✨ Características Principales

### 🎮 Para Jugadores
- **Perfil Deportivo Completo**: Gestión de datos personales, contacto y ubicación geográfica
- **Estadísticas Detalladas**: 
  - Partidos jugados, ganados, perdidos y empatados
  - Estadísticas ofensivas (goles, asistencias, tiros)
  - Estadísticas defensivas (tackles, intercepciones, vallas invictas)
  - Historial disciplinario (tarjetas amarillas, rojas, faltas)
  - Logros y reconocimientos (MVP, torneos ganados)
- **Sistema de Progresión**: Rating, nivel y experiencia que evoluciona con tu desempeño
- **Inscripción a Torneos**: Búsqueda y registro en torneos disponibles
- **Historial Completo**: Registro de todos los partidos y torneos en los que has participado

### 🏆 Para Organizadores de Torneos
- **Creación de Torneos Personalizados**: 
  - Configuración detallada de formato y reglas
  - Definición de premios y costos de inscripción
  - Gestión de fechas y sedes
- **Gestión de Equipos**: Control completo de inscripciones y equipos participantes
- **Programación de Partidos**: 
  - Calendario de partidos
  - Reprogramación flexible
  - Control de suspensiones
- **Dashboard Financiero**: 
  - Seguimiento de ingresos por inscripciones
  - Control de premios otorgados
  - Gestión de comisiones de plataforma
- **Sistema de Reputación**: 
  - Valoraciones de participantes
  - Rating promedio como organizador
  - Historial de torneos organizados
- **Estadísticas del Organizador**:
  - Torneos creados, publicados, finalizados y cancelados
  - Promedio de equipos por torneo
  - Métricas de desempeño y reputación

### 👨‍💼 Para Administradores
- **Panel de Moderación**: 
  - Revisión y aprobación de usuarios
  - Sistema de baneos y advertencias
  - Gestión de suspensiones temporales
- **Supervisión de Torneos**: 
  - Aprobación de torneos nuevos
  - Rechazo de torneos que no cumplen normas
  - Suspensión de torneos problemáticos
- **Gestión de Reportes**: 
  - Atención a reportes de usuarios
  - Resolución de conflictos
  - Escalación de casos complejos
- **Control del Sistema**: 
  - Ajustes manuales en estadísticas
  - Gestión de acciones críticas
  - Auditoría de actividad administrativa
- **Métricas Globales**: Acceso completo a todas las estadísticas de la plataforma

### 📊 Sistema de Métricas Global
- **Usuarios**: 
  - Total por rol (jugadores, admins, organizadores)
  - Estados (online, offline, suspendido, bloqueado)
  - Usuarios activos diarios y mensuales
  - Nuevos registros por período
- **Torneos**: Total, activos, finalizados, cancelados y suspendidos
- **Partidos**: Totales, programados, jugados y suspendidos
- **Financiero**: Ingresos totales, ganancias de plataforma, premios pagados
- **Reportes**: Estado de reportes (pendientes, resueltos, escalados)

---

## 🛠️ Stack Tecnológico

- **Framework Backend**: [Meteor.js](https://www.meteor.com/) - Framework full-stack para JavaScript
- **Frontend**: [React](https://react.dev/) 18 con TypeScript
- **Bundler**: [Rspack](https://www.rspack.dev/) - Bundler de alto rendimiento
- **Base de Datos**: MongoDB (integrado con Meteor)
- **Estilos**: CSS personalizado con sistema de temas (Dark/Light mode)
- **Autenticación**: Meteor Accounts con soporte para:
  - Google OAuth
  - Mercado Pago Login
  - Email/Password
- **Herramientas de Desarrollo**:
  - TypeScript para tipado estático
  - Prettier para formato de código
  - SWC para transpilación rápida

---

## 📁 Estructura del Proyecto

```
Liga360/
├── client/                      # Código del cliente
│   ├── main.tsx                # Punto de entrada del cliente
│   ├── main.html               # HTML base
│   └── main.css                # Estilos globales
│
├── server/                      # Código del servidor
│   └── main.ts                 # Punto de entrada del servidor
│
├── imports/
│   ├── api/                    # Lógica del servidor y compartida
│   │   ├── collections/        # Definiciones de colecciones MongoDB
│   │   │   ├── user.collections.ts
│   │   │   ├── metrics.collections.ts
│   │   │   ├── app_metrics.collections.ts
│   │   │   └── index.ts
│   │   ├── methods/            # Métodos del servidor
│   │   ├── emails/             # Templates de emails
│   │   └── helpers/            # Funciones auxiliares
│   │
│   └── ui/                     # Componentes de interfaz
│       ├── components/         # Componentes reutilizables
│       │   ├── atoms/          # Componentes básicos
│       │   │   ├── btnGeneral/
│       │   │   ├── btnTheme/
│       │   │   ├── fielText/
│       │   │   ├── fielEmail/
│       │   │   ├── fielPassword/
│       │   │   ├── fielArea/
│       │   │   ├── loading/
│       │   │   ├── googleLogin/
│       │   │   └── mercadoPagoLogin/
│       │   └── molecules/      # Componentes compuestos
│       │       ├── card/
│       │       ├── fielForm/
│       │       └── stepper/
│       ├── pages/              # Páginas de la aplicación
│       │   ├── landing/
│       │   ├── login/
│       │   ├── register/
│       │   ├── recovery_password/
│       │   └── design_system/
│       ├── layouts/            # Layouts públicos y privados
│       ├── routes/             # Configuración de rutas
│       ├── hooks/              # Custom hooks (Context, etc.)
│       ├── theme/              # Configuración de temas
│       ├── config/             # Configuración (rutas, roles)
│       └── helpers/            # Utilidades del cliente
│
├── public/                      # Archivos estáticos
├── tests/                       # Tests de la aplicación
├── .meteor/                     # Configuración de Meteor
├── rspack.config.ts            # Configuración de Rspack
├── tsconfig.json               # Configuración de TypeScript
├── settings.json               # Variables de entorno (no versionado)
└── settings.example.json       # Ejemplo de configuración

```

---

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- **Node.js**: v14 o superior
- **Meteor.js**: Última versión estable
- **MongoDB**: (Meteor incluye una instancia local)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/SHRicard/Liga360.git
cd Liga360

# 2. Instalar Meteor (si no lo tienes)
curl https://install.meteor.com/ | sh

# 3. Instalar dependencias
meteor npm install

# 4. Configurar variables de entorno
cp settings.example.json settings.json
# Editar settings.json con tus credenciales

# 5. Iniciar el servidor de desarrollo
./run.sh
```

La aplicación estará disponible en `http://localhost:3000`

### Variables de Entorno

Crea un archivo `settings.json` basado en `settings.example.json`:

```json
{
  "public": {
    "appName": "Liga360"
  },
  "private": {
    "google": {
      "clientId": "TU_GOOGLE_CLIENT_ID",
      "clientSecret": "TU_GOOGLE_CLIENT_SECRET"
    },
    "mercadopago": {
      "publicKey": "TU_MP_PUBLIC_KEY",
      "accessToken": "TU_MP_ACCESS_TOKEN"
    }
  }
}
```

---

## 👥 Roles y Permisos

### Jugador (`player`)
- Gestionar perfil personal
- Ver y editar estadísticas propias
- Inscribirse a torneos
- Ver historial de partidos

### Administrador de Torneo (`tournament_admin`)
- Todos los permisos de jugador
- Crear y gestionar torneos
- Administrar equipos inscritos
- Programar y gestionar partidos
- Acceso a métricas financieras propias

### Administrador (`admin`)
- Moderar usuarios y contenido
- Aprobar/rechazar torneos
- Gestionar reportes
- Ver métricas de la plataforma
- Aplicar sanciones (advertencias, baneos)

### Super Administrador (`super_admin`)
- Acceso total al sistema
- Gestión de administradores
- Acciones críticas del sistema
- Ajustes manuales en base de datos

---

## 📈 Estados del Sistema

### Estados de Usuario
- `online`: Usuario actualmente conectado
- `offline`: Usuario desconectado
- `suspendido`: Cuenta temporalmente suspendida (puede reactivarse)
- `bloqueado`: Cuenta bloqueada permanentemente

### Estados de Torneo
- `active`: Torneo en curso con partidos activos
- `finished`: Torneo completado exitosamente
- `cancelled`: Torneo cancelado por el organizador
- `suspended`: Torneo suspendido por administración

### Estados de Partido
- `scheduled`: Partido programado pendiente de jugar
- `played`: Partido completado con resultados registrados
- `suspended`: Partido suspendido (clima, incidentes, etc.)

---

## 🔐 Seguridad y Privacidad

- **Autenticación robusta** con múltiples proveedores
- **Control de acceso basado en roles** (RBAC)
- **Validación de datos** en cliente y servidor
- **Rutas protegidas** según permisos de usuario
- **Sanitización de inputs** para prevenir inyecciones
- **Secrets management** con variables de entorno
- **Sistema de reportes** para moderación comunitaria

---

## 🗄️ Modelo de Datos

### Colecciones Principales

#### Users
```typescript
{
  _id: string
  emails: Array<{ address: string, verified: boolean }>
  roles: Array<'player' | 'admin' | 'tournament_admin' | 'super_admin'>
  profile: {
    nombre, apellido, telefono, avatar
    address: { provincia, partido, barrio, calle, altura, codigoPostal, geo }
  }
  status: 'online' | 'offline' | 'suspendido' | 'bloqueado'
  createdAt, updatedAt, lastLoginAt
}
```

#### User Metrics (PlayerMetrics, AdminMetrics, TournamentAdminMetrics)
Estadísticas específicas por rol con métricas de desempeño

#### App Metrics
Métricas globales de la plataforma actualizadas en tiempo real

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/NuevaCaracteristica
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m '✨ Agregar nueva característica'
   ```
4. **Push** a la rama:
   ```bash
   git push origin feature/NuevaCaracteristica
   ```
5. Abre un **Pull Request**

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):
- `✨ feat:` Nueva característica
- `🐛 fix:` Corrección de bug
- `📝 docs:` Cambios en documentación
- `♻️ refactor:` Refactorización de código
- `🎨 style:` Cambios de formato
- `✅ test:` Agregar o modificar tests

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📧 Contacto y Soporte

- **Desarrollador**: Ricardo
- **GitHub**: [@SHRicard](https://github.com/SHRicard)
- **Proyecto**: [Liga360](https://github.com/SHRicard/Liga360)
- **Issues**: [Reportar un problema](https://github.com/SHRicard/Liga360/issues)

---

## 🙏 Agradecimientos

- Comunidad de Meteor.js
- Comunidad de React
- Todos los organizadores de torneos que inspiraron este proyecto
- Jugadores amateur que hacen crecer el deporte

---

<div align="center">

**⚽ Hecho con ❤️ para la comunidad del fútbol**

[⬆ Volver arriba](#-liga360)

</div>