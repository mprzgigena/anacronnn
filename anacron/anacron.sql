/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : anacron

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2025-11-10 00:13:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `especialidades`
-- ----------------------------
DROP TABLE IF EXISTS `especialidades`;
CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion_estimada_minutos` int(11) DEFAULT 30,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `idx_activo` (`activo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of especialidades
-- ----------------------------

-- ----------------------------
-- Table structure for `establecimientos`
-- ----------------------------
DROP TABLE IF EXISTS `establecimientos`;
CREATE TABLE `establecimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo` enum('CLINICA','LABORATORIO','SANATORIO','PARTICULAR','HOSPITAL','CENTRO_MEDICO') NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `horario_apertura` varchar(10) DEFAULT NULL,
  `horario_cierre` varchar(10) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_tipo` (`tipo`),
  KEY `idx_activo` (`activo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of establecimientos
-- ----------------------------

-- ----------------------------
-- Table structure for `establecimiento_obra_social`
-- ----------------------------
DROP TABLE IF EXISTS `establecimiento_obra_social`;
CREATE TABLE `establecimiento_obra_social` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `establecimiento_id` int(11) NOT NULL,
  `obra_social_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_est_obra` (`establecimiento_id`,`obra_social_id`),
  KEY `obra_social_id` (`obra_social_id`),
  CONSTRAINT `establecimiento_obra_social_ibfk_1` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `establecimiento_obra_social_ibfk_2` FOREIGN KEY (`obra_social_id`) REFERENCES `obras_sociales` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of establecimiento_obra_social
-- ----------------------------

-- ----------------------------
-- Table structure for `historial_consultas`
-- ----------------------------
DROP TABLE IF EXISTS `historial_consultas`;
CREATE TABLE `historial_consultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paciente_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `especialidad_id` int(11) NOT NULL,
  `establecimiento_id` int(11) NOT NULL,
  `turno_id` int(11) DEFAULT NULL,
  `fecha_consulta` date NOT NULL,
  `hora_consulta` varchar(10) NOT NULL,
  `tipo_consulta` varchar(100) DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_fecha_consulta` (`fecha_consulta`),
  KEY `idx_paciente_historial` (`paciente_id`),
  KEY `idx_profesional_historial` (`profesional_id`),
  KEY `especialidad_id` (`especialidad_id`),
  KEY `establecimiento_id` (`establecimiento_id`),
  KEY `turno_id` (`turno_id`),
  CONSTRAINT `historial_consultas_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historial_consultas_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historial_consultas_ibfk_3` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historial_consultas_ibfk_4` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `historial_consultas_ibfk_5` FOREIGN KEY (`turno_id`) REFERENCES `turnos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of historial_consultas
-- ----------------------------

-- ----------------------------
-- Table structure for `obras_sociales`
-- ----------------------------
DROP TABLE IF EXISTS `obras_sociales`;
CREATE TABLE `obras_sociales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo_cobertura` varchar(50) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of obras_sociales
-- ----------------------------

-- ----------------------------
-- Table structure for `pacientes`
-- ----------------------------
DROP TABLE IF EXISTS `pacientes`;
CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `obra_social_id` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_dni` (`dni`),
  KEY `idx_email` (`email`),
  KEY `obra_social_id` (`obra_social_id`),
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`obra_social_id`) REFERENCES `obras_sociales` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of pacientes
-- ----------------------------

-- ----------------------------
-- Table structure for `profesionales`
-- ----------------------------
DROP TABLE IF EXISTS `profesionales`;
CREATE TABLE `profesionales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `matricula` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `establecimiento_id` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`),
  KEY `idx_matricula` (`matricula`),
  KEY `idx_establecimiento` (`establecimiento_id`),
  CONSTRAINT `profesionales_ibfk_1` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of profesionales
-- ----------------------------

-- ----------------------------
-- Table structure for `profesional_especialidad`
-- ----------------------------
DROP TABLE IF EXISTS `profesional_especialidad`;
CREATE TABLE `profesional_especialidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profesional_id` int(11) NOT NULL,
  `especialidad_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_prof_esp` (`profesional_id`,`especialidad_id`),
  KEY `especialidad_id` (`especialidad_id`),
  CONSTRAINT `profesional_especialidad_ibfk_1` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profesional_especialidad_ibfk_2` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of profesional_especialidad
-- ----------------------------

-- ----------------------------
-- Table structure for `turnos`
-- ----------------------------
DROP TABLE IF EXISTS `turnos`;
CREATE TABLE `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paciente_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `especialidad_id` int(11) NOT NULL,
  `establecimiento_id` int(11) NOT NULL,
  `fecha_turno` date NOT NULL,
  `hora_turno` varchar(10) NOT NULL,
  `estado` enum('PENDIENTE','CONFIRMADO','COMPLETADO','CANCELADO','NO_ASISTIO') DEFAULT 'PENDIENTE',
  `observaciones` text DEFAULT NULL,
  `numero_referencia` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_referencia` (`numero_referencia`),
  KEY `idx_fecha` (`fecha_turno`),
  KEY `idx_estado` (`estado`),
  KEY `idx_paciente` (`paciente_id`),
  KEY `idx_profesional` (`profesional_id`),
  KEY `idx_numero_ref` (`numero_referencia`),
  KEY `especialidad_id` (`especialidad_id`),
  KEY `establecimiento_id` (`establecimiento_id`),
  CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `turnos_ibfk_4` FOREIGN KEY (`establecimiento_id`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of turnos
-- ----------------------------
