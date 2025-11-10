# ANACRON - Backend API REST

ANACRON es un sistema de gestión médica simplificado desarrollado como proyecto para práctica profesionalizante III. El backend está construido con **NestJS**, **Prisma ORM** y **MySQL**, proporcionando una API REST completa para la gestión de turnos médicos, pacientes, profesionales y establecimientos de salud.


## Arquitectura del Sistema

### **Stack Tecnológico**
- **Framework**: NestJS (Node.js + TypeScript)
- **ORM**: Prisma 
- **Base de Datos**: MySQL
- **Lenguaje**: TypeScript
- **Arquitectura**: API REST + Modular

### **Patrón de Diseño**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CONTROLLER    │────│    SERVICE      │────│     PRISMA      │
│  (HTTP Layer)   │    │ (Business Logic)│    │   (Data Layer)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## Estructura de archivos:

###  **Configuración Principal**

#### **`src/main.ts`** - Punto de Entrada
- **¿Qué hace?**: Inicializa la aplicación NestJS y configura el servidor
- **¿Cómo funciona?**: Importa el AppModule y levanta el servidor en puerto 3000
- **Conexiones**: → `app.module.ts`
- **Ejecución**: `npm run start:dev`

#### **`src/app.module.ts`** - Módulo Raíz 
- **¿Qué hace?**: Centraliza todos los módulos del sistema
- **¿Cómo se hizo?**: Importa los 7 módulos funcionales creados
- **Conexiones**: Conecta todos los módulos (pacientes, turnos, etc.)


```typescript
// Estructura del AppModule
@Module({
  imports: [
    PacientesModule,
    EstablecimientosModule,
    ProfesionalesModule,
    EspecialidadesModule,
    TurnosModule,
    ObrasSocialesModule,
    HistorialConsultasModule,
  ],
})
```

### **Base de Datos y ORM**

#### **`prisma/schema.prisma`** - Esquema de Base de Datos ⭐
- **¿Qué hace?**: Define la estructura completa de la base de datos
- **¿Cómo se hizo?**: Se normalizaron 9 tablas con relaciones entre sí
- **Conexiones**: → MySQL via `DATABASE_URL` → Servicios via `PrismaClient`
- **Características especiales**: 
  - Campos de tiempo como `VARCHAR(10)` (formato "HH:MM")
  - Enums para estados y tipos
  - Índices para optimización
- **Visualización**: `npx prisma studio`

#### **`.env`** - Variables de Entorno
- **¿Qué hace?**: Almacena la cadena de conexión a MySQL
- **Contenido**: `DATABASE_URL="mysql://root:@localhost:3306/anacron"`
- **Conexiones**: → `schema.prisma` → Servicios

### **Módulos Funcionales CRUDs**

#### **1. `src/pacientes/`** - Gestión de Pacientes

**`pacientes.module.ts`**
- **¿Qué hace?**: Configura el módulo de pacientes
- **Conexiones**: Exporta controller y service

**`pacientes.controller.ts`**
- **¿Qué hace?**: Define 6 endpoints REST para pacientes
- **Endpoints principales**:
  - `GET /pacientes` - Listar todos
  - `GET /pacientes/:id` - Por ID
  - `GET /pacientes/dni/:dni` - Buscar por DNI
  - `POST /pacientes` - Crear nuevo
  - `PATCH /pacientes/:id` - Actualizar
  - `DELETE /pacientes/:id` - Eliminar
- **Conexiones**: → `pacientes.service.ts`

**`pacientes.service.ts`**
- **¿Qué hace?**: Lógica de negocio y consultas Prisma para pacientes
- **Incluye relaciones**: obra social, turnos, historial médico
- **Conexiones**: → `PrismaClient` → Base de datos

#### **2. `src/establecimientos/`** - Gestión de Clínicas/Hospitales

**`establecimientos.controller.ts`**
- **Endpoints especiales**: 
  - `GET /establecimientos/tipo/:tipo` - Filtrar por tipo (CLINICA, HOSPITAL, etc.)
- **¿Cómo se hizo?**: Usa enums de TypeScript para tipos válidos

**`establecimientos.service.ts`**
- **Incluye relaciones**: profesionales, obras sociales, turnos
- **Campos especiales**: horario de apertura y cierre (VARCHAR)

#### **3. `src/profesionales/`** - Gestión de Médicos

**`profesionales.controller.ts`**
- **Endpoints especiales**:
  - `GET /profesionales/establecimiento/:id` - Por establecimiento
  - `GET /profesionales/especialidad/:id` - Por especialidad
  - `GET /profesionales/matricula/:matricula` - Por matrícula
  - `POST /profesionales/:id/especialidades/:especialidadId` - Asignar especialidad
  - `DELETE /profesionales/:id/especialidades/:especialidadId` - Remover especialidad

