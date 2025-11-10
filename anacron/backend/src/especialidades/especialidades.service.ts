import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EspecialidadesService {
  // Obtener todas las especialidades
  findAll() {
    return prisma.especialidad.findMany({
      include: {
        profesionalEspecialidades: {
          include: {
            profesional: true,
          },
        },
      },
    });
  }

  // Obtener una especialidad por ID
  findOne(id: number) {
    return prisma.especialidad.findUnique({
      where: { id },
      include: {
        profesionalEspecialidades: {
          include: {
            profesional: {
              include: {
                establecimiento: true,
              },
            },
          },
        },
        turnos: true,
      },
    });
  }

  // Crear una nueva especialidad
  create(createEspecialidadDto: any) {
    return prisma.especialidad.create({
      data: createEspecialidadDto,
    });
  }

  // Actualizar una especialidad
  update(id: number, updateEspecialidadDto: any) {
    return prisma.especialidad.update({
      where: { id },
      data: updateEspecialidadDto,
    });
  }

  // Eliminar una especialidad
  remove(id: number) {
    return prisma.especialidad.delete({
      where: { id },
    });
  }
}
