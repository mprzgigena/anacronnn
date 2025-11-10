import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ObrasSocialesService {
  // Obtener todas las obras sociales
  findAll() {
    return prisma.obraSocial.findMany({
      include: {
        pacientes: true,
        establecimientoObraSociales: {
          include: {
            establecimiento: true,
          },
        },
      },
    });
  }

  // Obtener una obra social por ID
  findOne(id: number) {
    return prisma.obraSocial.findUnique({
      where: { id },
      include: {
        pacientes: true,
        establecimientoObraSociales: {
          include: {
            establecimiento: true,
          },
        },
      },
    });
  }

  // Crear una nueva obra social
  create(createObraSocialDto: any) {
    return prisma.obraSocial.create({
      data: createObraSocialDto,
    });
  }

  // Actualizar una obra social
  update(id: number, updateObraSocialDto: any) {
    return prisma.obraSocial.update({
      where: { id },
      data: updateObraSocialDto,
    });
  }

  // Eliminar una obra social
  remove(id: number) {
    return prisma.obraSocial.delete({
      where: { id },
    });
  }
}
