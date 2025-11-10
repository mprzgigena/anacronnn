import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EstablecimientosService {
  // Obtener todos los establecimientos
  findAll() {
    return prisma.establecimiento.findMany({
      include: {
        profesionales: true,
        establecimientoObraSociales: {
          include: {
            obraSocial: true,
          },
        },
      },
    });
  }

  // Obtener un establecimiento por ID
  findOne(id: number) {
    return prisma.establecimiento.findUnique({
      where: { id },
      include: {
        profesionales: {
          include: {
            profesionalEspecialidades: {
              include: {
                especialidad: true,
              },
            },
          },
        },
        establecimientoObraSociales: {
          include: {
            obraSocial: true,
          },
        },
        turnos: true,
      },
    });
  }

  // Crear un nuevo establecimiento
  create(createEstablecimientoDto: any) {
    return prisma.establecimiento.create({
      data: createEstablecimientoDto,
    });
  }

  // Actualizar un establecimiento
  update(id: number, updateEstablecimientoDto: any) {
    return prisma.establecimiento.update({
      where: { id },
      data: updateEstablecimientoDto,
    });
  }

  // Eliminar un establecimiento
  remove(id: number) {
    return prisma.establecimiento.delete({
      where: { id },
    });
  }

  // Buscar por tipo de establecimiento
  findByTipo(tipo: string) {
    return prisma.establecimiento.findMany({
      where: { tipo: tipo as any },
      include: {
        profesionales: true,
      },
    });
  }
}
