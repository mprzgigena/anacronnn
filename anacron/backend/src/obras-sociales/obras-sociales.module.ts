import { Module } from '@nestjs/common';
import { ObrasSocialesService } from './obras-sociales.service';
import { ObrasSocialesController } from './obras-sociales.controller';

@Module({
  controllers: [ObrasSocialesController],
  providers: [ObrasSocialesService],
})
export class ObrasSocialesModule {}
