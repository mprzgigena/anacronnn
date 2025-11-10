import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObrasSocialesService } from './obras-sociales.service';

@Controller('obras-sociales')
export class ObrasSocialesController {
  constructor(private readonly obrasSocialesService: ObrasSocialesService) {}

  @Get()
  findAll() {
    return this.obrasSocialesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obrasSocialesService.findOne(+id);
  }

  @Post()
  create(@Body() createObraSocialDto: any) {
    return this.obrasSocialesService.create(createObraSocialDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObraSocialDto: any) {
    return this.obrasSocialesService.update(+id, updateObraSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obrasSocialesService.remove(+id);
  }
}
