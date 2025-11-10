import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadesService.findOne(+id);
  }

  @Post()
  create(@Body() createEspecialidadDto: any) {
    return this.especialidadesService.create(createEspecialidadDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadDto: any) {
    return this.especialidadesService.update(+id, updateEspecialidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadesService.remove(+id);
  }
}
