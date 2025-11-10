import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProfesionalesService {
  // Obtener todos los profesionales
  findAll() {
    return prisma.profesional.findMany({
      include: {
        establecimiento: true,
        profesionalEspecialidades: {
          include: {
            especialidad: true,
          },
        },
      },
    });
  }

  // Obtener un profesional por ID
  findOne(id: number) {
    return prisma.profesional.findUnique({
      where: { id },
      include: {
        establecimiento: true,
        profesionalEspecialidades: {
          include: {
            especialidad: true,
          },
        },
        turnos: {
          include: {
            paciente: true,
            especialidad: true,
          },
          orderBy: {
            fechaTurno: 'desc',
          },
        },
        historialConsultas: true,
      },
    });
  }

  // Crear un nuevo profesional
  create(createProfesionalDto: any) {
    return prisma.profesional.create({
      data: createProfesionalDto,
      include: {
        establecimiento: true,
      },
    });
  }

  // Actualizar un profesional
  update(id: number, updateProfesionalDto: any) {
    return prisma.profesional.update({
      where: { id },
      data: updateProfesionalDto,
      include: {
        establecimiento: true,
        profesionalEspecialidades: {
          include: {
            especialidad: true,
          },
        },
      },
    });
  }

  // Eliminar un profesional
  remove(id: number) {
    return prisma.profesional.delete({
      where: { id },
    });
  }

  // Buscar por establecimiento
  findByEstablecimiento(establecimientoId: number) {
    return prisma.profesional.findMany({
      where: { establecimientoId },
      include: {
        establecimiento: true,
        profesionalEspecialidades: {
          include: {
            especialidad: true,
          },
        },
      },
    });
  }

  // Buscar por especialidad
  findByEspecialidad(especialidadId: number) {
    return prisma.profesional.findMany({
      where: {
        profesionalEspecialidades: {
          some: {
            especialidadId: especialidadId,
          },
        },
      },
      include: {
        establecimiento: true,
        profesionalEspecialidades: {
          include: {
            especialidad: true,
          },
        },
      },
    });
  }

  // Buscar por matrícula
  findByMatricula(matricula: string) {
    return prisma.profesional.findUnique({
      where: { matricula },
      include: {
        establecimiento: true,
        profesionalEspecialidades: {
          include: {
            especialidad: true,
          },
        },
      },
    });
  }

  // Asignar especialidad a profesional
  asignarEspecialidad(profesionalId: number, especialidadId: number) {
    return prisma.profesionalEspecialidad.create({
      data: {
        profesionalId,
        especialidadId,
      },
      include: {
        profesional: true,
        especialidad: true,
      },
    });
  }

  // Remover especialidad de profesional
  removerEspecialidad(profesionalId: number, especialidadId: number) {
    return prisma.profesionalEspecialidad.delete({
      where: {
        profesionalId_especialidadId: {
          profesionalId,
          especialidadId,
        },
      },
    });
  }
}
