import { Module } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  imports: [ValidationModule],
  providers: [OracleService],
  exports: [OracleService],
})
export class OracleModule {}
