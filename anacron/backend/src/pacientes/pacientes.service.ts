import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PacientesService {
  // Obtener todos los pacientes
  findAll() {
    return prisma.paciente.findMany({
      include: {
        obraSocial: true, // Incluir información de obra social
      },
    });
  }

  // Obtener un paciente por ID
  findOne(id: number) {
    return prisma.paciente.findUnique({
      where: { id },
      include: {
        obraSocial: true,
        turnos: true,
        historialConsultas: true,
      },
    });
  }

  // Crear un nuevo paciente
  create(createPacienteDto: any) {
    return prisma.paciente.create({
      data: createPacienteDto,
      include: {
        obraSocial: true,
      },
    });
  }

  // Actualizar un paciente
  update(id: number, updatePacienteDto: any) {
    return prisma.paciente.update({
      where: { id },
      data: updatePacienteDto,
      include: {
        obraSocial: true,
      },
    });
  }

  // Eliminar un paciente
  remove(id: number) {
    return prisma.paciente.delete({
      where: { id },
    });
  }

  // Buscar pacientes por DNI
  findByDni(dni: string) {
    return prisma.paciente.findUnique({
      where: { dni },
      include: {
        obraSocial: true,
      },
    });
  }
}
