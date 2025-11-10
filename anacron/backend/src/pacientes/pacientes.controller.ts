import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  // GET /pacientes - Obtener todos los pacientes
  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  // GET /pacientes/:id - Obtener un paciente por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(+id);
  }

  // GET /pacientes/dni/:dni - Buscar paciente por DNI
  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string) {
    return this.pacientesService.findByDni(dni);
  }

  // POST /pacientes - Crear un nuevo paciente
  @Post()
  create(@Body() createPacienteDto: any) {
    return this.pacientesService.create(createPacienteDto);
  }

  // PATCH /pacientes/:id - Actualizar un paciente
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: any) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  // DELETE /pacientes/:id - Eliminar un paciente
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }
}
