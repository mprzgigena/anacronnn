# ANACRON - Sistema de Gestión Médica

Un sistema completo de gestión médica desarrollado con tecnologías modernas, diseñado para la administración eficiente de consultorios médicos y centros de salud.

## 🚀 Tecnologías Utilizadas

### Backend
- **NestJS** - Framework de Node.js para el backend
- **TypeScript** - Lenguaje de programación tipado
- **Prisma** - ORM para base de datos
- **MySQL** - Base de datos relacional
- **Class Validator** - Validación de datos

### Frontend
- **Vue 3** - Framework frontend reactivo
- **TypeScript** - Lenguaje tipado para el frontend
- **Tailwind CSS** - Framework CSS para estilos
- **Vite** - Herramienta de desarrollo y build
- **Vue Router** - Enrutamiento para aplicación SPA

## 📁 Estructura del Proyecto

```
anacron/
├── backend/                 # API Backend con NestJS
│   ├── src/
│   │   ├── turnos/         # Gestión de turnos
│   │   ├── pacientes/      # Gestión de pacientes
│   │   ├── profesionales/  # Gestión de profesionales
│   │   ├── especialidades/ # Gestión de especialidades
│   │   ├── establecimientos/ # Gestión de establecimientos
│   │   ├── obras-sociales/ # Gestión de obras sociales
│   │   └── historial-consultas/ # Historial médico
│   ├── prisma/
│   │   └── schema.prisma   # Esquema de base de datos
│   └── package.json
├── frontend/               # Interfaz de usuario con Vue 3
│   ├── src/
│   │   ├── components/     # Componentes Vue
│   │   ├── services/       # Servicios API
│   │   └── assets/         # Recursos estáticos
│   └── package.json
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- MySQL (versión 8 o superior)
- npm o yarn

### Backend

1. Navegar al directorio backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar base de datos MySQL y actualizar la variable de entorno en `.env`:
```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/anacron_db"
```

4. Ejecutar migraciones de Prisma:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Iniciar el servidor de desarrollo:
```bash
npm run start:dev
```

El backend estará disponible en `http://localhost:3000`

### Frontend

1. Navegar al directorio frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📚 Características del Sistema

### Gestión de Turnos
- Creación, edición y cancelación de turnos
- Asignación de pacientes y profesionales
- Control de disponibilidad de horarios
- Filtrado por fecha y especialidad

### Gestión de Pacientes
- Registro completo de pacientes
- Historial médico detallado
- Gestión de obras sociales
- Búsqueda y filtrado avanzado

### Gestión de Profesionales
- Registro de profesionales de la salud
- Asignación de especialidades
- Gestión de horarios de atención
- Control de establecimientos asociados

### Módulos Administrativos
- Especialidades médicas
- Establecimientos de salud
- Obras sociales
- Historial de consultas

## 🔒 API Endpoints

El sistema incluye más de 50 endpoints REST organizados en los siguientes módulos:
- `/turnos` - Gestión de turnos
- `/pacientes` - Gestión de pacientes
- `/profesionales` - Gestión de profesionales
- `/especialidades` - Gestión de especialidades
- `/establecimientos` - Gestión de establecimientos
- `/obras-sociales` - Gestión de obras sociales
- `/historial-consultas` - Historial médico

## 🗄️ Base de Datos

La base de datos está diseñada con un esquema normalizado que incluye 11 tablas principales:
- Pacientes
- Profesionales
- Turnos
- Especialidades
- Establecimientos
- Obras sociales
- Historial de consultas
- Y tablas de relación correspondientes

## 🧪 Testing

### Backend
```bash
cd backend
npm run test        # Tests unitarios
npm run test:e2e    # Tests end-to-end
```

### Frontend
```bash
cd frontend
npm run test        # Tests unitarios
```

## 🚀 Despliegue

### Producción
1. Construir el frontend:
```bash
cd frontend
npm run build
```

2. Construir el backend:
```bash
cd backend
npm run build
```

3. Configurar variables de entorno para producción
4. Desplegar en el servidor de su elección

## 👨‍💻 Desarrollo

### Scripts Disponibles

**Backend:**
- `npm run start` - Iniciar en modo producción
- `npm run start:dev` - Iniciar en modo desarrollo con watch
- `npm run build` - Construir para producción
- `npm run test` - Ejecutar tests

**Frontend:**
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción

## 📄 Licencia

Este proyecto fue desarrollado como proyecto académico.

## 📞 Contacto

Para consultas sobre el proyecto, contactar a través de GitHub.

---

**ANACRON** - Sistema de Gestión Médica Integral