// ==================================================================================
// ANACRON - MÓDULO PRINCIPAL (APP MODULE) - ARQUITECTURA NESTJS
// ==================================================================================
//
// 📋 DESCRIPCIÓN:
// Este archivo define el módulo raíz de la aplicación NestJS. Es el punto central
// donde se configuran y conectan todos los módulos del sistema ANACRON.
//
// 🏗️ FUNCIÓN PRINCIPAL:
// - Importa y registra todos los módulos funcionales del sistema
// - Configura el controlador y servicio raíz de la aplicación
// - Establece la arquitectura modular del backend
//
// 🌐 ARQUITECTURA MODULAR:
// NestJS utiliza el patrón de módulos para organizar el código en unidades
// funcionales independientes. Cada módulo encapsula:
// - Controller (Manejo de HTTP requests)
// - Service (Lógica de negocio)
// - Module (Configuración y dependencias)
//
// ==================================================================================
// 📦 MÓDULOS IMPORTADOS (7 módulos funcionales):
// ==================================================================================
//
// 1. 👤 PACIENTES MODULE
//    - Archivo: ./pacientes/pacientes.module.ts
//    - Función: Gestión completa de pacientes
//    - Endpoints: /pacientes/* (6 endpoints)
//    - Conexiones BD: pacientes, obras_sociales, turnos, historial_consultas
//
// 2. 🏥 ESTABLECIMIENTOS MODULE
//    - Archivo: ./establecimientos/establecimientos.module.ts
//    - Función: Gestión de clínicas, hospitales, centros médicos
//    - Endpoints: /establecimientos/* (6 endpoints)
//    - Conexiones BD: establecimientos, profesionales, obras_sociales
//
// 3. 👨‍⚕️ PROFESIONALES MODULE
//    - Archivo: ./profesionales/profesionales.module.ts
//    - Función: Gestión de médicos y especialistas
//    - Endpoints: /profesionales/* (10 endpoints) - Más complejo
//    - Conexiones BD: profesionales, establecimientos, especialidades, turnos
//
// 4. 🩺 ESPECIALIDADES MODULE
//    - Archivo: ./especialidades/especialidades.module.ts
//    - Función: Gestión de especialidades médicas (cardiología, etc.)
//    - Endpoints: /especialidades/* (5 endpoints)
//    - Conexiones BD: especialidades, profesionales, turnos
//
// 5. 📅 TURNOS MODULE ⭐ NÚCLEO DEL SISTEMA
//    - Archivo: ./turnos/turnos.module.ts
//    - Función: Sistema principal de gestión de citas médicas
//    - Endpoints: /turnos/* (8 endpoints)
//    - Conexiones BD: turnos + TODAS las otras tablas (más crítico)
//    - Características especiales:
//      * Genera números de referencia únicos
//      * Maneja estados de turnos (PENDIENTE, CONFIRMADO, etc.)
//      * Conecta pacientes con profesionales
//
// 6. 🛡️ OBRAS SOCIALES MODULE
//    - Archivo: ./obras-sociales/obras-sociales.module.ts
//    - Función: Gestión de seguros médicos y cobertura
//    - Endpoints: /obras-sociales/* (5 endpoints)
//    - Conexiones BD: obras_sociales, pacientes, establecimientos
//
// 7. 📋 HISTORIAL CONSULTAS MODULE
//    - Archivo: ./historial-consultas/historial-consultas.module.ts
//    - Función: Registro de consultas médicas completadas
//    - Endpoints: /historial-consultas/* (12 endpoints) - Más endpoints
//    - Conexiones BD: historial_consultas + TODAS las relaciones
//    - Características especiales:
//      * Puede crear registros desde turnos completados
//      * Búsquedas por múltiples criterios (fecha, profesional, etc.)
//
// ==================================================================================
// 🔗 FLUJO DE INICIALIZACIÓN:
// ==================================================================================
//
// 1. 🚀 ARRANQUE DE LA APLICACIÓN:
//    main.ts → Crea instancia de NestJS con AppModule
//
// 2. 📦 CARGA DE MÓDULOS:
//    AppModule.imports → Registra los 7 módulos funcionales
//
// 3. 🎯 REGISTRO DE DEPENDENCIAS:
//    Cada módulo registra sus controllers y services
//
// 4. 🌐 CONFIGURACIÓN DE RUTAS:
//    NestJS mapea automáticamente:
//    - /pacientes → PacientesController
//    - /establecimientos → EstablecimientosController
//    - /profesionales → ProfesionalesController
//    - /especialidades → EspecialidadesController
//    - /turnos → TurnosController ⭐
//    - /obras-sociales → ObrasSocialesController
//    - /historial-consultas → HistorialConsultasController
//
// 5. ✅ SERVIDOR LISTO:
//    Aplicación lista en http://localhost:3000
//
// ==================================================================================
// 🏛️ PATRÓN DE ARQUITECTURA:
// ==================================================================================
//
//                    ┌─────────────────┐
//                    │   APP MODULE    │ ← Este archivo
//                    │   (Raíz)        │
//                    └─────────────────┘
//                            │
//              ┌─────────────┼─────────────┐
//              │             │             │
//    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
//    │  PACIENTES  │ │   TURNOS    │ │ HISTORIAL   │
//    │   MODULE    │ │   MODULE    │ │   MODULE    │ ... (7 módulos)
//    └─────────────┘ └─────────────┘ └─────────────┘
//              │             │             │
//    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
//    │ Controller  │ │ Controller  │ │ Controller  │
//    │ Service     │ │ Service     │ │ Service     │
//    └─────────────┘ └─────────────┘ └─────────────┘
//              │             │             │
//              └─────────────┼─────────────┘
//                            │
//                    ┌─────────────────┐
//                    │   PRISMA ORM    │
//                    │   (Database)    │
//                    └─────────────────┘
//
// ==================================================================================
// 🔧 CONFIGURACIÓN TÉCNICA:
// ==================================================================================
//
// 🎯 DECORADOR @Module:
// - imports: Array de módulos que se importan y registran
// - controllers: Controladores del módulo actual (solo AppController)
// - providers: Servicios del módulo actual (solo AppService)
//
// 📂 ESTRUCTURA DE ARCHIVOS:
// app.module.ts (este archivo) ← Configuración central
//   ├── app.controller.ts ← Endpoint raíz "/"
//   ├── app.service.ts ← Lógica básica de la aplicación
//   └── [7 módulos]/ ← Funcionalidades específicas
//       ├── [modulo].controller.ts ← API REST endpoints
//       ├── [modulo].service.ts ← Lógica de negocio + Prisma
//       └── [modulo].module.ts ← Configuración del módulo
//
// 🌐 CONEXIÓN CON BASE DE DATOS:
// - Cada service importa PrismaClient individualmente
// - Conexión configurada en: prisma/schema.prisma
// - Variable de entorno: DATABASE_URL (MySQL)
//
// 🔄 HOT RELOAD EN DESARROLLO:
// - Comando: npm run start:dev
// - NestJS recarga automáticamente al cambiar archivos
// - Este módulo se recarga si cambia cualquier importación
//
// ==================================================================================
// 📊 MÉTRICAS DEL SISTEMA:
// ==================================================================================
//
// 📁 ARCHIVOS GESTIONADOS:
// - 7 módulos funcionales
// - 21 archivos de código principal (3 por módulo)
// - 50+ endpoints REST disponibles
//
// 🗃️ BASE DE DATOS:
// - 9 tablas principales + 2 intermedias
// - Gestión de 11 entidades de negocio
// - Relaciones complejas many-to-many
//
// 🚀 FUNCIONALIDADES:
// - CRUD completo para 7 entidades principales
// - Sistema de turnos con estados
// - Historial médico detallado
// - Gestión de profesionales y especialidades
//
// ==================================================================================
// 🎓 PROYECTO EDUCATIVO:
// ==================================================================================
//
// 📚 PROPÓSITO: Proyecto escolar - Sistema de gestión médica simplificado
// 🎯 OBJETIVOS ACADÉMICOS:
//   - Aprender arquitectura modular con NestJS
//   - Implementar API REST completa
//   - Gestionar base de datos relacional con Prisma
//   - Aplicar patrones de diseño (MVC, Dependency Injection)
//
// 💡 CONCEPTOS DEMOSTRADOS:
//   - Módulos y dependencias en NestJS
//   - Decoradores TypeScript (@Module, @Injectable)
//   - Separación de responsabilidades
//   - Inyección de dependencias
//   - Arquitectura escalable
//
// ==================================================================================
// 👨‍💻 DESARROLLADO PARA: Proyecto Escolar - ANACRON Medical System
// 🗓️ FECHA: Noviembre 2025
// ==================================================================================

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { EstablecimientosModule } from './establecimientos/establecimientos.module';
import { ProfesionalesModule } from './profesionales/profesionales.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { TurnosModule } from './turnos/turnos.module';
import { ObrasSocialesModule } from './obras-sociales/obras-sociales.module';
import { HistorialConsultasModule } from './historial-consultas/historial-consultas.module';

@Module({
  imports: [PacientesModule, EstablecimientosModule, ProfesionalesModule, EspecialidadesModule, TurnosModule, ObrasSocialesModule, HistorialConsultasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
