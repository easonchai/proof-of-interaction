import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { ValidationController } from './validation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [ValidationService],
  providers: [ValidationService],
  controllers: [ValidationController],
})
export class ValidationModule {}
