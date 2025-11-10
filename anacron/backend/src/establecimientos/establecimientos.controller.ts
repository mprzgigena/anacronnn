import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstablecimientosService } from './establecimientos.service';

@Controller('establecimientos')
export class EstablecimientosController {
  constructor(private readonly establecimientosService: EstablecimientosService) {}

  // GET /establecimientos - Obtener todos los establecimientos
  @Get()
  findAll() {
    return this.establecimientosService.findAll();
  }

  // GET /establecimientos/:id - Obtener un establecimiento por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establecimientosService.findOne(+id);
  }

  // GET /establecimientos/tipo/:tipo - Buscar por tipo
  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string) {
    return this.establecimientosService.findByTipo(tipo);
  }

  // POST /establecimientos - Crear un nuevo establecimiento
  @Post()
  create(@Body() createEstablecimientoDto: any) {
    return this.establecimientosService.create(createEstablecimientoDto);
  }

  // PATCH /establecimientos/:id - Actualizar un establecimiento
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstablecimientoDto: any) {
    return this.establecimientosService.update(+id, updateEstablecimientoDto);
  }

  // DELETE /establecimientos/:id - Eliminar un establecimiento
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establecimientosService.remove(+id);
  }
}
