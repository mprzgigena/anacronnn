import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class HistorialConsultasService {
  // Obtener todo el historial
  findAll() {
    return prisma.historialConsulta.findMany({
      include: {
        paciente: {
          include: {
            obraSocial: true,
          },
        },
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        fechaConsulta: 'desc',
      },
    });
  }

  // Obtener una consulta por ID
  findOne(id: number) {
    return prisma.historialConsulta.findUnique({
      where: { id },
      include: {
        paciente: {
          include: {
            obraSocial: true,
          },
        },
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
    });
  }

  // Crear una nueva consulta en el historial
  create(createHistorialDto: any) {
    return prisma.historialConsulta.create({
      data: createHistorialDto,
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
    });
  }

  // Actualizar una consulta en el historial
  update(id: number, updateHistorialDto: any) {
    return prisma.historialConsulta.update({
      where: { id },
      data: updateHistorialDto,
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
    });
  }

  // Eliminar una consulta del historial
  remove(id: number) {
    return prisma.historialConsulta.delete({
      where: { id },
    });
  }

  // Obtener historial por paciente
  findByPaciente(pacienteId: number) {
    return prisma.historialConsulta.findMany({
      where: { pacienteId },
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        fechaConsulta: 'desc',
      },
    });
  }

  // Obtener historial por profesional
  findByProfesional(profesionalId: number) {
    return prisma.historialConsulta.findMany({
      where: { profesionalId },
      include: {
        paciente: {
          include: {
            obraSocial: true,
          },
        },
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        fechaConsulta: 'desc',
      },
    });
  }

  // Obtener historial por establecimiento
  findByEstablecimiento(establecimientoId: number) {
    return prisma.historialConsulta.findMany({
      where: { establecimientoId },
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        fechaConsulta: 'desc',
      },
    });
  }

  // Obtener historial por especialidad
  findByEspecialidad(especialidadId: number) {
    return prisma.historialConsulta.findMany({
      where: { especialidadId },
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        fechaConsulta: 'desc',
      },
    });
  }

  // Obtener historial por fecha
  findByFecha(fecha: string) {
    return prisma.historialConsulta.findMany({
      where: {
        fechaConsulta: new Date(fecha),
      },
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        horaConsulta: 'asc',
      },
    });
  }

  // Obtener historial por rango de fechas
  findByDateRange(fechaInicio: string, fechaFin: string) {
    return prisma.historialConsulta.findMany({
      where: {
        fechaConsulta: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin),
        },
      },
      include: {
        paciente: true,
        profesional: true,
        especialidad: true,
        establecimiento: true,
        turno: true,
      },
      orderBy: {
        fechaConsulta: 'desc',
      },
    });
  }

  // Crear consulta desde un turno completado
  createFromTurno(turnoId: number, consultaData: any) {
    return prisma.$transaction(async (tx) => {
      // Obtener datos del turno
      const turno = await tx.turno.findUnique({
        where: { id: turnoId },
      });

      if (!turno) {
        throw new Error('Turno no encontrado');
      }

      // Crear consulta en historial
      const historial = await tx.historialConsulta.create({
        data: {
          pacienteId: turno.pacienteId,
          profesionalId: turno.profesionalId,
          especialidadId: turno.especialidadId,
          establecimientoId: turno.establecimientoId,
          turnoId: turno.id,
          fechaConsulta: turno.fechaTurno,
          horaConsulta: turno.horaTurno,
          ...consultaData,
        },
        include: {
          paciente: true,
          profesional: true,
          especialidad: true,
          establecimiento: true,
          turno: true,
        },
      });

      // Actualizar estado del turno
      await tx.turno.update({
        where: { id: turnoId },
        data: { estado: 'COMPLETADO' },
      });

      return historial;
    });
  }
}