**`profesionales.service.ts`**
- **Relaciones complejas**: Many-to-Many con especialidades
- **Incluye**: establecimiento, especialidades, turnos, historial

#### **4. `src/turnos/`** - Sistema Principal de Turnos ⭐

**`turnos.controller.ts`**
- **¿Qué hace?**: Gestión completa de turnos médicos
- **Endpoints especiales**:
  - `GET /turnos/paciente/:id` - Agenda de paciente
  - `GET /turnos/profesional/:id` - Agenda de médico
  - `GET /turnos/fecha/:fecha` - Turnos por fecha

**`turnos.service.ts`**
- **Lógica especial**: Genera números de referencia automáticos
- **Validaciones**: Estados de turno (PENDIENTE, CONFIRMADO, COMPLETADO, etc.)
- **Incluye todas las relaciones**: paciente, profesional, especialidad, establecimiento

#### **5. `src/especialidades/`** - Gestión de Especialidades Médicas

**`especialidades.service.ts`**
- **Características**: Duración estimada en minutos
- **Relaciones**: profesionales (many-to-many), turnos, historial

#### **6. `src/obras-sociales/`** - Gestión de Seguros Médicos

**`obras-sociales.service.ts`**
- **Incluye relaciones**: pacientes, establecimientos (many-to-many)
- **Campos**: tipo de cobertura, estado activo/inactivo

#### **7. `src/historial-consultas/`** - Historial Médico

**`historial-consultas.controller.ts`**
- **Endpoints especiales**:
  - `GET /historial-consultas/rango?inicio=&fin=` - Por rango de fechas
  - `POST /historial-consultas/from-turno/:turnoId` - Crear desde turno completado

**`historial-consultas.service.ts`**
- **¿Qué hace?**: Registra diagnósticos, tratamientos y observaciones médicas
- **Conexión especial**: Puede crearse automáticamente desde un turno
- **Campos principales**: fecha, hora, diagnóstico, tratamiento, observaciones

---

## Estructura de Base de Datos

### **Tablas Principales**

| Tabla | Descripción | Campos Principales |
|-------|-------------|-------------------|
| **pacientes** | Información de pacientes | `id`, `nombre`, `apellido`, `dni`, `email`, `obra_social_id` |
| **establecimientos** | Clínicas/Hospitales | `id`, `nombre`, `tipo`, `direccion`, `horario_apertura`, `horario_cierre` |
| **profesionales** | Médicos/Especialistas | `id`, `nombre`, `apellido`, `matricula`, `establecimiento_id` |
| **especialidades** | Tipos de consulta | `id`, `nombre`, `descripcion`, `duracion_estimada_minutos` |
| **turnos** | ⭐ Core del sistema | `id`, `fecha_turno`, `hora_turno`, `estado`, `numero_referencia` |
| **obras_sociales** | Seguros médicos | `id`, `nombre`, `tipo_cobertura` |
| **historial_consultas** | Registro médico | `id`, `fecha_consulta`, `hora_consulta`, `diagnostico`, `tratamiento` |

### **Tablas Intermedias (Many-to-Many)**
- **profesional_especialidad**: Profesionales ↔ Especialidades
- **establecimiento_obra_social**: Establecimientos ↔ Obras Sociales

### **Enums Definidos**
- **TipoEstablecimiento**: `CLINICA`, `LABORATORIO`, `SANATORIO`, `PARTICULAR`, `HOSPITAL`, `CENTRO_MEDICO`
- **EstadoTurno**: `PENDIENTE`, `CONFIRMADO`, `COMPLETADO`, `CANCELADO`, `NO_ASISTIO`

---

## Endpoints de la API

### **URLs Base para Pruebas** 
```
Servidor: http://localhost:3000
```

### **Pacientes** (`/pacientes`)
```
GET    /pacientes                    - Todos los pacientes + obra social
GET    /pacientes/:id               - Paciente + turnos + historial
GET    /pacientes/dni/:dni          - Buscar por DNI
POST   /pacientes                   - Crear nuevo
PATCH  /pacientes/:id              - Actualizar
DELETE /pacientes/:id              - Eliminar
```

### **Establecimientos** (`/establecimientos`)
```
GET    /establecimientos                  - Todos + profesionales
GET    /establecimientos/:id             - Por ID + profesionales + obras sociales
GET    /establecimientos/tipo/:tipo      - Filtrar: CLINICA, HOSPITAL, etc.
POST   /establecimientos                 - Crear nuevo
PATCH  /establecimientos/:id            - Actualizar
DELETE /establecimientos/:id            - Eliminar
```

