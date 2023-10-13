import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { ValidationController } from './validation.controller';

@Module({
  providers: [ValidationService],
  controllers: [ValidationController]
})
export class ValidationModule {}
