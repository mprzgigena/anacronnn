import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HistorialConsultasService } from './historial-consultas.service';

@Controller('historial-consultas')
export class HistorialConsultasController {
  constructor(private readonly historialConsultasService: HistorialConsultasService) {}

  // GET /historial-consultas - Obtener todo el historial
  @Get()
  findAll() {
    return this.historialConsultasService.findAll();
  }

  // GET /historial-consultas/:id - Obtener una consulta por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialConsultasService.findOne(+id);
  }

  // GET /historial-consultas/paciente/:pacienteId - Historial por paciente
  @Get('paciente/:pacienteId')
  findByPaciente(@Param('pacienteId') pacienteId: string) {
    return this.historialConsultasService.findByPaciente(+pacienteId);
  }

  // GET /historial-consultas/profesional/:profesionalId - Historial por profesional
  @Get('profesional/:profesionalId')
  findByProfesional(@Param('profesionalId') profesionalId: string) {
    return this.historialConsultasService.findByProfesional(+profesionalId);
  }

  // GET /historial-consultas/establecimiento/:establecimientoId - Historial por establecimiento
  @Get('establecimiento/:establecimientoId')
  findByEstablecimiento(@Param('establecimientoId') establecimientoId: string) {
    return this.historialConsultasService.findByEstablecimiento(+establecimientoId);
  }

  // GET /historial-consultas/especialidad/:especialidadId - Historial por especialidad
  @Get('especialidad/:especialidadId')
  findByEspecialidad(@Param('especialidadId') especialidadId: string) {
    return this.historialConsultasService.findByEspecialidad(+especialidadId);
  }

  // GET /historial-consultas/fecha/:fecha - Historial por fecha (YYYY-MM-DD)
  @Get('fecha/:fecha')
  findByFecha(@Param('fecha') fecha: string) {
    return this.historialConsultasService.findByFecha(fecha);
  }

  // GET /historial-consultas/rango?inicio=YYYY-MM-DD&fin=YYYY-MM-DD - Historial por rango
  @Get('rango')
  findByDateRange(
    @Query('inicio') fechaInicio: string,
    @Query('fin') fechaFin: string,
  ) {
    return this.historialConsultasService.findByDateRange(fechaInicio, fechaFin);
  }

  // POST /historial-consultas - Crear nueva consulta en historial
  @Post()
  create(@Body() createHistorialDto: any) {
    return this.historialConsultasService.create(createHistorialDto);
  }

  // POST /historial-consultas/from-turno/:turnoId - Crear desde turno completado
  @Post('from-turno/:turnoId')
  createFromTurno(
    @Param('turnoId') turnoId: string,
    @Body() consultaData: any,
  ) {
    return this.historialConsultasService.createFromTurno(+turnoId, consultaData);
  }

  // PATCH /historial-consultas/:id - Actualizar consulta
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialDto: any) {
    return this.historialConsultasService.update(+id, updateHistorialDto);
  }

  // DELETE /historial-consultas/:id - Eliminar consulta
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialConsultasService.remove(+id);
  }
}
