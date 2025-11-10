import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';

@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly profesionalesService: ProfesionalesService) {}

  // GET /profesionales - Obtener todos los profesionales
  @Get()
  findAll() {
    return this.profesionalesService.findAll();
  }

  // GET /profesionales/:id - Obtener un profesional por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesionalesService.findOne(+id);
  }

  // GET /profesionales/establecimiento/:establecimientoId - Profesionales por establecimiento
  @Get('establecimiento/:establecimientoId')
  findByEstablecimiento(@Param('establecimientoId') establecimientoId: string) {
    return this.profesionalesService.findByEstablecimiento(+establecimientoId);
  }

  // GET /profesionales/especialidad/:especialidadId - Profesionales por especialidad
  @Get('especialidad/:especialidadId')
  findByEspecialidad(@Param('especialidadId') especialidadId: string) {
    return this.profesionalesService.findByEspecialidad(+especialidadId);
  }

  // GET /profesionales/matricula/:matricula - Buscar por matrícula
  @Get('matricula/:matricula')
  findByMatricula(@Param('matricula') matricula: string) {
    return this.profesionalesService.findByMatricula(matricula);
  }

  // POST /profesionales - Crear un nuevo profesional
  @Post()
  create(@Body() createProfesionalDto: any) {
    return this.profesionalesService.create(createProfesionalDto);
  }

  // PATCH /profesionales/:id - Actualizar un profesional
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesionalDto: any) {
    return this.profesionalesService.update(+id, updateProfesionalDto);
  }

  // DELETE /profesionales/:id - Eliminar un profesional
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionalesService.remove(+id);
  }

  // POST /profesionales/:id/especialidades/:especialidadId - Asignar especialidad
  @Post(':id/especialidades/:especialidadId')
  asignarEspecialidad(
    @Param('id') id: string,
    @Param('especialidadId') especialidadId: string,
  ) {
    return this.profesionalesService.asignarEspecialidad(+id, +especialidadId);
  }

  // DELETE /profesionales/:id/especialidades/:especialidadId - Remover especialidad
  @Delete(':id/especialidades/:especialidadId')
  removerEspecialidad(
    @Param('id') id: string,
    @Param('especialidadId') especialidadId: string,
  ) {
    return this.profesionalesService.removerEspecialidad(+id, +especialidadId);
  }
}
