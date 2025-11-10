# 🏥 ANACRON - Sistema de Gestión Médica

## 📋 Descripción
ANACRON es un sistema completo de gestión médica desarrollado con tecnologías modernas. Permite administrar pacientes, profesionales médicos, turnos y consultas de manera eficiente y profesional.

## 🚀 Tecnologías Utilizadas

### Backend
- **NestJS** - Framework Node.js enterprise
- **Prisma ORM** - Mapeo objeto-relacional moderno
- **MySQL** - Base de datos relacional
- **TypeScript** - Tipado estático

### Frontend  
- **Vue 3** - Framework JavaScript reactivo
- **Tailwind CSS** - Framework de estilos utility-first
- **Vite** - Build tool y dev server
- **Vue Router** - Navegación SPA

## 🗃️ Estructura de la Base de Datos
- **Pacientes** - Información personal y médica
- **Profesionales** - Médicos y especialistas  
- **Turnos** - Citas y consultas médicas
- **Especialidades** - Áreas médicas
- **Establecimientos** - Centros de salud
- **Obras Sociales** - Sistemas de cobertura
- **Historial de Consultas** - Registro médico

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- MySQL 8.0+
- Git

### Backend
```bash
cd backend
npm install
# Configurar .env con DATABASE_URL
npx prisma db push
npm run start:dev
```

### Frontend
```bash
cd frontend  
npm install
npm run dev
```

## 🌐 URLs del Sistema
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📚 Funcionalidades

### 👥 Gestión de Pacientes
- Registro completo de pacientes
- Búsqueda por DNI, nombre, apellido
- Historial médico integrado

### 👨‍⚕️ Gestión de Profesionales  
- Registro de médicos y especialistas
- Asignación de especialidades
- Control de establecimientos

### 📅 Sistema de Turnos
- Programación de citas médicas
- Estados: Pendiente, Confirmado, Completado
- Filtros por fecha, profesional, paciente
- Gestión de cancelaciones

### 📊 Panel de Control
- Interfaz intuitiva y responsiva
- Tema médico profesional
- Navegación fluida entre módulos

## 🎓 Proyecto Académico
Este sistema fue desarrollado como proyecto escolar, demostrando:
- Arquitectura full-stack moderna
- Patrones de diseño enterprise
- Documentación técnica exhaustiva
- Buenas prácticas de desarrollo

## 👨‍💻 Desarrollo
**Desarrollado por**: [Tu Nombre]  
**Institución**: [Tu Institución]  
**Fecha**: Noviembre 2025

## 📄 Licencia
Proyecto académico - Uso educativo