### **Profesionales** (`/profesionales`)
```
GET    /profesionales                           - Todos + establecimiento + especialidades
GET    /profesionales/:id                      - Por ID + turnos + historial completo
GET    /profesionales/establecimiento/:id      - Por establecimiento
GET    /profesionales/especialidad/:id         - Por especialidad
GET    /profesionales/matricula/:matricula     - Por matrícula
POST   /profesionales                          - Crear nuevo
PATCH  /profesionales/:id                     - Actualizar
DELETE /profesionales/:id                     - Eliminar
POST   /profesionales/:id/especialidades/:especialidadId    - Asignar especialidad
DELETE /profesionales/:id/especialidades/:especialidadId   - Remover especialidad
```

### **Turnos** (`/turnos`) - **MÓDULO PRINCIPAL** ⭐
```
GET    /turnos                    - Todos con información completa
GET    /turnos/:id               - Turno específico + relaciones
GET    /turnos/paciente/:id      - Agenda de paciente
GET    /turnos/profesional/:id   - Agenda de profesional
GET    /turnos/fecha/:fecha      - Por fecha (YYYY-MM-DD)
POST   /turnos                   - Crear (genera número referencia)
PATCH  /turnos/:id              - Actualizar estado/observaciones
DELETE /turnos/:id              - Cancelar turno
```

### **Especialidades** (`/especialidades`)
```
GET    /especialidades       - Todas las especialidades
GET    /especialidades/:id   - Por ID + profesionales
POST   /especialidades       - Crear nueva
PATCH  /especialidades/:id  - Actualizar
DELETE /especialidades/:id  - Eliminar
```

### **Obras Sociales** (`/obras-sociales`)
```
GET    /obras-sociales       - Todas + pacientes + establecimientos
GET    /obras-sociales/:id   - Por ID + relaciones
POST   /obras-sociales       - Crear nueva
PATCH  /obras-sociales/:id  - Actualizar
DELETE /obras-sociales/:id  - Eliminar
```

### **Historial Consultas** (`/historial-consultas`)
```
GET    /historial-consultas                           - Todo el historial
GET    /historial-consultas/:id                      - Por ID
GET    /historial-consultas/paciente/:id             - Por paciente
GET    /historial-consultas/profesional/:id          - Por profesional
GET    /historial-consultas/establecimiento/:id      - Por establecimiento
GET    /historial-consultas/especialidad/:id         - Por especialidad
GET    /historial-consultas/fecha/:fecha             - Por fecha
GET    /historial-consultas/rango?inicio=&fin=       - Por rango fechas
POST   /historial-consultas                          - Crear consulta manual
POST   /historial-consultas/from-turno/:turnoId      - Crear desde turno
PATCH  /historial-consultas/:id                     - Actualizar consulta
DELETE /historial-consultas/:id                     - Eliminar consulta
```

### **Ejemplo de Request (Crear Turno)**
```json
POST http://localhost:3000/turnos
Content-Type: application/json

{
  "pacienteId": 1,
  "profesionalId": 2,
  "especialidadId": 1,
  "establecimientoId": 1,
  "fechaTurno": "2025-11-15",
  "horaTurno": "14:30",
  "observaciones": "Control de rutina"
}
```

---

## Configuración y Ejecución

### **1. Requisitos Previos**
- **Node.js** v18+ 
- **MySQL** ejecutándose
- **Base de datos** `anacron` creada

### **2. Variables de Entorno**
```env
# .env
DATABASE_URL="mysql://root:@localhost:3306/anacron"
```

### **3. Instalación y Configuración**
```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npx prisma generate

# Sincronizar con base de datos
npx prisma db push

# Iniciar servidor en desarrollo
npm run start:dev
```

### **4. Scripts Disponibles**
```bash
# Desarrollo
npm run start:dev          # Modo desarrollo con hot-reload
npm run start              # Modo producción
npm run build              # Compilar TypeScript

# Prisma
npx prisma studio           # Interfaz web de BD (Puerto 5555)
npx prisma generate         # Generar cliente
npx prisma db push          # Aplicar cambios a BD

# Testing  
npm run test                # Tests unitarios
npm run test:e2e           # Tests end-to-end
```

## URLs 

http://localhost:3000/                    - Test servidor
http://localhost:3000/pacientes          - Pacientes (debería mostrar [])
http://localhost:3000/establecimientos   - Establecimientos  
http://localhost:3000/profesionales      - Profesionales
http://localhost:3000/turnos             - Sistema de turnos
http://localhost:3000/especialidades     - Especialidades
http://localhost:3000/obras-sociales     - Obras sociales
http://localhost:3000/historial-consultas - Historial médico
